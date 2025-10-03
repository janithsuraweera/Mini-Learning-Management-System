import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Payment from '../models/Payment.js';

const router = express.Router();

// Admin: high-level stats
router.get('/admin/stats', requireAuth, requireRole('admin'), async (req, res) => {
  const [courses, enrollments, payments] = await Promise.all([
    Course.countDocuments({}),
    Enrollment.countDocuments({}),
    Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: '$currency', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } }
    ])
  ]);
  res.json({ courses, enrollments, payments });
});

// Student: progress summary
router.get('/me/progress', requireAuth, requireRole('student', 'admin'), async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id }).populate('course', 'title lessons');
  const summary = enrollments.map((e) => {
    const total = e.course?.lessons?.length || 0;
    const completed = Math.round((e.progress / 100) * total);
    return { courseId: String(e.course?._id), title: e.course?.title, completed, pending: Math.max(0, total - completed), progress: e.progress };
  });
  res.json(summary);
});

export default router;


