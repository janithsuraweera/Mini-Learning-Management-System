import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import Review from '../models/Review.js';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();

// Post or update a review (student must be enrolled)
router.post('/:courseId', requireAuth, requireRole('student', 'admin'), async (req, res) => {
  const { rating, comment } = req.body || {};
  if (!rating) return res.status(400).json({ error: 'Rating required' });
  const enrolled = await Enrollment.findOne({ course: req.params.courseId, student: req.user.id });
  if (!enrolled) return res.status(403).json({ error: 'Not enrolled' });
  const doc = await Review.findOneAndUpdate(
    { course: req.params.courseId, student: req.user.id },
    { $set: { rating, comment: comment || '' } },
    { upsert: true, new: true }
  );
  res.status(201).json(doc);
});

// Get rating summary for a course
router.get('/:courseId/summary', async (req, res) => {
  const [summary] = await Review.aggregate([
    { $match: { course: new Review.mongo.ObjectId(req.params.courseId) } },
    { $group: { _id: '$course', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  res.json({ average: summary?.avg || 0, count: summary?.count || 0 });
});

export default router;


