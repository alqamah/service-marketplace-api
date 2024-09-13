import express from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController.js';

const router = express.Router();

import { protect, authorize } from '../middleware/auth.js';

router
  .route('/')
  .get(protect, getBookings)
  .post(protect, authorize('customer'), createBooking);

router
  .route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, authorize('customer', 'admin'), deleteBooking);

export default router;