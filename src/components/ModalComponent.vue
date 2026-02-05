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
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 1001;
  animation: slideInLeft 0.4s ease-in-out;
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
  top: 30px;
  right: 35px;
  font-size: 20px;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  background-color: rgb(252, 57, 35);
  color: white;
  box-shadow: 0px 2px 8px -2px black;
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

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
