import { Schema, model, Document } from 'mongoose'

interface IRoom extends Document {
	roomId: string
	drawingData: { x: number, y: number, isDrawing: boolean }[]
	users: { socketId: string, username: string }[]
}

const roomSchema = new Schema<IRoom>({
	roomId: { type: String, required: true, unique: true },
	drawingData: [{ x: Number, y: Number, isDrawing: Boolean }],
	users: [{ socketId: String, username: String }]
}, {
	timestamps: true
})

export default model<IRoom>('Room', roomSchema)
