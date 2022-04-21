import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './WebsiteNavigationSlice'

const appStore = configureStore({
  reducer: {
    navigation: navigationReducer
  }
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export default appStore