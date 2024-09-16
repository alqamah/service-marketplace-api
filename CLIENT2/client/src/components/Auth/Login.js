// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       console.log(response.data);
//       setSuccessMessage('Login successful!');
//       // Handle successful login (e.g., store token, redirect)
//     } catch (error) {
//       console.error('Login error', error.response.data);
//       console.log(error.response);
//       setSuccessMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react'
import axios from 'axios'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    textAlign: 'center',
  },
  errorMessage: {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    textAlign: 'center',
  },
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      console.log(response.data)
      setMessage('Login successful!')
      setIsError(false)
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error', error.response?.data)
      setMessage('Login failed. Please check your credentials.')
      setIsError(true)
    }
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
        {message && (
          <div style={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}