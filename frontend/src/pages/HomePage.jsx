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
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 p-0 shadow-sm">
        <div className="grid items-center gap-6 p-10 md:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900">Learn anything, anytime.</h1>
            <p className="mt-3 text-gray-700">High-quality courses from instructors. Start your learning journey today.</p>
            <form onSubmit={onSearch} className="mt-6 flex items-stretch gap-2">
              <input className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" placeholder="Search for courses (e.g., React, Node)" value={q} onChange={(e) => setQ(e.target.value)} />
              <Button type="submit">Search</Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Web Dev', 'Design', 'Data', 'Mobile', 'AI'].map((t) => (
                <span key={t} className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-200">{t}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/60 shadow-lg">
              <img alt="Learning" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden aspect-video w-40 overflow-hidden rounded-lg border border-white/60 shadow-md md:block">
              <img alt="Coding" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-14 -top-14 h-72 w-72 rotate-12 rounded-full bg-primary-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -left-14 -bottom-14 h-72 w-72 -rotate-12 rounded-full bg-secondary-100/70 blur-2xl" />
      </section>
    </div>
  );
}


