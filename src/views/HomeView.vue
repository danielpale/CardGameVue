<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import BaseSection from '@/components/base/BaseSection.vue'
import BaseDialog from '@/components/base/BaseDialog.vue'

import { createGame, joinGame, startGame } from '@/api'

import { useGameStore } from '@/stores/game'

const router = useRouter()

const gameStore = useGameStore()
const { players, gameId, started } = storeToRefs(gameStore)

watch(started, () => {
  router.push({ name: 'Game' })
})

const idleDialog = ref(false)

const startBtnDisabled = computed(() => players.value.length <= 1)

async function handleCreateGame() {
  const [error, data] = await createGame()
  if (error) return
  gameStore.initSSE(data.gameId, data.playerId, initSSESuccess)
}
function initSSESuccess() {
  idleDialog.value = true
}
function handleCloseIdleDialog() {
  idleDialog.value = false
  gameStore.purge()
}
async function handleStartGame() {
  startGame(gameId.value)
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
  if (error) return
  gameStore.initSSE(data.gameId, data.playerId, handleJoinGameSuccess)
}
function handleJoinGameSuccess() {
  handleCloseStartJoin()
  idleDialog.value = true
}
</script>

<template>
  <base-section class="home-view">
    <h1 class="title bg-black">UNO</h1>
    <v-btn @click="handleCreateGame">Create Game</v-btn>
    <v-btn variant="outlined" @click="handleStartJoin">Join Game</v-btn>
  </base-section>

  <base-dialog v-model="idleDialog" :title="`GAME ID: ${gameId}`" @on-close="handleCloseIdleDialog">
    <v-list class="py-0" density="compact">
      <v-list-subheader class="font-weight-bold">Players:</v-list-subheader>
      <v-list-item v-for="player in players" :key="player.id" :value="player.id">
        <p>
          Player Id: <b>{{ player.id }}</b>
        </p>
      </v-list-item>
    </v-list>
    <template #actions>
      <v-btn variant="outlined" @click="handleCloseIdleDialog">Close Game</v-btn>
      <v-btn variant="flat" :disabled="startBtnDisabled" @click="handleStartGame">Start Game</v-btn>
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
