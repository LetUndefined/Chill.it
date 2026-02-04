<script setup lang="ts">
import SignInForm from '@/components/SignInForm.vue'
</script>

<template>
  <div class="form-container">
    <SignInForm />
  </div>
</template>

<style scoped>
.form-container {
  height: 100vh;
  background: url('src/assets/images/nature-background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
