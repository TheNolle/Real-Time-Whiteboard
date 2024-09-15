import axios from 'axios'

export const validatePassword = async (password: string, password2: string): Promise<{ valid: boolean, message: string }> => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/
	if (!passwordRegex.test(password)) {
		return { valid: false, message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, one special character, and no spaces' }
	}
	const commonPasswordsResponse = await axios.get('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt')
	const commonPasswords = commonPasswordsResponse.data.split('\n')
	if (commonPasswords.includes(password)) {
		return { valid: false, message: 'Password is too common' }
	}
	if (password !== password2) {
		return { valid: false, message: 'Passwords do not match' }
	}
	return { valid: true, message: '' }
}
