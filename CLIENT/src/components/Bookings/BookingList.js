import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/slices/bookingSlice';
import BookingItem from './BookingItem';

const BookingList = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.bookings);
  const status = useSelector(state => state.bookings.status);
  const error = useSelector(state => state.bookings.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="booking-list">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
};

export default BookingList;
