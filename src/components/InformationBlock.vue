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
  padding: 1rem;
  border-radius: 20px;
  gap: 1rem;
}
.item-detail {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 6rem;
  width: 10rem;
  text-align: center;
  box-shadow: 0px 1px 2px var(--white);
  gap: 0.5rem;
}

.item-detail h4 {
  text-transform: uppercase;
  color: var(--white);
  font-size: 14px;
}

.item-detail span {
  font-weight: 900;
  font-size: 30px;
  color: var(--white);
  text-shadow: 0px 1px var(--black);
}

.item-detail #denied {
  color: rgb(231, 84, 84);
}
</style>
