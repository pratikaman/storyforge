export type ProviderName = "anthropic" | "openrouter" | "bedrock";

export interface ProviderRequest {
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
}

export interface AIProvider {
  name: ProviderName;
  displayName: string;
  description: string;
  model: string;
  isConfigured(): boolean;
  sendMessage(request: ProviderRequest): Promise<string>;
}
