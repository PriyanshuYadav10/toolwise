import { z } from "zod";
import { createAiRoute } from "@/lib/ai/handler";

const schema = z.object({
  jobTitle: z.string().min(2).max(120),
  company: z.string().min(1).max(120),
  background: z.string().min(2).max(1500),
  tone: z.enum(["formal", "friendly", "confident"]).optional().default("formal"),
});

export const POST = createAiRoute({
  schema,
  buildPrompt: (input) => ({
    system:
      "You are an expert career writer. Write a complete, ready-to-send cover letter in plain text (no markdown formatting, no placeholder brackets left unfilled except a closing 'Sincerely, [Your Name]'). Keep it to 3-4 short paragraphs. Never invent specific facts about the company beyond its name.",
    prompt: `Write a ${input.tone} cover letter for this application:
Job title: ${input.jobTitle}
Company: ${input.company}
Candidate background and reason for interest: ${input.background}`,
    maxTokens: 700,
  }),
});
