import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { sseService } from '@/services/sse-service'

export const useGameStore = defineStore('game', () => {
  const players = ref([])
  const gameId = ref(null)
  const playerId = ref(null)
  const started = ref(false)
  const state = reactive({})

  const opponents = computed(() => players.value.filter((p) => p.id !== playerId.value))
  const cards = computed(() => {
    if (!Array.isArray(state?.Hand)) return []
    return state.Hand.map((i) => ({ id: i.id, card: `${i.color}-${i.number}` }))
  })
  const discardPileCard = computed(() => `${state?.PlayCard?.color}-${state?.PlayCard?.number}`)

  function initSSE(newGameId, newPlayerId, onSuccess = () => {}, onError = () => {}) {
    playerId.value = newPlayerId

    sseService.connect(newGameId, newPlayerId)

    sseService.on('error', onError)
    sseService.on('open', onSuccess)

    sseService.addEvent('Message')
    sseService.on('Message', (data) => {
      const { action, ...payload } = data
      console.log(action, payload)

      switch (action) {
        case 'PlayerConnected':
          onPlayerConnected(payload)
          break
        case 'GameStarted':
          started.value = true
          break
        case 'GameUpdated':
          Object.assign(state, payload.state)
          break
      }
    })
  }

  function onPlayerConnected(payload) {
    _addPlayer(payload.playerId)
    _setGameId(payload.gameId)
  }

  function _addPlayer(playerId) {
    const player = { id: playerId }
    players.value.push(player)
  }
  function _setGameId(id) {
    gameId.value = id
  }
  function purge() {
    players.value = []
    gameId.value = null
    sseService.disconnect()
  }

  return {
    cards,
    discardPileCard,
    gameId,
    opponents,
    playerId,
    players,
    started,
    state,
    initSSE,
    purge,
  }
})
