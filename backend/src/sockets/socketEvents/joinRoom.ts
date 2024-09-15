import { Server, Socket } from 'socket.io'
import Room from '../../models/Room'
import { socketRoomMap } from '../socketHandler'

export const handleJoinRoom = async (io: Server, socket: Socket, roomId: string, username: string): Promise<void> => {
	socket.join(roomId)

	if (!socketRoomMap[socket.id]) {
		socketRoomMap[socket.id] = []
	}
	socketRoomMap[socket.id].push(roomId)

	let room = await Room.findOne({ roomId })

	// If room doesn't exist, create it
	if (!room) {
		console.log(`Room ${roomId} created`)
		room = new Room({ roomId, drawingData: [], users: [] })
	}

	// Add the user with the username
	room.users.push({ socketId: socket.id, username })
	await room.save()

	// Load existing drawing data for the new client
	socket.emit('loadCanvas', room.drawingData)

	// Emit the updated user list to all clients in the room
	const usersInRoom = room.users.map(user => ({ username: user.username, socketId: user.socketId }))
	io.to(roomId).emit('updateUsers', usersInRoom)
	console.log(`Client ${socket.id} (username: ${username}) joined room ${roomId}`)
}
