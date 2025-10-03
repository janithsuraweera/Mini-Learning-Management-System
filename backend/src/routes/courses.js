import express from 'express';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public: list published courses
router.get('/', async (req, res) => {
  const courses = await Course.find({ isPublished: true }).populate('instructor', 'name');
  res.json(courses);
});

// Instructor: list my courses
router.get('/mine', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { instructor: req.user.id };
  const courses = await Course.find(filter).sort({ createdAt: -1 });
  res.json(courses);
});

// Public: get single published course
router.get('/:id', async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id, isPublished: true }).populate('instructor', 'name');
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
});

// Instructor: create course
router.post('/', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const { title, description } = req.body;
  const course = await Course.create({ title, description, instructor: req.user.id });
  res.status(201).json(course);
});

// Instructor: update course
router.put('/:id', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (String(course.instructor) !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { title, description, lessons, isPublished } = req.body;
  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  if (Array.isArray(lessons)) course.lessons = lessons;
  if (isPublished !== undefined) course.isPublished = isPublished;
  await course.save();
  res.json(course);
});

// Instructor/Admin: delete
router.delete('/:id', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (String(course.instructor) !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  await course.deleteOne();
  res.json({ ok: true });
});

// Student: enroll
router.post('/:id/enroll', requireAuth, requireRole('student', 'admin'), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course || !course.isPublished) return res.status(404).json({ error: 'Not found' });
  const enrollment = await Enrollment.findOneAndUpdate(
    { course: course._id, student: req.user.id },
    { $setOnInsert: { progress: 0 } },
    { upsert: true, new: true }
  );
  res.status(201).json(enrollment);
});

// Student: my enrollments
router.get('/me/enrollments/list', requireAuth, async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id }).populate('course');
  res.json(enrollments);
});

export default router;


