import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button onClick={() => setDark((v) => !v)} className="text-sm text-gray-600 hover:text-gray-900">
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}


