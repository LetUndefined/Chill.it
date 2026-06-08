<script setup lang="ts">
import LocationCard from '@/components/LocationCard.vue'
import { useMapStore } from '@/stores/MapStore'
import { useSupaStore } from '@/stores/supaBase'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { getCurrentPosition } from '@/services/geolocation'
import { markersInRange } from '@/services/filterLogic'
import { distance } from '@/services/filterLogic'

const supaStore = useSupaStore()
const { fetchedData } = storeToRefs(supaStore)
const { fetchData } = supaStore

const mapStore = useMapStore()
const { coords } = storeToRefs(mapStore)

onMounted(async () => {
  try {
    if (!coords.value.latitude || !coords.value.longitude) {
      coords.value = await getCurrentPosition()
    }
  } catch (error) {
    console.error(`Geolocation error: ${error}`)
  }

  fetchData()
})

const markers = computed(() => {
  return markersInRange(distance.value)
})
</script>

<template>
  <div class="container">
    <section class="title">
      <h1>Locations Near <span>You</span></h1>
      <p>Find beautiful locations near you, swipe through the options below!</p>
    </section>
    <section class="filters">
      <div class="distance">
        <v-select
          label="Distance"
          :items="['All', 5, 10, 15, 20, 25]"
          variant="solo"
          v-model="distance"
        ></v-select>
      </div>
    </section>
    <section class="card-container">
      <v-carousel v-if="fetchedData && fetchedData.length > 0" hide-delimiters height="100%">
        <v-carousel-item v-for="(location, index) in markers" :key="index">
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
            :id="location.id"
          />
        </v-carousel-item>
      </v-carousel>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0a0a0a;
  overflow-y: auto;
  padding-bottom: 0;
}

.title {
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem 1rem;
  justify-content: center;
  flex-direction: column;
  background-color: #111;
  border-bottom: 1px solid #222;
}

.title h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--white);
  padding-bottom: 0;
}

.title span {
  border-bottom: none;
}

.title p {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.5rem 0 0 0;
  text-align: center;
  max-width: 300px;
}

.filters {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #0a0a0a;
}

.distance {
  display: flex;
  width: 100%;
}

:deep(.v-field) {
  border: 1px solid #222;
  border-radius: 8px;
  background-color: #111;
  color: var(--white);
  font-size: 0.938rem;
}

:deep(.v-field__input) {
  color: var(--white);
}

:deep(.v-label) {
  color: rgba(255, 255, 255, 0.6);
}

.card-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0;
}

:deep(.v-btn--icon) {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
}

:deep(.v-btn--icon:active) {
  background-color: rgba(255, 255, 255, 0.2);
}

:deep(.card-content) {
  padding: 1rem 1rem 0 1rem;
}

:deep(.v-responsive__content) {
  display: flex;
  justify-content: center;
  padding: 0 1rem 1rem;
}

:deep(.v-carousel) {
  width: 100%;
}

:deep(.v-carousel-item) {
  width: 100%;
}
</style>
