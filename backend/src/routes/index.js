import express from 'express';
import authRoutes from './auth.js';
import courseRoutes from './courses.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);

export default router;


