import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <button onClick={enroll}>Enroll</button>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h3>Lessons</h3>
      <ol>
        {(course.lessons || []).map((l, idx) => (
          <li key={idx}>{l.title}</li>
        ))}
      </ol>
    </div>
  );
}


