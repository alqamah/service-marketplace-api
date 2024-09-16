import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  serviceInfo: {
    marginBottom: '1rem',
    color: '#666',
  },
  servicePrice: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  button: {
    display: 'inline-block',
    width: '100%',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4a90e2',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#4a90e2',
    textDecoration: 'none',
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#666',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
}

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
    return <div style={styles.container}><p style={styles.loadingMessage}>Loading...</p></div>
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.errorMessage}>{error}</p>
        <Link to="/services" style={styles.backLink}>Back to Services</Link>
      </div>
    )
  }

  if (!service) {
    return (
      <div style={styles.container}>
        <p style={styles.errorMessage}>Service not found.</p>
        <Link to="/services" style={styles.backLink}>Back to Services</Link>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{service.name}</h1>
      <div style={styles.serviceCard}>
        <p style={styles.serviceInfo}>{service.description}</p>
        <p style={styles.servicePrice}>Price: ${service.price.toFixed(2)}</p>
        <button style={styles.button} onClick={handleBooking}>
          Book Now
        </button>
      </div>
      <Link to="/services" style={styles.backLink}>
        Back to Services
      </Link>
    </div>
  )
}