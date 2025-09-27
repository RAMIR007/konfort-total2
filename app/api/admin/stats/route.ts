import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

interface SalesByMonthResult {
  month: Date
  revenue: string
  orders: string
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Ingresos totales (suma de totales de pedidos no cancelados)
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true
      },
      where: {
        status: {
          not: 'CANCELLED'
        }
      }
    })

    // Costos totales (suma de costos de productos vendidos)
    const totalCosts = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true
      },
      where: {
        order: {
          status: {
            not: 'CANCELLED'
          }
        }
      }
    })

    // Obtener costos por producto vendido
    const productCosts = await prisma.$queryRaw`
      SELECT
        SUM(oi.quantity * COALESCE(p."costPrice", 0)) as totalCosts
      FROM "OrderItem" oi
      JOIN "Product" p ON oi."productId" = p.id
      JOIN "Order" o ON oi."orderId" = o.id
      WHERE o.status != 'CANCELLED'
    ` as Array<{ totalCosts: string }>

    // Gastos de transporte
    const totalShippingCosts = await prisma.$queryRaw`
      SELECT SUM("shippingCost") as totalShipping
      FROM "Order"
      WHERE status != 'CANCELLED'
    ` as Array<{ totalShipping: string | null }>

    // Número de pedidos
    const totalOrders = await prisma.order.count()

    // Calcular ganancias
    const revenue = totalRevenue._sum.total || 0
    const costs = parseFloat(productCosts[0]?.totalCosts || '0')
    const shipping = parseFloat(totalShippingCosts[0]?.totalShipping || '0')
    const totalCostsAll = costs + shipping
    const totalProfit = revenue - totalCostsAll

    // Productos más vendidos
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    })

    // Obtener nombres de productos
    const productIds = topProducts.map((p: { productId: string }) => p.productId)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      select: {
        id: true,
        name: true
      }
    })

    const topProductsWithNames = topProducts.map((item: { productId: string; _sum: { quantity: number | null } }) => {
      const product = products.find((p: { id: string; name: string }) => p.id === item.productId)
      return {
        productId: item.productId,
        name: product?.name || 'Producto desconocido',
        totalSold: item._sum.quantity || 0
      }
    })

    // Ventas por mes (últimos 12 meses)
    const salesByMonth = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', "createdAt") as month,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM "Order"
      WHERE "status" != 'CANCELLED'
        AND "createdAt" >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
    ` as SalesByMonthResult[]

    return NextResponse.json({
      totalRevenue: revenue,
      totalCosts: totalCostsAll,
      totalProfit,
      totalShippingCosts: shipping,
      totalOrders,
      topProducts: topProductsWithNames,
      salesByMonth: salesByMonth.map(item => ({
        month: item.month,
        revenue: parseFloat(item.revenue),
        orders: parseInt(item.orders)
      }))
    })
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}