'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else if (response.status === 404) {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto No Encontrado</h1>
          <p className="text-gray-600 mb-8">
            El producto que buscas no existe o ha sido removido.
          </p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-blue-600">Productos</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imágenes del producto */}
        <div className="space-y-4">
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Miniaturas */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                  aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {product.category.name}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center space-x-2">
            <span className={`inline-block w-3 h-3 rounded-full ${
              product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span className={`text-sm font-medium ${
              product.stock > 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {product.stock > 0 ? `En stock (${product.stock})` : 'Agotado'}
            </span>
          </div>

          {/* Descripción */}
          {product.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Material */}
          {product.material && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Material</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>
          )}

          {/* Botón de acción */}
          <div className="pt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                product.stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label={product.stock > 0 ? 'Agregar producto al carrito' : 'Producto agotado'}
            >
              {product.stock > 0 ? 'Agregar al Carrito' : 'Producto Agotado'}
            </button>
          </div>

          {/* Información adicional */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Categoría:</span>
                <p className="text-gray-600">{product.category.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Disponibilidad:</span>
                <p className="text-gray-600">
                  {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados - placeholder */}
      <div className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos Relacionados</h2>
        <div className="text-center py-12">
          <p className="text-gray-600">
            Próximamente: Productos de la misma categoría
          </p>
        </div>
      </div>
    </div>
  );
}