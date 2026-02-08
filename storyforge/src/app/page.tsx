import HomeClient from "./HomeClient";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StoryForge",
    url: "https://storyforge.app",
    description:
      "Learn storytelling through guided lessons, hands-on practice, and AI-powered mentorship.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://storyforge.app/reference?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StoryForge",
    url: "https://storyforge.app",
    description:
      "An AI-powered platform for learning the craft of storytelling through guided lessons, practice exercises, and personalized feedback.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
