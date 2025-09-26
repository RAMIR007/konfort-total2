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

    // Número de pedidos
    const totalOrders = await prisma.order.count()

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
    const productIds = topProducts.map(p => p.productId)
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

    const topProductsWithNames = topProducts.map(item => {
      const product = products.find(p => p.id === item.productId)
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
      totalRevenue: totalRevenue._sum.total || 0,
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