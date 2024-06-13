/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "codemyviews-blog-post-images.s3.amazonaws.com", "themes.getbootstrap.com", "blog.tubikstudio.com", "upload.wikimedia.org", "i.ibb.co"]
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
