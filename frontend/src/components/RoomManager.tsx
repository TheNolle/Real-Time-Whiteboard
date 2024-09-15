import React from 'react'
import { useNavigate } from 'react-router-dom'

// Styles
import '../styles/components/room-manager.scss'

export default function RoomManager(): React.ReactElement {
	const [roomId, setRoomId] = React.useState<string>('')

	const navigate = useNavigate()

	const createRoom = () => {
		const newRoomId = Math.random().toString(36).substring(2, 10)
		navigate(`/whiteboard?roomId=${newRoomId}`)
	}

	const joinRoom = () => {
		if (!roomId) return
		navigate(`/whiteboard?roomId=${roomId}`)
	}

	return (
		<div className='room-manager'>
			<button onClick={createRoom}>Create Room</button>
			<input type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder='Room ID' />
			<button onClick={joinRoom}>Join Room</button>
		</div>
	)
}
