<script setup lang="ts">
import { useSupaStore } from '@/stores/supaBase'
import { useMapStore } from '@/stores/MapStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import ModalComponent from './ModalComponent.vue'
import { modalTrigger } from '@/services/ModalTrigger'

const supaStore = useSupaStore()
const { formData, photoPreview, photoFile } = storeToRefs(supaStore)
const { insertData, resetValues, fetchData } = supaStore

const mapStore = useMapStore()
const { createExistingMarkers } = mapStore

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
  await fetchData()
  createExistingMarkers()
}

const handleSubmit = () => {
  insertFormData()
  modalTrigger.value = false
}
</script>

<template>
  <modal-component v-if="modalTrigger">
    <div class="form-container">
      <h1>Location Information</h1>
      <form @submit.prevent>
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Enter your name" v-model="formData.title" />
        </div>

        <div class="form-group">
          <label for="chill">Chill level</label>
          <v-rating
            hover
            :length="5"
            :size="27"
            v-model="formData.chill_level"
            active-color="secondary"
            color="white"
          />
        </div>

        <div class="form-group">
          <label for="message">Short description</label>
          <textarea
            type="textarea"
            id="message"
            rows="3"
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
            density="compact"
          ></v-select>
        </div>

        <div class="form-group">
          <label for="message">Vibe</label>
          <v-select
            label="Select"
            :items="['Quiet', 'Social', 'Romantic', 'Adventurous', 'Chill']"
            variant="solo"
            v-model="formData.vibe"
            density="compact"
          ></v-select>
        </div>

        <div class="form-group">
          <label for="message">Accessibility</label>
          <v-select
            label="Select"
            :items="['Easy walk', 'Moderate walk', 'Hard to reach', 'Wheelchair accessible']"
            variant="solo"
            v-model="formData.accessibility"
            density="compact"
          ></v-select>
        </div>

        <button class="submit-btn" @click="handleSubmit">Submit</button>
      </form>
      <div>
        <input
          type="file"
          id="file-upload-button"
          accept="image/*"
          capture="environment"
          @change="handlePhotoCapture"
        />
      </div>
    </div>
  </modal-component>
</template>

<style scoped>
.form-container {
  padding: 1rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  z-index: 0;
}

.form-container > * {
  position: relative;
  z-index: 1;
}

h1 {
  margin-bottom: 1rem;
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 0.75rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--white);
  font-weight: 600;
  font-size: 0.85rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

input,
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.v-field__input {
  padding: 0.5rem;
}

:deep(.v-field) {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type='file'] {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 0.85rem;
  color: rgb(102, 102, 102);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  border: 1px solid var(--white);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
