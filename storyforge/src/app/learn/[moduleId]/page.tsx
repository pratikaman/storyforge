import type { Metadata } from "next";
import { modules, getModuleById } from "@/data/curriculum";
import ModuleClient from "./ModuleClient";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const courseModule = getModuleById(moduleId);

  if (!courseModule) {
    return { title: "Module Not Found" };
  }

  return {
    title: `${courseModule.title} — Module ${courseModule.order}`,
    description: courseModule.description,
    openGraph: {
      title: `${courseModule.title} — Module ${courseModule.order}`,
      description: courseModule.description,
      url: `https://storyforge.app/learn/${moduleId}`,
    },
    alternates: {
      canonical: `/learn/${moduleId}`,
    },
  };
}

export function generateStaticParams() {
  return modules.map((mod) => ({ moduleId: mod.id }));
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;
  const courseModule = getModuleById(moduleId);

  if (!courseModule) {
    return <ModuleClient />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseModule.title,
    description: courseModule.description,
    provider: {
      "@type": "Organization",
      name: "StoryForge",
      url: "https://storyforge.app",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
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
      <ModuleClient />
    </>
  );
}
