<script setup lang="ts">
import { Map, List, Code } from 'lucide-vue-next'
import router from '@/router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { isAdmin } = storeToRefs(adminStore)
const { adminCheck } = adminStore

onMounted(async () => {
  await adminCheck(null)
})
</script>

<template>
  <footer class="footer">
    <button class="footer-button map" @click="router.push('/')">
      <Map />
    </button>
    <button class="footer-button list" @click="router.push({ name: 'listview' })">
      <List />
    </button>
    <button class="footer-button list" v-if="isAdmin" @click="router.push({ name: 'adminview' })">
      <Code />
    </button>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--gradient-black);
  color: white;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
}

.footer-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.footer-button:active,
.footer-button.active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
