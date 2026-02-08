import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import AuthProvider from "@/components/auth/AuthProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://storyforge.app"),
  title: {
    default: "StoryForge — Master the Art of Storytelling",
    template: "%s | StoryForge",
  },
  description:
    "Learn storytelling through guided lessons, hands-on practice, and AI-powered mentorship. From story structure to narrative voice, become the writer you were meant to be.",
  keywords: [
    "storytelling",
    "creative writing",
    "writing course",
    "narrative",
    "fiction writing",
    "story structure",
    "character development",
    "writing exercises",
    "AI writing mentor",
    "learn to write",
    "hero's journey",
    "three-act structure",
    "dialogue writing",
    "world-building",
  ],
  authors: [{ name: "StoryForge" }],
  creator: "StoryForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "StoryForge",
    title: "StoryForge — Master the Art of Storytelling",
    description:
      "Learn storytelling through guided lessons, hands-on practice, and AI-powered mentorship. 32 lessons, 12 exercises, and an AI writing mentor.",
    url: "https://storyforge.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoryForge — Master the Art of Storytelling",
    description:
      "Learn storytelling through guided lessons, hands-on practice, and AI-powered mentorship.",
    creator: "@storyforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://storyforge.app",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${fraunces.variable} font-body antialiased`}
      >
        <AuthProvider initialUser={user}>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen pt-14">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
