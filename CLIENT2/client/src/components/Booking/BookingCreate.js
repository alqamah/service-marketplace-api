import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function BookingCreate() {
  const [date, setDate] = useState('');
  const { serviceId } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', { service: serviceId, date });
      history.push('/bookings');
    } catch (error) {
      console.error('Error creating booking', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Service</h2>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingCreate;