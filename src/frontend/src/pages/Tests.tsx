import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import { useAuth } from "@/store/authStore";
import { X } from "lucide-react";
import {
  ClipboardList,
  Clock,
  HelpCircle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ALL_TESTS = [
  {
    id: 1,
    title: "Accountancy Full Syllabus — Class 12",
    subject: "Accountancy",
    duration: 120,
    totalQuestions: 60,
    difficulty: "Hard" as const,
    color: "cyan" as const,
    desc: "Covers all chapters of CBSE Class 12 Accountancy. Timed test with instant analytics.",
  },
  {
    id: 2,
    title: "Economics Chapter-wise Tests",
    subject: "Economics",
    duration: 45,
    totalQuestions: 25,
    difficulty: "Medium" as const,
    color: "violet" as const,
    desc: "Chapter-by-chapter micro and macro economics tests to identify weak areas.",
  },
  {
    id: 3,
    title: "Business Studies Mock Board",
    subject: "Business Studies",
    duration: 180,
    totalQuestions: 80,
    difficulty: "Hard" as const,
    color: "magenta" as const,
    desc: "Full-length CBSE Board pattern mock test for Business Studies Class 12.",
  },
  {
    id: 4,
    title: "CA Foundation — Accounting Basics",
    subject: "CA Foundation",
    duration: 60,
    totalQuestions: 30,
    difficulty: "Medium" as const,
    color: "cyan" as const,
    desc: "Quick-fire accounting concepts test aligned to ICAI Foundation syllabus.",
  },
  {
    id: 5,
    title: "Commerce Olympiad Prep",
    subject: "Commerce",
    duration: 90,
    totalQuestions: 50,
    difficulty: "Hard" as const,
    color: "violet" as const,
    desc: "Challenge-level questions for commerce olympiads and competitive exams.",
  },
  {
    id: 6,
    title: "Class 11 Accountancy — Revision Test",
    subject: "Accountancy",
    duration: 60,
    totalQuestions: 30,
    difficulty: "Easy" as const,
    color: "cyan" as const,
    desc: "Revision test covering Class 11 accounting fundamentals before Class 12.",
  },
  {
    id: 7,
    title: "Economics — Indian Economy Overview",
    subject: "Economics",
    duration: 30,
    totalQuestions: 15,
    difficulty: "Easy" as const,
    color: "violet" as const,
    desc: "Introduction to Indian economic policies, growth, and development concepts.",
  },
  {
    id: 8,
    title: "Business Studies — Marketing & Finance",
    subject: "Business Studies",
    duration: 75,
    totalQuestions: 40,
    difficulty: "Medium" as const,
    color: "magenta" as const,
    desc: "Focused test on marketing management and financial management chapters.",
  },
];

const difficultyStyles: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  Medium: "text-violet-400 bg-violet-500/10 border border-violet-500/20",
  Hard: "text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20",
};

const SUBJECTS = [
  "All",
  "Accountancy",
  "Economics",
  "Business Studies",
  "CA Foundation",
  "Commerce",
];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

type TestItem = (typeof ALL_TESTS)[0];

