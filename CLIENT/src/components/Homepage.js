import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaUserPlus } from 'react-icons/fa'
import styles from '../styles/Homepage.module.css'

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <h1 className={styles.title}>Welcome to Service Booking App</h1>
      <p className={styles.subtitle}>
        Connect with skilled service providers and book appointments effortlessly.
        <br />
        From home repairs to personal care, find the perfect professional for your needs!
      </p>
      <div className={styles.ctaButtons}>
        <Link
          to="/services"
          className={`${styles.button} ${styles.primaryButton}`}
        >
          <FaSearch className={styles.icon} />
          Browse Services
        </Link>
        <Link
          to="/register"
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          <FaUserPlus className={styles.icon} />
          Register
        </Link>
      </div>
    </div>
  )
}