import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  function onLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-10 border-b border-transparent bg-gradient-to-b from-gray-900 to-gray-900/80 text-white shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-[12px] font-bold text-white shadow-md">ML</span>
          <div className="leading-tight">
            <div className="text-base font-semibold">CourseSite</div>
            <div className="text-[11px] text-gray-300">Learn. Grow. Repeat.</div>
          </div>
        </Link>
        <div className="hidden items-center gap-4 text-sm md:flex">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/courses" className="rounded-md bg-white/10 px-3 py-1.5 text-white shadow-inner ring-1 ring-white/10 backdrop-blur hover:bg-white/20">Courses ▾</Link>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
        </div>
        <div className="hidden min-w-[280px] max-w-sm flex-1 items-center justify-center md:flex">
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40" placeholder="Search courses, topics..." />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/courses" className="hidden rounded-full bg-gradient-to-r from-primary-500 to-teal-400 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-primary-600 hover:to-teal-500 md:inline-flex">Start Learning</Link>
          <button title="Notifications" className="hidden items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 hover:text-white md:inline-flex">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 01-3.46 0"></path></svg>
          </button>
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'instructor' && (
                <Link to="/instructor" className="hidden text-gray-300 hover:text-white md:inline">Instructor</Link>
              )}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-xs font-bold text-white">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="hidden text-sm text-gray-200 sm:inline">{user.name}</span>
              </div>
              <button onClick={onLogout} className="text-sm text-gray-300 hover:text-white">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="hidden text-sm text-gray-300 hover:text-white md:inline">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


