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
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(40px);
  gap: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0px 0px 10px -1px var(--black);
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
}

.form-content h2 {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 2rem;
  position: relative;
  color: var(--black);
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
