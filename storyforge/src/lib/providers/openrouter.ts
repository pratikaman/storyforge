import { AIProvider, ProviderRequest } from "./types";

export class OpenRouterProvider implements AIProvider {
  name = "openrouter" as const;
  displayName = "OpenRouter";
  description = "OpenRouter API (multi-model gateway)";
  model = "anthropic/claude-sonnet-4-5-20250929";

  isConfigured(): boolean {
    return !!process.env.OPENROUTER_API_KEY;
  }

  async sendMessage(request: ProviderRequest): Promise<string> {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "StoryForge",
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: request.maxTokens,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenRouter API error: ${response.status} ${(errorData as { error?: { message?: string } }).error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenRouter");
    }

    return content;
  }
}
