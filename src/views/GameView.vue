<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import BaseSection from '@/components/base/BaseSection.vue'
import PlayerItem from '@/components/common/PlayerItem.vue'
import BaseDeck from '@/components/base/BaseDeck.vue'
import BaseBoard from '@/components/base/BaseBoard.vue'

import { playCard } from '@/api'

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
const { opponents, started, cards, discardPileCard, gameId, playerId, playerInTurn, isTurnPlayer } =
  storeToRefs(gameStore)

const cardSelected = ref(null)
const drawCardSelected = ref(false)

const playBtnDisabled = computed(() => cardSelected.value === null)

async function handlePlayCard() {
  const body = {
    Action: 'PlayCard',
    GameId: gameId.value,
    PlayerId: playerId.value,
    CardId: cardSelected.value,
  }
  const [error] = await playCard(gameId.value, playerId.value, body)
  if (error) return
  cardSelected.value = null
}

async function handleDrawCard() {
  const body = {
    Action: 'DrawCard',
    GameId: gameId.value,
    PlayerId: playerId.value,
  }
  const [error] = await playCard(gameId.value, playerId.value, body)
  if (error) return
  drawCardSelected.value = false
}
</script>

<template>
  <base-section class="game-view">
    <player-item
      v-for="(player, index) in opponents"
      :key="player.id"
      :username="player.id"
      :col="PLAYERS_COORDS[opponents.length][index].col"
      :row="PLAYERS_COORDS[opponents.length][index].row"
      :is-on-turn="player.id === playerInTurn"
    />
    <base-board
      v-model:draw-selected="drawCardSelected"
      :discard-pile-card="discardPileCard"
      :card-height="CARD_HEIGHT"
      :card-width="CARD_WIDTH"
    />
    <div class="base-deck__wrapper">
      <base-deck
        v-model="cardSelected"
        :cards="cards"
        :card-height="CARD_HEIGHT"
        :card-width="CARD_WIDTH"
        :disabled="!isTurnPlayer"
      />
    </div>
    <div class="game-view__buttons">
      <v-chip v-if="isTurnPlayer" class="mb-4">It's your turn</v-chip>
      <v-btn :disabled="playBtnDisabled" @click="handlePlayCard">Play card</v-btn>
      <v-btn :disabled="!drawCardSelected" @click="handleDrawCard">Draw Card</v-btn>
    </div>
  </base-section>
</template>

<style lang="scss">
.game-view {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));

  & > .base-deck__wrapper {
    grid-column: 3 / 11;
    grid-row: 10 / -1;
    display: grid;
    place-items: center;
  }

  & > .base-board {
    grid-column: 4 / 10;
    grid-row: 4 / 9;
  }

  &__buttons {
    grid-column: 11 / -1;
    grid-row: 10 / -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
}
</style>
