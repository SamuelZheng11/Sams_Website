import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LandingPages } from '../LandingPageTypes'

// Define a type for the slice state
export interface NavigationState {
  view: LandingPages
}

// Define the initial state using that type
const initialState = {
  view: LandingPages.home,
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
  },
})

// Action creators are generated for each case reducer function
export const { scrollTo } = NavigationSlice.actions

export default NavigationSlice.reducer
