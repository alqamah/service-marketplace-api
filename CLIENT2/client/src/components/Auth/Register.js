// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('customer');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/register', { name, email, password, role });
//       console.log(response.data);
//       // Handle successful registration (e.g., redirect to login)
//     } catch (error) {
//       console.log(error); 
//       console.error('Registration error', error.response.data);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="customer">Customer</option>
//         <option value="provider">Service Provider</option>
//       </select>
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default Register;
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
  select: {
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
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
  message: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '4px',
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
}

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, role })
      console.log(response.data)
      setMessage('Registration successful!')
      setIsError(false)
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration error', error.response?.data)
      setMessage('Registration failed. Please try again.')
      setIsError(true)
    }
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Register</h2>
        {message && (
          <div
            style={{
              ...styles.message,
              ...(isError ? styles.errorMessage : styles.successMessage),
            }}
          >
            {message}
          </div>
        )}
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
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
        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="provider">Service Provider</option>
        </select>
        <button style={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  )
}