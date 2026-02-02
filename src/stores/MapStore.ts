import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import L from 'leaflet'
import type {
  Latlng,
  GeolocationCoordinates,
  SupabaseTable,
  ExistingMarker,
} from '@/models/interface'
import { createApp } from 'vue'

import { useSupaStore } from './supaBase'
import { currentPositionIcon, existingPositions } from '@/config/mapIcons'
import { addPosition } from '@/config/mapIcons'
import NewPopupComponent from '@/components/NewPopupComponent.vue'
import ExistingPopupComponent from '@/components/ExistingPopupComponent.vue'

export const useMapStore = defineStore('map', () => {
  const supaStore = useSupaStore()
  const { fetchedData, latLng } = storeToRefs(supaStore)

  const map = ref()
  const marker = ref()
  const existingMarkers: Ref<ExistingMarker[] | undefined> = ref()

  const coords: Ref<GeolocationCoordinates> = ref({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  })

  function callMap() {
    if (coords.value.latitude && coords.value.longitude) {
      map.value = L.map('map').setView([coords.value.latitude, coords.value.longitude], 16)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value)

      L.marker([coords.value.latitude, coords.value.longitude], {
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
    const app = createApp(NewPopupComponent, {
      lat: Number(e.lat.toFixed(2)),
      lng: Number(e.lng.toFixed(2)),
    })

    latLng.value = {
      lat: e.lat,
      lng: e.lng,
    }
    app.mount(container)

    marker.value = L.marker(e, { icon: addPosition }).setLatLng(e).addTo(map.value)

    marker.value.bindPopup(L.popup().setContent(container)).openPopup()
  }

  function createExistingMarkers() {
    if (existingMarkers.value) {
      existingMarkers.value.forEach((m) => {
        map.value.removeLayer(m.marker)
        map.value.removeLayer(m.circle)
      })
    }

    if (fetchedData.value) {
      existingMarkers.value = fetchedData.value?.map((e) => {
        const marker = L.marker([e.latitude, e.longitude], {
          icon: existingPositions,
          interactive: false
        }).addTo(map.value)

        const circle = L.circle([e.latitude, e.longitude], {
          color: 'gray',
          fillColor: '#cccccc',
          fillOpacity: 0.3,
          radius: 100,
        }).addTo(map.value)

        const container = document.createElement('div')
        const app = createApp(ExistingPopupComponent, {
          id: e.id,
          title: e.title,
          chill_level: e.chill_level,
          description: e.description,
          visiting: e.visiting,
          vibe: e.vibe,
          accessibility: e.accessibility,
          imageUrl: e.image_url,
          latitude: Number(e.latitude.toFixed(2)),
          longitude: Number(e.longitude.toFixed(2)),
        })

        app.mount(container)
        circle.bindPopup(container)

        setTimeout(() => {
          circle.setStyle({
            color: 'blue',
            fillColor: '#448be8',
          })
        }, 100)

        return { marker, circle, data: e }
      })
    }
  }

  function deleteExistingMarker(id: string) {
    const markerObj = existingMarkers.value?.find((m) => m.data.id === id)

    if (markerObj) {
      map.value.removeLayer(markerObj.marker)
      map.value.removeLayer(markerObj.circle)

      existingMarkers.value = existingMarkers.value?.filter((m) => m.data.id !== id)
      fetchedData.value = fetchedData.value?.filter((d) => d.id !== id) || null
    }
  }

  return {
    map,
    marker,
    coords,
    callMap,
    setMarker,
    createExistingMarkers,
    deleteExistingMarker,
  }
})
