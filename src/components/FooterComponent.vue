<script setup lang="ts">
import { Map, List } from 'lucide-vue-next'
import router from '@/router'
</script>

<template>
  <footer class="footer">
    <button class="footer-button map" @click="router.push('/')">
      <Map />
    </button>
    <button class="footer-button list" @click="router.push({ name: 'listview' })">
      <List />
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
  background-color: var(--primary-color);
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
