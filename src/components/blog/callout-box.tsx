import { Lightbulb, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    className: "border-success/30 bg-success/10 text-success",
    label: "Tip",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/30 bg-warning/10 text-warning",
    label: "Watch out",
  },
  note: {
    icon: Info,
    className: "border-accent/30 bg-accent/10 text-accent",
    label: "Note",
  },
} as const;

export function CalloutBox({
  variant = "note",
  text,
}: {
  variant?: "tip" | "warning" | "note";
  text?: string;
}) {
  const config = VARIANTS[variant];
  const Icon = config.icon;

  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", config.className)}>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide">{config.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">{text}</p>
      </div>
    </div>
  );
}
