<script setup lang="ts">
import { modalTrigger } from '@/services/ModalTrigger'
</script>

<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-content">
        <div class="close" @click.prevent="modalTrigger = false">X</div>
        <slot></slot>
        <div class="scroll-indicator">↓</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  animation: slideInRight 0.3s ease-in-out;
}

.modal {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: transparent;
  margin: 1rem;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 15px;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  color: white;
  border: 1px solid var(--primary-color);
  box-shadow: 0px 2px 8px -2px black;
  z-index: 100;
  animation: slideOut 0.3s ease-in-out;
}

.modal-content {
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
}

.scroll-indicator {
  position: sticky;
  bottom: 10px;
  text-align: center;
  font-size: 24px;
  color: var(--black);
  pointer-events: none;
  animation: bounce 2s infinite;
}
</style>
