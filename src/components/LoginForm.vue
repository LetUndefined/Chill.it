<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <form class="form-container">
    <div class="form-content">
      <h2>{{ props.title }}</h2>
      <slot></slot>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
  min-height: 22rem;
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  gap: 1.5rem;
  margin: 1rem 0;
}

.form-content::before {
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  z-index: -1;
  opacity: 0;
  box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.3);
  animation: pulse 4s infinite ease-in-out;
}

.form-content h2 {
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 0px 2px 2px var(--black);
  font-size: 2rem;
  position: relative;
  color: var(--white);
  opacity: 0.5;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
