import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',

    remotePatterns: [
      { protocol: 'https', hostname: 'images.alfredbrannare.dev' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/**' },

      { protocol: 'https', hostname: 'cdn.simpleicons.org', pathname: '/**' },
      { protocol: 'https', hostname: 'svgl.app', pathname: '/**' },
      { protocol: 'https', hostname: 'img.shields.io', pathname: '/**' },

      { protocol: 'https', hostname: 'img.logo.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.brandfetch.io', pathname: '/**' },
      { protocol: 'https', hostname: 'icon.horse', pathname: '/icon/**' },
    ],
  },
};

export default nextConfig;
