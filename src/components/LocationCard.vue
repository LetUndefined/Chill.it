<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore'
import { Clock, Sparkle, PersonStanding, Circle } from 'lucide-vue-next'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { notify } from '@/services/alert'
import { useAdminStore } from '@/stores/AdminStore'
import { useSupaStore } from '@/stores/supaBase'
import { getCurrentPosition } from '@/services/geolocation'

const mapStore = useMapStore()
const { createWaypoint, deleteExistingMarker, callMap } = mapStore
const { map, coords } = storeToRefs(mapStore)

const adminStore = useAdminStore()
const { isAdmin } = storeToRefs(adminStore)

const supaStore = useSupaStore()
const { deleteData } = supaStore

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
  distance?: number
}>()

const createRoute = async () => {
  coords.value = await getCurrentPosition()
  await router.push('/')

  if (!map.value) {
    callMap()
  }

  if (map.value) {
    createWaypoint(props.latitude, props.longitude)
    notify('Success', 'Navigation started', 3000)
  } else {
    notify('Warning', 'Map initialization failed', 3000)
  }
}

const conversion = computed(() => {
  return Number(props.distance) / 1000
})

function handleDelete(id: string) {
  deleteData(id)
  deleteExistingMarker(id)
}
</script>

<template>
  <div class="card">
    <v-card class="mx-auto" max-width="344">
      <v-img height="200px" :src="props.imageUrl" cover></v-img>

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
        <v-card-title> {{ props.title }} </v-card-title>

        <v-spacer></v-spacer>

        <div>
          <v-card-text>
            {{ props.description }}
          </v-card-text>
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
      </div>
      <div class="buttons">
        <button class="navigate" @click="createRoute">
          Navigate {{ conversion.toFixed(2) }} km
        </button>
        <button class="delete" v-if="isAdmin" @click="handleDelete(props.id)">Delete Marker</button>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.v-card {
  width: 400px;
  position: relative;
  border-radius: 20px;
  height: 100%;
  background-color: #111;
  border: 1px solid #222;
}

.v-card-title,
.v-card-text {
  padding: 0;
  margin: 1rem 0 1.5rem 0;
  color: var(--white);
}

.v-card-text {
  color: rgba(255, 255, 255, 0.8);
}

.card-content {
  padding: 1.25rem 1.75rem 0 1.25rem;
}

.information {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.information-content {
  display: flex;
  gap: 1rem;
}

.chip-content {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  position: absolute;
  padding: 0.25rem 0.5rem;
  top: 10px;
  right: 10px;
  gap: 0.1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chip-content h4 {
  margin-right: 0.25rem;
  font-weight: 300;
  color: var(--white);
}

.text p {
  font-size: 14px;
  color: var(--white);
}

.text h4 {
  color: var(--white);
}

.buttons {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.75rem;
  margin: 0 1rem 1rem 1rem;
}

.buttons .navigate {
  padding: 0.875rem;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: var(--white);
  color: #000;
  font-weight: 700;
  font-size: 0.813rem;
  letter-spacing: 0.03em;
  border: none;
}

.buttons .navigate:active {
  opacity: 0.7;
}

.buttons .delete {
  padding: 0.875rem;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: #dc2626;
  color: var(--white);
  font-weight: 700;
  font-size: 0.813rem;
  letter-spacing: 0.03em;
  border: none;
  align-self: center;
  width: 60%;
}

.buttons .delete:active {
  background-color: #b91c1c;
}
</style>
