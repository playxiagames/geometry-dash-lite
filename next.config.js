/** @type {import('next').NextConfig} */
// Helper function to get external domains from environment
const getExternalDomains = () => {
  const defaultDomains = ['1games.io', 'scratch.mit.edu'];
  const envDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS;
  if (envDomains) {
    const customDomains = envDomains.split(',').map(d => d.trim()).filter(Boolean);
    return [...defaultDomains, ...customDomains];
  }
  return defaultDomains;
};

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: getExternalDomains(),
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    CUSTOM_KEY: 'geometry-dash-lite-site',
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@/components', '@/utils'],
  },
};

module.exports = nextConfig 