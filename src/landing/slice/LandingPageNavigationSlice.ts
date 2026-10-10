import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LandingPages } from '../LandingPageTypes'

// Define a type for the slice state
export interface NavigationState {
  // The section we intend to be viewing (set when a nav item is clicked)
  view: LandingPages
  // The section currently in view (kept in sync by the scrollspy)
  activeView: LandingPages
}

// Define the initial state using that type
const initialState = {
  view: LandingPages.home,
  activeView: LandingPages.home,
} as NavigationState

export const NavigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    scrollTo: (state, action: PayloadAction<LandingPages>) => {
      return {
        ...state,
        view: action.payload,
      }
    },
    setActiveView: (state, action: PayloadAction<LandingPages>) => {
      return {
        ...state,
        activeView: action.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { scrollTo, setActiveView } = NavigationSlice.actions

export default NavigationSlice.reducer
