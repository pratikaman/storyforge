import type { Metadata } from "next";
import PracticeClient from "./PracticeClient";

export const metadata: Metadata = {
  title: "Writing Practice — Guided Exercises",
  description:
    "Put your storytelling knowledge into practice with guided writing exercises. Get AI-powered feedback on creativity, structure, voice, and technique.",
  openGraph: {
    title: "Writing Practice — Guided Exercises",
    description:
      "Guided writing exercises with AI-powered feedback on creativity, structure, voice, and technique.",
    url: "https://storyforge.app/practice",
  },
  alternates: {
    canonical: "/practice",
  },
};

export default function PracticePage() {
  return <PracticeClient />;
}
