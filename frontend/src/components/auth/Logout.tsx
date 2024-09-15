import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Contexts
import { useAuth } from '../../contexts/AuthContext'

export default function Logout(): React.ReactElement {
	const navigate = useNavigate()
	const { logout } = useAuth()

	React.useEffect(() => {
		logout()
		toast.success('Logged out successfully')
		navigate('/')
	}, [])

	return (
		<div>Logout</div>
	)
}
