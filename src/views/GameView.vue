<script setup>
import { ref } from 'vue'

import BaseSection from '@/components/base/BaseSection.vue'
import PlayerItem from '@/components/common/PlayerItem.vue'
import BaseDeck from '@/components/base/BaseDeck.vue'

const players = ['danielpale', 'vninomtz', 'aaronhdz', 'mahrafrnc', 'spiderman', 'leomessi']
const numPlayers = ref(6)

const PLAYERS_COORDS = {
  1: [{ col: 6, row: 1 }],
  2: [
    { col: 2, row: 1 },
    { col: 10, row: 1 },
  ],
  3: [
    { col: 2, row: 1 },
    { col: 6, row: 1 },
    { col: 10, row: 1 },
  ],
  4: [
    { col: 4, row: 1 },
    { col: 8, row: 1 },
    { col: 1, row: 4 },
    { col: 11, row: 4 },
  ],
  5: [
    { col: 3, row: 1 },
    { col: 6, row: 1 },
    { col: 9, row: 1 },
    { col: 1, row: 4 },
    { col: 11, row: 4 },
  ],
  6: [
    { col: 3, row: 1 },
    { col: 9, row: 1 },
    { col: 1, row: 3 },
    { col: 11, row: 3 },
    { col: 1, row: 6 },
    { col: 11, row: 6 },
  ],
}

const cards = [
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
  <base-section class="game-view">
    <!-- <h1>Testing</h1> -->
    <player-item
      v-for="player in numPlayers"
      :key="players[player - 1]"
      :username="players[player - 1]"
      :col="PLAYERS_COORDS[numPlayers][player - 1].col"
      :row="PLAYERS_COORDS[numPlayers][player - 1].row"
    />
    <base-deck :cards="cards" :card-height="160" :card-width="102" />
    <!-- <div class="btns">
      <v-btn :disabled="numPlayers <= 1" @click="numPlayers--">Rest player</v-btn>
      <v-btn :disabled="numPlayers >= 6" @click="numPlayers++">Add player</v-btn>
    </div> -->
  </base-section>
</template>

<style lang="scss">
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
}
</style>
