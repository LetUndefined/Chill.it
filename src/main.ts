import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'leaflet/dist/leaflet.css'
import '@/assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import {
  VSelect,
  VCarousel,
  VCarouselItem,
  VCard,
  VImg,
  VCardTitle,
  VSpacer,
  VCardText,
  VRating,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelText,
} from 'vuetify/components'
import * as directives from 'vuetify/directives'
const pinia = createPinia()
const app = createApp(App)

const vuetify = createVuetify({
  components: {
    VSelect,
    VCarousel,
    VCarouselItem,
    VCard,
    VImg,
    VCardTitle,
    VSpacer,
    VCardText,
    VRating,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelText,
  },
  directives,
})

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
