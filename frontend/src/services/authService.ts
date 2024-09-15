import axios from 'axios'
import variables from '../variables'

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
}

export default new AuthService()
