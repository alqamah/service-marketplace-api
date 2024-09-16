import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'
import styles from '../styles/Navigation.module.css'

export default function Navigation() {
  const { isLoggedIn } = useAuth()

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/services">
            Services
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/bookings">
                My Bookings
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/profile">
                Profile
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn ? (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/login">
                Login
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
              <Link className={styles.navLink} to="/logout">
                Logout
              </Link>
            </li>
        )}
      </ul>
    </nav>
  )
}