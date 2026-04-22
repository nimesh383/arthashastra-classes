import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import GlowCard from "@/components/ui/GlowCard";
import { useTeacher } from "@/hooks/useBackend";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Mail,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Floating particle ────────────────────────────────────────────────────────
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
export default function FacultyDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const teacherId = params.id ? BigInt(params.id) : null;
  const { data: teacher, isLoading } = useTeacher(teacherId);

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 19 + 5) % 95}%`,
      top: `${(i * 27 + 8) % 85}%`,
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

  const stats = [
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Students Taught", value: 2000, suffix: "+" },
    { label: "Rating", value: 5, suffix: "/5" },
    { label: "Courses", value: 12, suffix: "+" },
  ];

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-background">
        <div
          className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"
          data-ocid="faculty_detail.loading_state"
        />
      </div>
    );
  }

  // ── Not found ──
  if (!teacher || teacher.isDeleted) {
    return (
      <div
        className="pt-16 min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center"
        data-ocid="faculty_detail.error_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-display text-4xl font-extrabold text-foreground mb-3">
            Faculty Not Found
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            This faculty member may have been removed or the link is incorrect.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:scale-105 transition-smooth"
            data-ocid="faculty_detail.back_button"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Faculty
          </Link>
        </motion.div>
      </div>
    );
  }

  const avatarInitials = teacher.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[75vh] flex flex-col justify-center py-20"
        data-ocid="faculty_detail.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-background to-cyan-500/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.20_270/0.08),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.55 0.2 270) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.2 270) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <HeroParticle key={p.id} style={p.style} />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
            aria-label="breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-cyan-400 transition-colors"
              data-ocid="faculty_detail.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to="/about"
              className="hover:text-cyan-400 transition-colors"
              data-ocid="faculty_detail.breadcrumb.faculty_link"
            >
              Faculty
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-violet-400 truncate max-w-[160px]">
              {teacher.name}
            </span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-5 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-400/5">
                Faculty Profile
              </span>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-tight mb-3">
                <span className="gradient-text-cyan-violet">
                  {teacher.name}
                </span>
              </h1>
              <p className="text-cyan-400 font-semibold text-lg mb-4">
                {teacher.specialization}
              </p>
              {teacher.email && (
                <a
                  href={`mailto:${teacher.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-smooth text-sm mb-6"
                  data-ocid="faculty_detail.email_link"
                >
                  <Mail className="w-4 h-4" />
                  {teacher.email}
                </a>
              )}

              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl">
                A dedicated commerce educator at Arthashastra Classes, bringing
                deep expertise in {teacher.specialization} to every classroom.
                Known for breaking down complex topics into exam-ready concepts
                with clarity, depth, and a genuine passion for student success.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:scale-105 transition-smooth"
                  data-ocid="faculty_detail.hero.courses_link"
                >
                  <BookOpen className="w-4 h-4" /> View Courses
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-foreground hover:border-violet-400/50 hover:text-violet-400 transition-smooth"
                  data-ocid="faculty_detail.hero.back_link"
                >
                  <ArrowLeft className="w-4 h-4" /> All Faculty
                </Link>
              </div>
            </motion.div>

            {/* Right — photo / avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="relative w-72 h-72 rounded-full overflow-hidden neon-border-violet"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                >
                  {teacher.profilePhotoUrl ? (
                    <img
                      src={teacher.profilePhotoUrl}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30 flex items-center justify-center">
                      <span className="font-display text-6xl font-extrabold gradient-text-cyan-violet">
                        {avatarInitials}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_oklch(0.55_0.20_270/0.2)] pointer-events-none" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 glass-morphism rounded-xl p-4 neon-border-cyan max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-cyan-400">
                      Expert
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {teacher.specialization}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 bg-muted/10 border-y border-white/5"
        data-ocid="faculty_detail.stats.section"
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
                  <div className="mt-2 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent group-hover:via-violet-400/70 transition-smooth" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAIL CARDS ── */}
      <section
        className="py-24 bg-background"
        data-ocid="faculty_detail.bio.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block">
              Profile
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Teaching{" "}
              <span className="gradient-text-cyan-violet">Approach</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Specialization",
                desc: teacher.specialization,
                color: "violet" as const,
              },
              {
                icon: Star,
                title: "Methodology",
                desc: "Concept-first teaching — every principle is explained from fundamentals to exam application, leaving no gaps in understanding.",
                color: "cyan" as const,
              },
              {
                icon: Users,
                title: "Student Focus",
                desc: "Personalized doubt-clearing sessions, regular mock tests, and mentorship that tracks each student's progress individually.",
                color: "magenta" as const,
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.12}>
                <GlowCard
                  glowColor={item.color}
                  className="p-8 h-full text-center"
                  data-ocid={`faculty_detail.detail.item.${i + 1}`}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
                      item.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : item.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 bg-muted/10 border-t border-white/5"
        data-ocid="faculty_detail.cta.section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-extrabold text-foreground mb-5">
              Learn from the{" "}
              <span className="gradient-text-cyan-violet">Best</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join a batch taught by {teacher.name} and take your commerce
              scores to the next level.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 transition-smooth"
              data-ocid="faculty_detail.cta.enroll_link"
            >
              Explore Courses <ChevronRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
