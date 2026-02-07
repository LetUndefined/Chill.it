import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import L from 'leaflet'
import type { Latlng, GeolocationCoordinates, ExistingMarker } from '@/models/interface'
import { createApp } from 'vue'
import 'leaflet-routing-machine'

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
  const waypoint = ref()
  const currentLocationMarker = ref()

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

      currentLocationMarker.value = L.marker([coords.value.latitude, coords.value.longitude], {
        icon: currentPositionIcon,
      }).addTo(map.value)

      map.value.locate({ watch: true })

      map.value.on('locationfound', (e: L.LocationEvent) => {
        coords.value = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          accuracy: e.accuracy,
          altitude: e.altitude || 0,
          altitudeAccuracy: e.altitudeAccuracy,
          heading: e.heading,
          speed: e.speed,
        }

        currentLocationMarker.value.setLatLng(e.latlng)

        if (waypoint.value) {
          const currentWaypoints = waypoint.value.getWaypoints()
          waypoint.value.setWaypoints([e.latlng, currentWaypoints[1].latLng])
        }
      })
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
      lat: Number(e.lat),
      lng: Number(e.lng),
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
          interactive: false,
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
          latitude: Number(e.latitude),
          longitude: Number(e.longitude),
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
      map.value.closePopup()

      existingMarkers.value = existingMarkers.value?.filter((m) => m.data.id !== id)
      fetchedData.value = fetchedData.value?.filter((d) => d.id !== id) || null
    }
  }

  function createWaypoint(latitude: number, longitude: number) {
    map.value.closePopup()
    if (waypoint.value) {
      console.log(waypoint.value)
      waypoint.value.setWaypoints([
        L.latLng(coords.value.latitude, coords.value.longitude),
        L.latLng(latitude, longitude),
      ])
      return
    }

    waypoint.value = L.Routing.control({
      plan: L.Routing.plan(
        [L.latLng(coords.value.latitude, coords.value.longitude), L.latLng(latitude, longitude)],
        {
          createMarker: () => false,
        },
      ),
      summaryTemplate: `<h2>{name}</h2><h3>{distance}<h3><h3>{time}</h3>`,
    }).addTo(map.value)
  }

  function cancelNavigation() {
    waypoint.value.remove()
    waypoint.value = ''
  }

  return {
    map,
    marker,
    coords,
    callMap,
    setMarker,
    createExistingMarkers,
    deleteExistingMarker,
    createWaypoint,
    waypoint,
    cancelNavigation,
  }
})
