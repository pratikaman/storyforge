"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PenTool,
  Clock,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { exercises } from "@/data/exercises";
import { useProgressStore } from "@/stores/useProgressStore";
import Badge from "@/components/ui/Badge";

const difficultyColors = {
  beginner: "success",
  intermediate: "warning",
  advanced: "info",
} as const;

export default function PracticePage() {
  const { submittedExercises } = useProgressStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Writing Practice
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Put your knowledge into practice with guided writing exercises.
          Submit your work to get AI-powered feedback on creativity, structure,
          voice, and technique.
        </p>
      </motion.div>

      {/* Stats — inline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-6 mb-10 text-sm"
      >
        <div>
          <span className="font-mono font-bold text-xl text-[var(--accent)]">
            {exercises.length}
          </span>
          <span className="text-[var(--muted)] ml-2">Exercises</span>
        </div>
        <div className="w-px h-5 bg-[var(--border)]" />
        <div>
          <span className="font-mono font-bold text-xl text-emerald-500">
            {submittedExercises.length}
          </span>
          <span className="text-[var(--muted)] ml-2">Completed</span>
        </div>
        <div className="w-px h-5 bg-[var(--border)]" />
        <div>
          <span className="font-mono font-bold text-xl text-foreground">
            {exercises.length - submittedExercises.length}
          </span>
          <span className="text-[var(--muted)] ml-2">Remaining</span>
        </div>
      </motion.div>

      {/* Exercise List */}
      <div className="space-y-2">
        {exercises.map((exercise, index) => {
          const isSubmitted = submittedExercises.includes(exercise.id);

          return (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link href={`/practice/${exercise.id}`}>
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                    isSubmitted
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "bg-[var(--surface)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSubmitted
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-[var(--accent)]/10 text-[var(--accent)]"
                    }`}
                  >
                    <PenTool className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-sm group-hover:text-[var(--accent)] transition-colors">
                        {exercise.title}
                      </h3>
                      <Badge variant={difficultyColors[exercise.difficulty]}>
                        {exercise.difficulty}
                      </Badge>
                      {isSubmitted && (
                        <Badge variant="success">Done</Badge>
                      )}
                    </div>
                    <p className="text-xs text-[var(--muted)] line-clamp-1">
                      {exercise.description}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exercise.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5" />
                      {exercise.wordCountGuide.min}-
                      {exercise.wordCountGuide.max} words
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
