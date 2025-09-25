import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Add your image domains here
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  // Enable ISR for better performance
  // revalidate: 60, // Global revalidate, or set per page
};

export default nextConfig;
