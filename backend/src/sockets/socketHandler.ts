import { Server } from 'socket.io'
import { createServer } from 'http'

// Room data and user tracking
const rooms: { [roomId: string]: { drawingData: { x: number, y: number, isDrawing: boolean }[], users: Set<string> } } = {}

// Setup WebSocket server
export const setupSocket = (httpServer: ReturnType<typeof createServer>): void => {
	const io = new Server(httpServer, { cors: { origin: '*' } })

	io.on('connection', (socket) => {
		console.log('Client connected:', socket.id)

		// Client joins a room
		socket.on('joinRoom', (roomId: string) => {
			socket.join(roomId)
			if (!rooms[roomId]) {
				rooms[roomId] = { drawingData: [], users: new Set() }
			}
			rooms[roomId].users.add(socket.id)
			console.log('Client ${socket.id} joined room ${roomId}')

			// Load existing drawing data for the new client
			socket.emit('loadCanvas', rooms[roomId].drawingData)
		})

		// Handle drawing data
		socket.on('draw', (data) => {
			const { roomId, x, y, isDrawing } = data
			if (!rooms[roomId]) return

			// Store drawing data
			rooms[roomId].drawingData.push({ x, y, isDrawing })

			// Broadcast drawing data to all clients in the room
			socket.to(roomId).emit('draw', data)
		})

		// Client disconnects
		socket.on('disconnect', () => {
			// Find the room the client was in and remove the user
			for (const roomId in rooms) {
				if (rooms[roomId].users.has(socket.id)) {
					rooms[roomId].users.delete(socket.id)
					console.log('Client ${socket.id} left room ${roomId}')

					// If no users are left in the room, clear up the room data
					if (rooms[roomId].users.size === 0) {
						delete rooms[roomId]
						console.log('Room ${roomId} deleted as no users are left')
					}
					break
				}
			}
		})
	})
}
