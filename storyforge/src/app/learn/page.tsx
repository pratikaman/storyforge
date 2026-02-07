"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Lock, ChevronRight } from "lucide-react";
import { modules } from "@/data/curriculum";
import { useProgressStore } from "@/stores/useProgressStore";
import ProgressBar from "@/components/ui/ProgressBar";

export default function LearnPage() {
  const { completedLessons } = useProgressStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Learning <span className="text-gradient">Path</span>
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Master storytelling step by step. Each module builds on the last,
          taking you from the foundations of narrative structure to advanced
          techniques used by the world&apos;s greatest writers.
        </p>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Overall Progress</h3>
          <span className="text-sm text-[var(--muted)]">
            {completedLessons.length} / {modules.reduce((a, m) => a + m.lessons.length, 0)} lessons
          </span>
        </div>
        <ProgressBar
          value={completedLessons.length}
          max={modules.reduce((a, m) => a + m.lessons.length, 0)}
          size="lg"
        />
      </motion.div>

      {/* Module Map */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--border)] hidden sm:block" />

        <div className="space-y-6">
          {modules.map((module, index) => {
            const lessonIds = module.lessons.map((l) => l.id);
            const completed = lessonIds.filter((id) =>
              completedLessons.includes(id)
            ).length;
            const total = lessonIds.length;
            const isCompleted = completed === total;
            const isStarted = completed > 0;
            const previousCompleted =
              index === 0 ||
              modules[index - 1].lessons.every((l) =>
                completedLessons.includes(l.id)
              );
            const isLocked = index > 0 && !previousCompleted && !isStarted;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={isLocked ? "#" : `/learn/${module.id}`}
                  className={`block ${isLocked ? "pointer-events-none" : ""}`}
                >
                  <div
                    className={`relative flex items-start gap-6 p-6 rounded-2xl border transition-all group ${
                      isCompleted
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : isLocked
                          ? "border-[var(--border)] bg-[var(--surface)] opacity-50"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-gold-500/30"
                    }`}
                  >
                    {/* Node indicator */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        isCompleted
                          ? "bg-emerald-500/20"
                          : isLocked
                            ? "bg-[var(--surface-2)]"
                            : "bg-gold-500/10"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7 text-emerald-500" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-[var(--muted)]" />
                      ) : (
                        <span>{module.icon}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-gold-500">
                          MODULE {String(index + 1).padStart(2, "0")}
                        </span>
                        {isCompleted && (
                          <span className="text-xs text-emerald-500 font-medium">
                            Complete
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-1 group-hover:text-gold-500 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mb-3">
                        {module.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <ProgressBar
                          value={completed}
                          max={total}
                          size="sm"
                          animated={false}
                        />
                        <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                          {completed}/{total}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    {!isLocked && (
                      <ChevronRight className="w-5 h-5 text-[var(--muted)] group-hover:text-gold-500 transition-colors flex-shrink-0 mt-1" />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
