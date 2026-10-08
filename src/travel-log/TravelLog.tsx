import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import './TravelLog.scss'

import { MarkerIcon } from './MarkerIcon/MarkerIcon'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useEffect } from 'react'
import { useLoadTravelLogs } from './hooks'
import { ThemeSwitch } from '../landing/header/assets/HeaderThemeSwitchComponent'
import { toggleTheme } from '../theme/slice/ThemeSlice'

const THEME_LABEL_ID = 'travel-theme-label'

export function TravelLog() {
  const { loadTravelLogs } = useLoadTravelLogs()
  const intro = useAppSelector((state) => state.travelLog.intro)
  const markers = useAppSelector((state) => state.travelLog.markers)
  const isDarkTheme =
    useAppSelector((state) => state.theme.theme) === 'dark'
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadTravelLogs()
  }, [])

  return (
    <div className="travel-log">
      <div className="travel-topbar">
        <Link className="travel-back-link" to="/">
          ← Back to home
        </Link>

        <span className="travel-theme-toggle">
          <span id={THEME_LABEL_ID}>Dark mode</span>
          <ThemeSwitch
            checked={isDarkTheme}
            onChange={() => dispatch(toggleTheme())}
            inputProps={{
              'aria-label': 'Toggle between dark and light mode',
              'aria-labelledby': THEME_LABEL_ID,
            }}
          />
        </span>
      </div>
      <header className="travel-header">
        <h1>My Global Adventures</h1>
        <p>{intro}</p>
      </header>
      <div
        className="travel-map-container"
        role="region"
        aria-label="Map of the countries and cities I have travelled to"
      >
        <MapContainer
          className="travel-map"
          center={[0, 0]}
          zoom={3}
          maxBounds={[
            [-90, -190],
            [90, 210],
          ]}
        >
          <TileLayer
            minZoom={3}
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers?.map((m) => (
            <Marker key={m.id} position={m.position} icon={MarkerIcon}>
              <Popup className="popup">
                <div>
                  <h3>{m.name}</h3>
                  <span>{m.description}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}