import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './AppNavigationSlice'

const navStore = configureStore({
  reducer: {
    navigation: navigationReducer
  }
})

export type RootState = ReturnType<typeof navStore.getState>
export type AppDispatch = typeof navStore.dispatch

export default navStore