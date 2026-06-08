<script setup lang="ts">
import { useAdminStore } from '@/stores/AdminStore'
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  imageUrl: string
  id: string
  openPanels: boolean
}>()

const adminStore = useAdminStore()
const { handleApproval } = adminStore

const handleMarker = async (approval: boolean, id: string) => {
  await handleApproval(approval, id)
}

const isOpen = ref(props.openPanels ? 'open' : '')

watch(
  () => props.openPanels,
  (newValue) => {
    isOpen.value = newValue ? 'open' : ''
  },
)
</script>

<template>
  <div class="card-container">
    <v-expansion-panels v-model="isOpen">
      <v-expansion-panel :title="props.title" value="open">
        <v-expansion-panel-text>
          <div class="detail-container">
            <div class="detail-item">
              <span class="item-title">Chill level:</span>
              <p>{{ props.chill_level }}</p>
            </div>

            <div class="detail-item">
              <span class="item-title">Accessibility:</span>
              <p>{{ props.accessibility }}</p>
            </div>

            <div class="detail-item">
              <span class="item-title">Description:</span>
              <p>{{ props.description }}</p>
            </div>

            <div class="detail-item">
              <span class="item-title">Vibe:</span>
              <p>{{ props.vibe }}</p>
            </div>

            <div class="detail-item">
              <span class="item-title">Visiting:</span>
              <p>{{ props.visiting }}</p>
            </div>

            <div class="item-image">
              <v-img :src="props.imageUrl" width="300" height="250" />
            </div>

            <div class="buttons">
              <button @click="handleMarker(true, props.id)" class="approve">Approve</button>
              <button @click="handleMarker(false, props.id)" class="reject">Reject</button>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.card-container {
  margin-bottom: 0;
}

:deep(.v-expansion-panel) {
  border-radius: 12px;
  border: 1px solid #222;
  background-color: #111;
  color: var(--white);
  font-size: 0.938rem;
  box-shadow: none;
}

:deep(.v-expansion-panel-title) {
  font-weight: 600;
  font-size: 0.938rem;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0 0.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item span {
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.688rem;
  letter-spacing: 0.05em;
}

.detail-item p {
  margin: 0;
  color: var(--white);
  font-size: 0.938rem;
}

.item-image {
  display: flex;
  flex: 1;
  margin-top: 0.5rem;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.v-img) {
  border-radius: 8px;
}

.buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.buttons > * {
  flex: 1;
  padding: 0.875rem;
  border-radius: 8px;
  color: var(--white);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.813rem;
  letter-spacing: 0.03em;
  border: none;
  cursor: pointer;
}

.approve {
  background-color: #16a34a;
}

.approve:active {
  background-color: #15803d;
}

.reject {
  background-color: #dc2626;
}

.reject:active {
  background-color: #b91c1c;
}
</style>
