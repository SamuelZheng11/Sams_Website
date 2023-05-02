import { configureStore } from '@reduxjs/toolkit'
import informationReducer from './slice/LandingPageInformationSlice'
import themeReducer from './slice/LandingPageThemeSlice'
import navigationReducer from './slice/LandingPageNavigationSlice'

const appStore = configureStore({
  reducer: {
    navigation: navigationReducer,
    information: informationReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export default appStore