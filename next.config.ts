import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"] as const,
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "*.microcms-assets.io",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: [],
};

export default withNextIntl(nextConfig);