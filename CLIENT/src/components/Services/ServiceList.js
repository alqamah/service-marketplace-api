import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from '../../styles/Service.module.css'

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
    <div className={styles.container}>
      <h2 className={styles.title}>Available Services</h2>
      {services.map((service) => (
        <div key={service._id} className={styles.serviceCard}>
          <h3 className={styles.serviceName}>{service.name}</h3>
          <p className={styles.serviceDescription}>{service.description}</p>
          <p className={styles.servicePrice}>Price: ${service.price}</p>
          <Link to={`/services/${service._id}`} className={styles.link}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}