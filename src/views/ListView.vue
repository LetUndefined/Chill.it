<script setup lang="ts">
import LocationCard from '@/components/LocationCard.vue'
import { useMapStore } from '@/stores/MapStore'
import { useSupaStore } from '@/stores/supaBase'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { getCurrentPosition } from '@/services/geolocation'
const supaStore = useSupaStore()
const { fetchedData } = storeToRefs(supaStore)
const { fetchData } = supaStore

const mapStore = useMapStore()
const { markersInRange } = mapStore
const { coords } = storeToRefs(mapStore)

onMounted(async () => {
  try {
    if (!coords.value.latitude || !coords.value.longitude) {
      coords.value = await getCurrentPosition()
    }
    if (!fetchedData.value) {
      await fetchData()
    }
  } catch (error) {
    console.error(`Geolocation error: ${error}`)
  }
})

const markers = computed(() => {
  return markersInRange()
})
</script>

<template>
  <div class="container">
    <div class="title">
      <h1>Locations Near <span>You</span></h1>
      <p>Find beautiful locations near you, swipe through the options below!</p>
    </div>
    <div class="card-container">
      <v-carousel v-if="fetchedData && fetchedData.length > 0" hide-delimiters height="600">
        <v-carousel-item v-for="location in markers" :key="location.id">
          <LocationCard
            :title="location.title"
            :chill_level="location.chill_level"
            :image-url="location.image_url"
            :vibe="location.vibe"
            :visiting="location.visiting"
            :description="location.description"
            :accessibility="location.accessibility"
            :longitude="location.longitude"
            :latitude="location.latitude"
            :distance="location.distance"
          />
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--gradient-bg);
}

.title {
  display: flex;
  align-items: center;
  margin: 6rem 0 0 0;
  justify-content: center;
  flex-direction: column;
}

.title h1 {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0;
  color: var(--primary-color);
  position: relative;
  padding-bottom: 0.5rem;
}

.title span {
  border-bottom: 1px solid;
}

.title p {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(96, 92, 92, 0.795);
  margin: 0.5rem 0 0 0;
  letter-spacing: 0.02em;
  text-align: center;
  max-width: 350px;
}

.card-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0rem 0 2rem 0;
}

:deep(.v-btn--icon) {
  background-color: rgba(85, 133, 181, 0.4);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

:deep(.v-carousel) {
  border-radius: 20px;
  overflow: hidden;
}

:deep(.v-responsive__content) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
