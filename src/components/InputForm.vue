<script setup lang="ts">
import { useSupaStore } from '@/stores/supaBase'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const supaStore = useSupaStore()
const { formData, photoPreview, photoFile } = storeToRefs(supaStore)
const { insertData, resetValues } = supaStore

const photo = ref()

function handlePhotoCapture(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    photo.value = URL.createObjectURL(file)
    photoFile.value = file
    photoPreview.value = photo.value
  }
}

async function insertFormData() {
  await insertData()
  formData.value = resetValues
}
</script>

<template>
  <div class="form-container">
    <h1>Information Input</h1>
    <form @submit.prevent>
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="Enter your name" v-model="formData.title" />
      </div>

      <div class="form-group">
        <label for="email">Chill level</label>
        <input id="email" type="text" v-model="formData.chill_level" />
      </div>

      <div class="form-group">
        <label for="message">Short description</label>
        <textarea
          type="textarea"
          id="message"
          rows="5"
          cols="5"
          placeholder="Enter your message"
          v-model="formData.description"
          maxlength="100"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="message">Best visiting time</label>
        <v-select
          label="Select"
          :items="['Morning', 'Noon', 'Afternoon', 'Evening', 'Night']"
          variant="solo-filled"
          v-model="formData.visiting"
        ></v-select>
      </div>

      <div class="form-group">
        <label for="message">Vibe</label>
        <v-select
          label="Select"
          :items="['Quiet', 'Social', 'Romantic', 'Adventurous', 'Chill']"
          variant="solo-filled"
          v-model="formData.vibe"
        ></v-select>
      </div>

      <div class="form-group">
        <label for="message">Accessibility</label>
        <v-select
          label="Select"
          :items="['Easy walk', 'Moderate walk', 'Hard to reach', 'Wheelchair accessible']"
          variant="solo-filled"
          v-model="formData.accessibility"
        ></v-select>
      </div>

      <button class="submit-btn" @click="insertFormData">Submit</button>
    </form>
    <div>
      <input type="file" accept="image/*" capture="environment" @change="handlePhotoCapture" />
    </div>
  </div>
</template>

<style scoped>
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
