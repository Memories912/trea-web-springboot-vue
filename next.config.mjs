/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce client bundle size by optimizing imports
  experimental: {
    optimizePackageImports: ['lucide-react', '@fortawesome/fontawesome-free'],
  },

  // Better navigation performance
  reactStrictMode: false,

  // Skip trailing slash redirects
  skipTrailingSlashRedirect: true,
}

export default nextConfig
