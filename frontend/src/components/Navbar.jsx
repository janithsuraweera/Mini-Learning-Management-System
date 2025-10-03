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
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="inline-block h-6 w-6 rounded bg-gradient-to-br from-primary-500 to-accent-500" />
          <span className="dark:text-gray-100">Mini LMS</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/courses" className={`hover:text-gray-900 dark:hover:text-white ${isActive('/courses') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>Courses</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`hover:text-gray-900 dark:hover:text-white ${isActive('/admin') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>Admin</Link>
          )}
          {user?.role === 'student' && (
            <Link to="/me" className={`hover:text-gray-900 dark:hover:text-white ${isActive('/me') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>My Learning</Link>
          )}
          <ThemeToggle />
          {user ? (
            <div className="relative flex items-center gap-3">
              {user.role === 'instructor' && (
                <Link to="/instructor" className={`hover:text-gray-900 dark:hover:text-white ${isActive('/instructor') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>Instructor</Link>
              )}
              <div className="group relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-xs font-bold text-white">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="hidden sm:inline text-gray-700 dark:text-gray-200">{user.name}</span>
                <div className="absolute right-0 top-full z-20 hidden w-40 translate-y-2 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md group-hover:block dark:border-gray-700 dark:bg-gray-800">
                  <Link to="/me" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">My Learning</Link>
                  {user.role === 'instructor' && (
                    <Link to="/instructor" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">Instructor</Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">Admin</Link>
                  )}
                  <button onClick={onLogout} className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


