<script setup lang="ts">
import { Clock, Sparkle, PersonStanding, Star } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  imageUrl: string
}>()
</script>

<template>
  <div class="card">
    <v-card class="mx-auto" max-width="344">
      <v-img height="200px" :src="props.imageUrl" cover></v-img>

      <div class="card-content">
        <div class="chip">
          <div class="chip-content">
            <h4>Chill</h4>
            <Star
              v-for="n in 5"
              :key="n"
              :fill="n <= props.chill_level ? 'var(--secondary-color)' : 'none'"
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
              <h4>accessibility</h4>
              <p>{{ props.accessibility }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.v-card {
  width: 400px;
  position: relative;
  border-radius: 20px;
}

.v-card-title,
.v-card-text {
  padding: 0;
  margin: 1rem 0 2rem 0;
}

.card-content {
  padding: 1rem;
}

.information {
  display: flex;
  flex-direction: column;
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
}

.chip-content h4 {
  margin-right: 0.25rem;
}
</style>
