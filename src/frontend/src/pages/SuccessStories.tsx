import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import GlowCard from "@/components/ui/GlowCard";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { useTestimonials } from "@/hooks/useBackend";
import type { Testimonial } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronRight,
  GraduationCap,
  Quote,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Success Stories", value: 500, suffix: "+", icon: Trophy },
  { label: "Students Coached", value: 2000, suffix: "+", icon: Users },
  { label: "Pass Rate", value: 98, suffix: "%", icon: TrendingUp },
  { label: "Top Scorers", value: 150, suffix: "+", icon: Award },
];

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Board Toppers",
    desc: "Over 50 CBSE & MPBSE board toppers in Commerce from Arthashastra Classes in the last 3 years alone.",
    color: "cyan" as const,
    metric: "50+ Toppers",
  },
  {
    icon: GraduationCap,
    title: "CA Foundation Clears",
    desc: "Hundreds of students have cleared CA Foundation on their First Attempt — a testament to our rigorous preparation methodology.",
    color: "violet" as const,
    metric: "200+ CA Clears",
  },
  {
    icon: Star,
    title: "95%+ Scorers",
    desc: "A consistent pipeline of students scoring 95% and above in Accountancy, Economics, and BST.",
    color: "magenta" as const,
    metric: "150+ Students",
  },
];

// ─── Particle ─────────────────────────────────────────────────────────────────
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

