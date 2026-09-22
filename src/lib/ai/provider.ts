import Groq from "groq-sdk";

export interface CompletionRequest {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiProvider {
  complete(req: CompletionRequest): Promise<string>;
}

/**
 * Swapping AI vendors (OpenAI, Anthropic, etc.) means implementing this
 * interface and changing getAiProvider() — call sites never import a vendor
 * SDK directly.
 */
class GroqProvider implements AiProvider {
  private client: Groq;
  private model = "openai/gpt-oss-120b";

  constructor(apiKey: string) {
    this.client = new Groq({ apiKey });
  }

  async complete({ system, prompt, maxTokens = 1024, temperature = 0.7 }: CompletionRequest): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      // gpt-oss models spend part of max_tokens on hidden reasoning before
      // the visible answer — keep effort low so the budget goes to output.
      reasoning_effort: "low",
      max_tokens: maxTokens,
      temperature,
    });
    return completion.choices[0]?.message?.content?.trim() ?? "";
  }
}

let cachedProvider: AiProvider | null = null;

export function getAiProvider(): AiProvider {
  if (cachedProvider) return cachedProvider;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured on the server.");
  }
  cachedProvider = new GroqProvider(apiKey);
  return cachedProvider;
}
