<script setup lang="ts">
const props = defineProps<{
  users?: number
  approved: number
  denied: number
}>()
</script>

<template>
  <div class="item-container">
    <div class="item-detail">
      <h4>Unique users</h4>
      <span id="unique">{{ props.users }}</span>
    </div>

    <div class="item-detail">
      <h4>Approved</h4>
      <span id="approved">{{ props.approved }}</span>
    </div>

    <div class="item-detail">
      <h4>Denied</h4>
      <span id="denied"> {{ props.denied }}</span>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  display: flex;
  justify-content: center;
  padding: 0;
  gap: 0.75rem;
}

.item-detail {
  background-color: #111;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5.5rem;
  flex: 1;
  text-align: center;
  gap: 0.5rem;
  border: 1px solid #222;
}

.item-detail h4 {
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.688rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 0;
}

.item-detail span {
  font-weight: 700;
  font-size: 1.75rem;
  color: var(--white);
  line-height: 1;
}

.item-detail:nth-child(2) span {
  color: #16a34a;
}

.item-detail:nth-child(3) span {
  color: #dc2626;
}

.item-detail #denied {
  color: #dc2626;
}
</style>
