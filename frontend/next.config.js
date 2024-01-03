/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}

const securityHeaders = [
  {
    key: 'Access-Control-Allow-Origin',
    value: '*' // Adjust this to allow specific origins if needed
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET, POST, OPTIONS, PUT, DELETE'
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With, Content-Type, Authorization'
  }
]
