import React from 'react'

// Contexts
import { useAuth } from './contexts/AuthContext'

// Components
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Whiteboard from './components/Whiteboard'
import Welcome from './components/Welcome'
import RoomManager from './components/RoomManager'

export default function App(): React.ReactElement {
	const { isAuthenticated } = useAuth()

	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={isAuthenticated ? <RoomManager /> : <Welcome />} />
				<Route path='/whiteboard' element={<Whiteboard />} />
				{!isAuthenticated && <>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</>}
				{isAuthenticated && <Route path='/logout' element={<Logout />} />}
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</div>
	)
}
