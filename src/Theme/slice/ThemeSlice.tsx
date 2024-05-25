import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '../theme'

// Define a type for the slice state
export interface ThemeState {
  theme: Theme
}

// Define the initial state using that type
const initialState = {
  theme: window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark',
} as ThemeState

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {
        ...state,
        // Direct setting via strings are fine here as Type 'Theme' is defined by a type
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer
