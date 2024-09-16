import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/authService'
import styles from '../../styles/Booking.module.css'

export default function BookingCreate({ serviceId, onBookingComplete }) {
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/services/${serviceId}`)
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
  }, [serviceId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/bookings', {
        service: serviceId,
        date,
        time,
      })
      onBookingComplete(response.data.data)
      navigate('/bookings')
    } catch (error) {
      console.error('Booking creation error', error)
      setError('Failed to create booking. Please try again.')
    }
  }

  if (loading) {
    return <div className={styles.createContainer}><p className={styles.loadingMessage}>Loading...</p></div>
  }

  if (error) {
    return <div className={styles.createContainer}><p className={styles.errorMessage}>{error}</p></div>
  }

  if (!service) {
    return <div className={styles.createContainer}><p className={styles.errorMessage}>Service not found.</p></div>
  }

  return (
    <div className={styles.createContainer}>
      <h1 className={styles.title}>Book {service.name}</h1>
      <div className={styles.serviceDetails}>
        <p className={styles.serviceDescription}>{service.description}</p>
        <p className={styles.servicePrice}>Price: ${service.price.toFixed(2)}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          aria-label="Booking Date"
        />
        <input
          className={styles.input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          aria-label="Booking Time"
        />
        <button className={styles.button} type="submit">
          Book Now
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}