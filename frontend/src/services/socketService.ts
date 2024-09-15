import { io, Socket } from 'socket.io-client'
import variables from '../variables'

class SocketService {
	socket: Socket | null = null
	private maxRetries: number = 5
	private retryDelay: number = 1000

	connect() {
		this.socket = io(variables.socket_url)
		this.socket.on('connect', () => {
			console.log('[SocketService] Connected to the server via WebSocket:', this.socket?.id)
		})
	}

	disconnect() {
		this.socket?.disconnect()
	}

	retryOnEvent(event: string, handler: (...args: any[]) => void, retries: number = 0) {
		if (this.socket) {
			this.socket.on(event, handler)
		} else if (retries < this.maxRetries) {
			setTimeout(() => {
				this.retryOnEvent(event, handler, retries + 1)
			}, this.retryDelay)
		} else {
			console.error(`[SocketService] Failed to setup event "${event}" after ${this.maxRetries} retries`)
		}
	}
}

export default new SocketService()
