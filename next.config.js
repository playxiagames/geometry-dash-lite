/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com']
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
}

module.exports = nextConfig 