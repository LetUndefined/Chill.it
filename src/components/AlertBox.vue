<script setup lang="ts">
import { alertArray, alertSwitch, removeAlert } from '@/services/alert'
</script>

<template>
  <div class="alert-container" v-if="alertSwitch">
    <div
      class="alerts"
      v-for="(alert, index) in alertArray"
      :key="index"
      :class="alert.title.toLowerCase()"
    >
      <div class="alert" v-if="alert">
        <div class="icon">
          <component :is="alert.icon" />
        </div>
        <div class="information">
          <div class="title">
            {{ alert.title }}
          </div>
          <div class="message">
            {{ alert.message }}
          </div>
        </div>
      </div>
      <button class="closeBtn" @click="removeAlert(alert.id)">x</button>
    </div>
  </div>
</template>

<style scoped>
.alert-container {
  position: fixed;
  z-index: 9999;
  top: 5rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 280px;
  max-width: 400px;
}

.alerts {
  position: relative;
  padding: 1rem 2.5rem 1rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  animation: slideIn 0.3s ease-out;
  transition: all 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.closeBtn {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.alert {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info {
  background: var(--light-color);
  color: var(--black);
  border: 2px solid var(--tertiary-color);
}

.success {
  background: var(--success-light);
  color: var(--black);
  border: 2px solid var(--green);
}

.success .closeBtn {
  color: var(--white);
}

.warning {
  background: var(--warning-light);
  color: var(--black);
  border: 2px solid var(--warning);
}

.destructive {
  background: var(--destructive-light);
  color: var(--black);
  border: 2px solid var(--destructive);
}

.title {
  font-weight: 900;
}

.message {
  font-size: 12px;
}
</style>
