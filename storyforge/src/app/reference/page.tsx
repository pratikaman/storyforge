import type { Metadata } from "next";
import ReferenceClient from "./ReferenceClient";

export const metadata: Metadata = {
  title: "Storytelling Reference — Techniques Encyclopedia",
  description:
    "A comprehensive encyclopedia of storytelling techniques with examples from literature and film. Explore foreshadowing, character arcs, narrative voice, and more.",
  openGraph: {
    title: "Storytelling Reference — Techniques Encyclopedia",
    description:
      "A comprehensive encyclopedia of storytelling techniques with examples from literature and film.",
    url: "https://storyforge.app/reference",
  },
  alternates: {
    canonical: "/reference",
  },
};

export default function ReferencePage() {
  return <ReferenceClient />;
}
