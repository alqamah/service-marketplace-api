import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/authService'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Booking.module.css'

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    fetchBookings()
  }, [isLoggedIn, navigate])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/bookings')
      setBookings(response.data.data)
      setError(null)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('You are not authorized to view bookings. Please log in again.')
      } else {
        setError('Failed to load bookings. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`/bookings/${bookingId}`, { status: newStatus })
      fetchBookings() // Refresh the bookings list
    } catch (error) {
      setError('Failed to update booking status. Please try again.')
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/bookings/${bookingId}`)
      fetchBookings() // Refresh the bookings list
    } catch (error) {
      setError('Failed to cancel booking. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {user.role === 'admin' ? 'Bookings' : 'My Bookings'}
      </h1>
      {loading && <p className={styles.loadingMessage}>Loading bookings...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <>
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
                  <p className={`${styles.bookingStatus} ${styles[`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}`]}`}>
                    Status: {booking.status}
                  </p>
                  <p className={styles.bookingPrice}>
                    Total Price: ₹{booking.totalPrice.toFixed(2)}
                  </p>
                  {booking.status !== 'completed' && (
                    <div>
                      {(user.role === 'admin' || user.role === 'provider') && (
                        <button 
                          className={styles.confirmButton}
                          onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                        >
                          Confirm Booking
                        </button>
                      )}
                      <button 
                        className={styles.cancelButton}
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </button>
                      <button 
                        className={styles.updateButton}
                        onClick={() => navigate(`/bookings/${booking._id}/edit`)}
                      >
                        Update Booking
                      </button>
                      {(user.role === 'admin' || user.role === 'customer') && (
                        <button 
                          className={styles.completeButton}
                          onClick={() => updateBookingStatus(booking._id, 'completed')}
                        >
                          Mark as Completed
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}