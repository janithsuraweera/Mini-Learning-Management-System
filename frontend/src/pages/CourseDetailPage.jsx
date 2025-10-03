import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';

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

  async function enroll() {
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`/api/courses/${id}/enroll`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Enrolled successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to enroll');
    }
  }

  if (!course) return <div className="text-sm text-gray-600">Loading...</div>;

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="mt-2 text-gray-700">{course.description}</p>
        <div className="mt-4">
          <Button onClick={enroll}>Enroll</Button>
        </div>
        {message && <div className="mt-3 text-sm text-green-700">{message}</div>}
        {error && <div className="mt-3 text-sm text-red-700">{error}</div>}
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Lessons</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {(course.lessons || []).map((l, idx) => (
            <li key={idx} className="text-gray-800">{l.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}


