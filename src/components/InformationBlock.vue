<script setup lang="ts">
const props = defineProps<{
  users?: number
}>()
</script>

<template>
  <div class="item-container">
    <div class="item-detail">
      <h4>Unique users</h4>
      <span>{{ props.users }}</span>
    </div>

    <div class="item-detail">
      <h4>Approved</h4>
      <span>{{ props.users }}</span>
    </div>

    <div class="item-detail">
      <h4>Denied</h4>
      <span>{{ props.users }}</span>
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
  box-shadow: 0px 2px 1px var(--white);
}

.item-detail h1 {
  color: white;
}
</style>
