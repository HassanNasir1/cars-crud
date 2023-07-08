import axios from 'axios'
import { API_URL } from './endpoint'
import authConfig from 'src/configs/auth'

const URL = API_URL.url
const axiosInstance = axios.create({
  baseURL: URL
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Add headers to all requests
    config.headers['Authorization'] = localStorage.getItem('accessToken')

    return config
  },
  function (error) {
    // Handle request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Handle successful response
    return response
  },
  function (error) {
    // Handle response error
    if (error.response.status === 401) {
      // Redirect to login page if unauthorized
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
