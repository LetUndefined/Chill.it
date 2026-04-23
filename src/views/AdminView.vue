<script setup lang="ts">
import ExpansianPanel from '@/components/ExpansionPanel.vue'
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/AdminStore'
import { storeToRefs } from 'pinia'
import InformationBlock from '@/components/InformationBlock.vue'

const adminStore = useAdminStore()
const { nonApprovedData } = storeToRefs(adminStore)
const { fetchNonApproved, fetchAll } = adminStore

const informationDetail = ref()
const openPanels = ref(false)

const status = computed(() => {
  if (openPanels.value) {
    return 'Close All'
  } else {
    return 'Open All'
  }
})

function handleOpenPanels() {
  openPanels.value = !openPanels.value
}

onMounted(async () => {
  await fetchNonApproved()
  informationDetail.value = await fetchAll()
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
          <h4>Pending Markers</h4>
        </div>
        <div class="table-container">
          <div class="no-items" v-if="nonApprovedData?.length === 0">
            <h4>No pending markers</h4>
          </div>
          <div class="item-text" v-if="nonApprovedData && nonApprovedData?.length > 0">
            <h4>{{ nonApprovedData?.length }} pending marker(s)</h4>
            <button class="openAll" @click="handleOpenPanels">{{ status }}</button>
          </div>
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
              :openPanels="openPanels"
            />
          </div>
        </div>
      </section>
      <section class="approval-details">
        <InformationBlock
          v-if="informationDetail"
          :users="informationDetail.users.length"
          :approved="informationDetail.approved.length"
          :denied="informationDetail.denied.length"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #0a0a0a;
  min-height: 100vh;
  padding: 0;
}

.title {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 1rem 1rem;
  background-color: #111;
  border-bottom: 1px solid #222;
}

.title h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--white);
  margin: 0;
  letter-spacing: -0.02em;
}

.title span {
  border-bottom: none;
}

.title p {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin: 0.5rem 0 0 0;
  text-align: center;
}

.dashboard-content {
  background-color: transparent;
  min-height: 100vh;
  border-radius: 0;
  padding: 0;
}

.approvals {
  margin: 0;
  height: auto;
  min-height: 60vh;
  padding: 1rem;
}

.text h4 {
  margin: 0 0 1rem 0;
  color: var(--white);
  font-size: 1.125rem;
  font-weight: 600;
}

.table-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow-y: auto;
  height: 100%;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  gap: 0.75rem;
}

.no-items {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgba(255, 255, 255, 0.4);
  background-color: #111;
  border-radius: 12px;
}

.no-items h4 {
  font-size: 0.938rem;
  font-weight: 500;
}

.item-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem;
}

.item-text h4 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.approval-details {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.openAll {
  background-color: var(--white);
  color: #000;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.688rem;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
}

.openAll:active {
  opacity: 0.7;
}
</style>
