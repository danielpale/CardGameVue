<script setup>
import { ref, useTemplateRef } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

const cards = [
  'back',
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
  'red-plus-two',
  'red-skip',
  'red-reverse',
  'blue-1',
  'blue-2',
  'blue-3',
  'blue-4',
  'blue-5',
  'blue-6',
  'blue-7',
  'blue-8',
  'blue-9',
  'blue-0',
  'blue-plus-two',
  'blue-skip',
  'blue-reverse',
  'green-1',
  'green-2',
  'green-3',
  'green-4',
  'green-5',
  'green-6',
  'green-7',
  'green-8',
  'green-9',
  'green-0',
  'green-plus-two',
  'green-skip',
  'green-reverse',
]

const cardsRef = useTemplateRef('cardsRef')
const cardsSelected = ref([])
const allSelected = ref(false)

function toggleSelectAll() {
  allSelected.value = !allSelected.value
  const method = allSelected.value ? 'selectCard' : 'deselectCard'
  for (const card of cardsRef.value) {
    card[method]()
  }
}
function flipSelectedCards() {
  const _cards = cardsRef.value.filter((card) => card.selected)
  for (const card of _cards) {
    if (cardsSelected.value.includes(card.id)) card.flipCard()
  }
}

const baseCardRef = useTemplateRef('baseCard')
const card = ref('red-8')
function flipCard() {
  const flipped = baseCardRef.value.flipCard()
  if (flipped) return
  const index = Math.floor(Math.random() * cards.length)
  card.value = cards[index]
}
</script>

<template>
  <section class="card-playground">
    <div>
      <div class="grid">
        <base-card ref="baseCard" :card="card" />
      </div>
      <div class="d-flex ga-4 align-center justify-center pa-4">
        <v-btn @click="flipCard">Flip card</v-btn>
      </div>
    </div>
    <div>
      <h1>Cards playground</h1>
      <div class="d-flex justify-space-between flex-wrap ga-4 pa-4">
        <base-card
          ref="cardsRef"
          v-for="card in cards"
          v-model="cardsSelected"
          :key="card"
          :card="card"
        />
      </div>
      <div class="d-flex ga-4 align-center justify-center pa-4">
        <v-btn @click="toggleSelectAll">{{ allSelected ? 'Deselect' : 'Select' }} All</v-btn>
        <v-btn @click="flipSelectedCards">Flip selected</v-btn>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.card-playground {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    min-height: 100vh;
  }
}

.grid {
  flex-grow: 1;
  display: grid;
  place-items: center;
  height: 80%;
}
</style>
