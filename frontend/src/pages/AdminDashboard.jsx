import { useEffect, useState } from 'react';
import api from '../utils/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/reports/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load stats'));
  }, []);

  if (error) return <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>;
  if (!stats) return <div className="text-sm text-gray-600">Loading…</div>;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat title="Courses" value={stats.courses} />
        <Stat title="Enrollments" value={stats.enrollments} />
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-600">Payments</div>
          <ul className="mt-2 space-y-1 text-sm">
            {stats.payments.map((p) => (
              <li key={p._id} className="flex items-center justify-between"><span>{p._id}</span><span className="font-medium">{p.totalAmount.toFixed(2)}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}


