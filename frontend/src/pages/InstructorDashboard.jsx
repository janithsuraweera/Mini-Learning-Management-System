import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import { Skeleton } from '../components/Skeleton.jsx';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/courses/mine')
      .then((res) => setCourses(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load courses'));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your courses</p>
        </div>
        <Link to="/instructor/courses/new" className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          New Course
        </Link>
      </div>
      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {courses === null ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses
            .filter((c) => true)
            .map((c) => (
              <div key={c._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-lg font-medium">{c.title}</div>
                <div className="mt-1 text-sm text-gray-600">{c.isPublished ? 'Published' : 'Draft'}</div>
              </div>
            ))}
        </div>
      )}
      {!error && courses && courses.length === 0 && (
        <div className="mt-4 rounded-md border border-gray-200 bg-white p-6 text-center text-gray-600">You have no courses yet</div>
      )}
    </div>
  );
}


