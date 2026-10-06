import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Heart, Info, Trash2, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          const isWishlist = toast.type === 'wishlist';
          const isRemove = toast.type === 'remove';
          const isInfo = toast.type === 'info';

          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-center justify-between gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 transition-all duration-150"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium">
                {isWishlist ? (
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
                ) : isRemove ? (
                  <Trash2 className="w-4 h-4 text-amber-400 shrink-0" />
                ) : isInfo ? (
                  <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
