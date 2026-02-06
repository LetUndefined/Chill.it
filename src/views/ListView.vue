<script setup lang="ts">
import LocationCard from '@/components/LocationCard.vue'
import { useSupaStore } from '@/stores/supaBase'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const supaStore = useSupaStore()
const { fetchedData } = storeToRefs(supaStore)
const { fetchData } = supaStore

onMounted(async () => {
  if (!fetchedData.value) await fetchData()
  console.log(fetchedData.value)
})
</script>

<template>
  <div class="container">
    <div class="title">
      <h1>Locations near you</h1>
    </div>
    <div class="card-container">
      <LocationCard
        v-for="(location, index) in fetchedData"
        :key="index"
        :title="location.title"
        :chill_level="location.chill_level"
        :image-url="location.image_url"
        :vibe="location.vibe"
        :visiting="location.visiting"
        :description="location.description"
        :accessibility="location.accessibility"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  height: 100vh;
}

.card-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
