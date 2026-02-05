<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <HeaderComponent />
  <main>
    <RouterView />
  </main>
  <FooterComponent />
</template>
