import React from 'react'

// Styles
import '../styles/components/whiteboard.scss'

// Services
import socketService from '../services/socketService'

export default function Whiteboard(): React.ReactElement {
	const [isDrawing, setIsDrawing] = React.useState<boolean>(false)
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
	const contextRef = React.useRef<CanvasRenderingContext2D | null>(null)

	React.useEffect(() => {
		socketService.connect()

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

	React.useEffect(() => {
		if (!isDrawing) return console.log('Not drawing')
		console.log('Drawing')
	}, [isDrawing])

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

		socketService.socket?.emit('draw', { x: coordinates.x, y: coordinates.y, isDrawing: false })
	}

	const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return

		const coordinates = getCoordinates(event)
		if (!coordinates) return

		contextRef.current?.lineTo(coordinates.x, coordinates.y)
		contextRef.current?.stroke()

		socketService.socket?.emit('draw', { x: coordinates.x, y: coordinates.y, isDrawing: true })
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
		</div>
	)
}
