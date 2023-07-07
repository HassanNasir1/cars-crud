export const API_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
    ? {
        url: process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
      }
    : process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? { url: process.env.NEXT_PUBLIC_API_URL_PRODUCTION }
    : process.env.NEXT_PUBLIC_ENVIRONMENT == 'staging'
    ? { url: process.env.NEXT_PUBLIC_API_URL_STAGING }
    : { url: '' }

export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODc0OTg5MzIsImV4cCI6MTY4NzU4NTMzMiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OTI4NThlOGJkMWMzNmQ5YjIzYzI0MiIsImp0aSI6IjhlNTMwODFkLTgyMzMtNDk2Ni04YTMxLTZkZmJjODkwODdjZiJ9.Dh8BnrNSBDOSPxT34MTxlxfQdhnhJtxWhzQjMx_-J18'
