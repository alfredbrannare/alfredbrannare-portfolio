import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.alfredbrannare.dev' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
  },
};

export default nextConfig;
