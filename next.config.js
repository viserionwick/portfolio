/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })

    return config
  },

  async redirects() {
    return [
      {
        source: '/project',
        destination: '/#projects',
        permanent: true,
      },
      {
        source: '/legal',
        destination: '/legal/terms',
        permanent: true,
      },
    ]
  }

}

module.exports = nextConfig
