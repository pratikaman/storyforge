export const XP_REWARDS = {
  COMPLETE_LESSON: 50,
  PASS_QUIZ: 30,
  SUBMIT_EXERCISE: 40,
  AI_FEEDBACK: 20,
  DAILY_STREAK: 10,
} as const;

const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200,
  7600, 9200, 11000, 13000, 15500, 18500, 22000,
];

const LEVEL_TITLES: Record<number, string> = {
  1: "Scribbler",
  2: "Apprentice",
  3: "Notetaker",
  4: "Chronicler",
  5: "Wordsmith",
  6: "Penman",
  7: "Scribe",
  8: "Author",
  9: "Raconteur",
  10: "Storyteller",
  11: "Fabulist",
  12: "Mythmaker",
  13: "Sage",
  14: "Laureate",
  15: "Bard",
  16: "Virtuoso",
  17: "Luminary",
  18: "Legend",
  19: "Grandmaster",
  20: "Master Narrator",
};

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[level] || "Master Narrator";
}

export function getXPForLevel(level: number): number {
  return LEVEL_THRESHOLDS[level - 1] || 0;
}

export function getXPForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}

export function getLevelProgress(xp: number, level: number): number {
  const currentThreshold = getXPForLevel(level);
  const nextThreshold = getXPForNextLevel(level);
  if (nextThreshold === currentThreshold) return 100;
  return Math.round(
    ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  );
}
