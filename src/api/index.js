const DOMAIN = 'localhost:8000'
const BASE_URL = `http://${DOMAIN}`

export async function createGame() {
  const response = await fetch(`${BASE_URL}/games`, { method: 'POST' })
  if (!response.ok) return [true]
  const body = await response.json()
  return [null, body]
}

export async function joinGame(gameId) {
  const response = await fetch(`${BASE_URL}/games/${gameId}/join`, { method: 'POST' })
  if (!response.ok) return [true]
  const body = await response.json()
  return [null, body]
}

export async function startGame(gameId) {
  const response = await fetch(`${BASE_URL}/games/${gameId}/start`, { method: 'POST' })
  if (!response.ok) return [true]
  const body = await response.json()
  return [null, body]
}

export async function playCard(gameId, playerId, body) {
  const response = await fetch(`${BASE_URL}/games/${gameId}/players/${playerId}/play`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!response.ok) return [true]
  const data = await response.json()
  return [null, data]
}
