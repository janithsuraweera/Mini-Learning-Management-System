import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          <Link to="/courses" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Courses</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Admin</Link>
          )}
          {user?.role === 'student' && (
            <Link to="/me" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">My Learning</Link>
          )}
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'instructor' && (
                <Link to="/instructor" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Instructor</Link>
              )}
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-xs font-bold text-white">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="hidden sm:inline text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
              <button onClick={onLogout} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Logout</button>
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


