import { Server, Socket } from 'socket.io'
import Room from '../../models/Room'
import { socketRoomMap } from '../socketHandler'

export const handleDisconnect = async (io: Server, socket: Socket) => {
	console.log('Client disconnected:', socket.id)

	// Remove the socket from all rooms it's in
	for (const roomId of socketRoomMap[socket.id] || []) {
		const room = await Room.findOne({ roomId })
		if (room) {
			room.users = room.users.filter((user) => user.socketId !== socket.id)
			await room.save()

			// If the room is empty, delete it
			if (room.users.length === 0) {
				await Room.deleteOne({ roomId })
				console.log(`Room ${roomId} deleted`)
			} else {
				// Notify all clients in the room about the updated user list
				io.to(roomId).emit('updateUsers', room.users)
			}
		}
	}

	// Clean up socketRoomMap
	delete socketRoomMap[socket.id]
}
