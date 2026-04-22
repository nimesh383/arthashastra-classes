import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import GlowCard from "@/components/ui/GlowCard";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  MapPin,
  Rocket,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Students Empowered", value: 2000, suffix: "+" },
  { label: "Pass Rate", value: 98, suffix: "%" },
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Courses Offered", value: 50, suffix: "+" },
];

const missionVision = [
  {
    icon: Target,
    label: "Our Mission",
    color: "cyan" as const,
    heading: "Democratize Commerce Education",
    text: "To break barriers in commerce coaching by merging deep academic expertise with cutting-edge technology — making world-class education accessible to every student in Bhopal and beyond.",
  },
  {
    icon: Rocket,
    label: "Our Vision",
    color: "violet" as const,
    heading: "Lead the Future of Learning",
    text: "To be the most innovative and results-driven commerce coaching platform in India, where every student graduates not just with marks but with mastery, confidence, and clarity.",
  },
];

const timeline = [
  {
    year: "2009",
    title: "Founded",
    event:
      "Arthashastra Classes was founded by Ajay Govindani with a single batch of 30 dedicated students in the heart of Bhopal, MP.",
    icon: Rocket,
    color: "cyan",
  },
  {
    year: "2015",
    title: "Gone Digital",
    event:
      "Launched India's first commerce-focused online test portal and digital study material library, reaching students statewide.",
    icon: Zap,
    color: "violet",
  },
  {
    year: "2020",
    title: "Online Expansion",
    event:
      "Pivoted to hybrid learning during the pandemic, scaling live online classes to 1,200+ students across Madhya Pradesh.",
    icon: Brain,
    color: "magenta",
  },
  {
    year: "2024",
    title: "Next-Gen Platform",
    event:
      "Launched AI-powered analytics, personalized learning paths, and this immersive next-generation student platform.",
    icon: Star,
    color: "cyan",
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We set the standard. Every lesson, every revision, every test is engineered to push students beyond their limits.",
    color: "cyan" as const,
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace technology as a teaching ally — 3D visualizations, AI analytics, and adaptive testing that evolves with each learner.",
    color: "violet" as const,
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparent results, honest feedback, and a commitment to your growth above all else. No shortcuts, only substance.",
    color: "magenta" as const,
  },
];

