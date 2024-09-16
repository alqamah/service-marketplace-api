import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const styles = {
  container: {
    maxWidth: '800px',
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
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  serviceName: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#4a90e2',
  },
  serviceDescription: {
    marginBottom: '0.5rem',
    color: '#666',
  },
  servicePrice: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  },
  link: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#4a90e2',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
}

export default function ServiceList() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services')
        setServices(response.data.data)
      } catch (error) {
        console.error('Error fetching services', error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Services</h2>
      {services.map((service) => (
        <div key={service._id} style={styles.serviceCard}>
          <h3 style={styles.serviceName}>{service.name}</h3>
          <p style={styles.serviceDescription}>{service.description}</p>
          <p style={styles.servicePrice}>Price: ${service.price}</p>
          <Link to={`/services/${service._id}`} style={styles.link}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}