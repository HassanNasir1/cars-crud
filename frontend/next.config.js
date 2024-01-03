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
  // {
  //   key: 'X-Content-Type-Options',
  //   value: 'nosniff'
  // },
  {
    key: 'X-Frame-Options',
    value: 'ALLOWALL'
  },
  {
    key: 'Content-Security-Policy',
    value: 'frame-ancestors *'
  }
]
