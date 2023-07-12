export default {
  meEndpoint: 'http://localhost:3010/api/auth/me',
  loginEndpoint: 'http://localhost:3010/api/auth/login',
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
