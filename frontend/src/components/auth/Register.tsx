import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validatePassword } from '../../utils/password'

// Styles
import '../../styles/components/auth.scss'

// Contexts
import { useAuth } from '../../contexts/AuthContext'

// Services
import authService from '../../services/authService'

// Components
import { Link } from 'react-router-dom'

export default function Register(): React.ReactElement {
	const [username, setUsername] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [password2, setPassword2] = React.useState<string>('')

	const [error, setError] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(false)

	const navigate = useNavigate()
	const { login } = useAuth()

	const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			if (loading) return
			setLoading(true)
			const passwordValidation = await validatePassword(password, password2)
			if (!passwordValidation.valid) {
				setError(passwordValidation.message)
				return
			} else if (password.includes(username)) {
				setError('Password must not contain the username')
				return
			} else if (password.includes(email)) {
				setError('Password must not contain the email')
				return
			} else if (password.includes(email.split('@')[1])) {
				setError('Password must not contain the domain of the email')
				return
			}
			const data = await authService.register(username, email, password)
			login(data.token, data.user.username)
			toast.success('Registered successfully')
			navigate('/')
		} catch (error: any) {
			setError(error.response.data.message || 'Registration failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='auth-container'>
			<h2>Register</h2>
			<form onSubmit={handleRegister} autoComplete='off'>
				<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
				<input type='password' value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder='Confirm Password' required />
				<button type='submit'>{loading ? 'Loading...' : 'Register'}</button>
				<small>Already have an account? <Link to='/login'>Login</Link></small>
				{error && <p className='error'>{error}</p>}
			</form>
		</div>
	)
}
