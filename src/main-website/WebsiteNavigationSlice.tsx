import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface NavigationState {
  view: string
}

// Define the initial state using that type
const initialState = {
  view: 'home'
} as NavigationState

export const NavigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    scrollTo: (state, action: PayloadAction<string>) => {
      console.log(`Setting appstate view to: ${action.payload}`);
      return {
        ...state,
        view: action.payload,
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { scrollTo } = NavigationSlice.actions

export default NavigationSlice.reducer