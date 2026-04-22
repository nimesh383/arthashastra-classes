import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import { Calendar, ChevronRight, Clock, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const posts = [
  {
    id: 1,
    title: "How to Score 95+ in CBSE Accountancy Class 12",
    excerpt:
      "Discover the proven strategies, revision techniques, and practice schedules that top scorers use to ace the board exam.",
    date: "Apr 10, 2026",
    category: "Commerce Tips",
    readTime: "6 min read",
    author: "Ajay Govindani",
    color: "cyan" as const,
  },
  {
    id: 2,
    title: "Understanding Cash Flow Statement: A Complete Guide",
    excerpt:
      "Cash flow statements confuse many students. This step-by-step guide breaks down direct and indirect methods with examples.",
    date: "Apr 5, 2026",
    category: "Commerce Tips",
    readTime: "8 min read",
    author: "Ajay Govindani",
    color: "violet" as const,
  },
  {
    id: 3,
    title: "CA Foundation vs. B.Com: Which Path Is Right for You?",
    excerpt:
      "A detailed comparison of career paths, timelines, earning potential, and skill requirements for commerce graduates.",
    date: "Mar 28, 2026",
    category: "Career Advice",
    readTime: "5 min read",
    author: "Priya Sharma",
    color: "magenta" as const,
  },
  {
    id: 4,
    title: "Macroeconomics Made Simple: Money, Banking & Inflation",
    excerpt:
      "Break down complex macro topics with simple analogies and visual frameworks. Perfect for board and competitive exam prep.",
    date: "Mar 20, 2026",
    category: "Study Strategies",
    readTime: "7 min read",
    author: "Ajay Govindani",
    color: "cyan" as const,
  },
  {
    id: 5,
    title: "Top 10 Business Studies Case Study Patterns for CBSE",
    excerpt:
      "Pattern recognition in case studies can earn you 20+ extra marks. We analyzed 5 years of papers to find the formula.",
    date: "Mar 15, 2026",
    category: "Study Strategies",
    readTime: "9 min read",
    author: "Riya Verma",
    color: "violet" as const,
  },
  {
    id: 6,
    title: "How Arthashastra's Online Tests Changed My Score",
    excerpt:
      "A student success story — from 62% to 91% in six months using structured test series and performance analytics.",
    date: "Mar 8, 2026",
    category: "News",
    readTime: "4 min read",
    author: "Rohan Mehta",
    color: "magenta" as const,
  },
];

const CATEGORIES = [
  "All",
  "Commerce Tips",
  "Study Strategies",
  "Career Advice",
  "News",
];

const categoryColors: Record<string, string> = {
  "Commerce Tips": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Study Strategies": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Career Advice": "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  News: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="blog.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 block">
              Insights & Updates
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6">
              The <span className="gradient-text-cyan-violet">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Expert articles, exam strategies, and student success stories to
              fuel your commerce journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="pb-8 bg-background" data-ocid="blog.filters.section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-smooth border ${
                  activeCategory === c
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400"
                    : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
                }`}
                data-ocid={`blog.filter.${c.toLowerCase().replace(/\s+/g, "_")}.tab`}
              >
                {c}
                {activeCategory === c && filtered.length > 0 && (
                  <span className="ml-2 text-xs opacity-70">
                    {c === "All" ? posts.length : filtered.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog cards */}
      <section
        className="py-4 pb-24 bg-background"
        data-ocid="blog.list.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              data-ocid="blog.list.empty_state"
            >
              <p className="text-muted-foreground">
                No posts in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.08}>
                  <GlowCard
                    glowColor={post.color}
                    className="p-6 h-full flex flex-col group cursor-pointer"
                    data-ocid={`blog.list.item.${i + 1}`}
                  >
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          categoryColors[post.category] ??
                          "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-foreground mb-3 leading-snug line-clamp-2 group-hover:text-cyan-400 transition-smooth">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Author + meta */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <User className="w-3 h-3 text-violet-400 shrink-0" />
                      <span className="font-medium text-foreground/80 truncate">
                        {post.author}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-smooth flex items-center gap-0.5"
                        data-ocid={`blog.read_more.button.${i + 1}`}
                      >
                        Read More <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
