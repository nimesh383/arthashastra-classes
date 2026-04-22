import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAvailableCourses } from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type { Course } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  ChevronRight,
  Clock,
  GraduationCap,
  LogIn,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Filter types ─────────────────────────────────────────────────────────────
type SubjectFilter =
  | "All"
  | "Accountancy"
  | "Economics"
  | "BST"
  | "Maths"
  | "Commerce";
type LevelFilter =
  | "All"
  | "Class11"
  | "Class12"
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Dropper";

const SUBJECT_FILTERS: SubjectFilter[] = [
  "All",
  "Accountancy",
  "Economics",
  "BST",
  "Maths",
  "Commerce",
];
const LEVEL_FILTERS: LevelFilter[] = [
  "All",
  "Class11",
  "Class12",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Dropper",
];

const LEVEL_LABELS: Record<string, string> = {
  Class11: "Class 11",
  Class12: "Class 12",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Dropper: "Dropper",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getSubjectIcon(subject: string) {
  if (subject === "Economics") return BarChart2;
  if (subject === "BST") return Briefcase;
  if (subject === "Maths") return GraduationCap;
  return BookOpen;
}

function getGlowColor(subject: string): "cyan" | "violet" | "magenta" {
  if (subject === "Economics" || subject === "Maths") return "violet";
  if (subject === "BST" || subject === "Commerce") return "magenta";
  return "cyan";
}

function getSubjectBadge(subject: string) {
  if (subject === "Economics")
    return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  if (subject === "BST")
    return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
  if (subject === "Maths")
    return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
  return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
}

function getLevelBadge(level: string) {
  if (level === "Class11")
    return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  if (level === "Class12")
    return "text-blue-400 bg-blue-500/10 border-blue-500/20";
  if (level === "Dropper")
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  if (level === "Advanced")
    return "text-orange-400 bg-orange-500/10 border-orange-500/20";
  return "text-teal-400 bg-teal-500/10 border-teal-500/20";
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function CourseCardSkeleton() {
  return (
    <div className="glass-morphism rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <Skeleton className="w-11 h-11 rounded-xl" />
        <div className="flex gap-1.5">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <div className="flex gap-4 mt-1">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <Skeleton className="h-8 w-20 rounded" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = getSubjectIcon(course.subject);
  const glowColor = getGlowColor(course.subject);
  const subjectColor = getSubjectBadge(course.subject);
  const levelColor = getLevelBadge(course.level);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isPaid = Number(course.price) > 0;

  const handleEnroll = () => {
    if (isPaid && !isAuthenticated) {
      window.location.href = `/login?returnTo=/courses/${course.id}`;
      return;
    }
    navigate({ to: "/courses/$id", params: { id: String(course.id) } });
  };

  return (
    <AnimatedSection delay={index * 0.08}>
      <GlowCard
        glowColor={glowColor}
        className="p-6 h-full flex flex-col group"
        data-ocid={`courses.list.item.${index + 1}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              glowColor === "cyan"
                ? "bg-cyan-500/10 text-cyan-400"
                : glowColor === "violet"
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-fuchsia-500/10 text-fuchsia-400"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${subjectColor}`}
            >
              {course.subject}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor}`}
            >
              {LEVEL_LABELS[course.level] ?? course.level}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-snug">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400/70" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-violet-400/70" />
            {course.instructor}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Fees</p>
            <span className="font-display font-bold text-foreground text-lg">
              ₹{Number(course.price).toLocaleString("en-IN")}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                /course
              </span>
            </span>
          </div>
          <RippleButton
            onClick={handleEnroll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)]"
            data-ocid={`courses.enroll.link.${index + 1}`}
          >
            {isPaid && !isAuthenticated ? (
              <>
                <LogIn className="w-4 h-4" />
                Login to Enroll
              </>
            ) : (
              <>
                Enroll Now
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </RippleButton>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [activeSubject, setActiveSubject] = useState<SubjectFilter>("All");
  const [activeLevel, setActiveLevel] = useState<LevelFilter>("All");
  const { data: courses, isLoading } = useAvailableCourses();

  const filtered = (courses ?? []).filter((c) => {
    const matchSubject = activeSubject === "All" || c.subject === activeSubject;
    const matchLevel = activeLevel === "All" || c.level === activeLevel;
    return matchSubject && matchLevel;
  });

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="courses.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {(["p0", "p1", "p2", "p3", "p4", "p5"] as const).map((key, i) => (
            <motion.div
              key={key}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
              style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-cyan-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              All Courses
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Our <span className="gradient-text-cyan-violet">Courses</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From Class 11 to Dropper Batches — structured programs crafted for
              clarity, consistency, and top board results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section
        className="pb-8 bg-background"
        data-ocid="courses.filters.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="glass-morphism border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              {/* Subject Filter */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Subject
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_FILTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setActiveSubject(s)}
                      className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${
                        activeSubject === s
                          ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-[0_0_12px_oklch(0.68_0.24_200/0.4)]"
                          : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-cyan-500/30"
                      }`}
                      data-ocid={`courses.subject_filter.${s.toLowerCase()}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px h-12 bg-white/10 hidden sm:block" />

              {/* Level Filter */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Level
                </p>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_FILTERS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setActiveLevel(l)}
                      className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${
                        activeLevel === l
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_12px_oklch(0.55_0.20_270/0.4)]"
                          : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-violet-500/30"
                      }`}
                      data-ocid={`courses.level_filter.${l.toLowerCase()}`}
                    >
                      {LEVEL_LABELS[l] ?? l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Course Grid */}
      <section
        className="py-8 pb-28 bg-background"
        data-ocid="courses.list.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="courses.loading_state"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is stable
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-28"
              data-ocid="courses.empty_state"
            >
              <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No courses match your filters
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Try selecting a different subject or level.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveSubject("All");
                  setActiveLevel("All");
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90"
                data-ocid="courses.empty_state.reset_button"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <CourseCard key={String(course.id)} course={course} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
