import { z } from "zod";
import { createAiRoute } from "@/lib/ai/handler";

const schema = z.object({
  jobTitle: z.string().min(2).max(120),
  yearsExperience: z.string().max(30).optional().default(""),
  skills: z.string().min(2).max(1000),
  education: z.string().max(500).optional().default(""),
  projects: z.string().max(1000).optional().default(""),
});

export const POST = createAiRoute({
  schema,
  buildPrompt: (input) => ({
    system:
      "You are an expert resume writer. Write concise, achievement-focused resume content. Use strong action verbs, quantify impact where plausible, and avoid generic filler. Output plain text with clear section headers (no markdown asterisks). Never invent specific employer names, dates or numbers the user didn't provide.",
    prompt: `Write resume content for this candidate:
Target job title: ${input.jobTitle}
Years of experience: ${input.yearsExperience || "not specified"}
Skills: ${input.skills}
Education: ${input.education || "not specified"}
Notable projects: ${input.projects || "not specified"}

Produce, in this order:
1. PROFESSIONAL SUMMARY (2-3 sentences)
2. KEY SKILLS (a clean list)
3. EXPERIENCE HIGHLIGHTS (3-5 achievement-oriented bullet points, generic enough to adapt to a specific past role since no employer was given)
4. PROJECTS (if provided)`,
    maxTokens: 900,
  }),
});
