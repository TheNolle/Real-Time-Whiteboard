import { Socket } from 'socket.io'
import Room from '../../models/Room'
import { socketRoomMap } from '../socketHandler'

export const handleJoinRoom = async (socket: Socket, roomId: string): Promise<void> => {
	socket.join(roomId)

	// Track the room this socket is in
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

	room.users.push(socket.id)
	await room.save()

	// Load existing drawing data for the new client
	socket.emit('loadCanvas', room.drawingData)
	console.log(`Client ${socket.id} joined room ${roomId}`)
}
