import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map(booking => (
        <div key={booking._id}>
          <h3>{booking.service.name}</h3>
          <p>Date: {new Date(booking.date).toLocaleString()}</p>
          <p>Status: {booking.status}</p>
          <p>Total Price: ${booking.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingList;