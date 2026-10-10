import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/slice/ThemeSlice'
import informationReducer from './landing/slice/LandingPageInformationSlice'
import navigationReducer from './landing/slice/LandingPageNavigationSlice'
import settlementReducer from './settlement-calculator/slice/SettlementSlice'
import travelLogReducer from './travel-log/slice/TravelLogSlice'

const appStore = configureStore({
  reducer: {
    theme: themeReducer,
    settlement: settlementReducer,
    navigation: navigationReducer,
    information: informationReducer,
    travelLog: travelLogReducer,
  },
})

export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export default appStore
