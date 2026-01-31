<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import InputForm from '@/components/InputForm.vue'
</script>

<template>
  <div class="input-view">
    <HeaderComponent />
    <main>
      <div class="container">
        <InputForm />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.input-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  flex: 1;
  overflow-y: auto;
  padding: 2rem 0;
}

.container {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
