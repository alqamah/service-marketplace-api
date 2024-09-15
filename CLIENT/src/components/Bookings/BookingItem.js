import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../redux/slices/bookingSlice';

const BookingItem = ({ booking }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBooking(booking.id));
  };

  return (
    <div className="booking-item">
      <h3>Booking Details</h3>
      <p><strong>Service:</strong> {booking.service}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <div className="booking-actions">
        <button onClick={() => console.log('Edit booking')}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default BookingItem;
