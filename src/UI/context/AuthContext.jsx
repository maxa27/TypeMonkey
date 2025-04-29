import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isRegister, setIsRegister] = useState(false)

	const toggleMode = () => setIsRegister(prev => !prev)

	return (
		<AuthContext.Provider value={{ isRegister, toggleMode }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)