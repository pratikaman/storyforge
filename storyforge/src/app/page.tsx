"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  PenTool,
  Sparkles,
  Brain,
  Trophy,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

const features = [
  {
    icon: Compass,
    title: "Guided Learning Path",
    description:
      "8 expertly crafted modules taking you from story structure to narrative mastery, with real examples from literature and film.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: PenTool,
    title: "Hands-On Practice",
    description:
      "Sharpen your craft with targeted writing exercises designed to build specific storytelling skills.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    icon: Brain,
    title: "AI Writing Mentor",
    description:
      "Get personalized feedback on your writing from an AI mentor that scores creativity, structure, voice, and technique.",
    color: "from-purple-400 to-violet-600",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    description:
      "Earn XP, unlock badges, maintain streaks, and level up from Scribbler to Master Narrator.",
    color: "from-gold-400 to-amber-600",
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

const stats = [
  { label: "Lessons", value: "32+", icon: BookOpen },
  { label: "Writing Exercises", value: "12+", icon: PenTool },
  { label: "Techniques", value: "15+", icon: Star },
  { label: "Badges to Earn", value: "15", icon: Trophy },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your storytelling journey begins here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Master the Art of{" "}
              <span className="text-gradient">Storytelling</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              From the hero&apos;s journey to narrative voice, learn the craft
              behind the world&apos;s greatest stories. Practice with guided
              exercises and get AI-powered feedback on your writing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href={user ? "/learn" : "/auth/signup"}>
                <Button size="lg">
                  {user ? "Continue Learning" : "Get Started"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/reference">
                <Button variant="outline" size="lg">
                  Browse Techniques
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-gold-500" />
                      <span className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="text-gradient">Write Better</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              A complete learning platform designed to transform you from a
              reader who admires great stories into a writer who creates them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-gold-500/30 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Your Learning <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              8 carefully structured modules that build on each other, taking you
              from the foundations of story structure to advanced narrative techniques.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "The Story Spine", icon: "📖" },
              { num: "02", title: "Character Craft", icon: "👤" },
              { num: "03", title: "Conflict & Tension", icon: "⚔️" },
              { num: "04", title: "Dialogue", icon: "💬" },
              { num: "05", title: "World-Building", icon: "🌍" },
              { num: "06", title: "Pacing & Structure", icon: "⏱️" },
              { num: "07", title: "Theme & Meaning", icon: "💡" },
              { num: "08", title: "Narrative Voice", icon: "🎭" },
            ].map((module, index) => (
              <motion.div
                key={module.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-gold-500/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{module.icon}</span>
                  <div>
                    <span className="text-xs text-gold-500 font-mono font-bold">
                      MODULE {module.num}
                    </span>
                    <h3 className="font-display font-bold mt-0.5 group-hover:text-gold-500 transition-colors">
                      {module.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/learn">
              <Button variant="outline" size="lg">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Writers Love{" "}
              <span className="text-gradient">StoryForge</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold-500 fill-gold-500"
                    />
                  ))}
                </div>
                <p className="text-[var(--muted)] mb-4 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your{" "}
              <span className="text-gradient">Story?</span>
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-lg mx-auto">
              Every great writer started somewhere. Begin your journey today and
              discover the storyteller within you.
            </p>
            <Link href={user ? "/learn" : "/auth/signup"}>
              <Button size="lg">
                <Zap className="w-5 h-5" />
                {user ? "Continue Learning" : "Begin Your Journey"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
