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
  background-color: rgba(194, 194, 194, 0.513);
  border-radius: 10px;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1001;
}

.modal {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: transparent;
  margin: 1rem;
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
  overflow-y: auto;
  border-radius: 10px;
}

.scroll-indicator {
  position: sticky;
  bottom: 10px;
  text-align: center;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.5);
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
