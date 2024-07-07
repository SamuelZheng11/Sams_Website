import { createRef, useEffect } from 'react'

import './theme.scss'

type Props = {
  children: React.ReactNode
  theme: 'light' | 'dark'
}

export type Theme = 'light' | 'dark'

export function ThemeProvider({ children, theme }: Props) {
  const [themeRef] = [createRef<HTMLDivElement>()]

  useEffect(() => {
    theme === 'light'
      ? themeRef.current?.classList.remove('is_inverted')
      : themeRef.current?.classList.add('is_inverted')
  }, [theme, themeRef])

  return (
    <div className="theme" ref={themeRef}>
      {children}
    </div>
  )
}
