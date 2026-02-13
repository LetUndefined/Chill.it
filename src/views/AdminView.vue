<script setup lang="ts">
import ExpansianPanel from '@/components/ExpansianPanel.vue'
import { onMounted } from 'vue'
import { useAdminStore } from '@/stores/AdminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { nonApprovedData } = storeToRefs(adminStore)
const { fetchNonApproved } = adminStore

onMounted(async () => {
  await fetchNonApproved()
})
</script>

<template>
  <div class="container">
    <div class="title">
      <h1>Dashboard</h1>
    </div>
    <div class="table-contaienr">
      <div v-for="(location, index) in nonApprovedData" :key="index">
        <ExpansianPanel
          :title="location.title"
          :chill_level="location.chill_level"
          :image-url="location.image_url"
          :vibe="location.vibe"
          :visiting="location.visiting"
          :description="location.description"
          :accessibility="location.accessibility"
          :longitude="location.longitude"
          :latitude="location.latitude"
          :id="location.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
}
.title h1 {
  color: var(--white);
  text-transform: uppercase;
}
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--black);
  height: 100vh;
}

.title {
  margin-top: 4rem;
}

.table-contaienr {
  padding: 1rem;
}
</style>
