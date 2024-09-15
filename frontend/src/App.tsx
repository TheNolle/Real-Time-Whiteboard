import React from 'react'

// Components
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Whiteboard from './components/Whiteboard'

export default function App(): React.ReactElement {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Whiteboard />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	)
}
