import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { MENTOR_SYSTEM_PROMPT, buildFeedbackPrompt } from "@/lib/mentor";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "ANTHROPIC_API_KEY not configured. Add it to .env.local to enable AI feedback.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { exercise, writing } = body;

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

    const client = new Anthropic({ apiKey });

    const userPrompt = buildFeedbackPrompt(exercise, writing);

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: MENTOR_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No response from AI mentor" },
        { status: 500 }
      );
    }

    // Extract JSON from the response
    const responseText = textContent.text;
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
