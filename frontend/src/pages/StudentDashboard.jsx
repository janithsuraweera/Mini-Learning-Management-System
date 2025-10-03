import { useEffect, useState } from 'react';
import api from '../utils/api.js';

export default function StudentDashboard() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/reports/me/progress')
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load progress'));
  }, []);

  if (error) return <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>;
  if (!items) return <div className="text-sm text-gray-600">Loading…</div>;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">My Learning</h1>
      <div className="grid gap-4">
        {items.map((x) => (
          <div key={x.courseId} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{x.title}</div>
                <div className="text-xs text-gray-500">Completed {x.completed} • Pending {x.pending}</div>
              </div>
              <div className="w-40">
                <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                  <div className="h-2 bg-primary-600" style={{ width: `${Math.round(x.progress)}%` }} />
                </div>
                <div className="mt-1 text-right text-xs text-gray-600">{Math.round(x.progress)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


