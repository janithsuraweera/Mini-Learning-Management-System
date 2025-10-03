import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import api from '../utils/api.js';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load course'));
  }, [id]);

  async function buyAndEnroll() {
    setError('');
    setMessage('');
    try {
      await api.post('/payments/checkout', { courseId: id });
      setMessage('Payment successful. Enrolled!');
    } catch (err) {
      setError(err.response?.data?.error || 'Payment/enroll failed');
    }
  }

  if (!course) return <div className="text-sm text-gray-600 dark:text-gray-300">Loading...</div>;

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold dark:text-gray-100">{course.title}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{course.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <Button variant="gradient" onClick={buyAndEnroll}>Buy course • $19</Button>
          <Button onClick={() => window.history.back()} variant="outline">Back</Button>
        </div>
        {message && <div className="mt-3 text-sm text-green-700 dark:text-green-400">{message}</div>}
        {error && <div className="mt-3 text-sm text-red-700 dark:text-red-400">{error}</div>}
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 text-lg font-medium">Lessons</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {(course.lessons || []).map((l, idx) => (
            <li key={idx} className="text-gray-800 dark:text-gray-200">{l.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}


