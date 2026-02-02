<script setup lang="ts">
import { modalTrigger } from '@/services/ModalTrigger'

const props = defineProps<{
  lat: number
  lng: number
}>()
</script>

<template>
  <div>
    <p>Coordinaten: latitude {{ props.lat }}, longitude {{ props.lng }}</p>
    <button id="popup-button" @click="modalTrigger = true">Add location</button>
  </div>
</template>

<style scoped>
#popup-button {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
