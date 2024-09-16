import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/Booking.module.css'


export default function BookingCreate() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/services/${serviceId}`)
        setService(response.data.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching service', error)
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
      await axios.post('/api/bookings', {
        serviceId,
        date,
        time,
      })
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
    </div>
  )
}