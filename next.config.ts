import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Add your image domains here
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react', 'recharts'],
    optimizeCss: true,
  },
  // Enable ISR for better performance
  // revalidate: 60, // Global revalidate, or set per page

  // Compression and optimization
  compress: true,

  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!dev && !isServer) {
  //     config.plugins.push(
  //       new webpack.DefinePlugin({
  //         __BUNDLE_ANALYZER__: JSON.stringify(process.env.ANALYZE === 'true'),
  //       })
  //     );
  //   }
  //   return config;
  // },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
