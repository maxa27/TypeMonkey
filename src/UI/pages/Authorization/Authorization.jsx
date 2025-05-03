import React, { useRef, useState } from 'react'
import './Authorization.scss'
import { useUser } from '../../context/UserContext/UserProvider.jsx'

const Authorization = () => {
	const { login } = useUser()
	const [isRegister, setIsRegister] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const confirmRef = useRef(null)

	const toggleMode = () => {
		setIsRegister(prev => !prev)
		setErrorMessage('')
	}

	const handleSubmit = e => {
		e.preventDefault()
		const email = emailRef.current.value.trim()
		const password = passwordRef.current.value
		const confirmPassword = confirmRef.current?.value

		if (!email || !password) {
			setErrorMessage('The email address or password did not work.')
			return
		}

		if (isRegister) {
			if (!confirmPassword) {
				setErrorMessage('Please confirm your password.')
				return
			}
			if (password !== confirmPassword) {
				setErrorMessage("Passwords don't match.")
				return
			}
		}

		setErrorMessage('')
		emailRef.current.value = ''
		passwordRef.current.value = ''
		if (confirmRef.current) confirmRef.current.value = ''
	}

	return (
		<div className="authorization-wrapper">
			<div className="authorization-inner">
				<h2 className="login-title">{isRegister ? 'register' : 'login'}</h2>
				<div className="gradient-border">
					<div className="login-container">
						<form onSubmit={handleSubmit} className="login-form" noValidate>
							{errorMessage && <div className="auth-error">{errorMessage}</div>}
							<div className="gradient-border-input">
								<input type="email" placeholder="email" ref={emailRef} />
							</div>
							<div className="gradient-border-input">
								<input
									type="password"
									placeholder="password"
									ref={passwordRef}
								/>
							</div>
							{isRegister && (
								<div className="gradient-border-input">
									<input
										type="password"
										placeholder="confirm password"
										ref={confirmRef}
									/>
								</div>
							)}
							<div className="gradient-border-btn">
								<button type="submit">
									{isRegister ? 'Sign up' : 'Sign in'}
								</button>
							</div>
						</form>
						<div className="register-link">
							{isRegister ? (
								<>
									already have an account?{' '}
									<span onClick={toggleMode}>login</span>
								</>
							) : (
								<>
									no account? <span onClick={toggleMode}>register</span>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Authorization
