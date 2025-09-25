'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/stores/cart';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
  stock: number;
  material?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const mainImage = product.images[0] || '/images/placeholder.jpg';

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Agotado</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category.name}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {product.material && (
          <p className="text-sm text-gray-600 mb-2">
            Material: {product.material}
          </p>
        )}

        <div className="space-y-3">
          <div className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </button>

            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm font-medium"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}