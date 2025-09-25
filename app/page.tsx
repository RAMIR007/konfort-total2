'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

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

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=8');
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bienvenido a Konfort Total
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tu tienda en línea de muebles para Cuba. Encuentra la comodidad y calidad que mereces.
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de muebles de alta calidad, diseñados para tu hogar cubano.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No hay productos disponibles en este momento.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora por Categorías
            </h2>
            <p className="text-gray-600">
              Encuentra exactamente lo que necesitas para tu hogar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/categories"
              className="group bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">🪑</div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                Sillas y Mesas
              </h3>
              <p className="text-gray-600 mt-2">
                Mobiliario para comedor y oficina
              </p>
            </Link>

            <Link
              href="/categories"
              className="group bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">🛏️</div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                Dormitorio
              </h3>
              <p className="text-gray-600 mt-2">
                Camas, cómodas y más
              </p>
            </Link>

            <Link
              href="/categories"
              className="group bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-4">🛋️</div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                Sala de Estar
              </h3>
              <p className="text-gray-600 mt-2">
                Sofás, mesas de centro y decoración
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
