<script setup>
import { ref, useTemplateRef } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'
import BaseSection from '@/components/base/BaseSection.vue'
import PlayerItem from '@/components/common/PlayerItem.vue'
import BaseDeck from '@/components/base/BaseDeck.vue'

import { POSITIONS } from '@/constants/card'
import { PLAYERS_COORDS } from '@/constants/players'

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

// Game View Playground
const players = ['danielpale', 'vninomtz', 'aaronhdz', 'mahrafrnc', 'spiderman', 'leomessi']
const numPlayers = ref(6)

const gvCards = [
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
</script>

<template>
  <section class="card-playground">
    <div style="height: 100dvh">
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
    <base-section class="game-view">
      <player-item
        v-for="player in numPlayers"
        :key="players[player - 1]"
        :username="players[player - 1]"
        :col="PLAYERS_COORDS[numPlayers][player - 1].col"
        :row="PLAYERS_COORDS[numPlayers][player - 1].row"
      />
      <base-deck :cards="gvCards" :card-height="160" :card-width="102" />
      <div class="btns">
        <v-btn :disabled="numPlayers <= 1" @click="numPlayers--">Rest player</v-btn>
        <v-btn :disabled="numPlayers >= 6" @click="numPlayers++">Add player</v-btn>
      </div>
    </base-section>
  </section>
</template>

<style lang="scss">
.card-playground {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid {
  flex-grow: 1;
  display: grid;
  place-items: center;
  height: 80%;
}

// Game View
.game-view {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));

  & > .base-deck {
    grid-column: 1 / -1;
    grid-row: 10 / -1;
  }
}

.btns {
  grid-column: 6 / 8;
  grid-row: 6 / 8;
  display: flex;
  gap: 8px;
}
</style>
