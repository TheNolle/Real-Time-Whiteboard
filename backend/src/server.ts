import 'dotenv/config'
import { createServer } from 'http'
import mongoose from 'mongoose'
import app from './app'
import { setupSocket } from './sockets/socketHandler'

// Environment variables
const PORT = process.env['PORT'] || 5000
const MONGO_HOST = process.env['MONGO_HOST']
const MONGO_PORT = process.env['MONGO_PORT']
const MONGO_DB = process.env['MONGO_DB']
const MONGO_USER = process.env['MONGO_USER']
const MONGO_PASS = process.env['MONGO_PASS']


// Clear console
console.clear()

// Create HTTP server and WebSocket server
const httpServer = createServer(app)
setupSocket(httpServer)

// MongoDB connection
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
	useBigInt64: true,
	auth: { username: MONGO_USER, password: MONGO_PASS },
	dbName: MONGO_DB,
}).then(() => {
	console.log('MongoDB connected')
	httpServer.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
}).catch((err) => {
	console.error('Error connecting to MongoDB:', err)
})
