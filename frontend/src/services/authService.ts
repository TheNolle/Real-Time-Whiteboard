import axios from 'axios'
import variables from '../variables'
import jwtDecode from 'jwt-decode'

class AuthService {
	async login(email: string, password: string) {
		const response = await axios.post(`${variables.api_url}/auth/login`, { email, password })
		if (response.data.token) {
			localStorage.setItem('userToken', response.data.token)
		}
		return response.data
	}

	async register(username: string, email: string, password: string) {
		const response = await axios.post(`${variables.api_url}/auth/register`, { username, email, password })
		if (response.data.token) {
			localStorage.setItem('userToken', response.data.token)
		}
		return response.data
	}

	logout() {
		localStorage.removeItem('userToken')
	}

	getCurrentUser() {
		return localStorage.getItem('userToken')
	}

	isAuthenticated() {
		const token = localStorage.getItem('userToken')
		if (!token) {
			return false
		}
		try {
			const decodedToken: any = jwtDecode(token)
			const currentTime = Date.now() / 1000
			return decodedToken.exp > currentTime
		} catch (error: any) {
			return false
		}
	}
}

export default new AuthService()
