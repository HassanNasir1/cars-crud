// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

import categories from './categories'
import cars from './cars'

export const store = configureStore({
  reducer: {
    categories,
    cars
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
