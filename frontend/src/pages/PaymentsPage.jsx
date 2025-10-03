import { useEffect, useState } from 'react';
import api from '../utils/api.js';

export default function PaymentsPage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/payments/me')
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load payments'));
  }, []);

  if (error) return <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>;
  if (!items) return <div className="text-sm text-gray-600">Loading…</div>;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Payments</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Course</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Currency</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-2">{p.course?.title || 'Course'}</td>
                <td className="px-4 py-2">${p.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{p.currency}</td>
                <td className="px-4 py-2">{p.status}</td>
                <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


