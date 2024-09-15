import { Socket } from 'socket.io'
import Room from '../../models/Room'
import { socketRoomMap } from '../socketHandler'

export const handleDisconnect = async (socket: Socket) => {
	console.log('Client disconnected:', socket.id)

	// Remove the socket from all rooms it's in
	for (const roomId of socketRoomMap[socket.id] || []) {
		const room = await Room.findOne({ roomId })
		if (room) {
			room.users = room.users.filter((user) => user !== socket.id)
			await room.save()

			// If the room is empty, delete it
			if (room.users.length === 0) {
				await Room.deleteOne({ roomId })
				console.log(`Room ${roomId} deleted`)
			}
		}
	}

	// Clean up socketRoomMap
	delete socketRoomMap[socket.id]
}
