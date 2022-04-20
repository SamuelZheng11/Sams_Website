import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EWebsitePages } from '../WebsiteTypes'

// Define a type for the slice state
export interface NavigationState {
  view: EWebsitePages
}

// Define the initial state using that type
const initialState = {
  view: EWebsitePages.home,
  theme: 'light',
} as NavigationState

export const NavigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    scrollTo: (state, action: PayloadAction<EWebsitePages>) => {
      return {
        ...state,
        view: action.payload,
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  scrollTo,
} = NavigationSlice.actions

export default NavigationSlice.reducer