"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { getModuleById } from "@/data/curriculum";
import { useProgressStore } from "@/stores/useProgressStore";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const courseModule = getModuleById(moduleId);
  const { completedLessons } = useProgressStore();

  if (!courseModule) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">
          Module not found
        </h1>
        <Link href="/learn">
          <Button variant="outline">Back to Learning Path</Button>
        </Link>
      </div>
    );
  }

  const completed = courseModule.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Path
      </Link>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="font-mono text-xs font-bold text-[var(--accent)]">
          MODULE {String(courseModule.order).padStart(2, "0")}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1 mb-4">
          {courseModule.title}
        </h1>
        <p className="text-[var(--muted)] mb-6">{courseModule.description}</p>

        <ProgressBar
          value={completed}
          max={courseModule.lessons.length}
          size="md"
          showLabel
        />
      </motion.div>

      {/* Lessons List */}
      <div className="space-y-2">
        {courseModule.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/learn/${moduleId}/${lesson.id}`}>
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                    isCompleted
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "bg-[var(--surface)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {/* Lesson Number */}
                  <div className="w-8 flex-shrink-0 text-center">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <span className="font-mono text-sm font-bold text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {lesson.title}
                    </h3>
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
