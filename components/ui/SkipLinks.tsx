'use client';

export default function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 bg-blue-600 text-white p-2">
      <a
        href="#main-content"
        className="mr-4 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white"
      >
        Saltar al contenido principal
      </a>
      <a
        href="#navigation"
        className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white"
      >
        Saltar a la navegación
      </a>
    </div>
  );
}