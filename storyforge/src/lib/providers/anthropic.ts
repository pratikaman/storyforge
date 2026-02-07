import Anthropic from "@anthropic-ai/sdk";
import { AIProvider, ProviderRequest } from "./types";

export class AnthropicProvider implements AIProvider {
  name = "anthropic" as const;
  displayName = "Anthropic";
  description = "Direct Anthropic API";
  model = "claude-sonnet-4-5-20250929";

  isConfigured(): boolean {
    return !!process.env.ANTHROPIC_API_KEY;
  }

  async sendMessage(request: ProviderRequest): Promise<string> {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: this.model,
      max_tokens: request.maxTokens,
      system: request.systemPrompt,
      messages: [{ role: "user", content: request.userPrompt }],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from Anthropic");
    }

    return textContent.text;
  }
}
