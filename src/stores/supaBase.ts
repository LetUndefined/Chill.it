import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const formData = ref({
    name: '',
    chillLevel: 0,
    remotely: false,
  })
  return {}
})
