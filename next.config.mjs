/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/:locale(ru|en|de|tr)/city-guide/small-towns',
        destination: '/:locale/city-guide#satellites',
        permanent: true,
      },
      {
        source: '/city-guide/small-towns',
        destination: '/ru/city-guide#satellites',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
    ];
  },
};

export default nextConfig;
