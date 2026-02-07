"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ChevronRight, BookOpen } from "lucide-react";
import { techniques, categories, searchTechniques, getTechniquesByCategory } from "@/data/reference";

export default function ReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredTechniques =
    searchQuery.length > 0
      ? searchTechniques(searchQuery)
      : activeCategory === "All"
        ? techniques
        : getTechniquesByCategory(activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Storytelling Reference
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          A comprehensive encyclopedia of storytelling techniques, with examples
          from literature and film. Your go-to reference for the craft of
          narrative.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search — full width, larger */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search techniques..."
            className="w-full px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-foreground placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        </div>

        {/* Category chips — pill shaped */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeCategory === "All" && !searchQuery
                ? "bg-[var(--accent)] text-zinc-900"
                : "text-[var(--muted)] bg-[var(--surface)] hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery("");
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat && !searchQuery
                  ? "bg-[var(--accent)] text-zinc-900"
                  : "text-[var(--muted)] bg-[var(--surface)] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Techniques Grid — denser */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTechniques.map((technique, index) => (
          <motion.div
            key={technique.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Link href={`/reference/${technique.id}`}>
              <div className="h-full p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-[10px] font-mono text-[var(--muted)]">
                      {technique.category}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {technique.name}
                </h3>
                <p className="text-xs text-[var(--muted)] line-clamp-2">
                  {technique.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[var(--muted)]">
                  <BookOpen className="w-3 h-3" />
                  {technique.examples.length} examples
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredTechniques.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--muted)]">
            No techniques found. Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
}
