"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  PenTool,
  Brain,
  Trophy,
  ArrowRight,
  ChevronRight,
  Quote,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

const features = [
  {
    icon: Compass,
    title: "Guided Learning Path",
    description:
      "8 expertly crafted modules from story structure to narrative mastery, with examples from literature and film.",
    span: "md:col-span-2",
  },
  {
    icon: Brain,
    title: "AI Writing Mentor",
    description:
      "Personalized feedback on creativity, structure, voice, and technique from an AI that understands craft.",
    span: "",
  },
  {
    icon: PenTool,
    title: "Hands-On Practice",
    description:
      "Targeted exercises designed to build specific storytelling skills through deliberate practice.",
    span: "",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description:
      "Earn XP, unlock badges, maintain streaks, and level up from Scribbler to Master Narrator as you learn.",
    span: "md:col-span-2",
  },
];

const curriculum = [
  { num: "01", title: "The Story Spine" },
  { num: "02", title: "Character Craft" },
  { num: "03", title: "Conflict & Tension" },
  { num: "04", title: "Dialogue" },
  { num: "05", title: "World-Building" },
  { num: "06", title: "Pacing & Structure" },
  { num: "07", title: "Theme & Meaning" },
  { num: "08", title: "Narrative Voice" },
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

const stats = [
  { label: "Lessons", value: "32+" },
  { label: "Exercises", value: "12+" },
  { label: "Techniques", value: "15+" },
  { label: "Badges", value: "15" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dot-grid opacity-[0.35] dark:opacity-[0.08]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[600px] hero-glow opacity-80 dark:opacity-50" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative max-w-3xl mx-auto px-6 py-24 text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              AI-Powered Learning
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.02em] mt-8 mb-6 text-balance leading-[1.08]"
          >
            Master the craft of{" "}
            <span className="italic text-[var(--accent)]">storytelling</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--muted)] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            From the hero&apos;s journey to narrative voice&mdash;learn the
            techniques behind the world&apos;s greatest stories with AI-powered
            feedback.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href={user ? "/learn" : "/auth/signup"}>
              <Button size="lg">
                {user ? "Continue Learning" : "Start Learning"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/reference">
              <Button variant="ghost" size="lg">
                Explore Techniques
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-20 pt-8 border-t border-[var(--border)]"
          >
            <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[var(--muted)] mt-0.5 tracking-widest uppercase font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features — Bento Grid ── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Everything you need to write better
            </h2>
            <p className="text-[var(--muted)] max-w-lg text-sm sm:text-base">
              A complete platform designed to transform you from a reader who
              admires great stories into a writer who creates them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`group relative p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-accent)] transition-all duration-300 ${feature.span}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              How it works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                step: "01",
                title: "Learn the craft",
                desc: "Study curated modules on story structure, character, dialogue, and narrative techniques used by the world's greatest writers.",
              },
              {
                step: "02",
                title: "Practice writing",
                desc: "Apply what you've learned through targeted writing exercises and creative prompts designed to build real skill.",
              },
              {
                step: "03",
                title: "Get AI feedback",
                desc: "Receive detailed, personalized analysis of your writing's creativity, structure, voice, and storytelling technique.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-mono text-xs text-[var(--accent)] font-bold tracking-wide">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-semibold mt-3 mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                8 modules, one path
              </h2>
              <p className="text-[var(--muted)] max-w-md text-sm sm:text-base">
                Carefully structured lessons that build on each other, from
                foundations to advanced narrative technique.
              </p>
            </div>
            <Link href="/learn" className="shrink-0">
              <Button variant="outline" size="sm">
                View Curriculum
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
            {curriculum.map((mod, index) => (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-4 p-5 bg-[var(--background)] hover:bg-[var(--surface)] transition-colors group cursor-default"
              >
                <span className="text-xs font-mono text-[var(--accent)] font-bold w-6">
                  {mod.num}
                </span>
                <span className="font-medium text-sm group-hover:text-[var(--accent)] transition-colors">
                  {mod.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--muted)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              What writers are saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
              >
                <Quote className="w-7 h-7 text-[var(--accent)] opacity-25 mb-5" />
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-muted)] flex items-center justify-center">
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.author}</p>
                    <p className="text-xs text-[var(--muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Start writing better stories
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-md mx-auto text-sm sm:text-base">
              Every great writer started somewhere. Begin your journey and
              discover the storyteller within.
            </p>
            <Link href={user ? "/learn" : "/auth/signup"}>
              <Button size="lg">
                {user ? "Continue Learning" : "Begin Your Journey"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
