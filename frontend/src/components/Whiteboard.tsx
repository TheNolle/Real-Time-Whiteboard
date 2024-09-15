import React from 'react'

// Styles
import '../styles/components/whiteboard.scss'

// Services
import socketService from '../services/socketService'

export default function Whiteboard(): React.ReactElement {
	React.useEffect(() => {
		socketService.connect()

		return () => {
			socketService.disconnect()
		}
	}, [])

	return (
		<div className='whiteboard'>
			<h1>Whiteboard</h1>
			{/* Whiteboard tools and functionality will be added here */}
		</div>
	)
}
