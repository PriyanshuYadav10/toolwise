"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  show: (message: string, kind?: ToastKind) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const icons: Record<ToastKind, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const show = React.useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = icons[toast.kind];
          return (
            <div
              key={toast.id}
              role="status"
              className={cn(
                "flex animate-slide-up items-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm shadow-lg",
                toast.kind === "success" && "text-success",
                toast.kind === "error" && "text-destructive",
                toast.kind === "info" && "text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="text-foreground">{toast.message}</span>
              <button
                onClick={() => setToasts((t) => t.filter((x) => x.id !== toast.id))}
                className="ml-1 text-muted-foreground hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
