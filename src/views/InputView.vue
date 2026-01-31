<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { ref } from 'vue'

const photo = ref()

function handlePhotoCapture(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    photo.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="input-view">
    <HeaderComponent />
    <main>
      <div class="form-container">
        <h1>Information Input</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" v-model="formData.name" type="text" placeholder="Enter your name" />
          </div>

          <div class="form-group">
            <label for="email">Chill level</label>
            <input
              id="email"
              v-model="formData.chillLevel"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <label for="message">Remotely</label>
            <textarea
              id="message"
              v-model="formData.remotely"
              rows="5"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">Submit</button>
        </form>
        <div>
          <input type="file" accept="image/*" capture="environment" @change="handlePhotoCapture" />
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.input-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  margin-top: 60px;
  margin-bottom: 50px;
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

.submit-btn:hover {
  background: #45a049;
}
</style>
