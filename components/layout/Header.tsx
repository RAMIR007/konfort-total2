'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/stores/cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Konfort Total
          </Link>

          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Productos
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
              Categorías
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors relative">
              Carrito
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            )}
            {status === 'loading' ? (
              <div className="text-gray-700">Cargando...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hola, {session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Iniciar Sesión
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú de navegación"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Inicio
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Productos
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categorías
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition-colors relative">
                Carrito
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Admin
                </Link>
              )}
              {status === 'loading' ? (
                <div className="text-gray-700">Cargando...</div>
              ) : session ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">Hola, {session.user.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}