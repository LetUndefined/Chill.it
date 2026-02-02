<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted, ref } from 'vue'
import { useMapStore } from '@/stores/MapStore'
import { storeToRefs } from 'pinia'
import { useSupaStore } from '@/stores/supaBase'
import InputForm from '@/components/InputForm.vue'

const mapStore = useMapStore()
const { map, coords } = storeToRefs(mapStore)
const { callMap, setMarker, createExistingMarkers } = mapStore

const supaStore = useSupaStore()
const { fetchData } = supaStore

const loading = ref(true)

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
      loading.value = false
    },
    (error) => {
      alert(`Geolocation error: ${error.message}, Turn on Location in your settings`)
      loading.value = false
    },
  )
})
</script>

<template>
  <div class="home">
    <HeaderComponent />
    <main>
      <InputForm />
      <div id="map"></div>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
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
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
