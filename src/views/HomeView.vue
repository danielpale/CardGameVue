<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import BaseSection from '@/components/base/BaseSection.vue'
import BaseDialog from '@/components/base/BaseDialog.vue'

import { createGame, joinGame } from '@/api'

import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const { players, gameId } = storeToRefs(gameStore)

const waitingDialog = ref(false)

const startBtnDisabled = computed(() => players.value.length <= 1)

async function handleCreateGame() {
  const [error, data] = await createGame()
  if (error) return
  gameStore.initSSE(data.gameId, data.playerId)
  waitingDialog.value = true
}
function handleCloseGamePreview() {
  waitingDialog.value = false
  gameStore.purge()
}

const joinDialog = ref(false)
const gameIdEntered = ref(null)

function handleStartJoin() {
  joinDialog.value = true
}
function handleCloseStartJoin() {
  joinDialog.value = false
  gameIdEntered.value = null
}
async function handleJoinGame() {
  const [error, data] = await joinGame(gameIdEntered.value)
  // TODO: Implement when things goes wrong
  if (error) return
  gameStore.initSSE(data.gameId, data.playerId)
  joinDialog.value = false
  waitingDialog.value = true
}
</script>

<template>
  <base-section class="home-view">
    <h1 class="title bg-black">UNO</h1>
    <v-btn @click="handleCreateGame">Create Game</v-btn>
    <v-btn variant="outlined" @click="handleStartJoin">Join Game</v-btn>
  </base-section>

  <base-dialog
    v-model="waitingDialog"
    :title="`GAME ID: ${gameId}`"
    @on-close="handleCloseGamePreview"
  >
    <v-list class="py-0" density="compact">
      <v-list-subheader class="font-weight-bold">Players:</v-list-subheader>
      <v-list-item v-for="player in players" :key="player.id" :value="player.id">
        <p>
          Player Id: <b>{{ player.id }}</b>
        </p>
      </v-list-item>
    </v-list>
    <template #actions>
      <v-btn variant="outlined" @click="handleCloseGamePreview">Close Game</v-btn>
      <v-btn variant="flat" :disabled="startBtnDisabled">Start Game</v-btn>
    </template>
  </base-dialog>

  <base-dialog
    v-model="joinDialog"
    title="JOIN TO GAME"
    prim-label="Join"
    @on-prim-click="handleJoinGame"
    @on-close="handleCloseStartJoin"
    @on-sec-click="handleCloseStartJoin"
  >
    <v-text-field
      v-model="gameIdEntered"
      label="Game Id"
      density="comfortable"
      rounded="0"
      hide-details="auto"
      variant="outlined"
    />
  </base-dialog>
</template>

<style>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 48px;
}
</style>
