import { Clock } from "lucide-react";
import type { Tool } from "@/lib/data/types";

export function ComingSoon({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface-sunken px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Clock className="size-5" />
      </span>
      <div>
        <p className="font-medium text-foreground">{tool.name} is coming soon</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;re still building this one. Check out a related tool below in the meantime.
        </p>
      </div>
    </div>
  );
}
