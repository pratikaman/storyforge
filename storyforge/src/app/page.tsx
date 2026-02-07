"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  PenTool,
  Brain,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

const features = [
  {
    icon: Compass,
    title: "Guided Learning Path",
    description:
      "8 expertly crafted modules from story structure to narrative mastery.",
  },
  {
    icon: PenTool,
    title: "Hands-On Practice",
    description:
      "Targeted writing exercises to build specific storytelling skills.",
  },
  {
    icon: Brain,
    title: "AI Writing Mentor",
    description:
      "Personalized feedback on creativity, structure, voice, and technique.",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description:
      "Earn XP, unlock badges, maintain streaks, and level up your craft.",
  },
];

const testimonials = [
  {
    quote:
      "StoryForge helped me understand why my stories felt flat. The module on conflict and tension was a game-changer.",
    author: "Alex M.",
    role: "Aspiring Novelist",
  },
  {
    quote:
      "The AI mentor caught things in my dialogue that three beta readers missed. Incredible feedback quality.",
    author: "Jordan K.",
    role: "Screenwriter",
  },
  {
    quote:
      "I went from writing scattered ideas to finishing my first complete short story in just two weeks.",
    author: "Sam R.",
    role: "Creative Writing Student",
  },
];

const modules = [
  { num: "01", title: "The Story Spine" },
  { num: "02", title: "Character Craft" },
  { num: "03", title: "Conflict & Tension" },
  { num: "04", title: "Dialogue" },
  { num: "05", title: "World-Building" },
  { num: "06", title: "Pacing & Structure" },
  { num: "07", title: "Theme & Meaning" },
  { num: "08", title: "Narrative Voice" },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]"
            >
              Master the art of{" "}
              <span className="text-[var(--accent)]">storytelling</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-[var(--muted)] max-w-xl mb-10 leading-relaxed"
            >
              Learn the craft behind great stories. Practice with guided exercises and get AI-powered feedback on your writing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <Link href={user ? "/learn" : "/auth/signup"}>
                <Button size="lg">
                  {user ? "Continue Learning" : "Get Started"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="/reference"
                className="text-sm text-[var(--muted)] hover:text-foreground transition-colors"
              >
                Browse Techniques
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-20 flex items-center gap-8 text-sm"
            >
              <div>
                <span className="font-mono font-bold text-xl text-foreground">32+</span>
                <span className="text-[var(--muted)] ml-2">Lessons</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div>
                <span className="font-mono font-bold text-xl text-foreground">12+</span>
                <span className="text-[var(--muted)] ml-2">Exercises</span>
              </div>
              <div className="w-px h-6 bg-[var(--border)]" />
              <div>
                <span className="font-mono font-bold text-xl text-foreground">15</span>
                <span className="text-[var(--muted)] ml-2">Badges</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-light mb-16"
          >
            Everything you need to write better
          </motion.h2>

          <div className="space-y-0">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 1;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`flex items-start gap-6 py-8 border-b border-[var(--border)] last:border-b-0 ${
                    isEven ? "sm:flex-row-reverse sm:text-right" : ""
                  }`}
                >
                  <Icon className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--muted)] text-sm max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-light mb-16"
          >
            Your learning journey
          </motion.h2>

          <div className="space-y-0">
            {modules.map((mod, index) => (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-baseline gap-6 py-4 border-b border-[var(--border)] last:border-b-0 group"
              >
                <span className="font-mono text-sm text-[var(--muted)] w-6">
                  {mod.num}
                </span>
                <span className="text-[var(--muted)]">&mdash;</span>
                <h3 className="font-display text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                  {mod.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/learn">
              <Button variant="outline">
                Explore Full Curriculum
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-light mb-16"
          >
            Writers love StoryForge
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-[var(--accent)] pl-6"
              >
                <span className="text-4xl font-display text-[var(--accent)] leading-none">&ldquo;</span>
                <p className="text-[var(--muted)] mb-4 leading-relaxed text-sm">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
              Ready to start your story?
            </h2>
            <Link href={user ? "/learn" : "/auth/signup"}>
              <Button size="lg">
                {user ? "Continue Learning" : "Begin Your Journey"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
