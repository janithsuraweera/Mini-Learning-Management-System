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
      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link key={c._id} to={`/courses/${c._id}`} className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow">
            <div className="flex h-40 items-center justify-center rounded-md bg-gradient-to-br from-primary-50 to-white text-primary-700">
              <span className="text-lg font-medium">{c.title}</span>
            </div>
            <div className="mt-3 text-sm text-gray-600">By {c.instructor?.name || 'Unknown'}</div>
          </Link>
        ))}
      </div>
      {!courses.length && !error && (
        <div className="rounded-md border border-gray-200 bg-white p-6 text-center text-gray-600">No courses found</div>
      )}
    </div>
  );
}


