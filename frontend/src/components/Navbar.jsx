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
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="inline-block h-6 w-6 rounded bg-gradient-to-br from-primary-500 to-accent-500" />
          Mini LMS
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
          <ThemeToggle />
          {user ? (
            <>
              {user.role === 'instructor' && (
                <Link to="/instructor" className="text-gray-600 hover:text-gray-900">Instructor</Link>
              )}
              <span className="hidden sm:inline text-gray-500">{user.name}</span>
              <button onClick={onLogout} className="text-gray-600 hover:text-gray-900">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


