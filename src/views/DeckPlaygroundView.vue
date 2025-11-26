<script setup>
import BaseDeck from '@/components/base/BaseDeck.vue'

const cards = [
  'yellow-1',
  'yellow-2',
  'yellow-3',
  'yellow-4',
  'yellow-5',
  'yellow-6',
  'yellow-7',
  'yellow-8',
  'yellow-9',
  'yellow-0',
  'yellow-plus-two',
  'yellow-skip',
  'yellow-reverse',
  'red-1',
  'red-2',
  'red-3',
  'red-4',
  'red-5',
  'red-6',
  'red-7',
  'red-8',
  'red-9',
  'red-0',
]
const cardsArr = cards.map((c) => ({ id: c, card: c }))
</script>

<template>
  <div class="d-flex flex-column ga-4 pa-4 h-100">
    <h1>Deck playground</h1>
    <div class="grid">
      <base-deck :cards="cardsArr" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  place-items: center;
}
</style>
