import type { Alert } from '@/models/interface'
import { ref, type Ref } from 'vue'

const alertArray: Ref<Alert[]> = ref([])

const alertSwitch = ref(false)

function notify(message: string, type: string, duration: number) {
  const randomId = Math.floor(Math.random() * 100)
  const newAlert = {
    id: randomId,
    message,
    type,
    duration,
  }

  alertArray.value.push(newAlert)
  alertSwitch.value = true

  setTimeout(() => {
    alertSwitch.value = false
    alertArray.value.splice(0, 1)
  }, duration)

  return randomId
}

function removeAlert(id: number) {
  const index = alertArray.value.findIndex((e) => e.id === id)
  console.log(index)
  alertArray.value.splice(index, 1)
}

export { notify, alertArray, alertSwitch, removeAlert }
