import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AIProvider, ProviderRequest } from "./types";

export class BedrockProvider implements AIProvider {
  name = "bedrock" as const;
  displayName = "AWS Bedrock";
  description = "AWS Bedrock (Claude via AWS)";
  model = "anthropic.claude-sonnet-4-5-20250929-v1:0";

  isConfigured(): boolean {
    return !!(
      process.env.AWS_REGION &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY
    );
  }

  async sendMessage(request: ProviderRequest): Promise<string> {
    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: request.maxTokens,
      system: request.systemPrompt,
      messages: [{ role: "user", content: request.userPrompt }],
    });

    const command = new InvokeModelCommand({
      modelId: this.model,
      contentType: "application/json",
      accept: "application/json",
      body: new TextEncoder().encode(body),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    const textContent = responseBody.content?.find(
      (c: { type: string }) => c.type === "text"
    );
    if (!textContent?.text) {
      throw new Error("No text response from Bedrock");
    }

    return textContent.text;
  }
}
