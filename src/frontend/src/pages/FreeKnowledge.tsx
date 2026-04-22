import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  ChevronRight,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const topics = [
  {
    category: "Accountancy",
    color: "cyan" as const,
    items: [
      {
        title: "What is Double-Entry Bookkeeping?",
        excerpt:
          "Every financial transaction affects at least two accounts. Learn the foundation of all modern accounting.",
      },
      {
        title: "Understanding the Balance Sheet",
        excerpt:
          "A snapshot of what a business owns (assets), owes (liabilities), and what's left for owners (equity).",
      },
      {
        title: "Depreciation Methods Explained",
        excerpt:
          "SLM vs WDV — which method suits which scenario, and how each affects profit calculations.",
      },
    ],
  },
  {
    category: "Economics",
    color: "violet" as const,
    items: [
      {
        title: "Supply & Demand Fundamentals",
        excerpt:
          "Why prices rise and fall — the core equilibrium model that governs markets.",
      },
      {
        title: "GDP vs GNP: What's the Difference?",
        excerpt:
          "Gross Domestic Product measures output within borders; Gross National Product tracks output by residents.",
      },
      {
        title: "Inflation: Causes and Effects",
        excerpt:
          "Too much money chasing too few goods — how central banks manage the money supply.",
      },
    ],
  },
  {
    category: "Business Studies",
    color: "magenta" as const,
    items: [
      {
        title: "Forms of Business Organisation",
        excerpt:
          "Sole proprietorship, partnership, LLP, and company — trade-offs in liability and control.",
      },
      {
        title: "Marketing Mix — The 4 Ps",
        excerpt:
          "Product, Price, Place, Promotion: how companies position and sell their offerings.",
      },
      {
        title: "Consumer Rights Under COPRA",
        excerpt:
          "Six rights every Indian consumer should know, and how to file a complaint.",
      },
    ],
  },
];

const colorMap = {
  cyan: {
    badge: "badge-primary",
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
  },
  violet: {
    badge:
      "admin-badge bg-violet-500/15 text-violet-400 border border-violet-500/30",
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/30",
  },
  magenta: {
    badge:
      "admin-badge bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/30",
    icon: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/30",
  },
};

const stats = [
  { label: "Topics Covered", value: "30+", icon: BookOpen },
  { label: "Subjects", value: "5", icon: BarChart2 },
  { label: "Free Forever", value: "100%", icon: DollarSign },
  { label: "Updated", value: "2026", icon: TrendingUp },
];

export default function FreeKnowledge() {
  return (
    <div className="pt-16 min-h-screen" data-ocid="free_knowledge.page">
      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden bg-muted/10"
        data-ocid="free_knowledge.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-violet-600/8 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Free Knowledge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-6"
          >
            Learn Commerce.{" "}
            <span className="gradient-text-cyan-violet">For Free.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          >
            Essential concepts in Accountancy, Economics, and Business Studies —
            no login required. Build your foundation before diving deeper.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="flex justify-center"
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_50px_oklch(0.68_0.24_200/0.6)] transition-smooth"
              data-ocid="free_knowledge.explore_courses.link"
            >
              Explore Full Courses <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-10 bg-background border-b border-white/5"
        data-ocid="free_knowledge.stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-morphism rounded-xl border border-white/10 p-5 text-center"
                data-ocid={`free_knowledge.stats.item.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-4.5 h-4.5 text-cyan-400" />
                </div>
                <p className="font-display text-2xl font-extrabold gradient-text-cyan-violet">
                  {s.value}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics by category */}
      {topics.map((cat, ci) => (
        <section
          key={cat.category}
          className={`py-14 ${ci % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
          data-ocid={`free_knowledge.${cat.category.toLowerCase().replace(/\s+/g, "_")}.section`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <span className={`admin-badge ${colorMap[cat.color].badge}`}>
                {cat.category}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-morphism rounded-xl border border-white/10 p-6 transition-smooth cursor-default ${colorMap[cat.color].border}`}
                  data-ocid={`free_knowledge.${cat.category.toLowerCase()}.item.${i + 1}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${colorMap[cat.color].bg} flex items-center justify-center mb-4`}
                  >
                    <BookOpen
                      className={`w-4 h-4 ${colorMap[cat.color].icon}`}
                    />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.excerpt}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="py-16 bg-muted/10 border-t border-white/5"
        data-ocid="free_knowledge.cta.section"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-extrabold text-foreground mb-4"
          >
            Ready to go deeper?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-muted-foreground mb-8"
          >
            Enroll in a full course for live classes, PYQs, mock tests, and
            direct mentorship from Ajay Govindani.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth"
              data-ocid="free_knowledge.cta.courses.link"
            >
              View All Courses <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground/80 font-medium hover:text-foreground hover:border-white/40 transition-smooth"
              data-ocid="free_knowledge.cta.login.link"
            >
              Login / Sign Up
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
