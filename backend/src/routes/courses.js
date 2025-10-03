import express from 'express';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Payment from '../models/Payment.js';
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
  const { title, description, price, isPublished } = req.body;
  const course = await Course.create({ title, description, price: price ?? 19, isPublished: !!isPublished, instructor: req.user.id });
  res.status(201).json(course);
});

// Instructor/Admin: seed sample courses for demo (dev helper)
router.post('/seed', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(403).json({ error: 'Forbidden' });
  const { count = 9 } = req.body || {};
  const n = Math.max(1, Math.min(30, Number(count) || 9));
  const samples = Array.from({ length: n }).map((_, i) => ({
    title: `Sample Course ${i + 1}`,
    description: 'A concise, practical course to learn modern skills with projects.',
    instructor: req.user.id,
    isPublished: true,
    price: 19 + (i % 3) * 10,
    lessons: [
      { title: 'Introduction', content: '', order: 1 },
      { title: 'Core Concepts', content: '', order: 2 },
      { title: 'Project', content: '', order: 3 }
    ]
  }));
  const created = await Course.insertMany(samples);
  res.status(201).json({ created: created.length });
});

// Instructor/Admin: clear seeded demo data for this instructor
router.post('/seed/clear', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const demoCourses = await Course.find({ instructor: req.user.id, title: /^Sample Course/ });
  const ids = demoCourses.map((c) => c._id);
  if (ids.length) {
    await Promise.all([
      Course.deleteMany({ _id: { $in: ids } }),
      Enrollment.deleteMany({ course: { $in: ids } }),
      Payment.deleteMany({ course: { $in: ids } })
    ]);
  }
  res.json({ removed: ids.length });
});

// Instructor: update course
router.put('/:id', requireAuth, requireRole('instructor', 'admin'), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (String(course.instructor) !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { title, description, lessons, isPublished, price } = req.body;
  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  if (Array.isArray(lessons)) course.lessons = lessons;
  if (isPublished !== undefined) course.isPublished = isPublished;
  if (price !== undefined) course.price = price;
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


