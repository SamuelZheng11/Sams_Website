import { useEffect } from 'react'

import './theme.scss'

type Props = {
  children: React.ReactNode
  theme: 'light' | 'dark'
}

export type Theme = 'light' | 'dark'

export function ThemeProvider({ children, theme }: Props) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}