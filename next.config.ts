import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // HYBRID MODE: Static pages + Dynamic leaderboard + Image Optimization

  images: {
    // Keep Next.js Image Optimization (you want this)
    // But add aggressive caching to reduce Edge Requests
    minimumCacheTTL: 7776000, // Cache optimized images for 90 days
    formats: ['image/webp', 'image/avif'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Cache static assets aggressively
  async headers() {
    return [
      {
        source: '/Sponsor/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // DYNAMIC QR REDIRECT SYSTEM
  // Scan QR -> /qr -> Redirects to destination
  // Change 'destination' here to update where the QR goes without re-printing!
  async redirects() {
    return [
      {
        source: '/qr',
        destination: '/get-pass', // Change this URL later to point anywhere
        permanent: false, // 307 Temporary Redirect (SEO Safe, encourages re-checking)
      },
    ];
  },
};

export default nextConfig;
