"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  BookOpen,
  HelpCircle,
  PenTool,
  Sparkles,
  Trophy,
} from "lucide-react";
import { getModuleById, getLessonById, modules } from "@/data/curriculum";
import { useProgressStore } from "@/stores/useProgressStore";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { XP_REWARDS } from "@/lib/xp";
import Button from "@/components/ui/Button";

type Tab = "lesson" | "examples" | "quiz" | "practice";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const courseModule = getModuleById(moduleId);
  const lesson = courseModule ? getLessonById(moduleId, lessonId) : null;

  const { completeLesson, saveQuizScore, completedLessons } = useProgressStore();
  const { addXP, unlockBadge, checkStreak } = useGamificationStore();

  const [activeTab, setActiveTab] = useState<Tab>("lesson");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  if (!courseModule || !lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">
          Lesson not found
        </h1>
        <Link href="/learn">
          <Button variant="outline">Back to Learning Path</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const currentLessonIndex = courseModule.lessons.findIndex(
    (l) => l.id === lesson.id
  );
  const nextLesson = courseModule.lessons[currentLessonIndex + 1];
  const currentModuleIndex = modules.findIndex((m) => m.id === moduleId);
  const nextModule = modules[currentModuleIndex + 1];

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "lesson", label: "Lesson", icon: BookOpen },
    { id: "examples", label: "Examples", icon: Sparkles },
    { id: "quiz", label: "Quiz", icon: HelpCircle },
    { id: "practice", label: "Practice", icon: PenTool },
  ];

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < lesson.quiz.length) return;

    setQuizSubmitted(true);
    const correct = lesson.quiz.filter(
      (q, i) => quizAnswers[i] === q.correctIndex
    ).length;

    saveQuizScore(lesson.id, correct, lesson.quiz.length);

    if (correct === lesson.quiz.length) {
      addXP(XP_REWARDS.PASS_QUIZ, "Perfect quiz score");
      unlockBadge("quiz-ace");
    } else if (correct >= lesson.quiz.length * 0.7) {
      addXP(Math.round(XP_REWARDS.PASS_QUIZ * 0.7), "Quiz passed");
    }
  };

  const handleCompleteLesson = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      addXP(XP_REWARDS.COMPLETE_LESSON, "Lesson completed");
      setShowCelebration(true);

      const totalCompleted = completedLessons.length + 1;
      if (totalCompleted === 1) unlockBadge("first-chapter");
      if (totalCompleted >= 5) unlockBadge("quick-study");
      if (totalCompleted >= 15) unlockBadge("bookworm");
      if (totalCompleted >= 32) unlockBadge("scholar");

      const moduleLessons = courseModule.lessons.map((l) => l.id);
      const moduleComplete = moduleLessons.every(
        (id) => id === lesson.id || completedLessons.includes(id)
      );
      if (moduleComplete) unlockBadge("module-master");

      setTimeout(() => setShowCelebration(false), 3000);
    }

    if (nextLesson) {
      router.push(`/learn/${moduleId}/${nextLesson.id}`);
    } else if (nextModule) {
      router.push(`/learn/${nextModule.id}`);
    } else {
      router.push("/learn");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Link
        href={`/learn/${moduleId}`}
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {courseModule.title}
      </Link>

      {/* Lesson Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-[var(--accent)]">
            LESSON {currentLessonIndex + 1} of {courseModule.lessons.length}
          </span>
          {isCompleted && (
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          )}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          {lesson.title}
        </h1>
        <p className="text-[var(--muted)] mt-2">{lesson.description}</p>
      </motion.div>

      {/* Tabs — underline style */}
      <div className="flex gap-0 border-b border-[var(--border)] mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-[var(--muted)] hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="lesson-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "lesson" && (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-[var(--accent)] prose-strong:text-foreground"
          >
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </motion.div>
        )}

        {activeTab === "examples" && (
          <motion.div
            key="examples"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {lesson.examples.map((example, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[var(--surface)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-display font-bold">{example.title}</h3>
                </div>
                <p className="text-xs text-[var(--accent)] font-medium mb-3">
                  From: {example.source}
                </p>
                <p className="text-[var(--muted)] leading-relaxed">
                  {example.text}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {lesson.quiz.map((question, qIndex) => (
              <div
                key={qIndex}
                className="p-6 rounded-xl bg-[var(--surface)]"
              >
                <h3 className="font-semibold mb-4">
                  {qIndex + 1}. {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect =
                      quizSubmitted && oIndex === question.correctIndex;
                    const isWrong =
                      quizSubmitted &&
                      isSelected &&
                      oIndex !== question.correctIndex;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [qIndex]: oIndex,
                            }));
                          }
                        }}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                            : isWrong
                              ? "border-red-500 bg-red-500/10 text-red-400"
                              : isSelected
                                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                                : "border-[var(--border)] hover:border-[var(--accent)]/30"
                        }`}
                      >
                        <span className="text-sm">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-[var(--muted)] bg-[var(--surface-2)] p-3 rounded-lg"
                  >
                    {question.explanation}
                  </motion.p>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <Button
                onClick={handleQuizSubmit}
                disabled={
                  Object.keys(quizAnswers).length < lesson.quiz.length
                }
              >
                Submit Answers
              </Button>
            ) : (
              <div className="p-4 rounded-xl bg-[var(--accent)]/5 border-l-2 border-[var(--accent)]">
                <p className="font-semibold">
                  Score:{" "}
                  {
                    lesson.quiz.filter(
                      (q, i) => quizAnswers[i] === q.correctIndex
                    ).length
                  }{" "}
                  / {lesson.quiz.length}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "practice" && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-6 rounded-xl bg-[var(--surface)] border-l-2 border-[var(--accent)]">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="font-display text-lg font-bold">
                  Writing Prompt
                </h3>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                {lesson.writingPrompt}
              </p>
              <Link href="/practice">
                <Button variant="outline">
                  Go to Practice Hub
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      <div className="mt-12 flex items-center justify-between pt-8 border-t border-[var(--border)]">
        {currentLessonIndex > 0 ? (
          <Link
            href={`/learn/${moduleId}/${courseModule.lessons[currentLessonIndex - 1].id}`}
          >
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          </Link>
        ) : (
          <div />
        )}

        <Button onClick={handleCompleteLesson}>
          {isCompleted ? "Next Lesson" : "Complete & Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Celebration toast */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-5 py-4 shadow-lg"
          >
            <Trophy className="w-6 h-6 text-[var(--accent)]" />
            <div>
              <p className="font-semibold text-sm">Lesson Complete!</p>
              <p className="text-xs text-[var(--muted)]">
                +{XP_REWARDS.COMPLETE_LESSON} XP earned
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
