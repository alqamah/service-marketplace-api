// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles/Homepage.module.css';

// function Homepage() {
//   return (
//     <div className="homepage">
//       <h1>Welcome to Service Booking App</h1>
//       <p>Find and book services easily!</p>
//       <div className="cta-buttons">
//         <Link to="/services" className="btn btn-primary">Browse Services</Link>
//         <Link to="/register" className="btn btn-secondary">Sign Up</Link>
//       </div>
//     </div>
//   );
// }

// export default Homepage;
import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  homepage: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #4a90e2, #7e57c2)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  primaryButton: {
    backgroundColor: 'white',
    color: '#4a90e2',
  },
  secondaryButton: {
    backgroundColor: '#7e57c2',
    color: 'white',
  },
}

export default function Homepage() {
  return (
    <div style={styles.homepage}>
      <h1 style={styles.title}>Welcome to Service Booking App</h1>
      <p style={styles.subtitle}>Find and book services easily!</p>
      <div style={styles.ctaButtons}>
        <Link
          to="/services"
          style={{ ...styles.button, ...styles.primaryButton }}
        >
          Browse Services
        </Link>
        <Link
          to="/register"
          style={{ ...styles.button, ...styles.secondaryButton }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}