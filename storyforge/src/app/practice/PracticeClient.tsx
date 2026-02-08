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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Writing <span className="text-gradient">Practice</span>
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Put your knowledge into practice with guided writing exercises.
          Submit your work to get AI-powered feedback on creativity, structure,
          voice, and technique.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-10"
      >
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
          <p className="text-2xl font-bold text-gold-500">
            {exercises.length}
          </p>
          <p className="text-xs text-[var(--muted)]">Exercises</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
          <p className="text-2xl font-bold text-emerald-500">
            {submittedExercises.length}
          </p>
          <p className="text-xs text-[var(--muted)]">Completed</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
          <p className="text-2xl font-bold text-purple-500">
            {exercises.length - submittedExercises.length}
          </p>
          <p className="text-xs text-[var(--muted)]">Remaining</p>
        </div>
      </motion.div>

      {/* Exercise List */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => {
          const isSubmitted = submittedExercises.includes(exercise.id);

          return (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/practice/${exercise.id}`}>
                <div
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all group ${
                    isSubmitted
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-gold-500/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSubmitted
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-gold-500/10 text-gold-500"
                    }`}
                  >
                    <PenTool className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-gold-500 transition-colors">
                        {exercise.title}
                      </h3>
                      <Badge variant={difficultyColors[exercise.difficulty]}>
                        {exercise.difficulty}
                      </Badge>
                      {isSubmitted && (
                        <Badge variant="success">Completed</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted)] line-clamp-1">
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

                  <ChevronRight className="w-4 h-4 text-[var(--muted)] group-hover:text-gold-500 transition-colors flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
