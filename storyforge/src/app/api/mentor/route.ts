import { NextRequest, NextResponse } from "next/server";
import { getProvider, type ProviderName } from "@/lib/providers";
import { MENTOR_SYSTEM_PROMPT, buildFeedbackPrompt } from "@/lib/mentor";

const VALID_PROVIDERS: ProviderName[] = ["anthropic", "openrouter", "bedrock"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exercise, writing, provider: providerName = "anthropic" } = body;

    if (!exercise || !writing) {
      return NextResponse.json(
        { error: "Missing exercise or writing data" },
        { status: 400 }
      );
    }

    if (writing.trim().split(/\s+/).length < 20) {
      return NextResponse.json(
        { error: "Please write at least 20 words before requesting feedback" },
        { status: 400 }
      );
    }

    if (!VALID_PROVIDERS.includes(providerName)) {
      return NextResponse.json(
        { error: `Invalid provider: ${providerName}` },
        { status: 400 }
      );
    }

    const provider = getProvider(providerName);

    if (!provider.isConfigured()) {
      return NextResponse.json(
        {
          error: `${provider.displayName} is not configured. Add the required API keys to .env.local.`,
        },
        { status: 500 }
      );
    }

    const userPrompt = buildFeedbackPrompt(exercise, writing);

    const responseText = await provider.sendMessage({
      systemPrompt: MENTOR_SYSTEM_PROMPT,
      userPrompt,
      maxTokens: 1024,
    });

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Could not parse AI feedback" },
        { status: 500 }
      );
    }

    const feedback = JSON.parse(jsonMatch[0]);

    // Validate expected structure
    if (
      !feedback.overallImpression ||
      !feedback.scores ||
      !feedback.strengths ||
      !feedback.improvements ||
      !feedback.nextStep
    ) {
      return NextResponse.json(
        { error: "Incomplete feedback from AI mentor" },
        { status: 500 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Mentor API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
