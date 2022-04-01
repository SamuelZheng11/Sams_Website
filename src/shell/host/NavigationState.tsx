import { createSlice } from '@reduxjs/toolkit'

export const NavigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    view: 'home'
  },
  reducers: {
    scrollTo: state => {
      state.view = 'home'
    },
  }
})

// Action creators are generated for each case reducer function
export const { scrollTo } = NavigationSlice.actions

export default NavigationSlice.reducer