import express from 'express';
import { register, login, logout, editProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/profile', protect, editProfile);
router.post('/login', login);
router.post('/logout', logout);

export default router;