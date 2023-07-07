export const API_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
    ? {
        url: process.env.NEXT_PUBLIC_APP_URL_DEVELOPMENT
      }
    : process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? { url: process.env.NEXT_PUBLIC_APP_URL_PRODUCTION }
    : process.env.NEXT_PUBLIC_ENVIRONMENT == 'staging'
    ? { url: process.env.NEXT_PUBLIC_APP_URL_STAGING }
    : { url: '' }
