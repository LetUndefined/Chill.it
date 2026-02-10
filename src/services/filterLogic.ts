import { useMapStore } from '@/stores/MapStore'
import { useSupaStore } from '@/stores/supaBase'
import L from 'leaflet'
import { storeToRefs } from 'pinia'
import { ref, type Ref } from 'vue'

const mapStore = useMapStore()
const { coords, existingMarkers } = storeToRefs(mapStore)

const supaStore = useSupaStore()
const { fetchedData } = storeToRefs(supaStore)

export const distance: Ref<number | string> = ref('All')

export function markersInRange(value: number | string) {
  if (!coords.value.latitude || !coords.value.longitude) return []

  const userLatLng = L.latLng(coords.value.latitude, coords.value.longitude)
  const data = existingMarkers.value ? existingMarkers.value.map((e) => e.data) : fetchedData.value

  return data
    ?.map((e) => {
      const markerLatLng = L.latLng(e.latitude, e.longitude)
      const distance = userLatLng.distanceTo(markerLatLng)
      return { ...e, distance }
    })
    .filter((e) => {
      if (value === 'All') return true
      else return e.distance < Number(value) * 1000
    })
}
