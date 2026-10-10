import { useEffect, useMemo } from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

import './theme.scss'

export type Theme = 'light' | 'dark'

export type PaletteName = 'violet' | 'ember' | 'volt' | 'amber' | 'sky' | 'mint'

type Props = {
  children: React.ReactNode
  theme: Theme
  palette: PaletteName
}

export const THEME_STORAGE_KEY = 'theme'
export const PALETTE_STORAGE_KEY = 'p'

const fontBody =
  "'Familjen Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
const fontDisplay =
  "'Familjen Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
const fontSerif = "'Instrument Serif', Georgia, 'Times New Roman', serif"
const fontMono =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace"

// Accent palettes. Mirrors the tokens emitted by colors.scss
// (`@mixin accent-palettes`); MUI's theme factory needs concrete values, so the
// two are kept in sync intentionally. `ink` is the readable colour on top of
// the accent (hero / contact blocks, active nav pills).
export const PALETTES: Record<
  PaletteName,
  { accent: string; accentHover: string; ink: string; label: string }
> = {
  violet: {
    accent: '#6e56ff',
    accentHover: '#5a43e8',
    ink: '#ffffff',
    label: 'Violet',
  },
  ember: {
    accent: '#ff5a47',
    accentHover: '#e84633',
    ink: '#140806',
    label: 'Ember',
  },
  volt: {
    accent: '#c6f432',
    accentHover: '#b4e01c',
    ink: '#0b0d06',
    label: 'Volt',
  },
  amber: {
    accent: '#ffb81c',
    accentHover: '#e8a400',
    ink: '#1a1200',
    label: 'Amber',
  },
  sky: {
    accent: '#38bdf8',
    accentHover: '#1fa9e6',
    ink: '#04141f',
    label: 'Sky',
  },
  mint: {
    accent: '#2ee6a6',
    accentHover: '#17ce8e',
    ink: '#04120c',
    label: 'Mint',
  },
}

export const PALETTE_ORDER: PaletteName[] = [
  'violet',
  'ember',
  'volt',
  'amber',
  'sky',
  'mint',
]

export const isPaletteName = (value: string | null): value is PaletteName =>
  value !== null && PALETTE_ORDER.includes(value as PaletteName)

// Mirrors the tokens in src/colors.scss. MUI's theme factory needs concrete
// values, so the palettes are duplicated here intentionally - update both.
const modes = {
  light: {
    bg: '#faf9f6',
    surface: '#ffffff',
    text: '#15171a',
    textMuted: '#5f6570',
    divider: 'rgba(0, 0, 0, 0.12)',
    border: '#e4e1d9',
  },
  dark: {
    bg: '#0e1013',
    surface: '#161a1f',
    text: '#e9ebee',
    textMuted: '#9ba3ae',
    divider: 'rgba(255, 255, 255, 0.12)',
    border: '#262c34',
  },
} as const

export { fontBody, fontDisplay, fontSerif, fontMono }

export function ThemeProvider({ children, theme, palette }: Props) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-p', palette)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
      window.localStorage.setItem(PALETTE_STORAGE_KEY, palette)
    } catch {
      // localStorage can be unavailable (private mode); the theme still applies.
    }
  }, [theme, palette])

  const muiTheme = useMemo(() => {
    const c = modes[theme]
    const accent = PALETTES[palette]

    return createTheme({
      palette: {
        mode: theme,
        primary: {
          main: accent.accent,
          dark: accent.accentHover,
          contrastText: accent.ink,
        },
        background: { default: c.bg, paper: c.surface },
        text: { primary: c.text, secondary: c.textMuted },
        divider: c.divider,
      },
      shape: { borderRadius: 8 },
      breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      },
      typography: {
        fontFamily: fontBody,
        // Fluid sizes keep headings readable on phones without overflowing.
        h1: {
          fontFamily: fontDisplay,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          fontSize: 'clamp(2.5rem, 8vw, 4.75rem)',
          lineHeight: 1.05,
        },
        h2: {
          fontFamily: fontDisplay,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(1.75rem, 1.25rem + 2vw, 2.5rem)',
          lineHeight: 1.15,
        },
        h3: {
          fontFamily: fontDisplay,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          fontSize: 'clamp(1.25rem, 1rem + 1.5vw, 1.75rem)',
          lineHeight: 1.3,
        },
        h4: {
          fontFamily: fontDisplay,
          fontWeight: 700,
          fontSize: 'clamp(1.125rem, 1rem + 1vw, 1.375rem)',
          lineHeight: 1.3,
        },
        h5: {
          fontFamily: fontDisplay,
          fontWeight: 600,
          fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
          lineHeight: 1.3,
        },
        h6: { fontFamily: fontDisplay, fontWeight: 600, fontSize: '1rem' },
        button: { textTransform: 'none', fontWeight: 600 },
      },
      components: {
        MuiAppBar: {
          defaultProps: { color: 'transparent', elevation: 0 },
          styleOverrides: {
            root: {
              color: c.text,
              backgroundColor: c.bg,
              backgroundImage: 'none',
              boxShadow: 'none',
              borderBottom: `1px solid ${c.border}`,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
      },
    })
  }, [theme, palette])

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}
