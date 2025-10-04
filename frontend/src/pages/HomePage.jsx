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

  const categories = [
    { name: 'Web Dev', desc: 'React, Node, MERN', color: 'from-primary-500 to-blue-500' },
    { name: 'Design', desc: 'UI/UX, Figma', color: 'from-pink-500 to-rose-500' },
    { name: 'Data', desc: 'SQL, Analytics', color: 'from-emerald-500 to-teal-500' },
    { name: 'Mobile', desc: 'React Native', color: 'from-amber-500 to-orange-500' },
    { name: 'AI', desc: 'LLMs, ML basics', color: 'from-purple-500 to-indigo-500' }
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:to-gray-900">
        <div className="grid items-center gap-8 p-10 md:grid-cols-2">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-600/10 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-primary-600/20 dark:text-primary-300">Learning Platform</span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">Build skills for your future</h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300">Professional courses by instructors. Learn at your pace with modern, clear UI and great UX.</p>
            <form onSubmit={onSearch} className="mt-6 flex items-stretch gap-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-3 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" placeholder="Search courses (e.g., React, Node)" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <Button variant="gradient" type="submit">Search</Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((t) => (
                <span key={t.name} className="rounded-full bg-gray-900/5 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 dark:bg-gray-100/5 dark:text-gray-300 dark:ring-gray-700">{t.name}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-gray-700">
              <img alt="Learning" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden aspect-video w-44 overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700 md:block">
              <img alt="Coding" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Top Instructors', desc: 'Learn from experts with real projects.' },
          { title: 'Flexible Learning', desc: 'Anytime, anywhere, on any device.' },
          { title: 'Modern UI/UX', desc: 'Clean, fast, accessible experience.' }
        ].map((f) => (
          <div key={f.title} className="card p-5">
            <div className="card-header">{f.title}</div>
            <div className="muted">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Explore categories</h2>
          <Button variant="outline" onClick={() => navigate('/courses')}>View all</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <button key={c.name} onClick={() => navigate(`/courses?search=${encodeURIComponent(c.name)}`)} className={`group overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800`}>
              <div className={`h-24 w-full rounded-md bg-gradient-to-br ${c.color} opacity-90 transition group-hover:opacity-100`} />
              <div className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-100">{c.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{c.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mt-12">
        <div className="card p-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">“This platform made learning fun and efficient. The interface is clean and professional.”</div>
          <div className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">A happy learner</div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-primary-600 to-teal-500 p-6 text-white shadow-sm dark:border-gray-700">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="text-lg font-semibold">Start learning today</div>
            <div className="text-sm text-white/90">Join and explore our latest courses</div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="!bg-white !text-gray-900 hover:!bg-gray-100" onClick={() => navigate('/register')}>Create account</Button>
            <Button variant="outline" className="!border-white !text-white hover:!bg-white/10" onClick={() => navigate('/courses')}>Browse courses</Button>
          </div>
        </div>
      </section>
    </div>
  );
}


