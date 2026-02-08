import type { Metadata } from "next";
import { exercises, getExerciseById } from "@/data/exercises";
import ExerciseClient from "./ExerciseClient";

interface Props {
  params: Promise<{ exerciseId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exerciseId } = await params;
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return { title: "Exercise Not Found" };
  }

  return {
    title: `${exercise.title} — Writing Exercise`,
    description: exercise.description,
    openGraph: {
      title: `${exercise.title} — Writing Exercise`,
      description: exercise.description,
      url: `https://storyforge.app/practice/${exerciseId}`,
    },
    alternates: {
      canonical: `/practice/${exerciseId}`,
    },
  };
}

export function generateStaticParams() {
  return exercises.map((ex) => ({ exerciseId: ex.id }));
}

export default async function ExercisePage({ params }: Props) {
  const { exerciseId } = await params;
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return <ExerciseClient />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: exercise.title,
    description: exercise.description,
    learningResourceType: "exercise",
    educationalLevel: exercise.difficulty,
    timeRequired: exercise.estimatedTime,
    provider: {
      "@type": "Organization",
      name: "StoryForge",
      url: "https://storyforge.app",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Practice",
        item: "https://storyforge.app/practice",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: exercise.title,
        item: `https://storyforge.app/practice/${exerciseId}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ExerciseClient />
    </>
  );
}
