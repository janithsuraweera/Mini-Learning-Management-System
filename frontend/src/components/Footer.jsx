export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white/60 py-8 text-sm text-gray-700 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">Janith Suraweera</div>
          <div className="mt-1">Software Developer • Learning Platform</div>
          <div className="mt-2">Phone: 0762060052</div>
          <div>Email: janith@example.com</div>
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">Quick links</div>
          <ul className="mt-2 space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/register" className="hover:underline">Register</a></li>
          </ul>
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">Follow</div>
          <div className="mt-2 flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.48v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl px-4 text-xs text-gray-500">© {new Date().getFullYear()} Janith Suraweera. All rights reserved.</div>
    </footer>
  );
}



