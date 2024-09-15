import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Styles
import '../../styles/components/auth.scss'

// Contexts
import { useAuth } from '../../contexts/AuthContext'

// Services
import authService from '../../services/authService'

// Components
import { Link } from 'react-router-dom'

export default function Login(): React.ReactElement {
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')

	const [error, setError] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(false)

	const navigate = useNavigate()
	const { login } = useAuth()

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			if (loading) return
			setLoading(true)
			const data = await authService.login(email, password)
			login(data.token, data.user.username)
			toast.success('Logged in successfully')
			navigate('/')
		} catch (error: any) {
			setError(error.response.data.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='auth-container'>
			<h2>Login</h2>
			<form onSubmit={handleLogin} autoComplete='off' aria-autocomplete='none'>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
				<button type='submit'>{loading ? 'Loading...' : 'Login'}</button>
				<small>Don't have an account? <Link to='/register'>Register</Link></small>
				{error && <p className='error'>{error}</p>}
			</form>
		</div>
	)
}
