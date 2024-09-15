import React from 'react'
import { useLocation } from 'react-router-dom'

// Styles
import '../styles/components/whiteboard.scss'

// Services
import socketService from '../services/socketService'

// Components
import UserDisplay from './UserDisplay'

export default function Whiteboard(): React.ReactElement {
	const [isDrawing, setIsDrawing] = React.useState<boolean>(false)
	const [users, setUsers] = React.useState<{ socketId: string, username: string }[]>([])

	const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
	const contextRef = React.useRef<CanvasRenderingContext2D | null>(null)

	const location = useLocation()
	const roomId = new URLSearchParams(location.search).get('roomId')
	const username = localStorage.getItem('username') || 'Anonymous'

	React.useEffect(() => {
		if (!roomId) {
			console.error('Room ID not found')
			return
		}

		socketService.connect()
		socketService.socket?.emit('joinRoom', { roomId, username })

		socketService.socket?.on('updateUsers', (userList: { socketId: string, username: string }[]) => {
			setUsers(userList)
		})

		socketService.socket?.on('draw', (data) => {
			const { x, y, isDrawing } = data
			if (!contextRef.current) return

			if (isDrawing) {
				contextRef.current.lineTo(x, y)
				contextRef.current.stroke()
			} else {
				contextRef.current.beginPath()
				contextRef.current.moveTo(x, y)
			}
		})

		socketService.socket?.on('loadCanvas', (drawingData) => {
			if (!contextRef.current) return

			drawingData.forEach((data: { x: number, y: number, isDrawing: boolean }) => {
				if (data.isDrawing) {
					contextRef.current?.lineTo(data.x, data.y)
					contextRef.current?.stroke()
				} else {
					contextRef.current?.beginPath()
					contextRef.current?.moveTo(data.x, data.y)
				}
			})
		})

		return () => {
			socketService.disconnect()
		}
	}, [])

	React.useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const context = canvas.getContext('2d')
		if (!context) return
		contextRef.current = context
	}, [])

	React.useEffect(() => {
		window.addEventListener('resize', () => {
			const canvas = canvasRef.current
			if (!canvas) return
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}, false)
	}, [])

	const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas) return

		const rect = canvas.getBoundingClientRect()
		if (event.type === 'mousemove' || event.type === 'mousedown' || event.type === 'mouseup' || event.type === 'mouseout') {
			return { x: (event as React.MouseEvent).clientX - rect.left, y: (event as React.MouseEvent).clientY - rect.top }
		} else if (event.type === 'touchmove' || event.type === 'touchstart' || event.type === 'touchend') {
			return { x: (event as React.TouchEvent).touches[0].clientX - rect.left, y: (event as React.TouchEvent).touches[0].clientY - rect.top }
		}
		return null
	}

	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		const coordinates = getCoordinates(event)
		if (!coordinates) return

		contextRef.current?.beginPath()
		contextRef.current?.moveTo(coordinates.x, coordinates.y)
		setIsDrawing(true)

		socketService.socket?.emit('draw', { roomId, x: coordinates.x, y: coordinates.y, isDrawing: false })
	}

	const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return

		const coordinates = getCoordinates(event)
		if (!coordinates) return

		contextRef.current?.lineTo(coordinates.x, coordinates.y)
		contextRef.current?.stroke()

		socketService.socket?.emit('draw', { roomId, x: coordinates.x, y: coordinates.y, isDrawing: true })
	}

	const stopDrawing = () => {
		setIsDrawing(false)
	}

	return (
		<div className='whiteboard'>
			<canvas
				ref={canvasRef}
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseOut={stopDrawing}
				onTouchStart={startDrawing}
				onTouchMove={draw}
				onTouchEnd={stopDrawing}
			/>
			<UserDisplay users={users} />
		</div>
	)
}
