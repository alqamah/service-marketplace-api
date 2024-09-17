import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/authService'
import styles from '../../styles/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(email, password)
      setMessage('Login successful!')
      setIsError(false)
      login(data.token, data.user)
      navigate('/services')
    } catch (error) {
      console.error('Login error', error)
      setMessage('Login failed. Please check your credentials.')
      setIsError(true)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
        {message && (
          <div className={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}