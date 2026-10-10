import { createSlice } from '@reduxjs/toolkit'
import {
  isPaletteName,
  PaletteName,
  PALETTE_ORDER,
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  Theme,
} from '../theme'

// Define a type for the slice state
export interface ThemeState {
  theme: Theme
  palette: PaletteName
}

// Prefer an explicit user choice, otherwise fall back to the OS preference.
const getInitialTheme = (): Theme => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // localStorage can be unavailable (private mode).
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const getInitialPalette = (): PaletteName => {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY)
    if (isPaletteName(stored)) {
      return stored
    }
  } catch {
    // localStorage can be unavailable (private mode).
  }

  return 'violet'
}

// Define the initial state using that type
const initialState = {
  theme: getInitialTheme(),
  palette: getInitialPalette(),
} as ThemeState

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    },
    cyclePalette: (state) => {
      const index = PALETTE_ORDER.indexOf(state.palette)
      const next = PALETTE_ORDER[(index + 1) % PALETTE_ORDER.length]
      return {
        ...state,
        palette: next,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme, cyclePalette } = ThemeSlice.actions

export default ThemeSlice.reducer
