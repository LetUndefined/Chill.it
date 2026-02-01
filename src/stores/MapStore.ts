import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import L from 'leaflet'
import type { Latlng, GeolocationCoordinates } from '@/models/interface'
import { createApp } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import { useSupaStore } from './supaBase'
import { currentPositionIcon, existingPositions } from '@/config/mapIcons'
import { addPosition } from '@/config/mapIcons'

export const useMapStore = defineStore('map', () => {
  const supaStore = useSupaStore()
  const { fetchedData, latLng } = storeToRefs(supaStore)

  const map = ref()
  const marker = ref()
  const popup = ref()
  const currentPosition = ref()
  const existingMarkers = ref()
  const coords: Ref<GeolocationCoordinates> = ref({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  })

  const locationPopup = ref()

  function callMap() {
    if (coords.value.latitude && coords.value.longitude) {
      map.value = L.map('map').setView([coords.value.latitude, coords.value.longitude], 16)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value)

      currentPosition.value = L.marker([coords.value.latitude, coords.value.longitude], {
        icon: currentPositionIcon,
      }).addTo(map.value)
    } else {
      console.log('Failed to load map')
    }
  }

  function setMarker(e: Latlng) {
    if (marker.value) {
      map.value.removeLayer(marker.value)
    }

    const container = document.createElement('div')
    const app = createApp(PopupComponent, {
      lat: Number(e.lat.toFixed(2)),
      lng: Number(e.lng.toFixed(2)),
    })

    latLng.value = {
      lat: e.lat,
      lng: e.lng,
    }
    app.mount(container)

    marker.value = L.marker(e, { icon: addPosition }).setLatLng(e).addTo(map.value)

    locationPopup.value = L.popup().setContent(container)
    marker.value.bindPopup(locationPopup.value).openPopup()
  }

  function createExistingMarkers() {
    if (fetchedData.value) {
      existingMarkers.value = fetchedData.value?.map((e) => {
        L.marker([e.latitude, e.longitude], { icon: existingPositions }).addTo(map.value)
      })
    }
  }

  return { map, marker, popup, coords, callMap, setMarker, createExistingMarkers }
})
