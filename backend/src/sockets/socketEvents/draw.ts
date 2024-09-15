import { Socket } from 'socket.io'
import Room from '../../models/Room'

export const handleDraw = async (socket: Socket, data: { roomId: string, x: number, y: number, isDrawing: boolean }) => {
	const { roomId, x, y, isDrawing } = data
	const room = await Room.findOne({ roomId })

	if (!room) return

	// Store drawing data
	room.drawingData.push({ x, y, isDrawing })
	await room.save()

	// Broadcast drawing event to all clients except the sender
	socket.to(roomId).emit('draw', data)
}
