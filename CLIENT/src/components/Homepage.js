import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Homepage.module.css'

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <h1 className={styles.title}>Welcome to Service Booking App</h1>
      <p className={styles.subtitle}>Find and book services easily!</p>
      <div className={styles.ctaButtons}>
        <Link
          to="/services"
          className={`${styles.button} ${styles.primaryButton}`}
        >
          Browse Services
        </Link>
        <Link
          to="/register"
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}