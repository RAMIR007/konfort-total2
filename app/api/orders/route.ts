import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { items, total, shippingAddress, paymentMethod } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items requeridos' }, { status: 400 });
    }

    if (!total || typeof total !== 'number') {
      return NextResponse.json({ error: 'Total requerido' }, { status: 400 });
    }

    if (!shippingAddress || typeof shippingAddress !== 'string') {
      return NextResponse.json({ error: 'Dirección de envío requerida' }, { status: 400 });
    }

    // Crear la orden en una transacción
    const order = await prisma.$transaction(async (tx) => {
      // Crear la orden
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          total,
          status: 'PENDING',
          paymentMethod: paymentMethod || 'efectivo',
          shippingAddress,
        },
      });

      // Crear los items de la orden
      const orderItems = await Promise.all(
        items.map((item: CartItem) =>
          tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          })
        )
      );

      // Retornar la orden completa con items y productos
      return tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              address: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creando orden:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}