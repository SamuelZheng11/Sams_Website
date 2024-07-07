import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import './TravelLog.scss'

import { MarkerIcon } from './MarkerIcon/MarkerIcon'
import { useAppSelector } from '../hooks'
import { useEffect } from 'react'
import { useLoadTravelLogs } from './hooks'

export function TravelLog() {
  const { loadTravelLogs } = useLoadTravelLogs()
  const intro = useAppSelector((state) => state.travelLog.intro)
  const markers = useAppSelector((state) => state.travelLog.markers)

  useEffect(() => {
    loadTravelLogs()
  }, [])

  return (
    <div className="travel-log">
      <div className="travel-header">
        <h2>My Global Adventures</h2>
        <span>{intro}</span>
      </div>
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
  )
}
