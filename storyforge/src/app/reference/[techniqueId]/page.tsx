"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Link2,
  Sparkles,
} from "lucide-react";
import { getTechniqueById, techniques } from "@/data/reference";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function TechniquePage() {
  const params = useParams();
  const techniqueId = params.techniqueId as string;
  const technique = getTechniqueById(techniqueId);

  if (!technique) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">
          Technique not found
        </h1>
        <Link href="/reference">
          <Button variant="outline">Back to Reference</Button>
        </Link>
      </div>
    );
  }

  const relatedTechniques = technique.relatedTechniques
    .map((id) => techniques.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/reference"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Reference
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Badge variant="gold" size="md">
          {technique.category}
        </Badge>
        <h1 className="font-display text-4xl font-bold mt-3 mb-4">
          {technique.name}
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          {technique.description}
        </p>
      </motion.div>

      {/* Long Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 prose prose-lg dark:prose-invert max-w-none prose-headings:font-display"
      >
        {technique.longDescription.split("\n\n").map((para, i) => (
          <p key={i} className="text-[var(--muted)] leading-relaxed">
            {para}
          </p>
        ))}
      </motion.div>

      {/* Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold-500" />
          Examples in Literature & Film
        </h2>
        <div className="space-y-4">
          {technique.examples.map((example, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{example.title}</h3>
                <span className="text-xs text-gold-500 font-medium">
                  ({example.source})
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-gold-500" />
          Writing Tips
        </h2>
        <div className="space-y-3">
          {technique.tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl border border-gold-500/10 bg-gold-500/5"
            >
              <span className="text-gold-500 font-bold">{index + 1}.</span>
              <p className="text-sm text-[var(--muted)]">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Related Techniques */}
      {relatedTechniques.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold-500" />
            Related Techniques
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedTechniques.map((related) =>
              related ? (
                <Link key={related.id} href={`/reference/${related.id}`}>
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-gold-500/30 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-gold-500 transition-colors">
                          {related.name}
                        </h3>
                        <p className="text-xs text-[var(--muted)]">
                          {related.category}
                        </p>
                      </div>
                      <BookOpen className="w-4 h-4 text-[var(--muted)]" />
                    </div>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
