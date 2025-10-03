import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const categories = ['All', 'Web Dev', 'Design', 'Data', 'Mobile', 'AI'];
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios
      .get('/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load courses'));
  }, []);

  const filtered = useMemo(() => {
    let list = courses;
    if (category !== 'All') {
      const tag = category.toLowerCase();
      list = list.filter((c) => (c.description || '').toLowerCase().includes(tag) || c.title.toLowerCase().includes(tag));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }
    if (sort === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'recent') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [courses, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-gray-600">Browse available published courses</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm ring-1 ${category === c ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-gray-700 ring-gray-200 hover:bg-gray-50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-64">
            <Input placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Most recent</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>
      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
      {!courses.length && !error && (
        <div className="rounded-md border border-gray-200 bg-white p-6 text-center text-gray-600">No courses found</div>
      )}
      {filtered.length > pageSize && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <div className="text-sm text-gray-700">Page {page} of {totalPages}</div>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}


