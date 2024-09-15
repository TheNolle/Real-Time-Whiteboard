import { Schema, model, Document } from 'mongoose'

interface IRoom extends Document {
	roomId: string
	drawingData: { x: number, y: number, isDrawing: boolean }[]
	users: string[]
}

const roomSchema = new Schema<IRoom>({
	roomId: { type: String, required: true, unique: true },
	drawingData: [{ x: Number, y: Number, isDrawing: Boolean }],
	users: [{ type: String }]
}, {
	timestamps: true
})

export default model<IRoom>('Room', roomSchema)
