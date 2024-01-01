import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from 'src/configs/endpoint'

// ** Axios Imports
import axios from 'axios'
import axiosInstance from 'src/configs/axiosInstance'

// Function to get JWT access token
export const getAccessToken = async () => {
  try {
    const response = await fetch('http://192.168.100.70:8088/api/v1/security/login', {
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

// Function to get guest token
export const getGuestToken = async accessToken => {
  try {
    const response = await fetch('http://192.168.100.70:8088/api/v1/security/guest_token/', {
      method: 'POST', // Change the method to POST
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user: {
          username: 'admin',
          first_name: 'Superset',
          last_name: 'Admin'
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
