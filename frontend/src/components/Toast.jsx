import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function show(message, type = 'info', timeoutMs = 3000) {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), timeoutMs);
  }

  const value = useMemo(() => ({ show }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-2 z-[100] flex justify-center">
        <div className="flex w-full max-w-md flex-col gap-2 px-4">
          {toasts.map((t) => (
            <div key={t.id} className={`pointer-events-auto rounded-md border p-3 text-sm shadow-sm ${t.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : t.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-gray-200 bg-white text-gray-800'}`}>
              {t.message}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


