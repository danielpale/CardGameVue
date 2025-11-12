<script setup>
import { ref, useTemplateRef } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'

import { POSITIONS } from '@/constants/card'

const cards = Object.keys(POSITIONS)

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
    card.flipCard()
  }
}

const baseCardRef = useTemplateRef('baseCard')
const card = ref('yellow-1')
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
