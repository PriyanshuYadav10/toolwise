import { z } from "zod";
import { createAiRoute } from "@/lib/ai/handler";

const schema = z.object({
  goal: z.string().min(3).max(500),
  outputType: z.enum(["writing", "code", "image", "research", "general"]).optional().default("general"),
});

export const POST = createAiRoute({
  schema,
  buildPrompt: (input) => ({
    system:
      "You are an expert prompt engineer. Turn a short, informal goal into a single, detailed, well-structured prompt ready to paste into any AI tool. Include relevant context, constraints, desired format, and tone/style guidance where useful. Output only the final prompt text, no preamble or explanation.",
    prompt: `Goal: ${input.goal}\nIntended output type: ${input.outputType}\n\nWrite one detailed, structured prompt that would get a strong result for this goal.`,
    maxTokens: 500,
  }),
});
