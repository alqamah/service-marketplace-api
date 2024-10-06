import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from '../styles/Navigation.module.css'

export default function Navigation() {
  const { isLoggedIn } = useAuth()

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/" end>
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/services">
            Services
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li className={styles.navItem}>
              <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/bookings">
                Bookings
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/profile">
                Profile
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/logout">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/login">
                Login
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`} to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}