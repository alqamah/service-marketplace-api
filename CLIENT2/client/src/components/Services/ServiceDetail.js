import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import styles from '../../styles/Service.module.css'

export default function ServiceDetail() {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/services/${id}`)
        setService(response.data.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching service details', error)
        setError('Failed to load service details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  const handleBooking = async () => {
    try {
      await axios.post('/api/bookings', { serviceId: id })
      alert('Booking successful!')
    } catch (error) {
      console.error('Error booking service', error)
      alert('Booking failed. Please try again.')
    }
  }

  if (loading) {
    return <div className={styles.container}><p className={styles.loadingMessage}>Loading...</p></div>
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{error}</p>
        <Link to="/services" className={styles.backLink}>Back to Services</Link>
      </div>
    )
  }

  if (!service) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>Service not found.</p>
        <Link to="/services" className={styles.backLink}>Back to Services</Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{service.name}</h1>
      <div className={styles.serviceCard}>
        <p className={styles.serviceInfo}>{service.description}</p>
        <p className={styles.servicePrice}>Price: ${service.price.toFixed(2)}</p>
        <button className={styles.button} onClick={handleBooking}>
          Book Now
        </button>
      </div>
      <Link to="/services" className={styles.backLink}>
        Back to Services
      </Link>
    </div>
  )
}