import type { MetadataRoute } from "next";
import { modules } from "@/data/curriculum";
import { exercises } from "@/data/exercises";
import { techniques } from "@/data/reference";

const BASE_URL = "https://storyforge.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/learn`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/practice`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/reference`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const modulePages: MetadataRoute.Sitemap = modules.map((mod) => ({
    url: `${BASE_URL}/learn/${mod.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const lessonPages: MetadataRoute.Sitemap = modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      url: `${BASE_URL}/learn/${mod.id}/${lesson.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const exercisePages: MetadataRoute.Sitemap = exercises.map((ex) => ({
    url: `${BASE_URL}/practice/${ex.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const techniquePages: MetadataRoute.Sitemap = techniques.map((t) => ({
    url: `${BASE_URL}/reference/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...modulePages,
    ...lessonPages,
    ...exercisePages,
    ...techniquePages,
  ];
}
