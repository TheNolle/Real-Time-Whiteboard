import { io, Socket } from 'socket.io-client'
import variables from '../variables'

class SocketService {
	socket: Socket | null = null

	connect() {
		this.socket = io(variables.socket_url)
		this.socket.on('connect', () => {
			console.log('[SocketService] Connected to the server via WebSocket', this.socket?.id)
		})
	}

	disconnect() {
		this.socket?.disconnect()
	}
}

export default new SocketService()
