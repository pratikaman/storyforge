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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Learning Path
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Master storytelling step by step. Each module builds on the last,
          taking you from the foundations of narrative structure to advanced
          techniques used by the world&apos;s greatest writers.
        </p>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 p-6 rounded-xl bg-[var(--surface)] shadow-sm"
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
      <div className="space-y-3">
        {modules.map((courseModule, index) => {
          const lessonIds = courseModule.lessons.map((l) => l.id);
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
              key={courseModule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={isLocked ? "#" : `/learn/${courseModule.id}`}
                className={`block ${isLocked ? "pointer-events-none" : ""}`}
              >
                <div
                  className={`flex items-center gap-5 p-5 rounded-xl transition-all group ${
                    isCompleted
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : isLocked
                        ? "bg-[var(--surface)] opacity-50"
                        : "bg-[var(--surface)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {/* Number / Status */}
                  <div className="flex-shrink-0 w-10 text-center">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-[var(--muted)] mx-auto" />
                    ) : (
                      <span className="font-mono text-lg font-bold text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                        {courseModule.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-xs text-emerald-500 font-medium">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-2 line-clamp-1">
                      {courseModule.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px]">
                        <ProgressBar
                          value={completed}
                          max={total}
                          size="sm"
                          animated={false}
                        />
                      </div>
                      <span className="text-xs text-[var(--muted)]">
                        {completed}/{total}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  {!isLocked && (
                    <ChevronRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
