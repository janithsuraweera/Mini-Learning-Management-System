import express from 'express';
import authRoutes from './auth.js';
import courseRoutes from './courses.js';
import reportRoutes from './reports.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/reports', reportRoutes);

export default router;


