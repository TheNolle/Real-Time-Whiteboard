import { Request, Response } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env['JWT_SECRET'] || process.exit(1)

// Register a new user
export const register = async (request: Request, response: Response) => {
	const { username, email, password } = request.body
	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return response.status(400).json({ message: 'User already exists' })
		}
		const newUser = new User({ username, email, password })
		await newUser.save()
		const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' })
		return response.status(201).json({ token, user: newUser })
	} catch (error: any) {
		return response.status(500).json({ message: 'Server error', details: error.message })
	}
}

// Login an user
export const login = async (request: Request, response: Response) => {
	const { email, password } = request.body
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return response.status(400).json({ message: 'Invalid credentials' })
		}
		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return response.status(400).json({ message: 'Invalid credentials' })
		}
		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })
		return response.status(200).json({ token, user })
	} catch (error: any) {
		return response.status(500).json({ message: 'Server error', details: error.message })
	}
}
