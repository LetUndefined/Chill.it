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
    <div class="dashboard-content">
      <section class="title">
        <h1>Admin <span>Dashboard</span></h1>
        <p>Review and approve pending location submissions</p>
      </section>
      <section class="approvals">
        <div class="text">
          <h4>Pending Approvals</h4>
        </div>
        <div class="table-container">
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
      </section>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.title h1 {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--white);
  position: relative;
  padding-bottom: 0.5rem;
  margin-top: 1rem;
}

.title span {
  border-bottom: 1px solid;
}

.title p {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0 0 0;
  letter-spacing: 0.02em;
  text-align: center;
  max-width: 350px;
}
.container {
  display: flex;
  flex-direction: column;
  background-color: var(--black);
  height: 100vh;
  padding: 2rem 1rem;
}

.dashboard-content {
  background-color: rgb(103, 101, 101);
  height: 100%;
  border-radius: 20px;
}

.title {
  margin-top: 2rem;
}

.approvals {
  margin: 1rem;
  height: 600px;
}

.approvals h4 {
  margin: 0 0rem 0.5rem 0.5rem;
  color: var(--purple);
}

.table-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  box-shadow: 0px 2px 5px var(--white);
  border-radius: 20px;
}
</style>
