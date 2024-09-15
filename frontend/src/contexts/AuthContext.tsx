import React from 'react'

// Services
import authService from '../services/authService'

interface AuthContextProps {
	isAuthenticated: boolean
	login: (token: string) => void
	logout: () => void
}

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(authService.isAuthenticated())

	React.useEffect(() => {
		setIsAuthenticated(authService.isAuthenticated())
	}, [])

	const login = (token: string): void => {
		localStorage.setItem('userToken', token)
		setIsAuthenticated(true)
	}

	const logout = (): void => {
		authService.logout()
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextProps => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
