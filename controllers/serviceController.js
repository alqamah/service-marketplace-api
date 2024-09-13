import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().populate('provider', 'name email');
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'name email');

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Provider only)
export const createService = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.provider = req.user.id;

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Provider only)
export const updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    // Make sure user is service provider
    if (service.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to update this service' });
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Provider only)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    // Make sure user is service provider
    if (service.provider.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this service' });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};