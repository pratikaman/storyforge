"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Loader2,
  Clock,
  BarChart3,
  Lightbulb,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getExerciseById } from "@/data/exercises";
import { useProgressStore } from "@/stores/useProgressStore";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { XP_REWARDS } from "@/lib/xp";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface AIFeedback {
  overallImpression: string;
  scores: { creativity: number; structure: number; voice: number; technique: number };
  strengths: string[];
  improvements: string[];
  nextStep: string;
}

export default function ExercisePage() {
  const params = useParams();
  const exerciseId = params.exerciseId as string;
  const exercise = getExerciseById(exerciseId);

  const { submitExercise, submittedExercises } = useProgressStore();
  const { addXP, unlockBadge } = useGamificationStore();

  const [writing, setWriting] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!exercise) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">
          Exercise not found
        </h1>
        <Link href="/practice">
          <Button variant="outline">Back to Practice</Button>
        </Link>
      </div>
    );
  }

  const wordCount = writing
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const handleSubmit = async () => {
    if (wordCount < 20) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exercise: {
            title: exercise.title,
            description: exercise.description,
            techniqueCategory: exercise.techniqueCategory,
          },
          writing,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to get feedback");
      }

      const data = await response.json();
      setFeedback(data);

      if (!submittedExercises.includes(exercise.id)) {
        submitExercise(exercise.id);
        addXP(XP_REWARDS.SUBMIT_EXERCISE, "Exercise submitted");
        addXP(XP_REWARDS.AI_FEEDBACK, "AI feedback received");

        if (submittedExercises.length + 1 >= 1) unlockBadge("first-draft");
        if (submittedExercises.length + 1 >= 10) unlockBadge("prolific-writer");

        const avgScore =
          (data.scores.creativity +
            data.scores.structure +
            data.scores.voice +
            data.scores.technique) /
          4;
        if (avgScore >= 90) unlockBadge("critics-choice");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Make sure ANTHROPIC_API_KEY is set in .env.local"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Practice
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Prompt & Editor */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <h1 className="font-display text-2xl font-bold">
                {exercise.title}
              </h1>
              <Badge variant={exercise.difficulty === "beginner" ? "success" : exercise.difficulty === "intermediate" ? "warning" : "info"}>
                {exercise.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-[var(--muted)] mb-4">
              {exercise.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {exercise.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" />
                {exercise.wordCountGuide.min}-{exercise.wordCountGuide.max}{" "}
                words
              </span>
            </div>
          </motion.div>

          {/* Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl border border-gold-500/20 bg-gold-500/5 mb-6"
          >
            <p className="text-sm leading-relaxed">{exercise.prompt}</p>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-gold-500" />
              Tips
            </h3>
            <ul className="space-y-1.5">
              {exercise.tips.map((tip, i) => (
                <li
                  key={i}
                  className="text-xs text-[var(--muted)] flex items-start gap-2"
                >
                  <span className="text-gold-500 mt-0.5">&#8226;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <textarea
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
                placeholder="Start writing here..."
                className="w-full h-80 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-foreground resize-none focus:outline-none focus:border-gold-500/50 transition-colors font-body text-sm leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 text-xs text-[var(--muted)]">
                {wordCount} words
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Button
                onClick={handleSubmit}
                disabled={wordCount < 20 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Getting Feedback...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit for AI Feedback
                  </>
                )}
              </Button>
              {wordCount < 20 && wordCount > 0 && (
                <span className="text-xs text-[var(--muted)]">
                  Write at least 20 words
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: Feedback Panel */}
        <div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl border border-red-500/30 bg-red-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-red-500">Error</h3>
                </div>
                <p className="text-sm text-[var(--muted)]">{error}</p>
              </motion.div>
            )}

            {!feedback && !error && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center p-12 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="text-center">
                  <Star className="w-12 h-12 text-[var(--muted)] mx-auto mb-4 opacity-30" />
                  <p className="text-[var(--muted)] text-sm">
                    Write your response and submit to receive AI-powered
                    feedback on your writing.
                  </p>
                </div>
              </motion.div>
            )}

            {feedback && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Overall */}
                <div className="p-5 rounded-xl border border-gold-500/30 bg-gold-500/5">
                  <h3 className="font-display font-bold mb-2">
                    Overall Impression
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feedback.overallImpression}
                  </p>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(feedback.scores).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center"
                    >
                      <p className="text-2xl font-bold text-gold-500">
                        {value}
                      </p>
                      <p className="text-xs text-[var(--muted)] capitalize">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Strengths */}
                <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                  <h3 className="font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {feedback.strengths.map((s, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--muted)] flex items-start gap-2"
                      >
                        <span className="text-emerald-500 mt-0.5">+</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
                  <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Areas for Growth
                  </h3>
                  <ul className="space-y-2">
                    {feedback.improvements.map((s, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--muted)] flex items-start gap-2"
                      >
                        <span className="text-blue-400 mt-0.5">&#8594;</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Step */}
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <h3 className="font-semibold mb-2">Next Step</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {feedback.nextStep}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
