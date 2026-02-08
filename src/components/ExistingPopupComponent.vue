<script setup lang="ts">
import { Circle, Clock, Sparkle, PersonStanding } from 'lucide-vue-next'
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
  <div class="custom-card">
    <img height="200px" width="250px" :src="props.imageUrl" />

    <div class="card-content">
      <div class="chip">
        <div class="chip-content">
          <h4>Chill</h4>
          <Circle
            v-for="n in 5"
            :key="n"
            :fill="n <= props.chill_level ? 'var(--purple)' : 'none'"
            :size="12"
          />
        </div>
      </div>
      <div class="text">
        <div class="title">
          <h3>{{ props.title }}</h3>
        </div>

        <div class="description">
          <p>{{ props.description }}</p>
        </div>
      </div>
      <div class="information">
        <div class="information-content">
          <Clock color="var(--secondary-color)" />
          <div class="text">
            <h4>Visiting time</h4>
            <p>{{ props.visiting }}</p>
          </div>
        </div>
        <div class="information-content">
          <Sparkle color="var(--purple)" />
          <div class="text">
            <h4>Vibe</h4>
            <p>{{ props.vibe }}</p>
          </div>
        </div>
        <div class="information-content">
          <PersonStanding color="var(--green)" />
          <div class="text">
            <h4>Accessibility</h4>
            <p>{{ props.accessibility }}</p>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="delete" @click="removeMarker">Delete</button>
        <button class="navigate" @click="createRoute">Navigate</button>
      </div>
    </div>
  </div>
</template>

<style>
.leaflet-popup-content-wrapper {
  background: rgba(218, 216, 216, 0.8) !important;
  backdrop-filter: blur(10px);
}

.leaflet-popup-tip {
  display: none !important;
}

.leaflet-popup-content-wrapper img {
  border-radius: 20px;
  margin-bottom: 1rem;
}
</style>

<style scoped>
.custom-card {
  position: relative;
  border-radius: 20px;
}

.text .title,
.description {
  margin-bottom: 1rem;
}

.information-content {
  display: flex;
  gap: 1rem;
}

.information-content p {
  margin: 0;
  margin-bottom: 0.5rem;
}

.chip-content {
  display: flex;
  align-items: center;
  background: rgb(218, 216, 216) !important;
  border-radius: 20px;
  position: absolute;
  padding: 0.25rem 0.5rem;
  top: 20px;
  right: 30px;
  gap: 0.1rem;
}

.chip-content h4 {
  margin-right: 0.25rem;
  font-weight: 300;
}

.text p {
  font-size: 14px;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.buttons > * {
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  text-transform: uppercase;
  color: var(--white);
}

.buttons .delete {
  background: var(--destructive);
}

.buttons .navigate {
  background-color: var(--primary-color);
}
</style>
