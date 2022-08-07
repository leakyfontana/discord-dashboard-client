/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com']
  }
}
const { withAxiom } = require('next-axiom');

module.exports = //withAxiom({
  nextConfig
//})
