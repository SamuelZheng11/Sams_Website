import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hello/theme'
import LandingPage from './landing/LandingPage'
import SettlementCalculator from './settlement-calculator/SettlementCalculator'
import { useAppSelector } from './hooks'
import { TravelLog } from './travel-log/TravelLog'

export function App() {
  const theme = useAppSelector((state) => state.theme.theme)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/settlements" element={<SettlementCalculator />} />
          <Route path="/travels" element={<TravelLog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
