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
      <h1 class="logo">
        <span class="logo-chill">chill</span><span class="logo-dot"></span
        ><span class="logo-it">it</span>
      </h1>
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
  background: var(--black);
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

.logo {
  margin: 0;
  display: flex;
  align-items: center;
  user-select: none;
  gap: 1px;
}

.logo-chill {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 3px;
  color: var(--white);
  text-shadow:
    0 0 7px rgba(121, 194, 208, 0.5),
    0 0 20px rgba(121, 194, 208, 0.15);
}

.logo-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--purple);
  display: inline-block;
  margin: 0 4px;
  align-self: center;
  position: relative;
  top: 3px;
  box-shadow:
    0 0 6px var(--purple),
    0 0 16px rgba(150, 77, 251, 0.35);
}

.logo-it {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--white);
  text-shadow:
    0 0 7px rgba(121, 194, 208, 0.5),
    0 0 20px rgba(121, 194, 208, 0.15);
}
</style>
