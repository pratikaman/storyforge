"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BookOpen,
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-3xl">
            {courseModule.icon}
          </div>
          <div className="flex-1">
            <span className="text-xs font-mono font-bold text-gold-500">
              MODULE {String(courseModule.order).padStart(2, "0")}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              {courseModule.title}
            </h1>
          </div>
        </div>
        <p className="text-[var(--muted)] mb-6">{courseModule.description}</p>

        <div className="flex items-center gap-4">
          <ProgressBar
            value={completed}
            max={courseModule.lessons.length}
            size="md"
            showLabel
          />
        </div>
      </motion.div>

      {/* Lessons List */}
      <div className="space-y-4">
        {courseModule.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={`/learn/${moduleId}/${lesson.id}`}>
                <div
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all group ${
                    isCompleted
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-gold-500/30"
                  }`}
                >
                  {/* Lesson Number */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500/20"
                        : "bg-[var(--surface-2)]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <span className="text-sm font-bold text-[var(--muted)]">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-gold-500 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="hidden sm:flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {lesson.examples.length} examples
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~10 min
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
