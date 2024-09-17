import React, { useState } from 'react'
import axios from 'axios'
import styles from '../../styles/Register.module.css'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', { name, email, password, role })
      setMessage('Registration successful!')
      setIsError(false)
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login')
      }, 2000) // Delay for 2 seconds to show the success message
    } catch (error) {
      setMessage('Registration failed. Please try again.')
      setIsError(true)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Register</h2>
        {message && (
          <div
            className={`${styles.message} ${
              isError ? styles.errorMessage : styles.successMessage
            }`}
          >
            {message}
          </div>
        )}
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
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
        <select
          className={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="provider">Service Provider</option>
        </select>
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  )
}