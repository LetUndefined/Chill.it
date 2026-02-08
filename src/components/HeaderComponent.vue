<script setup lang="ts">
import { useAuthStore } from '@/stores/Auth'
import { LogOut } from 'lucide-vue-next'
import router from '@/router'

const authStore = useAuthStore()
const { signOut } = authStore

const handleLogOut = async () => {
  await signOut()
  router.push('/login')
}
</script>

<template>
  <header>
    <div class="header-container">
      <h1>Chill it</h1>
      <LogOut @click="handleLogOut" />
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--gradient-blue);
  color: var(--white);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

h1 {
  margin: 0;
  font-size: 24px;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--white);
  border-radius: 20px;
}
</style>
