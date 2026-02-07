export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export const badges: BadgeDefinition[] = [
  {
    id: "first-chapter",
    name: "First Chapter",
    description: "Complete your first lesson",
    icon: "BookOpen",
    condition: "completedLessons >= 1",
  },
  {
    id: "quick-study",
    name: "Quick Study",
    description: "Complete 5 lessons",
    icon: "Zap",
    condition: "completedLessons >= 5",
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Complete 15 lessons",
    icon: "Library",
    condition: "completedLessons >= 15",
  },
  {
    id: "scholar",
    name: "Scholar",
    description: "Complete all 32 lessons",
    icon: "GraduationCap",
    condition: "completedLessons >= 32",
  },
  {
    id: "quiz-ace",
    name: "Quiz Ace",
    description: "Score 100% on any quiz",
    icon: "Trophy",
    condition: "perfectQuiz",
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 100% on 10 quizzes",
    icon: "Crown",
    condition: "perfectQuizzes >= 10",
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Maintain a 3-day streak",
    icon: "Flame",
    condition: "streak >= 3",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "Fire",
    condition: "streak >= 7",
  },
  {
    id: "streak-legend",
    name: "Streak Legend",
    description: "Maintain a 30-day streak",
    icon: "Sparkles",
    condition: "streak >= 30",
  },
  {
    id: "first-draft",
    name: "First Draft",
    description: "Submit your first writing exercise",
    icon: "PenTool",
    condition: "submittedExercises >= 1",
  },
  {
    id: "prolific-writer",
    name: "Prolific Writer",
    description: "Submit 10 writing exercises",
    icon: "FileText",
    condition: "submittedExercises >= 10",
  },
  {
    id: "critics-choice",
    name: "Critic's Choice",
    description: "Get an AI feedback score above 90%",
    icon: "Star",
    condition: "aiScoreAbove90",
  },
  {
    id: "module-master",
    name: "Module Master",
    description: "Complete an entire module",
    icon: "Award",
    condition: "completedModules >= 1",
  },
  {
    id: "level-5",
    name: "Wordsmith",
    description: "Reach Level 5",
    icon: "Medal",
    condition: "level >= 5",
  },
  {
    id: "level-10",
    name: "Storyteller",
    description: "Reach Level 10",
    icon: "Gem",
    condition: "level >= 10",
  },
];

export function getBadgeById(id: string): BadgeDefinition | undefined {
  return badges.find((b) => b.id === id);
}
