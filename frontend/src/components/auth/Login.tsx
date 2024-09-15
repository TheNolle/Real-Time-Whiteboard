import React from 'react'
import { useNavigate } from 'react-router-dom'

// Styles
import '../../styles/components/auth.scss'

// Services
import authService from '../../services/authService'

export default function Login(): React.ReactElement {
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const navigate = useNavigate()

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			await authService.login(email, password)
			navigate('/')
		} catch (error: any) {
			setError(error.response.data.message || 'Login failed')
		}
	}

	return (
		<div className='auth-container'>
			<h2>Login</h2>
			<form onSubmit={handleLogin} autoComplete='off' aria-autocomplete='none'>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
				<button type='submit'>Login</button>
				{error && <p className='error'>{error}</p>}
			</form>
		</div>
	)
}
