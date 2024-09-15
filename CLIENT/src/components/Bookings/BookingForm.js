import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../redux/slices/bookingSlice';

const BookingForm = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({ service, date, time }));
  };

  return (
    <div className="booking-form-container">
      <h2>Create a Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
