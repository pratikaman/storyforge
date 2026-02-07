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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold text-gold-500">
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

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-gold-500"
                  : "text-[var(--muted)] hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="lesson-tab"
                  className="absolute inset-0 bg-gold-500/10 border border-gold-500/20 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-gold-500 prose-strong:text-foreground"
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
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <h3 className="font-display font-bold">{example.title}</h3>
                </div>
                <p className="text-xs text-gold-500 font-medium mb-3">
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
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
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
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                            : isWrong
                              ? "border-red-500 bg-red-500/10 text-red-400"
                              : isSelected
                                ? "border-gold-500 bg-gold-500/10 text-gold-500"
                                : "border-[var(--border)] hover:border-gold-500/30"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : isWrong
                                ? "border-red-500 bg-red-500 text-white"
                                : isSelected
                                  ? "border-gold-500 bg-gold-500 text-navy-900"
                                  : "border-[var(--border)]"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : isWrong ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            String.fromCharCode(65 + oIndex)
                          )}
                        </span>
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
              <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/5">
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
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-5 h-5 text-gold-500" />
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

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-[var(--background)] border border-gold-500/30 rounded-2xl p-8 text-center shadow-2xl pointer-events-auto"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-display text-xl font-bold mb-2">
                Lesson Complete!
              </h3>
              <p className="text-[var(--muted)] text-sm">
                +{XP_REWARDS.COMPLETE_LESSON} XP earned
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
