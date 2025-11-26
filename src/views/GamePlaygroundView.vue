<script setup>
import { computed, ref } from 'vue'

import BaseSection from '@/components/base/BaseSection.vue'
import PlayerItem from '@/components/common/PlayerItem.vue'
import BaseDeck from '@/components/base/BaseDeck.vue'

import { PLAYERS_COORDS } from '@/constants/players'

const PLAYERS = [
  'danielpale',
  'vninomtz',
  'aaronhdz',
  'mahrafrnc',
  'spiderman',
  'leomessi',
  'cr7',
  'fortkid',
  'adrim',
  'captainone',
]
const CARDS = [
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
const cards = CARDS.map((c) => ({ id: c, card: c }))
const numPlayers = ref(6)
const playerSelected = ref(null)
const players = computed(() => PLAYERS.slice(0, numPlayers.value))
</script>

<template>
  <base-section class="game-view">
    <player-item
      v-for="player in numPlayers"
      :key="players[player - 1]"
      :username="players[player - 1]"
      :col="PLAYERS_COORDS[numPlayers][player - 1]?.col"
      :row="PLAYERS_COORDS[numPlayers][player - 1]?.row"
      :col-span="PLAYERS_COORDS[numPlayers][player - 1]?.colSpan"
      :row-span="PLAYERS_COORDS[numPlayers][player - 1]?.rowSpan"
      :is-on-turn="playerSelected === players[player - 1]"
    />
    <base-deck :cards="cards" :card-height="160" :card-width="102" />
    <div class="control-panel border-sm">
      <v-select
        v-model="numPlayers"
        class="flex-grow-0"
        width="200"
        label="Number of players"
        rounded="0"
        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        variant="outlined"
      />
      <v-select
        v-model="playerSelected"
        class="flex-grow-0"
        width="200"
        label="Select player"
        rounded="0"
        :items="players"
        variant="outlined"
        clearable
      />
    </div>
  </base-section>
</template>

<style lang="scss" scoped>
.game-view {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));

  & > .base-deck {
    grid-column: 1 / -1;
    grid-row: 10 / -1;
  }
}

.control-panel {
  grid-column: 3 / 11;
  grid-row: 3 / 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
