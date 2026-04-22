import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Crown,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type CellValue =
  | { type: "check" }
  | { type: "cross" }
  | { type: "text"; value: string; highlight?: boolean };

interface ComparisonRow {
  feature: string;
  arthashastra: CellValue;
  instituteA: CellValue;
  instituteB: CellValue;
  instituteC: CellValue;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Teaching Quality",
    arthashastra: {
      type: "text",
      value: "Expert Faculty · 15+ Yrs",
      highlight: true,
    },
    instituteA: { type: "text", value: "Good" },
    instituteB: { type: "text", value: "Average" },
    instituteC: { type: "text", value: "Below Avg" },
  },
  {
    feature: "Digital Learning System",
    arthashastra: {
      type: "text",
      value: "AI-Powered Platform",
      highlight: true,
    },
    instituteA: { type: "text", value: "Basic App" },
    instituteB: { type: "cross" },
    instituteC: { type: "cross" },
  },
  {
    feature: "Academic Results",
    arthashastra: { type: "text", value: "98% Pass Rate", highlight: true },
    instituteA: { type: "text", value: "~75%" },
    instituteB: { type: "text", value: "~60%" },
    instituteC: { type: "text", value: "~55%" },
  },
  {
    feature: "Student Support",
    arthashastra: {
      type: "text",
      value: "24/7 Doubt Resolution",
      highlight: true,
    },
    instituteA: { type: "text", value: "Office Hours" },
    instituteB: { type: "text", value: "Weekly Only" },
    instituteC: { type: "cross" },
  },
  {
    feature: "Fee Structure",
    arthashastra: {
      type: "text",
      value: "Transparent & Affordable",
      highlight: true,
    },
    instituteA: { type: "text", value: "Moderate" },
    instituteB: { type: "text", value: "High" },
    instituteC: { type: "text", value: "Very High" },
  },
  {
    feature: "Study Materials",
    arthashastra: {
      type: "text",
      value: "Exclusive Digital Library",
      highlight: true,
    },
    instituteA: { type: "text", value: "Printed Notes" },
    instituteB: { type: "text", value: "Minimal" },
    instituteC: { type: "cross" },
  },
  {
    feature: "Batch Size",
    arthashastra: {
      type: "text",
      value: "Small · Personal Attention",
      highlight: true,
    },
    instituteA: { type: "text", value: "Medium" },
    instituteB: { type: "text", value: "Large" },
    instituteC: { type: "text", value: "Overcrowded" },
  },
  {
    feature: "Online Access",
    arthashastra: { type: "check" },
    instituteA: { type: "check" },
    instituteB: { type: "cross" },
    instituteC: { type: "cross" },
  },
];

