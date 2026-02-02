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

export interface SupabaseTable {
  id: string
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  image_url: string
  latitude: number
  longitude: number
}

export interface ExistingMarker {
  marker: L.Marker
  circle: L.Circle
  data: SupabaseTable
}
