'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart';
import { downloadVoucher } from '@/lib/pdf/generateVoucher';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = getTotal();

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando...</div>;
  }

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No hay productos en el carrito</h1>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setError('Por favor ingrese la dirección de envío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear la orden
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total,
          shippingAddress,
          paymentMethod: 'efectivo',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const order = await response.json();

      // Generar y descargar el PDF
      downloadVoucher({
        ...order,
        user: session.user,
        items: order.items.map((item: any) => ({
          ...item,
          product: item.product,
        })),
      });

      // Limpiar carrito
      clearCart();

      // Redirigir a página de confirmación o home
      router.push('/?success=true');
    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar la orden. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de checkout */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Envío</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={session.user?.name || ''}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={session.user?.email || ''}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Dirección de Envío
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Ingrese su dirección completa en Cuba"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Método de Pago
                </label>
                <p className="mt-1 text-sm text-gray-600">
                  Pago en efectivo al recoger el pedido en nuestras tiendas físicas.
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Confirmar Orden y Generar Vale'}
              </button>
            </form>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{(item.product.price * item.quantity).toFixed(2)} CUP</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)} CUP</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Al confirmar, se generará un vale de pago en PDF que podrá descargar automáticamente.
              Presente este vale en cualquiera de nuestras tiendas físicas en Cuba para recoger su pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}