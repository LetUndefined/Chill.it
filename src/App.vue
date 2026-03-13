<script setup lang="ts">
import { RouterView } from 'vue-router'
import AlertBox from '@/components/AlertBox.vue'
</script>

<template>
  <AlertBox />
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  height: 100vh;
}
</style>
