import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import styles from '../../styles/Service.module.css'
import BookingCreate from '../Bookings/BookingCreate'

export default function ServiceDetail() {
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
 
  const [showBookingForm, setShowBookingForm] = useState(false)

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

  const handleBooking = () => {
    setShowBookingForm(true)
  }

  if (loading) {
    return <div className={styles.container}><p className={styles['text-gray-600']}>Loading...</p></div>
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles['text-gray-600']}>{error}</p>
        <Link to="/services" className={`${styles.button} ${styles['button-ghost']}`}>Back to Services</Link>
      </div>
    )
  }

  if (!service) {
    return (
      <div className={styles.container}>
        <p className={styles['text-gray-600']}>Service not found.</p>
        <Link to="/services" className={`${styles.button} ${styles['button-ghost']}`}>Back to Services</Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {showBookingForm ? (
        <BookingCreate serviceId={id} onBookingComplete={() => setShowBookingForm(false)} />
      ) : (
        <div className={styles.card}>
          <div className={styles['card-header']}>
            <h1 className={styles['card-title']}>{service.name}</h1>
          </div>
          <div className={styles['card-content']}>
            <p className={`${styles['text-gray-600']} ${styles['mb-4']}`}>{service.description}</p>
            <div className={`${styles.flex} ${styles['justify-between']} ${styles['items-center']}`}>
              <span className={`${styles['text-2xl']} ${styles['font-bold']} ${styles['text-yellow-400']}`}>
                ₹{service.price.toFixed(2)}
              </span>
              <button className={styles.button} onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
          <div className={styles['card-footer']}>
            <Link to="/services" className={`${styles.button} ${styles['button-ghost']} ${styles['w-full']}`}>
              Back to Services
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}