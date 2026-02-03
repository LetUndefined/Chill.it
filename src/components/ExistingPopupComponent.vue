<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore'
import { useSupaStore } from '@/stores/supaBase'

const supaStore = useSupaStore()
const { deleteData } = supaStore

const mapStore = useMapStore()
const { deleteExistingMarker, createWaypoint } = mapStore

const props = defineProps<{
  id: string
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  imageUrl: string
  latitude: number
  longitude: number
}>()

async function removeMarker() {
  await deleteData(props.id)
  deleteExistingMarker(props.id)
}

const createRoute = () => {
  createWaypoint(props.latitude, props.longitude)
}
</script>

<template>
  <div>
    <h3>{{ props.title }}</h3>
    <img :src="props.imageUrl" alt="Location image" />
    <p>Chill Level: {{ props.chill_level }}</p>
    <p>{{ props.description }}</p>
    <p>Coordinates:</p>
    <p>{{ props.latitude }}, {{ props.longitude }}</p>
    <div class="buttons">
      <button class="delete" @click="removeMarker">Delete</button>
      <button class="route" @click="createRoute">Navigate</button>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 200px;
  height: 100%;
  border-radius: 10px;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.delete {
  background-color: rgb(255, 0, 0);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -2px black;
}
.route {
  background-color: rgb(0, 68, 255);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -2px black;
}
</style>
