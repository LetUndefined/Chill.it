<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore'
import { Clock, Sparkle, PersonStanding, Circle } from 'lucide-vue-next'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const mapStore = useMapStore()
const { createWaypoint } = mapStore
const { map } = storeToRefs(mapStore)

const props = defineProps<{
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  imageUrl: string
  latitude: number
  longitude: number
  distance: number
}>()

const createRoute = async () => {
  await router.push('/')

  let attempts = 0
  const maxAttempts = 10

  const checkMap = () => {
    if (map.value) {
      createWaypoint(props.latitude, props.longitude)
    } else if (attempts < maxAttempts) {
      attempts++
      setTimeout(checkMap, 100)
      console.log(attempts)
    } else {
      console.error('Map failed to initialize')
    }
  }

  checkMap()
}

const conversion = computed(() => {
  return Number(props.distance) / 100
})
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
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.v-card {
  width: 400px;
  position: relative;
  border-radius: 20px;
  box-shadow: var(--box-shadow-xl);
}

.v-card-title,
.v-card-text {
  padding: 0;
  margin: 1rem 0 2rem 0;
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
  background-color: var(--white);
  border-radius: 20px;
  position: absolute;
  padding: 0.25rem 0.5rem;
  top: 10px;
  right: 10px;
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
  padding: 0.5rem 0.5rem;
  margin: 1rem;
  border-radius: 20px;
  background-color: var(--primary-color);
  text-transform: uppercase;
  color: var(--white);
  box-shadow: 0px 2px 5px black;
  font-weight: 600;
}
</style>
