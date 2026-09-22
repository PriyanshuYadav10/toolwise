import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  emphasis?: boolean;
  className?: string;
}

export function ResultCard({ label, value, emphasis, className }: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        emphasis
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-surface-sunken",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-semibold tracking-tight", emphasis ? "text-2xl text-primary" : "text-xl text-foreground")}>
        {value}
      </p>
    </div>
  );
}

export function ResultGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>{children}</div>;
}
