/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['1games.io', 'scratch.mit.edu'],
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