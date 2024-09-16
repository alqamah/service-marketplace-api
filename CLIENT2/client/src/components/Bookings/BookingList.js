import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../styles/Booking.module.css'

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/bookings')
        console.log("fetched data:", response.data.data)
        setBookings(response.data.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching bookings', error)
        setError('Failed to load bookings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (loading) {
    return <div className={styles.container}><p className={styles.loadingMessage}>Loading bookings...</p></div>
  }

  if (error) {
    return <div className={styles.container}><p className={styles.errorMessage}>{error}</p></div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      {bookings.length === 0 ? (
        <p className={styles.bookingInfo}>You have no bookings yet.</p>
      ) : (
        <ul className={styles.bookingList}>
          {bookings.map(booking => (
            <li key={booking._id} className={styles.bookingCard}>
              <h2 className={styles.bookingTitle}>{booking.service.name}</h2>
              <p className={styles.bookingInfo}>
                Date: {new Date(booking.date).toLocaleString()}
              </p>
              <p className={`${styles.bookingStatus} ${
                booking.status === 'pending' ? styles.statusPending :
                booking.status === 'confirmed' ? styles.statusConfirmed :
                styles.statusCancelled
              }`}>
                Status: {booking.status}
              </p>
              <p className={styles.bookingPrice}>
                Total Price: ${booking.totalPrice.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}