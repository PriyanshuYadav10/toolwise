import { z } from "zod";
import { createAiRoute } from "@/lib/ai/handler";

const schema = z.object({
  text: z.string().min(2).max(4000),
  tone: z.enum(["formal", "casual", "concise", "simple"]).optional().default("concise"),
});

const toneInstructions: Record<string, string> = {
  formal: "more formal and professional",
  casual: "more casual and conversational",
  concise: "more concise, cutting unnecessary words while keeping the meaning",
  simple: "simpler and easier to understand, avoiding jargon",
};

export const POST = createAiRoute({
  schema,
  buildPrompt: (input) => ({
    system:
      "You rewrite text while faithfully preserving its original meaning. Output only the rewritten text with no preamble, no quotation marks, and no explanation.",
    prompt: `Rewrite the following text to be ${toneInstructions[input.tone]}:\n\n${input.text}`,
    maxTokens: 800,
  }),
});
