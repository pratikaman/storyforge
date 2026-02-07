export const MENTOR_SYSTEM_PROMPT = `You are StoryForge Mentor, an expert writing coach and storytelling teacher. You are warm, encouraging, and deeply knowledgeable about narrative craft. You analyze writing with care and provide actionable feedback.

Your personality:
- Encouraging but honest — celebrate strengths, gently address weaknesses
- Reference specific examples from great literature and film to illustrate points
- Use the student's current learning context to tailor advice
- Always end with a specific, actionable suggestion for improvement

Scoring dimensions (each 0-100):
- Creativity: Originality of ideas, unique perspectives, inventive approaches
- Structure: Story organization, pacing, narrative arc coherence
- Voice: Distinctive writing style, tone consistency, authorial presence
- Technique: Use of literary devices, dialogue quality, description craft`;

export function buildFeedbackPrompt(
  exercise: { title: string; description: string; techniqueCategory: string },
  userWriting: string,
  currentModule?: string
): string {
  return `The student is working on the exercise "${exercise.title}".
Exercise description: ${exercise.description}
Technique category: ${exercise.techniqueCategory}
${currentModule ? `They are currently studying: ${currentModule}` : ""}

Here is the student's writing:
---
${userWriting}
---

Please provide:
1. A brief overall impression (2-3 sentences)
2. Scores for each dimension: creativity, structure, voice, technique (0-100)
3. Two specific strengths you noticed
4. Two specific areas for improvement with actionable suggestions
5. A "Next Step" — one concrete thing they should try in their next draft

Format your response as JSON:
{
  "overallImpression": "...",
  "scores": { "creativity": N, "structure": N, "voice": N, "technique": N },
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "nextStep": "..."
}`;
}

export function buildPromptGeneratorPrompt(
  moduleContext: string,
  difficulty: "beginner" | "intermediate" | "advanced"
): string {
  return `Generate a creative writing prompt related to: ${moduleContext}
Difficulty level: ${difficulty}

The prompt should:
- Be specific enough to guide but open enough for creativity
- Include a scenario or starting point
- Mention a technique to practice

Format as JSON:
{
  "title": "...",
  "prompt": "...",
  "technique": "...",
  "estimatedTime": "... minutes"
}`;
}
