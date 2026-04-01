import type { Alert } from '@/models/interface'
import { BadgeInfo, Ban, CheckCircle, ShieldAlert, type LucideProps } from 'lucide-vue-next'
import { ref, type FunctionalComponent, type Ref } from 'vue'

type AlertType = 'Error' | 'Warning' | 'Success' | 'Info'

const alertArray: Ref<Alert[]> = ref([])
const icon = ref()

const alertSwitch = ref(false)

const alertIcons: Record<AlertType, FunctionalComponent<LucideProps>> = {
  Error: Ban,
  Success: CheckCircle,
  Warning: ShieldAlert,
  Info: BadgeInfo,
}

function notify(title: string, message: string, duration: number) {
  icon.value = alertIcons[title as AlertType]
  const randomId = crypto.randomUUID()
  const newAlert = {
    id: randomId,
    icon: icon.value,
    title,
    message,
    duration,
  }

  alertArray.value.push(newAlert)
  alertSwitch.value = true

  setTimeout(() => {
    alertSwitch.value = false
    alertArray.value.splice(
      alertArray.value.findIndex((e) => e.id === randomId),
      1,
    )
  }, duration)

  return randomId
}

function removeAlert(id: number | string) {
  const index = alertArray.value.findIndex((e) => e.id === id)
  console.log(index)
  alertArray.value.splice(index, 1)
}

export { notify, alertArray, alertSwitch, removeAlert }
