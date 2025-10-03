import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import { Skeleton } from '../components/Skeleton.jsx';
import { useToast } from '../components/Toast.jsx';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const toast = useToast();

  useEffect(() => {
    api
      .get('/courses/mine')
      .then((res) => setCourses(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load courses'));
  }, []);

  const stats = useMemo(() => {
    if (!courses) return { total: 0, published: 0, drafts: 0 };
    const total = courses.length;
    const published = courses.filter((c) => c.isPublished).length;
    return { total, published, drafts: total - published };
  }, [courses]);

  const list = useMemo(() => {
    if (!courses) return null;
    let arr = courses;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter((c) => c.title.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }
    if (sort === 'title') arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'recent') arr = [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return arr;
  }, [courses, search, sort]);

  async function togglePublish(c) {
    try {
      const updated = await api.put(`/courses/${c._id}`, { isPublished: !c.isPublished });
      toast?.show(`${!c.isPublished ? 'Published' : 'Unpublished'} ${c.title}`, 'success');
      const res = await api.get('/courses/mine');
      setCourses(res.data);
    } catch (e) {
      toast?.show('Failed to update publish status', 'error');
    }
  }

  return (
    <div>
      <div className="mb-6 grid gap-4">
        <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your courses</p>
        </div>
          <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              try {
                await api.post('/courses/seed', { count: 12 });
                toast?.show('Seeded demo courses', 'success');
                const res = await api.get('/courses/mine');
                setCourses(res.data);
              } catch (e) {
                toast?.show('Failed to seed courses', 'error');
              }
            }}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Seed demo
          </button>
          <button
            onClick={async () => {
              try {
                const res = await api.post('/courses/seed/clear');
                toast?.show(`Removed ${res.data.removed} demo courses`, 'success');
                const list = await api.get('/courses/mine');
                setCourses(list.data);
              } catch (e) {
                toast?.show('Failed to clear demo courses', 'error');
              }
            }}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear demo
          </button>
          <Link to="/instructor/courses/new" className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
            New Course
          </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Published" value={stats.published} />
          <StatCard label="Drafts" value={stats.drafts} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <input className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" placeholder="Search your courses" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Most recent</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
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
          {list
            .filter((c) => true)
            .map((c) => (
              <div key={c._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-lg font-medium">{c.title}</div>
                <div className="mt-1 text-sm text-gray-600">{c.category} • ${c.price} • {c.isPublished ? 'Published' : 'Draft'}</div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => togglePublish(c)} className={`rounded-md px-3 py-1 text-sm ${c.isPublished ? 'border border-gray-300 bg-white hover:bg-gray-50' : 'bg-primary-600 text-white hover:bg-primary-700'}`}>{c.isPublished ? 'Unpublish' : 'Publish'}</button>
                  <Link to={`/instructor/courses/${c._id}/edit`} className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50">Edit</Link>
                </div>
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

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}


