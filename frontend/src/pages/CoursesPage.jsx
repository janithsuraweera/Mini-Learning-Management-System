import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load courses'));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-gray-600">Browse available published courses</p>
        </div>
      </div>
      {error && <div className="mb-4 rounded-md border border-red-20