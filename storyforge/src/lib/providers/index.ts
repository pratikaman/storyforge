import { AnthropicProvider } from "./anthropic";
import { OpenRouterProvider } from "./openrouter";
import { BedrockProvider } from "./bedrock";
import type { AIProvider, ProviderName } from "./types";

export type { AIProvider, ProviderName, ProviderRequest } from "./types";

const providers: Record<ProviderName, AIProvider> = {
  anthropic: new AnthropicProvider(),
  openrouter: new OpenRouterProvider(),
  bedrock: new BedrockProvider(),
};

export function getProvider(name: ProviderName): AIProvider {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return provider;
}

export function getConfiguredProviders(): AIProvider[] {
  return Object.values(providers).filter((p) => p.isConfigured());
}

export function getAllProviders(): AIProvider[] {
  return Object.values(providers);
}
