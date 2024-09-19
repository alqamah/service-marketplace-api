import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/authService';
import styles from '../../styles/Booking.module.css';

export default function EditBooking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/${id}`);
        const dateTime = new Date(response.data.data.date);
        setDate(dateTime.toISOString().split('T')[0]);
        setTime(dateTime.toTimeString().slice(0, 5));
        setError(null);
      } catch (error) {
        setError('Failed to load booking. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDateTime = new Date(`${date}T${time}`);
      await axiosInstance.put(`/bookings/${id}`, { date: updatedDateTime });
      navigate('/bookings');
    } catch (error) {
      setError('Failed to update booking. Please try again.');
    }
  };

  if (loading) {
    return <div className={styles.container}><p className={styles.loadingMessage}>Loading...</p></div>;
  }

  if (error) {
    return <div className={styles.container}><p className={styles.errorMessage}>{error}</p></div>;
  }

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.title}>Edit Booking</h1>
      {loading && <p className={styles.loadingMessage}>Loading...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
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
          <button type="submit" className={styles.submitButton}>Update Booking</button>
        </form>
      )}
    </div>
  );
}
