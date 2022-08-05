/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com']
  },
  env: {
    API_URL: 'http://localhost:3001/api',
  }
}

module.exports = nextConfig
