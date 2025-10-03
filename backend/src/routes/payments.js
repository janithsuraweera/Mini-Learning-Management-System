import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import Payment from '../models/Payment.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();

// Mock Stripe checkout: creates a payment record and enrolls the user
router.post('/checkout', requireAuth, requireRole('student', 'admin'), async (req, res) => {
  const { courseId, payerName, payerEmail, cardLast4 } = req.body || {};
  const course = await Course.findById(courseId);
  if (!course || !course.isPublished) return res.status(404).json({ error: 'Course not found' });

  // mock price from course
  const amount = course.price ?? 19;
  await Payment.create({ user: req.user.id, course: course._id, amount, currency: 'USD', status: 'paid', payerName, payerEmail, cardLast4 });
  await Enrollment.findOneAndUpdate(
    { course: course._id, student: req.user.id },
    { $setOnInsert: { progress: 0 } },
    { upsert: true, new: true }
  );

  return res.json({ success: true, message: 'Payment successful and enrolled', amount, currency: 'USD' });
});

// List my payments
router.get('/me', requireAuth, async (req, res) => {
  const items = await Payment.find({ user: req.user.id }).populate('course', 'title');
  res.json(items);
});

export default router;


