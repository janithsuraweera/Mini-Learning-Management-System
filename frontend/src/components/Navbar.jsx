import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-gray-900">Mini LMS</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
        </nav>
      </div>
    </header>
  );
}