function TestModal({ test, onClose }: { test: TestItem; onClose: () => void }) {
  const handleBegin = () => {
    toast.info("🚀 Coming soon — full test system launching next!", {
      description: "We're building an immersive exam experience. Stay tuned!",
      duration: 5000,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="relative z-10 w-full max-w-md glass-morphism rounded-2xl border border-white/10 p-7 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          data-ocid="tests.modal.dialog"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
            data-ocid="tests.modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[test.difficulty]}`}
            >
              {test.difficulty}
            </span>
          </div>

          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            {test.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">{test.desc}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                icon: Clock,
                label: "Duration",
                value: `${test.duration} minutes`,
              },
              {
                icon: HelpCircle,
                label: "Questions",
                value: `${test.totalQuestions} total`,
              },
              { icon: TrendingUp, label: "Subject", value: test.subject },
              { icon: ClipboardList, label: "Pattern", value: "CBSE Board" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white/5 border border-white/10 p-3"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <item.icon className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-3.5 mb-5">
            <p className="text-xs font-semibold text-cyan-400 mb-1.5">
              Instructions
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Each question carries equal marks. No negative marking.</li>
              <li>
                • You can review and change answers before final submission.
              </li>
              <li>• Timer starts as soon as you begin — stay focused!</li>
              <li>• Detailed solutions are shown after submission.</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl glass-morphism border border-white/10 text-muted-foreground text-sm font-medium hover:text-foreground transition-smooth"
              data-ocid="tests.modal.cancel_button"
            >
              Cancel
            </button>
            <RippleButton
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.6)] transition-smooth"
              onClick={handleBegin}
              data-ocid="tests.modal.confirm_button"
            >
              Begin Test →
            </RippleButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TestsPage() {
  const { isAuthenticated } = useAuth();
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeSubject, setActiveSubject] = useState("All");
  const [selectedTest, setSelectedTest] = useState<TestItem | null>(null);

  const filtered = ALL_TESTS.filter((t) => {
    const byDiff =
      activeDifficulty === "All" || t.difficulty === activeDifficulty;
    const bySub = activeSubject === "All" || t.subject === activeSubject;
    return byDiff && bySub;
  });

  const handleStartTest = (test: TestItem) => {
    if (!isAuthenticated) {
      toast.error("Please login to take tests", {
        description: "Create your free account to access all test series.",
        action: {
          label: "Login",
          onClick: () => window.location.assign("/login"),
        },
      });
      return;
    }
    setSelectedTest(test);
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="tests.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-4 block">
              Online Tests
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6">
              Test <span className="gradient-text-cyan-violet">Series</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Subject-wise mock tests, full-length boards, and analytics to
              track every improvement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature highlights */}
      <section
        className="py-10 bg-muted/10 border-y border-white/5"
        data-ocid="tests.features.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Results",
                desc: "Get detailed score breakdowns immediately after submission.",
              },
              {
                icon: HelpCircle,
                title: "Detailed Solutions",
                desc: "Every question comes with a step-by-step explanation.",
              },
              {
                icon: ClipboardList,
                title: "Performance Analytics",
                desc: "Track progress over time with visual charts.",
              },
            ].map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-background" data-ocid="tests.filters.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium mr-1">
              Subject:
            </span>
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSubject(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-smooth border ${
                  activeSubject === s
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400"
                    : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
                }`}
                data-ocid={`tests.subject_filter.${s.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium mr-1">
              Difficulty:
            </span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setActiveDifficulty(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-smooth border ${
                  activeDifficulty === d
                    ? d === "Easy"
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : d === "Medium"
                        ? "bg-violet-500/20 border-violet-500/50 text-violet-400"
                        : d === "Hard"
                          ? "bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400"
                          : "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400"
                    : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
                }`}
                data-ocid={`tests.difficulty_filter.${d.toLowerCase()}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Test cards */}
      <section
        className="py-8 pb-24 bg-background"
        data-ocid="tests.list.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              data-ocid="tests.list.empty_state"
            >
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                No tests match your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveDifficulty("All");
                  setActiveSubject("All");
                }}
                className="mt-4 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-smooth"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((t, i) => (
                <AnimatedSection key={t.id} delay={i * 0.06}>
                  <GlowCard
                    glowColor={t.color}
                    className="p-5 h-full flex flex-col"
                    data-ocid={`tests.list.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground">
                        {t.subject}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyStyles[t.difficulty]}`}
                      >
                        {t.difficulty}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm mb-2 leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4 line-clamp-3">
                      {t.desc}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> {t.totalQuestions} Qs
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      {isAuthenticated ? (
                        <RippleButton
                          className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth flex items-center justify-center gap-2"
                          onClick={() => handleStartTest(t)}
                          data-ocid={`tests.start.button.${i + 1}`}
                        >
                          Start Test →
                        </RippleButton>
                      ) : (
                        <a
                          href="/login"
                          className="w-full px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground font-semibold text-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-smooth flex items-center justify-center gap-2"
                          data-ocid={`tests.login.button.${i + 1}`}
                        >
                          Login to Take Test →
                        </a>
                      )}
                    </div>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Test modal */}
      {selectedTest && (
        <TestModal test={selectedTest} onClose={() => setSelectedTest(null)} />
      )}
    </div>
  );
}
