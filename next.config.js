/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/github-io-game' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/github-io-game/' : '',
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