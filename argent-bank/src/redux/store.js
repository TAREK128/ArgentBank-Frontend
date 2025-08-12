import { configureStore } from '@reduxjs/toolkit' // دالة حديثة 
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
