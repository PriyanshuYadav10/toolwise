"use client";

import { useState, useCallback } from "react";

interface UseAiGenerateOptions {
  endpoint: string;
}

export function useAiGenerate<TInput>({ endpoint }: UseAiGenerateOptions) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (input: TInput) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Something went wrong. Please try again.");
          setResult("");
          return null;
        }
        setResult(data.result);
        return data.result as string;
      } catch {
        setError("Couldn't reach the server. Check your connection and try again.");
        setResult("");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  return { result, setResult, loading, error, generate };
}
