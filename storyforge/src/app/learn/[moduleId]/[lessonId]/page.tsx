import type { Metadata } from "next";
import { modules, getModuleById, getLessonById } from "@/data/curriculum";
import LessonClient from "./LessonClient";

interface Props {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId, lessonId } = await params;
  const courseModule = getModuleById(moduleId);
  const lesson = courseModule ? getLessonById(moduleId, lessonId) : null;

  if (!courseModule || !lesson) {
    return { title: "Lesson Not Found" };
  }

  return {
    title: `${lesson.title} — ${courseModule.title}`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} — ${courseModule.title}`,
      description: lesson.description,
      url: `https://storyforge.app/learn/${moduleId}/${lessonId}`,
    },
    alternates: {
      canonical: `/learn/${moduleId}/${lessonId}`,
    },
  };
}

export function generateStaticParams() {
  return modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      moduleId: mod.id,
      lessonId: lesson.id,
    }))
  );
}

export default async function LessonPage({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const courseModule = getModuleById(moduleId);
  const lesson = courseModule ? getLessonById(moduleId, lessonId) : null;

  if (!courseModule || !lesson) {
    return <LessonClient />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    learningResourceType: "lesson",
    isPartOf: {
      "@type": "Course",
      name: courseModule.title,
    },
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
        name: "Learn",
        item: "https://storyforge.app/learn",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: courseModule.title,
        item: `https://storyforge.app/learn/${moduleId}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: lesson.title,
        item: `https://storyforge.app/learn/${moduleId}/${lessonId}`,
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
      <LessonClient />
    </>
  );
}
