import { combineReducers } from '@reduxjs/toolkit'
import informationReducer from './landing/slice/LandingPageInformationSlice'
import navigationReducer from './landing/slice/LandingPageNavigationSlice'
import themeReducer from './Theme/slice/ThemeSlice'
import settlementReducer from './settlement-calculator/slice/SettlementSlice'

const appReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  navigation: navigationReducer,
  information: informationReducer,
  theme: themeReducer,
  settlement: settlementReducer,
})

export default appReducer
