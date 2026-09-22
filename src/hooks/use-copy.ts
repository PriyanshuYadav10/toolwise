"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/toast";
import { track } from "@/lib/analytics";

export function useCopy(toolSlug?: string) {
  const [copied, setCopied] = useState(false);
  const { show } = useToast();

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        show("Copied to clipboard");
        if (toolSlug) track({ name: "copy_clicked", toolSlug });
        setTimeout(() => setCopied(false), 2000);
      } catch {
        show("Couldn't copy — please copy manually", "error");
      }
    },
    [show, toolSlug]
  );

  return { copy, copied };
}
