import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

import { protect, authorize } from '../middleware/auth.js';

router
  .route('/')
  .get(getServices)
  .post(protect, authorize('provider', 'admin'), createService);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('provider', 'admin'), updateService)
  .delete(protect, authorize('provider', 'admin'), deleteService);

export default router;