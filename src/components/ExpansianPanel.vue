<script setup lang="ts">
import { useAdminStore } from '@/stores/AdminStore'

const props = defineProps<{
  title: string
  chill_level: number
  description: string
  visiting: string
  vibe: string
  accessibility: string
  imageUrl: string
  id: string
}>()

const adminStore = useAdminStore()
const { handleApproval } = adminStore

const handleMarker = async (approval: boolean, id: string) => {
  await handleApproval(approval, id)
}
</script>

<template>
  <div class="card-container">
    <v-expansion-panels>
      <v-expansion-panel :title="props.title">
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
  margin-bottom: 1rem;
}

:deep(.v-expansion-panel) {
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  font-size: 0.9rem;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  gap: 0.25rem;
}

.detail-item span {
  text-transform: capitalize;
  font-weight: 900;
}

.item-image {
  display: flex;
  flex: 1;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.buttons > * {
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  color: var(--white);
  text-transform: uppercase;
  font-weight: 900;
  box-shadow: var(--box-shadow-sm);
}

.approve {
  background-color: rgb(12, 145, 0);
}

.reject {
  background-color: rgb(240, 71, 5);
}
</style>
