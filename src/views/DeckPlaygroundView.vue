<script setup>
import BaseDeck from '@/components/base/BaseDeck.vue'
</script>

<template>
  <div class="d-flex flex-column ga-4 pa-4 h-100">
    <h1>Deck playground</h1>
    <div class="grid">
      <base-deck />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  place-items: center;
}
</style>
