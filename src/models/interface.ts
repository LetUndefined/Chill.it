export interface GeolocationPosition {
  coords: GeolocationCoordinates
  timestamp: number
}

export interface GeolocationCoordinates {
  latitude: number
  longitude: number
  altitude: number | null
  accuracy: number
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
}

export interface Latlng {
  lat: number
  lng: number
}
