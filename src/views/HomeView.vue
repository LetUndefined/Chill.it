<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/MapStore'
import { storeToRefs } from 'pinia'
import { useSupaStore } from '@/stores/supaBase'

const mapStore = useMapStore()
const { map, coords } = storeToRefs(mapStore)
const { callMap, setMarker, createExistingMarkers } = mapStore

const supaStore = useSupaStore()
const { fetchData } = supaStore

onMounted(async () => {
  navigator.geolocation.getCurrentPosition(
    async (pos: GeolocationPosition) => {
      coords.value = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        altitudeAccuracy: pos.coords.altitudeAccuracy,
        heading: pos.coords.heading,
        speed: pos.coords.speed,
      }

      callMap()
      map.value.on('click', (e: L.LeafletMouseEvent) => setMarker(e.latlng))
      await fetchData()
      createExistingMarkers()
    },
    (error) => {
      alert(`Geolocation error: ${error.message}, Turn on Location in your settings`)
    },
  )
})
</script>

<template>
  <div class="home">
    <HeaderComponent />
    <main>
      <div id="map"></div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  margin-top: 60px;
  margin-bottom: 50px;
  flex: 1;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
