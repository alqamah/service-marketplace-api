import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingCreate() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${serviceId}`);
        setService(response.data.data);
      } catch (error) {
        console.error('Error fetching service', error);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', {
        serviceId,
        date,
        time
      });
      navigate('/bookings');
    } catch (error) {
      console.error('Booking creation error', error);
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h2>Book {service.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingCreate;