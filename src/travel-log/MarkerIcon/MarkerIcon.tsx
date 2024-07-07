import { Icon } from 'leaflet'

import MarkerX2 from 'leaflet/dist/images/marker-icon-2x.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'

import 'leaflet/dist/leaflet.css'
import './MarkerIcon.scss'

export const MarkerIcon = new Icon({
  iconUrl: MarkerX2,
  shadowUrl: MarkerShadow,
  className: 'marker-icon',
})
