<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import BaseSection from '@/components/base/BaseSection.vue'
import PlayerItem from '@/components/common/PlayerItem.vue'
import BaseDeck from '@/components/base/BaseDeck.vue'
import BaseBoard from '@/components/base/BaseBoard.vue'

import { useGameStore } from '@/stores/game'

import { PLAYERS_COORDS } from '@/constants/players'

const CARD_HEIGHT = 160
const CARD_WIDTH = 102

onMounted(() => {
  if (started.value) return
  router.push({ name: 'Home' })
})

const router = useRouter()

const gameStore = useGameStore()
const { opponents, started, cards, discardPileCard } = storeToRefs(gameStore)
</script>

<template>
  <base-section class="game-view">
    <player-item
      v-for="(player, index) in opponents"
      :key="player.id"
      :username="player.id"
      :col="PLAYERS_COORDS[opponents.length][index].col"
      :row="PLAYERS_COORDS[opponents.length][index].row"
    />
    <base-board
      :discard-pile-card="discardPileCard"
      :card-height="CARD_HEIGHT"
      :card-width="CARD_WIDTH"
    />
    <base-deck :cards="cards" :card-height="CARD_HEIGHT" :card-width="CARD_WIDTH" />
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

  & > .base-board {
    grid-column: 4 / 10;
    grid-row: 4 / 9;
  }
}
</style>
