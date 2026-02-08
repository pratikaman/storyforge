import type { Metadata } from "next";
import { techniques, getTechniqueById } from "@/data/reference";
import TechniqueClient from "./TechniqueClient";

interface Props {
  params: Promise<{ techniqueId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { techniqueId } = await params;
  const technique = getTechniqueById(techniqueId);

  if (!technique) {
    return { title: "Technique Not Found" };
  }

  return {
    title: `${technique.name} — Storytelling Technique`,
    description: technique.description,
    openGraph: {
      title: `${technique.name} — Storytelling Technique`,
      description: technique.description,
      url: `https://storyforge.app/reference/${techniqueId}`,
    },
    alternates: {
      canonical: `/reference/${techniqueId}`,
    },
  };
}

export function generateStaticParams() {
  return techniques.map((t) => ({ techniqueId: t.id }));
}

export default async function TechniquePage({ params }: Props) {
  const { techniqueId } = await params;
  const technique = getTechniqueById(techniqueId);

  if (!technique) {
    return <TechniqueClient />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: technique.name,
    description: technique.description,
    articleSection: technique.category,
    publisher: {
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
        name: "Reference",
        item: "https://storyforge.app/reference",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: technique.name,
        item: `https://storyforge.app/reference/${techniqueId}`,
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
      <TechniqueClient />
    </>
  );
}
