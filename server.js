import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './utils/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/service.js';
import bookingRoutes from './routes/bookings.js';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use morgan for logging
app.use(morgan((tokens, req, res) => {
  const date = new Date(tokens.date(req, res));
  const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST
  const istDateString = istDate.toISOString().replace('Z', '').substring(0, 19).replace('T', ' ');
  return [
    `[${istDateString}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms -',
    tokens.res(req, res, 'content-length')
  ].join(' ');
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// export default app;
