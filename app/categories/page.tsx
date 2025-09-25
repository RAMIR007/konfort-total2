'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  _count: {
    products: number;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryIcons: { [key: string]: string } = {
    'Sillas': '🪑',
    'Mesas': '🍽️',
    'Sofás': '🛋️',
    'Camas': '🛏️',
    'Cómodas': '🗄️',
    'Armarios': '🚪',
    'default': '🛋️',
  };

  const getCategoryIcon = (name: string) => {
    return categoryIcons[name] || categoryIcons.default;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Categorías de Productos</h1>
        <p className="text-gray-600">
          Explora nuestras categorías y encuentra exactamente lo que necesitas para tu hogar.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="text-4xl mb-4 text-center">🛋️</div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 text-center">
                {getCategoryIcon(category.name)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-center">
                {category._count.products} producto{category._count.products !== 1 ? 's' : ''} disponible{category._count.products !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No hay categorías disponibles en este momento.
          </p>
        </div>
      )}

      {/* Enlace de vuelta a productos */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver Todos los Productos
        </Link>
      </div>
    </div>
  );
}