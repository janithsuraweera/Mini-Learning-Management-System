import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (saved) setToken(saved);
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
    setReady(true);
  }, []);

  function login(nextToken, nextUser) {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  if (!ready) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


