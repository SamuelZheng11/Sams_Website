import { configureStore } from '@reduxjs/toolkit'
import informationReducer from './slice/WebsiteInformationSlice'
import themeReducer from './slice/WebsiteThemeSlice'
import navigationReducer from './slice/WebsiteNavigationSlice'

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