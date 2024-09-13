import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    let query;

    // If user is not an admin, they can only see their own bookings
    if (req.user.role !== 'admin') {
      query = Booking.find({ 
        $or: [{ customer: req.user.id }, { provider: req.user.id }]
      });
    } else {
      query = Booking.find();
    }

    const bookings = await query.populate({
      path: 'service',
      select: 'name description'
    }).populate({
      path: 'customer',
      select: 'name email'
    }).populate({
      path: 'provider',
      select: 'name email'
    });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: 'service',
      select: 'name description'
    }).populate({
      path: 'customer',
      select: 'name email'
    }).populate({
      path: 'provider',
      select: 'name email'
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Make sure user is booking owner or provider
    if (booking.customer.id.toString() !== req.user.id && 
        booking.provider.id.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to access this booking' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    req.body.customer = req.user.id;

    const service = await Service.findById(req.body.service);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    // Check if service is available
    if (!service.isAvailable) {
      return res.status(400).json({ success: false, error: 'Service is not available for booking' });
    }

    req.body.provider = service.provider;
    req.body.totalPrice = service.price;

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    // Make sure user is booking owner or provider
    if (booking.customer.toString() !== req.user.id && 
        booking.provider.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to update this booking' });
    }
    if(req.body.status === 'confirmed' && req.user.role !== 'provider'){
      return res.status(401).json({ success: false, error: 'Not authorized to confirm this booking' });
    } 
    if(req.body.status === 'completed' && req.user.role !== 'customer'){
      return res.status(401).json({ success: false, error: 'Not authorized to complete this booking' });
    }
    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Make sure user is booking owner or admin
    if (booking.customer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};