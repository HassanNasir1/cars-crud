import { API_URL } from './endpoint'

export default {
  meEndpoint: `${API_URL.url}/api/auth/me`,
  loginEndpoint: `${API_URL.url}/api/auth/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

// loginEndpoint: '/jwt/login',
// meEndpoint: '/auth/me',
// loginEndpoint: 'http://localhost:3010/api/auth/login',
// registerEndpoint: '/jwt/register',
// storageTokenKeyName: 'accessToken',
// onTokenExpiration: 'refreshToken' // logout | refreshToken
