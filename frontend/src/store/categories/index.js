import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from 'src/configs/endpoint'
import { accessToken } from 'src/configs/endpoint'
import axiosInstance from 'src/configs/axiosInstance'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Countries
export const fetchData = createAsyncThunk('category/fetchData', async params => {
  const response = await axiosInstance.get(`${API_URL.url}/api/categories`, {
    params

    // headers: {
    //   Authorization: `Bearer ${accessToken}`
    // }
  })

  return response.data
})

// ** Add Category
export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL.url}/api/categories`, data.data)

      return response
    } catch (error) {
      if (error.response) {
        // If the error response is received, return the error message
        return rejectWithValue(error.response.data.error)
      } else {
        // If there is a network or other error, throw an error with a generic message
        throw new Error('An error occurred while adding the category.')
      }
    } finally {
      dispatch(fetchData(getState().categories.params))
    }
  }
)

// ** Edit Category

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async (data, { getState, dispatch, rejectWithValue }) => {
    const { id, ...categoryData } = data

    try {
      const response = await axiosInstance.patch(`${API_URL.url}/api/categories/${id}`, categoryData?.data)

      return response
    } catch (error) {
      if (error.response) {
        // If the error response is received, return the error message
        return rejectWithValue(error.response.data.error)
      } else {
        // If there is a network or other error, throw an error with a generic message
        throw new Error('An error occurred while editing the category.')
      }
    } finally {
      dispatch(fetchData(getState().categories.params))
    }
  }
)

// ** Delete Category

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (data, { getState, dispatch }) => {
  const { id } = data

  const response = await axiosInstance.delete(`${API_URL.url}/api/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  dispatch(fetchData(getState().categories.params))

  return response
})

export const categorySlice = createSlice({
  name: 'category',
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
    selectCategory: (state, action) => {
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
      state.data = action.payload?.categories
      state.total = action.payload?.totalCategories
      state.params = action.payload.params
    })
    builder
      .addCase(fetchData.pending, state => {
        state.apiPending = true
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
      .addCase(addCategory.rejected, (state, action) => {
        // Handle the error and update state accordingly
        state.apiPending = false
        state.params = {}
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
      .addCase(editCategory.rejected, (state, action) => {
        // Handle the error and update state accordingly
        state.apiPending = false
        state.params = {}
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        // Update state as needed
        state.apiPending = false
        state.params = {}
      })
  }
})

export const { selectCategory } = categorySlice.actions

export default categorySlice.reducer
