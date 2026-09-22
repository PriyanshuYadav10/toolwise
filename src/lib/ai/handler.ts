import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { getAiProvider } from "./provider";
import { checkRateLimit, getClientKey } from "./rate-limit";

interface CreateAiRouteOptions<T> {
  schema: ZodType<T>;
  buildPrompt: (input: T) => { system: string; prompt: string; maxTokens?: number };
}

export function createAiRoute<T>({ schema, buildPrompt }: CreateAiRouteOptions<T>) {
  return async function POST(request: Request) {
    const clientKey = getClientKey(request);
    const rateLimit = checkRateLimit(clientKey);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 30) } }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please fill in the required fields.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    try {
      const provider = getAiProvider();
      const { system, prompt, maxTokens } = buildPrompt(parsed.data);
      const result = await provider.complete({ system, prompt, maxTokens });
      if (!result) {
        return NextResponse.json({ error: "The AI didn't return a result. Please try again." }, { status: 502 });
      }
      return NextResponse.json({ result });
    } catch (error) {
      console.error("AI route error:", error);
      const message =
        error instanceof Error && error.message.includes("GROQ_API_KEY")
          ? "AI service is not configured."
          : "Something went wrong generating your content. Please try again.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