// ─── Carousel Testimonial Card ────────────────────────────────────────────────
function CarouselCard({ t }: { t: Testimonial }) {
  const stars = Number(t.rating);
  const colors = ["cyan", "violet", "magenta"] as const;
  const color = colors[Math.abs(t.id.charCodeAt(0) ?? 0) % 3];
  const textColor =
    color === "cyan"
      ? "text-cyan-400"
      : color === "violet"
        ? "text-violet-400"
        : "text-fuchsia-400";
  const bgColor =
    color === "cyan"
      ? "bg-cyan-500/10"
      : color === "violet"
        ? "bg-violet-500/10"
        : "bg-fuchsia-500/10";
  const initials = t.studentName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <GlowCard glowColor={color} className="p-6 w-80 flex flex-col">
      <Quote className={`w-6 h-6 ${textColor} mb-4 opacity-60`} />
      <p className="text-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-4">
        {t.text}
      </p>
      {t.marks && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 ${bgColor} mb-3 self-start`}
        >
          <Trophy className={`w-3 h-3 ${textColor}`} />
          <span className={`text-xs font-bold ${textColor}`}>{t.marks}</span>
        </div>
      )}
      <div className="flex items-center gap-0.5 mb-4">
        {(["s1", "s2", "s3", "s4", "s5"] as const).map((k, i) => (
          <Star
            key={k}
            className={`w-3.5 h-3.5 ${i < stars ? "text-cyan-400 fill-cyan-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        {t.photoUrl ? (
          <img
            src={t.photoUrl}
            alt={t.studentName}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full ${bgColor} border border-white/10 flex items-center justify-center shrink-0`}
          >
            <span className={`text-xs font-bold ${textColor}`}>{initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-display font-bold text-foreground text-sm truncate">
            {t.studentName}
          </p>
          <p className="text-muted-foreground text-xs truncate">{t.subject}</p>
        </div>
      </div>
    </GlowCard>
  );
}

// ─── Full Story Card ──────────────────────────────────────────────────────────
function StoryCard({ t, index }: { t: Testimonial; index: number }) {
  const colors = ["cyan", "violet", "magenta"] as const;
  const color = colors[index % 3];
  const textColor =
    color === "cyan"
      ? "text-cyan-400"
      : color === "violet"
        ? "text-violet-400"
        : "text-fuchsia-400";
  const bgColor =
    color === "cyan"
      ? "bg-cyan-500/10"
      : color === "violet"
        ? "bg-violet-500/10"
        : "bg-fuchsia-500/10";
  const stars = Number(t.rating);
  const initials = t.studentName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <GlowCard
        glowColor={color}
        className="p-8 h-full flex flex-col"
        data-ocid={`success_stories.item.${index + 1}`}
      >
        <div className="flex items-start gap-4 mb-6">
          {t.photoUrl ? (
            <img
              src={t.photoUrl}
              alt={t.studentName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/10 shrink-0"
            />
          ) : (
            <div
              className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center shrink-0 border border-white/10`}
            >
              <span
                className={`font-display text-xl font-extrabold ${textColor}`}
              >
                {initials}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-foreground mb-0.5 truncate">
              {t.studentName}
            </h3>
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${textColor} mb-1`}
            >
              {t.subject}
            </p>
            <div className="flex items-center gap-0.5">
              {(["r1", "r2", "r3", "r4", "r5"] as const).map((k, i) => (
                <Star
                  key={k}
                  className={`w-3 h-3 ${i < stars ? "text-cyan-400 fill-cyan-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          {t.marks && (
            <div
              className={`ml-auto px-3 py-1.5 rounded-lg ${bgColor} border border-white/10 text-center shrink-0`}
            >
              <p className={`font-display font-extrabold ${textColor} text-sm`}>
                {t.marks}
              </p>
              <p className="text-muted-foreground text-xs">Score</p>
            </div>
          )}
        </div>
        <Quote className={`w-5 h-5 ${textColor} mb-3 opacity-50`} />
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {t.text}
        </p>
      </GlowCard>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SuccessStoriesPage() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const visible = testimonials.filter((t) => t.isVisible);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 17 + 5) % 95}%`,
      top: `${(i * 23 + 10) % 85}%`,
      color:
        i % 3 === 0
          ? "oklch(0.68 0.24 200)"
          : i % 3 === 1
            ? "oklch(0.55 0.2 270)"
            : "oklch(0.6 0.25 290)",
      duration: 3 + (i % 4),
      delay: i * 0.3,
    },
  }));

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-center py-20"
        data-ocid="success_stories.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-fuchsia-600/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <HeroParticle key={p.id} style={p.style} />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              data-ocid="success_stories.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-400">Success Stories</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5">
              Student Results
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Success <span className="gradient-text-cyan-violet">Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Real students. Real results. Discover how Arthashastra Classes has
              transformed hundreds of commerce students into top scorers and
              confident achievers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 bg-muted/10 border-y border-white/5"
        data-ocid="success_stories.stats.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="relative group">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <s.icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <div className="font-display text-4xl lg:text-5xl font-extrabold gradient-text-cyan-violet mb-2">
                    <CounterAnimation target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {s.label}
                  </p>
                  <div className="mt-2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:via-cyan-400/70 transition-smooth" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFINITE CAROUSEL ── */}
      {!isLoading && visible.length > 0 && (
        <section
          className="py-16 bg-background overflow-hidden"
          data-ocid="success_stories.carousel.section"
        >
          <AnimatedSection className="text-center mb-10 max-w-6xl mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block">
              Live Testimonials
            </span>
            <h2 className="font-display text-3xl font-extrabold text-foreground">
              What Students{" "}
              <span className="gradient-text-cyan-violet">Are Saying</span>
            </h2>
          </AnimatedSection>
          <InfiniteCarousel
            items={visible.map((t) => <CarouselCard key={t.id} t={t} />)}
            speed={45}
            itemClassName="w-80"
          />
        </section>
      )}

      {/* ── ACHIEVEMENTS ── */}
      <section
        className="py-24 bg-muted/10 border-y border-white/5"
        data-ocid="success_stories.achievements.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block">
              Highlights
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Our{" "}
              <span className="gradient-text-cyan-violet">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Numbers that speak for themselves — year after year, Arthashastra
              Classes delivers results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.12}>
                <GlowCard
                  glowColor={a.color}
                  className="p-8 text-center h-full"
                  data-ocid={`success_stories.achievement.item.${i + 1}`}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                      a.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : a.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <a.icon className="w-8 h-8" />
                  </motion.div>
                  <div
                    className={`font-display text-2xl font-extrabold mb-2 ${
                      a.color === "cyan"
                        ? "text-cyan-400"
                        : a.color === "violet"
                          ? "text-violet-400"
                          : "text-fuchsia-400"
                    }`}
                  >
                    {a.metric}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {a.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {a.desc}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY GRID ── */}
      <section
        className="py-24 bg-background"
        data-ocid="success_stories.grid.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
              In Their Words
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Student{" "}
              <span className="gradient-text-cyan-violet">Testimonials</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Hear directly from the students who made their dream scores a
              reality.
            </p>
          </AnimatedSection>

          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="success_stories.loading_state"
            >
              {(["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"] as const).map(
                (k) => (
                  <div
                    key={k}
                    className="h-64 rounded-xl glass-morphism animate-pulse"
                  />
                ),
              )}
            </div>
          ) : visible.length === 0 ? (
            <AnimatedSection>
              <div
                className="text-center py-24"
                data-ocid="success_stories.empty_state"
              >
                <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Stories Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Our students' success stories will be shared here shortly.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((t, i) => (
                <StoryCard key={t.id} t={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 bg-muted/10 border-t border-white/5 relative overflow-hidden"
        data-ocid="success_stories.cta.section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5">
              Your Name Could Be{" "}
              <span className="gradient-text-cyan-violet">Here Next</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of successful students at Arthashastra Classes and
              write your own success story.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base"
                data-ocid="success_stories.cta.courses_link"
              >
                Explore Courses <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-foreground font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth text-base"
                data-ocid="success_stories.cta.contact_link"
              >
                Talk to Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
