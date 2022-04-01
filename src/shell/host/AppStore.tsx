import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './NavigationState'

export default configureStore({
  reducer: {
    navigation: navigationReducer
  }
})