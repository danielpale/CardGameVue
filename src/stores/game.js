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
  const playerInTurn = computed(() => state?.Turn)
  const isTurnPlayer = computed(() => playerInTurn.value === playerId.value)

  function initSSE(gameId, playerId, onSuccess = () => {}, onError = () => {}) {
    _setPlayerId(playerId)
    _setGameId(gameId)

    sseService.connect(gameId, playerId)

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
  }

  function _addPlayer(playerId) {
    const player = { id: playerId }
    players.value.push(player)
  }
  function _setGameId(id) {
    gameId.value = id
  }
  function _setPlayerId(id) {
    playerId.value = id
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
    isTurnPlayer,
    opponents,
    playerId,
    playerInTurn,
    players,
    started,
    state,
    initSSE,
    purge,
  }
})
