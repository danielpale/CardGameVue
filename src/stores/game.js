import { ref } from 'vue'
import { defineStore } from 'pinia'

import { sseService } from '@/services/sse-service'

export const useGameStore = defineStore('game', () => {
  const players = ref([])
  const gameId = ref(null)

  function initSSE(gameId, playerId) {
    sseService.connect(gameId, playerId)

    sseService.addEvent('Message')

    sseService.on('Message', (data) => {
      const { action, ...payload } = data
      console.log(action, payload)
      switch (action) {
        case 'PlayerConnected':
          onPlayerConnected(payload)
          break
      }
    })
  }

  function onPlayerConnected(payload) {
    addPlayer(payload.playerId)
    setGameId(payload.gameId)
  }

  function addPlayer(playerId) {
    const player = { id: playerId }
    players.value.push(player)
  }
  function setGameId(id) {
    gameId.value = id
  }
  function purge() {
    players.value = []
    gameId.value = null
    sseService.disconnect()
  }

  return { players, gameId, initSSE, addPlayer, setGameId, purge }
})
