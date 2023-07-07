import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from 'src/configs/endpoint'

// ** Axios Imports

export const signup = async email => {
  try {
    const response = await axios.post(`${API_URL.url}/api/auth/signup`, {
      email: email
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}
