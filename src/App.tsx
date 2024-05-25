import React, { createRef, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'
import './variables.scss'
import './material-overrides.scss'
import LandingPage from './landing/LandingPage'
import { Provider } from 'react-redux'
import SettlementCalculator from './settlement-calculator/SettlementCalculator'
import { ThemeProvider } from './Theme/theme'
import { useAppSelector } from './hooks'
import appStore from './AppStore'

export function App() {
  const theme = useAppSelector((state) => state.theme.theme)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/settlements" element={<SettlementCalculator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
