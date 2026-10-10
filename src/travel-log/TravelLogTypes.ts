import { LatLngExpression } from 'leaflet'

export type ITravelLog = {
  intro: string
  travelMarkers: ITravelMarker[]
}

export type ITravelMarker = {
  position: LatLngExpression
  id: string
  name: string
  description: string
}
