import L from 'leaflet'
import currentLocationIcon from '@/assets/icons/current_location.svg'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import addLocation from '@/assets/icons/add_location.svg'
import activeLocation from '@/assets/icons/active_location.svg'

export const currentPositionIcon = L.icon({
  iconUrl: currentLocationIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
  className: 'current-position',
})

export const addPosition = L.icon({
  iconUrl: addLocation,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  className: 'marker',
})

export const existingPositions = L.icon({
  iconUrl: activeLocation,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  className: 'marker',
})
