import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from 'src/configs/endpoint'

// ** Axios Imports
import axios from 'axios'
import axiosInstance from 'src/configs/axiosInstance'

// Function to get JWT access token
export const getAccessToken = async () => {
  try {
    const response = await fetch('http://localhost:8088/api/v1/security/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
        provider: 'db',
        refresh: true
      })
    })

    const data = await response.json()
    const accessToken = data.access_token
    return accessToken
  } catch (error) {
    console.error('Error getting access token:', error)
    throw error
  }
}

// Function to get CSRF token
export const getCSRFToken = async accessToken => {
  try {
    const response = await fetch('http://localhost:8088/api/v1/security/csrf_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    const csrfToken = data.result
    console.log('CSRF Token:', csrfToken)
    return csrfToken
  } catch (error) {
    console.error('Error fetching CSRF token:', error)
    throw error
  }
}

// Function to get guest token
export const getGuestToken = async (accessToken, csrfToken) => {
  try {
    // console.log(csrfToken)
    const response = await fetch('http://localhost:8088/api/v1/security/guest_token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({
        resources: [
          {
            type: 'dashboard',
            id: '5834991a-3a22-42c8-82cd-71f7fa3063b6'
          }
        ],
        rls: [],
        user: {
          username: 'guest',
          first_name: 'Guest',
          last_name: 'User'
        }
      })
    })

    const data = await response.json()
    const guestToken = data.guest_token
    return guestToken
  } catch (error) {
    console.error('Error getting guest token:', error)
    throw error
  }
}

export const getSupersetToken = async dashboardId => {
  try {
    const response = await fetch(`http://localhost:3010/api/superset_token?dashboardId=${dashboardId}`, {
      method: 'GET',
      credentials: 'include'
    })
    // if (!response?.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`)
    // }
    console.log(response)
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('Error getting guest token:', error)
    throw error
  }
}
