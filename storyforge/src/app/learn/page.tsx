import type { Metadata } from "next";
import { modules } from "@/data/curriculum";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title: "Learning Path — 8 Storytelling Modules",
  description:
    "Master storytelling step by step with 8 modules and 32 lessons covering story structure, character craft, dialogue, world-building, and narrative voice.",
  openGraph: {
    title: "Learning Path — 8 Storytelling Modules",
    description:
      "Master storytelling step by step with 8 modules and 32 lessons covering story structure, character craft, dialogue, world-building, and narrative voice.",
    url: "https://storyforge.app/learn",
  },
  alternates: {
    canonical: "/learn",
  },
};

export default function LearnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "StoryForge Storytelling Mastery",
    description:
      "A comprehensive storytelling course covering 8 modules from story structure to narrative voice, with AI-powered feedback.",
    provider: {
      "@type": "Organization",
      name: "StoryForge",
      url: "https://storyforge.app",
    },
    numberOfCredits: modules.length,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT10H",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LearnClient />
    </>
  );
}
