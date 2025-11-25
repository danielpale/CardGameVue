class SSEService {
  constructor() {
    this.eventSource = null
    this.listeners = {}
  }

  connect(gameId, playerId) {
    if (this.eventSource) return this.eventSource

    this.eventSource = new EventSource(
      `http://localhost:8000/games/${gameId}/players/${playerId}/events`,
    )

    this.eventSource.addEventListener('open', () => {
      console.log('SSE connected')
    })

    this.eventSource.addEventListener('error', (err) => {
      console.error('SSE error:', err)
    })

    return this.eventSource
  }
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }
  emit(event, payload) {
    if (this.listeners[event]) {
      for (const callback of this.listeners[event]) {
        callback(payload)
      }
    }
  }
  addEvent(event) {
    this.eventSource.addEventListener(event, ($event) => {
      this.emit(event, JSON.parse($event.data))
    })
  }
  disconnect() {
    if (!this.eventSource) return
    this.eventSource.close()
    this.eventSource = null
    this.listeners = {}
  }
}

export const sseService = new SSEService()