const credentials = [
  { label: "Experience", value: "15+ Years" },
  { label: "Specialization", value: "Commerce & CA Foundation" },
  { label: "Affiliation", value: "CBSE & MPBSE Aligned" },
  { label: "Students Taught", value: "2000+" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

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

export default function AboutPage() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
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
        data-ocid="about.hero.section"
      >
        {/* Animated gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.08),transparent)] pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <HeroParticle key={p.id} style={p.style} />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
                aria-label="breadcrumb"
              >
                <Link
                  to="/"
                  className="hover:text-cyan-400 transition-colors"
                  data-ocid="about.breadcrumb.home_link"
                >
                  Home
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-cyan-400">About Us</span>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5">
                  Our Story
                </span>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                  Where Commerce{" "}
                  <span className="gradient-text-cyan-violet block sm:inline">
                    Meets the Future
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Founded in Bhopal with a bold vision — Arthashastra Classes
                  has been rewriting what commerce coaching looks like for over
                  15 years. Rigorous academics, cutting-edge technology, and
                  genuine care for every student.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transition-smooth"
                  data-ocid="about.hero.explore_courses_link"
                >
                  Explore Courses <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-foreground font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth"
                  data-ocid="about.hero.contact_link"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden neon-border-cyan aspect-video">
                <img
                  src="/assets/generated/about-hero-visual.dim_1200x600.jpg"
                  alt="Arthashastra Classes — futuristic education"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm text-foreground font-medium">
                    Arthashastra Classes — MP Nagar, Bhopal
                  </span>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 glass-morphism rounded-xl px-4 py-2 neon-border-violet text-sm font-bold text-violet-400"
              >
                #1 Commerce Coaching
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 bg-muted/10 border-y border-white/5"
        data-ocid="about.stats.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="relative group">
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

      {/* ── MISSION & VISION ── */}
      <section
        className="py-24 bg-background"
        data-ocid="about.mission.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block">
              Purpose
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Mission &{" "}
              <span className="gradient-text-cyan-violet">Vision</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything we do is grounded in two core beliefs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionVision.map((item, i) => (
              <AnimatedSection
                key={item.label}
                delay={i * 0.15}
                direction={i === 0 ? "left" : "right"}
              >
                <GlowCard
                  glowColor={item.color}
                  className="p-8 h-full"
                  data-ocid={`about.${item.label.toLowerCase().replace(" ", "_")}.card`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      item.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "bg-violet-500/10 text-violet-400"
                    }`}
                  >
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                      item.color === "cyan"
                        ? "text-cyan-400"
                        : "text-violet-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {item.heading}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="py-24 bg-muted/10 border-y border-white/5"
        data-ocid="about.timeline.section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
              Milestones
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Our <span className="gradient-text-cyan-violet">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From a single classroom in Bhopal to a next-generation learning
              platform — every year has been a chapter of transformation.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 hidden md:block" />

            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <AnimatedSection
                  key={item.year}
                  delay={i * 0.12}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    data-ocid={`about.timeline.item.${i + 1}`}
                  >
                    {/* Card */}
                    <div className="flex-1 max-w-sm">
                      <GlowCard
                        glowColor={
                          item.color === "cyan"
                            ? "cyan"
                            : item.color === "violet"
                              ? "violet"
                              : "magenta"
                        }
                        className="p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              item.color === "cyan"
                                ? "bg-cyan-500/10 text-cyan-400"
                                : item.color === "violet"
                                  ? "bg-violet-500/10 text-violet-400"
                                  : "bg-fuchsia-500/10 text-fuchsia-400"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`font-display text-sm font-bold uppercase tracking-widest ${
                              item.color === "cyan"
                                ? "text-cyan-400"
                                : item.color === "violet"
                                  ? "text-violet-400"
                                  : "text-fuchsia-400"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed">
                          {item.event}
                        </p>
                      </GlowCard>
                    </div>

                    {/* Year bubble */}
                    <div className="relative z-10 w-20 h-20 rounded-full glass-morphism border border-cyan-400/30 flex flex-col items-center justify-center shrink-0">
                      <span className="font-display text-lg font-extrabold gradient-text-cyan-violet leading-none">
                        {item.year}
                      </span>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 max-w-sm hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTY SPOTLIGHT ── */}
      <ParallaxSection speed={0.2}>
        <section
          className="py-24 bg-background"
          data-ocid="about.faculty.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block">
                Lead Faculty
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
                Meet{" "}
                <span className="gradient-text-cyan-violet">
                  Ajay Govindani
                </span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                The architect of Arthashastra's success story.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Portrait */}
              <AnimatedSection direction="left">
                <div className="relative mx-auto max-w-sm">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src="/assets/generated/faculty-ajay-govindani.dim_600x700.jpg"
                      alt="Ajay Govindani — Founder & Lead Faculty, Arthashastra Classes"
                      className="w-full object-cover"
                    />
                    {/* Neon frame */}
                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_oklch(0.68_0.24_200/0.15)] pointer-events-none" />
                  </motion.div>

                  {/* Floating credential badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-4 -right-4 glass-morphism rounded-xl p-4 neon-border-violet max-w-[180px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-violet-400" />
                      <span className="text-xs font-bold text-violet-400">
                        Founder
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      M.Com, LLB — 15+ years teaching commerce
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Bio & credentials */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-extrabold text-foreground mb-1">
                      Ajay Govindani
                    </h3>
                    <p className="text-cyan-400 font-semibold text-sm">
                      Founder & Principal Educator · Arthashastra Classes
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    With over 15 years of dedicated commerce teaching, Ajay Sir
                    has transformed thousands of students' academic futures.
                    Renowned for his ability to break down complex concepts like
                    Financial Statements, Business Studies, and Economics into
                    crystal-clear, exam-ready knowledge, he combines deep
                    subject mastery with a passion for mentorship that is truly
                    unmatched in Bhopal.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    His pedagogical philosophy: every student is capable of
                    excellence — they just need the right guide, the right
                    tools, and the right environment. That belief is the DNA of
                    Arthashastra Classes.
                  </p>

                  {/* Credential grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {credentials.map((cred) => (
                      <div
                        key={cred.label}
                        className="glass-morphism rounded-xl p-4 border border-white/10"
                      >
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {cred.label}
                        </p>
                        <p className="text-foreground font-semibold text-sm">
                          {cred.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Achievement badges */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "CBSE Expert",
                      "CA Foundation",
                      "MPBSE Topper Coach",
                      "15+ Years",
                      "2000+ Students",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30 bg-cyan-400/5 text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* ── VALUES ── */}
      <section
        className="py-24 bg-muted/10 border-y border-white/5"
        data-ocid="about.values.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
              What We Stand For
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Our <span className="gradient-text-cyan-violet">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three pillars that define every interaction, every lesson, every
              result.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.12}>
                <GlowCard
                  glowColor={v.color}
                  className="p-8 h-full text-center"
                  data-ocid={`about.values.item.${i + 1}`}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                      v.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : v.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <v.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 bg-background relative overflow-hidden"
        data-ocid="about.cta.section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-5 text-cyan-400">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold text-sm">
                MP Nagar, Bhopal, Madhya Pradesh 462011
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5">
              Ready to{" "}
              <span className="gradient-text-cyan-violet">Transform</span> Your
              Future?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join 2,000+ students who chose Arthashastra Classes and never
              looked back. Your journey to commerce mastery begins here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base"
                data-ocid="about.cta.contact_link"
              >
                Get Started Today <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-foreground font-medium hover:border-violet-400/50 hover:text-violet-400 transition-smooth text-base"
                data-ocid="about.cta.courses_link"
              >
                <BookOpen className="w-4 h-4" />
                Browse Courses
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
