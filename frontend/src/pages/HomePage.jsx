import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button.jsx';

export default function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  function onSearch(e) {
    e.preventDefault();
    const search = q.trim();
    navigate(search ? `/courses?search=${encodeURIComponent(search)}` : '/courses');
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight">Learn anything, anytime.</h1>
          <p className="mt-2 text-gray-600">High-quality courses from instructors. Start your learning journey today.</p>
          <form onSubmit={onSearch} className="mt-6 flex items-stretch gap-2">
            <input className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" placeholder="Search for courses (e.g., React, Node)" value={q} onChange={(e) => setQ(e.target.value)} />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rotate-12 rounded-full bg-primary-100/60 blur-2xl" />
      </section>
    </div>
  );
}