const highlights = [
  {
    icon: Trophy,
    label: "Best Results",
    value: "98% Pass Rate",
    color: "cyan" as const,
  },
  {
    icon: Star,
    label: "Expert Faculty",
    value: "15+ Years",
    color: "violet" as const,
  },
  {
    icon: Crown,
    label: "Top Rated",
    value: "#1 in Bhopal",
    color: "magenta" as const,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CellContent({ cell }: { cell: CellValue }) {
  if (cell.type === "check") {
    return (
      <span className="inline-flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-label="Yes" />
      </span>
    );
  }
  if (cell.type === "cross") {
    return (
      <span className="inline-flex items-center justify-center">
        <XCircle className="w-5 h-5 text-red-500/70" aria-label="No" />
      </span>
    );
  }
  return (
    <span
      className={`text-sm font-medium ${
        cell.highlight ? "text-cyan-300" : "text-muted-foreground"
      }`}
    >
      {cell.value}
    </span>
  );
}

interface ParticleStyle {
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
}

function HeroParticle({ style }: { style: ParticleStyle }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 4,
        height: 4,
        background: style.color,
        left: style.left,
        top: style.top,
      }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
      transition={{
        duration: style.duration,
        repeat: Number.POSITIVE_INFINITY,
        delay: style.delay,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComparisonPage() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 19 + 7) % 93}%`,
      top: `${(i * 31 + 5) % 87}%`,
      color:
        i % 3 === 0
          ? "oklch(0.68 0.24 200)"
          : i % 3 === 1
            ? "oklch(0.55 0.2 270)"
            : "oklch(0.6 0.25 290)",
      duration: 3 + (i % 4),
      delay: i * 0.25,
    },
  }));

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center py-20"
        data-ocid="comparison.hero.section"
      >
        {/* Background FX */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <HeroParticle key={p.id} style={p.style} />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6"
            aria-label="breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-cyan-400 transition-colors"
              data-ocid="comparison.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-400">Comparison</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5">
              Head-to-Head
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Why{" "}
              <span className="gradient-text-cyan-violet">Arthashastra</span>
              <br />
              <span className="gradient-text-cyan-violet">Classes?</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              See why thousands of commerce students in Bhopal choose us over
              the rest. The data speaks for itself.
            </p>
          </motion.div>

          {/* Highlight badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {highlights.map((h, i) => (
              <div
                key={h.label}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl glass-morphism border ${
                  h.color === "cyan"
                    ? "border-cyan-400/30"
                    : h.color === "violet"
                      ? "border-violet-500/30"
                      : "border-fuchsia-500/30"
                } `}
                data-ocid={`comparison.hero.highlight.${i + 1}`}
              >
                <h.icon
                  className={`w-5 h-5 ${
                    h.color === "cyan"
                      ? "text-cyan-400"
                      : h.color === "violet"
                        ? "text-violet-400"
                        : "text-fuchsia-400"
                  }`}
                />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {h.label}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      h.color === "cyan"
                        ? "text-cyan-300"
                        : h.color === "violet"
                          ? "text-violet-300"
                          : "text-fuchsia-300"
                    }`}
                  >
                    {h.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section
        className="py-20 bg-muted/10 border-y border-white/5"
        data-ocid="comparison.table.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block">
              Feature Breakdown
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              The{" "}
              <span className="gradient-text-cyan-violet">
                Complete Picture
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              An honest, comprehensive comparison across every dimension that
              matters.
            </p>
          </AnimatedSection>

          {/* Scrollable table wrapper */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-[0_0_40px_oklch(0.68_0.24_200/0.08)]">
            <table
              className="w-full border-collapse min-w-[700px]"
              data-ocid="comparison.table"
            >
              {/* Table header */}
              <thead>
                <tr className="bg-[oklch(0.18_0.08_260)] border-b border-white/10">
                  {/* Sticky feature column header */}
                  <th
                    className="sticky left-0 z-10 bg-[oklch(0.18_0.08_260)] px-6 py-5 text-left text-sm font-bold uppercase tracking-widest text-muted-foreground min-w-[180px]"
                    scope="col"
                  >
                    Feature
                  </th>

                  {/* Arthashastra — highlighted */}
                  <th
                    className="px-6 py-5 text-center min-w-[200px] relative"
                    scope="col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-violet-500/5 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
                    <div className="relative flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                        <Crown className="w-3 h-3" /> Best Choice
                      </span>
                      <span className="font-display text-base font-extrabold gradient-text-cyan-violet leading-tight text-center">
                        Arthashastra Classes
                      </span>
                    </div>
                  </th>

                  {/* Competitors */}
                  {["Institute A", "Institute B", "Institute C"].map((name) => (
                    <th
                      key={name}
                      className="px-6 py-5 text-center text-sm font-semibold text-muted-foreground min-w-[160px]"
                      scope="col"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {comparisonData.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-smooth"
                    data-ocid={`comparison.table.row.${i + 1}`}
                  >
                    {/* Feature name — sticky */}
                    <td className="sticky left-0 z-10 bg-[oklch(0.12_0.05_260)] group-hover:bg-[oklch(0.14_0.06_260)] px-6 py-5 transition-smooth">
                      <span className="text-sm font-semibold text-foreground">
                        {row.feature}
                      </span>
                    </td>

                    {/* Arthashastra cell — highlighted bg */}
                    <td className="px-6 py-5 text-center relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-violet-500/3 pointer-events-none" />
                      <div className="relative flex items-center justify-center">
                        <CellContent cell={row.arthashastra} />
                      </div>
                    </td>

                    {/* Competitor cells */}
                    {(["instituteA", "instituteB", "instituteC"] as const).map(
                      (key) => (
                        <td key={key} className="px-6 py-5 text-center">
                          <CellContent cell={row[key]} />
                        </td>
                      ),
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Available / Offered
            </span>
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500/70" />
              Not Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm bg-gradient-to-r from-cyan-400/30 to-violet-500/30 border border-cyan-400/20" />
              Arthashastra Column
            </span>
          </div>
        </div>
      </section>

      {/* ── WHY WE WIN ── */}
      <section
        className="py-24 bg-background"
        data-ocid="comparison.advantages.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block">
              Our Edge
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              What Makes Us{" "}
              <span className="gradient-text-cyan-violet">Different</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Four pillars that set Arthashastra apart from every competitor in
              Bhopal.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                color: "cyan" as const,
                icon: Trophy,
                title: "Proven Academic Results",
                desc: "With a 98% pass rate and multiple CBSE toppers, our results are publicly verifiable and consistently best-in-class across Bhopal's commerce coaching landscape.",
              },
              {
                color: "violet" as const,
                icon: Star,
                title: "Technology-First Learning",
                desc: "We don't just digitize notes — we deliver an AI-powered platform with adaptive testing, personalized dashboards, and live progress analytics for every student.",
              },
              {
                color: "magenta" as const,
                icon: Crown,
                title: "Unmatched Student Support",
                desc: "Doubt resolution isn't scheduled — it's always on. Our faculty is accessible via chat, call, and dedicated sessions, ensuring no student gets left behind.",
              },
              {
                color: "cyan" as const,
                icon: CheckCircle2,
                title: "Transparent & Affordable",
                desc: "No hidden charges. Our fee structure is published, fair, and includes everything: live classes, study materials, test series, and access to the full digital platform.",
              },
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <GlowCard
                  glowColor={item.color}
                  className="p-7 h-full flex gap-5 items-start"
                  data-ocid={`comparison.advantages.item.${i + 1}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : item.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 bg-muted/10 border-t border-white/5 relative overflow-hidden"
        data-ocid="comparison.cta.section"
      >
        {/* BG glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 mb-6 mx-auto"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Crown className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5">
              Join the <span className="gradient-text-cyan-violet">Best</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Stop settling for average. 2,000+ students already made the smart
              choice. Your commerce success story starts with Arthashastra
              Classes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base"
                data-ocid="comparison.cta.explore_courses_link"
              >
                Explore Courses <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-foreground font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth text-base"
                data-ocid="comparison.cta.contact_link"
              >
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
