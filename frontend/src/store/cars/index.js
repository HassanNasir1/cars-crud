import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from 'src/configs/endpoint'

// ** Axios Imports
import axios from 'axios'
import axiosInstance from 'src/configs/axiosInstance'

export const getCarsCount = async () => {
  try {
    const response = await axios.get(`${API_URL.url}/api/cars/count`)
    const totalCars = response.data.totalCars

    return totalCars

    // Do something with the totalCars count
  } catch (error) {
    console.error('Error retrieving total car count:', error)

    // Handle the error
    throw error
  }
}

export const fetchDropdownCategories = async () => {
  try {
    const response = await axios.get(`${API_URL.url}/api/categories/dropdown`)
    console.log(response)

    return response

    // Do something with the totalCars count
  } catch (error) {
    console.error('Error retrieving total categories:', error)

    // Handle the error
    throw error
  }
}

// ** Fetch Countries
export const fetchData = createAsyncThunk('car/fetchData', async params => {
  const response = await axiosInstance.get(`${API_URL.url}/api/cars`, {
    params
  })

  return response.data
})

// ** Add Category
export const addCar = createAsyncThunk('car/addCar', async (data, { getState, dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${API_URL.url}/api/cars`, data.data)
    dispatch(fetchData(getState().cars.params))

    return response
  } catch (error) {
    if (error.response) {
      // If the error response is received, return the error message
      return rejectWithValue(error.response.data.error)
    } else {
      // If there is a network or other error, throw an error with a generic message
      throw new Error('An error occurred while adding the category.')
    }
  }
})

// ** Edit Category

export const editCar = createAsyncThunk('car/editCar', async (data, { getState, dispatch, rejectWithValue }) => {
  const { id, ...carData } = data

  try {
    const response = await axiosInstance.patch(`${API_URL.url}/api/cars/${id}`, carData?.data)
    dispatch(fetchData(getState().cars.params))

    return response
  } catch (error) {
    if (error.response) {
      // If the error response is received, return the error message
      return rejectWithValue(error.response.data.error)
    } else {
      // If there is a network or other error, throw an error with a generic message
      throw new Error('An error occurred while editing the category.')
    }
  }
})

// ** Delete Category

export const deleteCar = createAsyncThunk('car/deleteCar', async (data, { getState, dispatch }) => {
  const { id } = data

  const response = await axiosInstance.delete(`${API_URL.url}/api/cars/${id}`, {})

  dispatch(fetchData(getState().cars.params))

  return response
})

export const carSlice = createSlice({
  name: 'car',
  initialState: {
    data: [],
    total: 1,
    params: {
      sortBy: '',
      sortOrder: '',
      page: '',
      limit: ''
    },
    apiPending: false
  },

  reducers: {
    selectCar: (state, action) => {
      if (action.payload === null) {
        state.selected = null
      } else {
        state.selected = action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.apiPending = false
      state.data = action.payload?.cars
      state.total = action.payload?.totalCars
      state.params = action.payload.params
    })
    builder
      .addCase(fetchData.pending, state => {
        state.apiPending = true
      })
      .addCase(addCar.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
      .addCase(addCar.rejected, (state, action) => {
        // Handle the error and update state accordingly
        state.apiPending = false
        state.params = {}
      })
      .addCase(editCar.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
      .addCase(editCar.rejected, (state, action) => {
        // Handle the error and update state accordingly
        state.apiPending = false
        state.params = {}
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
  }
})

export const { selectCar } = carSlice.actions

export default carSlice.reducer
