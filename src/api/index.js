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
