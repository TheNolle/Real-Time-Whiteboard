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

		socketService.socket?.on('draw', (data: { x: number; y: number }) => {
			if (!contextRef.current) return
			contextRef.current.lineTo(data.x, data.y)
			contextRef.current.stroke()
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

	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas) return

		const context = canvas.getContext('2d')
		if (!context) return

		context.beginPath()
		setIsDrawing(true)
	}

	const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas || !isDrawing) return

		const context = canvas.getContext('2d')
		if (!context) return

		const rect = canvas.getBoundingClientRect()
		let x, y

		if (event.type === 'mousemove') {
			x = (event as React.MouseEvent).clientX - rect.left
			y = (event as React.MouseEvent).clientY - rect.top
		} else if (event.type === 'touchmove') {
			x = (event as React.TouchEvent).touches[0].clientX - rect.left
			y = (event as React.TouchEvent).touches[0].clientY - rect.top
		}

		if (!x || !y) return
		context.lineTo(x, y)
		context.stroke()
		socketService.socket?.emit('draw', { x, y })
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
