/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['fs']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('undici')
    }
    return config
  }
}

module.exports = nextConfig