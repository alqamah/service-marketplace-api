import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  nav: {
    backgroundColor: '#4a90e2',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 0.5rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
}

export default function Navigation() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/">
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/services">
            Services
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/bookings">
            My Bookings
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/profile">
            Profile
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/login">
            Login
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link style={styles.navLink} to="/register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  )
}