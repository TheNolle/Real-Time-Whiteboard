import { Server } from 'socket.io'
import { createServer } from 'http'

import { handleJoinRoom } from './socketEvents/joinRoom'
import { handleDraw } from './socketEvents/draw'
import { handleDisconnect } from './socketEvents/disconnect'

// Map to track which rooms each socket is in
export const socketRoomMap: { [socketId: string]: string[] } = {}

export const setupSocket = (httpServer: ReturnType<typeof createServer>): void => {
	const io = new Server(httpServer, { cors: { origin: '*' } })

	io.on('connection', (socket) => {
		console.log('Client connected:', socket.id)

		// Client joins a room
		socket.on('joinRoom', ({ roomId, username }) => {
			handleJoinRoom(io, socket, roomId, username)
		})
		// Handle drawing data
		socket.on('draw', (data) => handleDraw(socket, data))
		// Client disconnects
		socket.on('disconnect', () => handleDisconnect(io, socket))
	})
}
