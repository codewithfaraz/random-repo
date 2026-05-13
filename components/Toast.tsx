"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (opts: { title: string; description?: string; variant?: ToastVariant; duration?: number }) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const VARIANTS = {
  success: { icon: CheckCircle2, bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  error: { icon: AlertCircle, bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
  warning: { icon: AlertCircle, bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  info: { icon: Info, bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
};

let idCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const toast = useCallback(
    ({ title, description = "", variant = "info", duration = 4000 }: {
      title: string;
      description?: string;
      variant?: ToastVariant;
      duration?: number;
    }) => {
      const id = `toast-${++idCounter}`;

      setToasts((prev) => [...prev, { id, title, description, variant }]);

      if (duration && duration !== Infinity) {
        timersRef.current[id] = setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[200] flex max-h-[calc(100vh-2rem)] flex-col-reverse gap-2 overflow-y-auto p-2">
        {toasts.map((t) => {
          const v = VARIANTS[t.variant];
          const Icon = v.icon;
          return (
            <div
              key={t.id}
              className={`flex w-full max-w-sm items-start gap-3 rounded-2xl border ${v.border} ${v.bg} p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-right-4`}
              role="alert"
            >
              <div className={`shrink-0 rounded-lg p-1.5 ${v.bg}`}>
                <Icon size={16} className={v.text} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-full p-1 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Dismiss"
              >
                <X size={14} />
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
  if (context === undefined) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}