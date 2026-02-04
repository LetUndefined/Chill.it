<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted, ref } from 'vue'
import { useMapStore } from '@/stores/MapStore'
import { storeToRefs } from 'pinia'
import { useSupaStore } from '@/stores/supaBase'
import InputForm from '@/components/InputForm.vue'
import { modalTrigger } from '@/services/ModalTrigger'

const mapStore = useMapStore()
const { map, coords, waypoint } = storeToRefs(mapStore)
const { callMap, setMarker, createExistingMarkers, cancelNavigation } = mapStore

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
      <div class="modal-container" v-if="modalTrigger">
        <InputForm />
      </div>
      <div id="map"></div>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="cancel-navigation-container" v-if="waypoint">
        <button class="cancel" @click="cancelNavigation">Cancel Navigation</button>
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

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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

.cancel-navigation-container {
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 20px;
  display: flex;
  border-radius: 10px;
  padding: 2px;
  animation: slideIn 0.3s ease-in-out;
}

.cancel {
  background-color: rgb(225, 27, 27);
  box-shadow: 0px 0px 10px -2px black;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: #ffffff;
}

@keyframes slideIn {
  0% {
    transform: translateX(200%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
