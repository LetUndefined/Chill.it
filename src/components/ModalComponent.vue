<script setup lang="ts">
import { modalTrigger } from '@/services/ModalTrigger'
</script>

<template>
  <div class="modal-container">
    <div class="modal">
      <div class="close" @click.prevent="modalTrigger = false">X</div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  background-color: rgba(194, 194, 194, 0.513);
  border-radius: 10px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1001;
}

.modal {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  background: transparent;
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
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 4rem;
  border-radius: 10px;
}
</style>
