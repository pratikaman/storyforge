import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import AuthProvider from "@/components/auth/AuthProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "StoryForge — Master the Art of Storytelling",
  description:
    "Learn storytelling through guided lessons, hands-on practice, and AI-powered mentorship. From story structure to narrative voice, become the writer you were meant to be.",
  keywords: ["storytelling", "creative writing", "writing course", "narrative", "fiction writing"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-body antialiased`}
      >
        <AuthProvider initialUser={user}>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
