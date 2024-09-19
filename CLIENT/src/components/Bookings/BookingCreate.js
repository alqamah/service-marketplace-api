import React, { useState } from 'react';
import axiosInstance from '../../api/authService';
import styles from '../../styles/Booking.module.css';

export default function BookingCreate({ serviceId, onBookingComplete }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/bookings', {
        service: serviceId,
        date: new Date(`${date}T${time}`),
      });
      onBookingComplete(response.data.data);
    } catch (error) {
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className={styles.createContainer}>
      <h1 className={styles.title}>Create Booking</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitButton}>Create Booking</button>
      </form>
    </div>
  );
}