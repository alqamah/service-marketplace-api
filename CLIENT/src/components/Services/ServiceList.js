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
      <h1>Available Services</h1>
      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service._id} className={styles.card}>
            <div className={styles['card-header']}>
              <h2 className={styles['card-title']}>{service.name}</h2>
            </div>
            <div className={styles['card-content']}>
              <p className={`${styles['text-gray-600']} ${styles['mb-4']}`}>{service.description}</p>
              <div className={`${styles.flex} ${styles['justify-between']} ${styles['items-center']}`}>
                <span className={`${styles['text-2xl']} ${styles['font-bold']} ${styles['text-yellow-400']}`}>
                  ₹{service.price}
                </span>
                <Link to={`/services/${service._id}`} className={`${styles.button} ${styles['button-ghost']}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}