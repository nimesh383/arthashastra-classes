import {
  useAdminStudents,
  useAdminTestAnalytics,
  useCourses,
  useCreateQuestion,
  useDeleteMaterial,
  useMyMaterials,
  useQuestions,
  useTeachers,
  useTestLeaderboard,
  useUploadMaterial,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type { QuestionInput, Teacher } from "@/types";
import { FileType, MaterialType, QuestionType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  CheckCircle,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Save,
  Trash2,
  Trophy,
  Upload,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
type Section =
  | "overview"
  | "tests"
  | "materials"
  | "attendance"
  | "analytics"
  | "profile";

interface AttendanceRow {
  id: string;
  name: string;
  present: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_BATCHES = [
  "Class 11 - Commerce A",
  "Class 12 - Commerce B",
  "CA Foundation",
];

const MOCK_STUDENTS_BATCH: AttendanceRow[] = [
  { id: "s1", name: "Priya Sharma", present: true },
  { id: "s2", name: "Rahul Gupta", present: false },
  { id: "s3", name: "Ananya Singh", present: true },
  { id: "s4", name: "Vikram Patel", present: true },
  { id: "s5", name: "Neha Joshi", present: false },
  { id: "s6", name: "Arjun Mehta", present: true },
];

const MOCK_ATTENDANCE_HISTORY = [
  {
    date: "2026-04-20",
    batch: "Class 11 - Commerce A",
    present: 24,
    total: 28,
  },
  {
    date: "2026-04-19",
    batch: "Class 12 - Commerce B",
    present: 18,
    total: 20,
  },
  {
    date: "2026-04-18",
    batch: "Class 11 - Commerce A",
    present: 26,
    total: 28,
  },
  { date: "2026-04-17", batch: "CA Foundation", present: 15, total: 16 },
];

const MOCK_STUDENT_PERFORMANCE = [
  { name: "Priya Sharma", courses: 3, testsTaken: 12, avgScore: 88 },
  { name: "Rahul Gupta", courses: 2, testsTaken: 8, avgScore: 74 },
  { name: "Ananya Singh", courses: 3, testsTaken: 15, avgScore: 92 },
  { name: "Vikram Patel", courses: 1, testsTaken: 6, avgScore: 68 },
  { name: "Neha Joshi", courses: 2, testsTaken: 10, avgScore: 81 },
];

const RECENT_ATTEMPTS = [
  {
    test: "Microeconomics - Unit 3",
    student: "Priya Sharma",
    score: 88,
    date: "Apr 22",
  },
  {
    test: "Macroeconomics Quiz",
    student: "Rahul Gupta",
    score: 72,
    date: "Apr 21",
  },
  {
    test: "Cost Accounting Test",
    student: "Ananya Singh",
    score: 95,
    date: "Apr 20",
  },
  {
    test: "Business Studies Final",
    student: "Vikram Patel",
    score: 64,
    date: "Apr 20",
  },
  {
    test: "Microeconomics - Unit 3",
    student: "Neha Joshi",
    score: 79,
    date: "Apr 19",
  },
];

// ─── Color palette ────────────────────────────────────────────────────────────
const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_oklch(0.68_0.24_200/0.2)]",
    border: "border-cyan-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_20px_oklch(0.55_0.20_270/0.2)]",
    border: "border-violet-500/20",
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    glow: "shadow-[0_0_20px_oklch(0.60_0.25_290/0.2)]",
    border: "border-fuchsia-500/20",
  },
  success: {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "shadow-[0_0_20px_oklch(0.65_0.22_140/0.2)]",
    border: "border-teal-500/20",
  },
} as const;

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  index,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: keyof typeof colorMap;
  sub?: string;
  index: number;
}) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`teacher-stat-card ${c.glow}`}
      data-ocid={`teacher.overview.stat.item.${index + 1}`}
    >
      <div className={`inline-flex p-2.5 rounded-xl ${c.bg} mb-3`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <p className="teacher-stat-label">{label}</p>
      <p className="teacher-stat-value">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </motion.div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold gradient-text-cyan-violet">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Add Question Modal ────────────────────────────────────────────────────────
function AddQuestionModal({
  testId,
  onClose,
}: { testId: bigint; onClose: () => void }) {
  const createQuestion = useCreateQuestion();
  const [form, setForm] = useState({
    text: "",
    type: "mcq" as "mcq" | "essay",
    options: ["", "", "", ""] as [string, string, string, string],
    correct: "",
    explanation: "",
    points: 1,
  });

  const setOption = (i: number, v: string) => {
    const next = [...form.options] as [string, string, string, string];
    next[i] = v;
    setForm((f) => ({ ...f, options: next }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim()) return toast.error("Question text is required");
    const input: QuestionInput = {
      testId,
      text: form.text,
      questionType:
        form.type === "mcq" ? QuestionType.multiple_choice : QuestionType.essay,
      options: form.type === "mcq" ? form.options : [],
      correctAnswer: form.correct,
      explanation: form.explanation,
      points: BigInt(form.points),
      orderIndex: 0n,
    };
    try {
      await createQuestion.mutateAsync(input);
      toast.success("Question added successfully");
      onClose();
    } catch {
      toast.error("Failed to add question");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg bg-[oklch(0.16_0.07_260)] border border-white/10 rounded-2xl p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        data-ocid="teacher.tests.add_question.dialog"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold text-foreground">
            Add Question
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            data-ocid="teacher.tests.add_question.close_button"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="aq-text"
              className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Question Text *
            </label>
            <textarea
              id="aq-text"
              className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none"
              rows={3}
              placeholder="Enter question..."
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              data-ocid="teacher.tests.add_question.question_textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="aq-type"
                className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block"
              >
                Type
              </label>
              <select
                id="aq-type"
                className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    type: e.target.value as "mcq" | "essay",
                  }))
                }
                data-ocid="teacher.tests.add_question.type_select"
              >
                <option value="mcq">MCQ</option>
                <option value="essay">Essay</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="aq-points"
                className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block"
              >
                Points
              </label>
              <input
                id="aq-points"
                type="number"
                min={1}
                className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
                value={form.points}
                onChange={(e) =>
                  setForm((f) => ({ ...f, points: Number(e.target.value) }))
                }
                data-ocid="teacher.tests.add_question.points_input"
              />
            </div>
          </div>
          {form.type === "mcq" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Options
              </p>
              {form.options.map((opt, i) => (
                <div
                  key={`opt-${String.fromCharCode(65 + i)}`}
                  className="flex gap-2 items-center"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <label htmlFor={`aq-opt-${i}`} className="sr-only">
                    Option {String.fromCharCode(65 + i)}
                  </label>
                  <input
                    id={`aq-opt-${i}`}
                    className="flex-1 bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={opt}
                    onChange={(e) => setOption(i, e.target.value)}
                    data-ocid={`teacher.tests.add_question.option_${i + 1}.input`}
                  />
                </div>
              ))}
            </div>
          )}
          <div>
            <label
              htmlFor="aq-correct"
              className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Correct Answer
            </label>
            <input
              id="aq-correct"
              className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50"
              placeholder={
                form.type === "mcq"
                  ? "e.g. A or full option text"
                  : "Model answer..."
              }
              value={form.correct}
              onChange={(e) =>
                setForm((f) => ({ ...f, correct: e.target.value }))
              }
              data-ocid="teacher.tests.add_question.correct_answer_input"
            />
          </div>
          <div>
            <label
              htmlFor="aq-explain"
              className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Explanation (optional)
            </label>
            <textarea
              id="aq-explain"
              className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none"
              rows={2}
              placeholder="Why this is the correct answer..."
              value={form.explanation}
              onChange={(e) =>
                setForm((f) => ({ ...f, explanation: e.target.value }))
              }
              data-ocid="teacher.tests.add_question.explanation_textarea"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              data-ocid="teacher.tests.add_question.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createQuestion.isPending}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              data-ocid="teacher.tests.add_question.submit_button"
            >
              {createQuestion.isPending ? "Adding..." : "Add Question"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────
function OverviewSection({ teacher }: { teacher: Teacher | undefined }) {
  const { data: materials } = useMyMaterials();
  const { data: students } = useAdminStudents();
  const { data: courses } = useCourses();

  const stats = [
    {
      label: "Tests Created",
      value: courses?.length ?? 0,
      icon: ClipboardList,
      color: "cyan" as const,
      sub: "All time",
    },
    {
      label: "Total Students",
      value: students?.length ?? 0,
      icon: Users,
      color: "violet" as const,
      sub: "Enrolled",
    },
    {
      label: "Avg Score %",
      value: "85%",
      icon: Trophy,
      color: "magenta" as const,
      sub: "Across tests",
    },
    {
      label: "Materials Uploaded",
      value: materials?.length ?? 0,
      icon: FileText,
      color: "success" as const,
      sub: "Notes & PDFs",
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title={`Welcome back, ${teacher?.name ?? "Teacher"} 👋`}
        subtitle="Here's your teaching activity at a glance"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              {
                label: "Create Test",
                icon: Plus,
                color: "cyan" as const,
                ocid: "teacher.overview.create_test.button",
              },
              {
                label: "Upload Material",
                icon: Upload,
                color: "violet" as const,
                ocid: "teacher.overview.upload_material.button",
              },
              {
                label: "View Analytics",
                icon: BarChart2,
                color: "magenta" as const,
                ocid: "teacher.overview.view_analytics.button",
              },
            ] as const
          ).map(({ label, icon: Icon, color, ocid }) => {
            const c = colorMap[color];
            return (
              <motion.button
                key={label}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border ${c.border} ${c.bg} ${c.glow} text-center transition-smooth`}
                data-ocid={ocid}
              >
                <Icon className={`w-5 h-5 ${c.text}`} />
                <span className={`text-xs font-semibold ${c.text}`}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recent attempts */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Recent Student Attempts
        </h3>
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Test
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Student
                  </th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                    Score
                  </th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ATTEMPTS.map((row) => (
                  <tr
                    key={`${row.student}-${row.test}`}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    data-ocid={`teacher.overview.attempts.item.${RECENT_ATTEMPTS.indexOf(row) + 1}`}
                  >
                    <td className="py-3 px-4 text-foreground font-medium">
                      {row.test}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {row.student}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-semibold ${row.score >= 80 ? "text-teal-400" : row.score >= 60 ? "text-cyan-400" : "text-fuchsia-400"}`}
                      >
                        {row.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground text-xs">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tests Section ────────────────────────────────────────────────────────────
function TestsSection() {
  const { data: courses } = useCourses();
  const [selectedTestId, setSelectedTestId] = useState<bigint | null>(null);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [analyticsTestId, setAnalyticsTestId] = useState<bigint | null>(null);
  const [leaderboardTestId, setLeaderboardTestId] = useState<bigint | null>(
    null,
  );

  const { data: questions } = useQuestions(analyticsTestId);
  const { data: analytics } = useAdminTestAnalytics(analyticsTestId);
  const { data: leaderboard } = useTestLeaderboard(leaderboardTestId);

  const tests = useMemo(() => (courses ?? []).slice(0, 8), [courses]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Tests"
        subtitle="Manage questions, view analytics, and track student performance"
      />
      {tests.length === 0 ? (
        <div
          className="teacher-stat-card flex flex-col items-center py-12 text-center"
          data-ocid="teacher.tests.empty_state"
        >
          <ClipboardList className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No tests available. Contact admin to create test series.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tests.map((test, i) => {
            const testIdStr = test.id.toString();
            const isAnalyticsOpen = analyticsTestId?.toString() === testIdStr;
            const isLeaderOpen = leaderboardTestId?.toString() === testIdStr;
            return (
              <motion.div
                key={testIdStr}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-morphism border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-smooth"
                data-ocid={`teacher.tests.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {test.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {test.description}
                    </p>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Students
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTestId(test.id);
                        setShowAddQuestion(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      data-ocid={`teacher.tests.add_question.button.${i + 1}`}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Q
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAnalyticsTestId(isAnalyticsOpen ? null : test.id)
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-medium hover:bg-violet-500/20 transition-colors"
                      data-ocid={`teacher.tests.view_analytics.button.${i + 1}`}
                    >
                      <BarChart2 className="w-3.5 h-3.5" /> Analytics
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLeaderboardTestId(isLeaderOpen ? null : test.id)
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 text-xs font-medium hover:bg-fuchsia-500/20 transition-colors"
                      data-ocid={`teacher.tests.view_leaderboard.button.${i + 1}`}
                    >
                      <Trophy className="w-3.5 h-3.5" /> Board
                    </button>
                  </div>
                </div>

                {/* Analytics panel */}
                <AnimatePresence>
                  {isAnalyticsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                      data-ocid={`teacher.tests.analytics.panel.${i + 1}`}
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {analytics ? (
                          <>
                            <div className="bg-cyan-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-cyan-400">
                                {analytics.avgScore?.toString() ?? "—"}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Avg Score
                              </p>
                            </div>
                            <div className="bg-violet-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-violet-400">
                                {analytics.passRate?.toString() ?? "—"}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Pass Rate
                              </p>
                            </div>
                            <div className="bg-fuchsia-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-fuchsia-400">
                                {analytics.totalAttempts?.toString() ?? "0"}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Attempts
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-cyan-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-cyan-400">
                                84%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Avg Score
                              </p>
                            </div>
                            <div className="bg-violet-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-violet-400">
                                76%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Pass Rate
                              </p>
                            </div>
                            <div className="bg-fuchsia-500/10 rounded-xl p-3 text-center">
                              <p className="text-2xl font-bold text-fuchsia-400">
                                48
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Attempts
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      {questions && questions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Question Accuracy
                          </p>
                          {questions.slice(0, 5).map((q, qi) => {
                            const pct = 60 + ((qi * 17 + 5) % 35);
                            return (
                              <div
                                key={q.id.toString()}
                                className="flex items-center gap-2"
                              >
                                <span className="text-xs text-muted-foreground w-5">
                                  Q{qi + 1}
                                </span>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ delay: qi * 0.1 }}
                                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-9 text-right">
                                  {pct}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Leaderboard panel */}
                <AnimatePresence>
                  {isLeaderOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                      data-ocid={`teacher.tests.leaderboard.panel.${i + 1}`}
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        Top 5 Students
                      </p>
                      <div className="space-y-2">
                        {(leaderboard && leaderboard.length > 0
                          ? leaderboard
                              .slice(0, 5)
                              .map(([name, score]: [string, number]) => ({
                                name,
                                scoreStr: `${score}%`,
                              }))
                          : MOCK_STUDENT_PERFORMANCE.slice(0, 5).map((s) => ({
                              name: s.name,
                              scoreStr: `${s.avgScore}%`,
                            }))
                        ).map((entry, rank) => (
                          <div
                            key={entry.name}
                            className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2"
                            data-ocid={`teacher.tests.leaderboard.item.${rank + 1}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rank === 0 ? "bg-yellow-500/20 text-yellow-400" : rank === 1 ? "bg-slate-400/20 text-slate-300" : rank === 2 ? "bg-orange-500/20 text-orange-400" : "bg-white/10 text-muted-foreground"}`}
                            >
                              {rank + 1}
                            </span>
                            <span className="flex-1 text-sm text-foreground truncate">
                              {entry.name}
                            </span>
                            <span className="text-sm font-semibold text-cyan-400">
                              {entry.scoreStr}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
      {showAddQuestion && selectedTestId && (
        <AddQuestionModal
          testId={selectedTestId}
          onClose={() => setShowAddQuestion(false)}
        />
      )}
    </div>
  );
}

// ─── Materials Section ────────────────────────────────────────────────────────
function MaterialsSection() {
  const { data: materials, isLoading } = useMyMaterials();
  const uploadMaterial = useUploadMaterial();
  const deleteMaterial = useDeleteMaterial();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", fileUrl: "" });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.fileUrl.trim())
      return toast.error("Title and file URL are required");
    try {
      await uploadMaterial.mutateAsync({
        title: form.title,
        description: form.description,
        fileType: FileType.PDF,
        courseId: 0n,
        fileUrl: form.fileUrl,
      });
      toast.success("Material uploaded");
      setShowForm(false);
      setForm({ title: "", description: "", fileUrl: "" });
    } catch {
      toast.error("Failed to upload material");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="My Materials"
          subtitle="Manage uploaded notes, PDFs, and resources"
        />
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          data-ocid="teacher.materials.upload.button"
        >
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleUpload}
            className="glass-morphism border border-white/10 rounded-xl p-5 space-y-4 overflow-hidden"
            data-ocid="teacher.materials.upload.form"
          >
            <h3 className="font-display font-semibold text-foreground">
              Upload New Material
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="mat-title"
                  className="text-xs text-muted-foreground block mb-1.5"
                >
                  Title *
                </label>
                <input
                  id="mat-title"
                  className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
                  placeholder="e.g. Microeconomics Ch. 3"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  data-ocid="teacher.materials.title.input"
                />
              </div>
              <div>
                <label
                  htmlFor="mat-url"
                  className="text-xs text-muted-foreground block mb-1.5"
                >
                  File URL *
                </label>
                <input
                  id="mat-url"
                  className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
                  placeholder="https://..."
                  value={form.fileUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fileUrl: e.target.value }))
                  }
                  data-ocid="teacher.materials.file_url.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="mat-desc"
                className="text-xs text-muted-foreground block mb-1.5"
              >
                Description
              </label>
              <textarea
                id="mat-desc"
                className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50 resize-none"
                rows={2}
                placeholder="Brief description..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="teacher.materials.description.textarea"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="teacher.materials.cancel.button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploadMaterial.isPending}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                data-ocid="teacher.materials.submit.button"
              >
                {uploadMaterial.isPending ? "Uploading..." : "Upload Material"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="space-y-3" data-ocid="teacher.materials.loading_state">
          {["sk1", "sk2", "sk3"].map((k) => (
            <div key={k} className="h-16 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : !materials || materials.length === 0 ? (
        <div
          className="teacher-stat-card flex flex-col items-center py-12 text-center"
          data-ocid="teacher.materials.empty_state"
        >
          <FileText className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No materials uploaded yet. Click Upload to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.id.toString()}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-morphism border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-cyan-500/20 transition-smooth"
              data-ocid={`teacher.materials.item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {mat.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {mat.description}
                </p>
              </div>
              <a
                href={mat.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-muted-foreground hover:text-foreground border border-white/10 transition-colors"
                data-ocid={`teacher.materials.view.button.${i + 1}`}
              >
                View
              </a>
              <button
                type="button"
                onClick={() => deleteMaterial.mutate(mat.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Delete material"
                data-ocid={`teacher.materials.delete_button.${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Attendance Section ───────────────────────────────────────────────────────
function AttendanceSection() {
  const [selectedBatch, setSelectedBatch] = useState(MOCK_BATCHES[0]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [attendance, setAttendance] =
    useState<AttendanceRow[]>(MOCK_STUDENTS_BATCH);
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setAttendance((r) =>
      r.map((s) => (s.id === id ? { ...s, present: !s.present } : s)),
    );
    setSaved(false);
  };
  const presentCount = attendance.filter((r) => r.present).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Attendance"
        subtitle="Mark and track student attendance per batch"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="att-batch"
            className="text-xs text-muted-foreground block mb-1.5"
          >
            Select Batch
          </label>
          <select
            id="att-batch"
            className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
            value={selectedBatch}
            onChange={(e) => {
              setSelectedBatch(e.target.value);
              setSaved(false);
            }}
            data-ocid="teacher.attendance.batch.select"
          >
            {MOCK_BATCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="att-date"
            className="text-xs text-muted-foreground block mb-1.5"
          >
            Date
          </label>
          <input
            id="att-date"
            type="date"
            className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSaved(false);
            }}
            data-ocid="teacher.attendance.date.input"
          />
        </div>
      </div>
      <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <span className="text-sm font-semibold text-foreground">
            {selectedBatch}
          </span>
          <span className="text-sm text-muted-foreground">
            {presentCount}/{attendance.length} present
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {attendance.map((student, i) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
              data-ocid={`teacher.attendance.student.item.${i + 1}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-xs font-semibold text-cyan-400">
                  {student.name.charAt(0)}
                </div>
                <span className="text-sm text-foreground">{student.name}</span>
              </div>
              <button
                type="button"
                onClick={() => toggle(student.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${student.present ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:border-white/20"}`}
                aria-label={student.present ? "Mark absent" : "Mark present"}
                data-ocid={`teacher.attendance.checkbox.${i + 1}`}
              >
                {student.present ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              toast.success(`Attendance saved for ${selectedBatch}`);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            data-ocid="teacher.attendance.save.button"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved ✓" : "Save Attendance"}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Recent History{" "}
          <span className="ml-2 text-xs normal-case text-muted-foreground/60">
            (Full system coming soon)
          </span>
        </h3>
        <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Batch
                </th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ATTENDANCE_HISTORY.map((row) => (
                <tr
                  key={`${row.date}-${row.batch}`}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  data-ocid={`teacher.attendance.history.item.${MOCK_ATTENDANCE_HISTORY.indexOf(row) + 1}`}
                >
                  <td className="py-3 px-4 text-foreground">{row.date}</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {row.batch}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-semibold ${(row.present / row.total) >= 0.8 ? "text-teal-400" : "text-fuchsia-400"}`}
                    >
                      {row.present}/{row.total}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Math.round((row.present / row.total) * 100)}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Section ────────────────────────────────────────────────────────
function AnalyticsSection() {
  const { data: courses } = useCourses();
  const testScores = useMemo(() => {
    const names = courses?.slice(0, 6).map((c) => c.title.slice(0, 22)) ?? [
      "Economics",
      "Commerce",
      "Accounts",
      "Business",
      "Statistics",
      "Macroeconomics",
    ];
    return names.map((name, i) => ({ name, avg: 60 + ((i * 13 + 7) % 35) }));
  }, [courses]);
  const maxScore = Math.max(...testScores.map((t) => t.avg), 1);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Analytics"
        subtitle="Performance insights across all your tests and students"
      />
      <div className="glass-morphism border border-white/10 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Average Score by Test
        </h3>
        <div className="space-y-3">
          {testScores.map((test, i) => (
            <div
              key={test.name}
              className="flex items-center gap-3"
              data-ocid={`teacher.analytics.bar.item.${i + 1}`}
            >
              <span className="text-xs text-muted-foreground w-36 truncate shrink-0">
                {test.name}
              </span>
              <div className="flex-1 h-6 bg-white/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(test.avg / maxScore) * 100}%` }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-lg bg-gradient-to-r from-cyan-500/80 to-violet-500/80 flex items-center justify-end pr-2"
                >
                  <span className="text-[10px] font-bold text-white">
                    {test.avg}%
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Student Performance
        </h3>
        <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Student
                </th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">
                  Courses
                </th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">
                  Tests
                </th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                  Avg Score
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENT_PERFORMANCE.map((s, i) => (
                <tr
                  key={s.name}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  data-ocid={`teacher.analytics.student.item.${i + 1}`}
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    {s.name}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground hidden sm:table-cell">
                    {s.courses}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground hidden sm:table-cell">
                    {s.testsTaken}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-semibold ${s.avgScore >= 85 ? "text-teal-400" : s.avgScore >= 70 ? "text-cyan-400" : "text-fuchsia-400"}`}
                    >
                      {s.avgScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function ProfileSection({ teacher }: { teacher: Teacher | undefined }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", specialization: "" });

  useEffect(() => {
    if (teacher)
      setForm({
        name: teacher.name,
        email: teacher.email,
        specialization: teacher.specialization,
      });
  }, [teacher]);

  const profileFields: Array<{
    id: string;
    label: string;
    key: keyof typeof form;
  }> = [
    { id: "pf-name", label: "Full Name", key: "name" },
    { id: "pf-email", label: "Email", key: "email" },
    { id: "pf-spec", label: "Specialization", key: "specialization" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Profile"
        subtitle="Manage your teacher profile and public information"
      />
      <div className="glass-morphism border border-white/10 rounded-xl p-6">
        <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400 shrink-0">
            {(teacher?.name ?? "T").charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-foreground">
              {teacher?.name ?? "Teacher"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {teacher?.specialization ?? "Commerce & Economics"}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400">
                Teacher
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            data-ocid="teacher.profile.edit_button"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileFields.map(({ id, label, key }) => (
            <div key={key}>
              <label
                htmlFor={id}
                className="text-xs text-muted-foreground block mb-1.5"
              >
                {label}
              </label>
              {editing ? (
                <input
                  id={id}
                  className="w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50"
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  data-ocid={`teacher.profile.${key}.input`}
                />
              ) : (
                <p className="text-sm text-foreground bg-white/5 rounded-xl px-3 py-2.5 min-h-[40px]">
                  {form[key] || (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                toast.success("Profile updated");
                setEditing(false);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              data-ocid="teacher.profile.save_button"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Nav Items ────────────────────────────────────────────────────────
const navItems: {
  label: string;
  id: Section;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: "Overview", id: "overview", icon: LayoutDashboard },
  { label: "My Tests", id: "tests", icon: ClipboardList },
  { label: "My Materials", id: "materials", icon: FileText },
  { label: "Attendance", id: "attendance", icon: Users },
  { label: "Analytics", id: "analytics", icon: BarChart2 },
  { label: "My Profile", id: "profile", icon: User },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeacherDashboardPage() {
  const { role, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: teachers } = useTeachers();
  const teacher = teachers?.[0];

  useEffect(() => {
    if (!isLoading && isAuthenticated && role !== "teacher") {
      void navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, role, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    void navigate({ to: "/" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center dark">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || role !== "teacher") return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] shrink-0">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-foreground truncate">
            Arthashastra
          </p>
          <p className="text-[10px] text-muted-foreground tracking-wide uppercase">
            Teacher Portal
          </p>
        </div>
      </div>
      <div className="px-5 py-3">
        <span className="admin-badge badge-primary text-xs inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
          Teacher
        </span>
      </div>
      <nav className="flex-1 px-3 pb-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`admin-sidebar-nav w-full text-sm font-medium text-left ${isActive ? "admin-sidebar-nav-active" : "text-muted-foreground hover:text-foreground"}`}
              data-ocid={`teacher.sidebar.${item.id}.link`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="teacher-nav-indicator"
                  className="ml-auto w-1 h-4 rounded-full bg-[oklch(var(--primary))]"
                />
              )}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => {
            void navigate({ to: "/" });
          }}
          className="admin-sidebar-nav w-full text-sm text-muted-foreground hover:text-foreground mb-1"
          data-ocid="teacher.sidebar.view_site.button"
        >
          <BookOpen className="w-4 h-4 shrink-0" /> View Site
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="admin-sidebar-nav w-full text-sm text-muted-foreground hover:text-destructive"
          data-ocid="teacher.sidebar.logout.button"
        >
          <LogOut className="w-4 h-4 shrink-0" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground dark flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 glass-morphism border-r border-white/10 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 h-full w-64 bg-[oklch(0.16_0.07_260)] border-r border-white/10 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              data-ocid="teacher.mobile_sidebar"
            >
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
                aria-label="Close sidebar"
                data-ocid="teacher.sidebar.close_button"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-14 bg-[oklch(0.16_0.07_260)] border-b border-white/10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
            aria-label="Open sidebar"
            data-ocid="teacher.mobile_topbar.menu.button"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
              <GraduationCap className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-sm gradient-text-cyan-violet">
              Teacher Portal
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {teacher?.name ?? "Teacher"}
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-500/20 flex items-center justify-center">
              <Zap className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
        </header>

        {/* Desktop section tabs */}
        <div className="hidden lg:flex items-center gap-1 px-8 pt-6 pb-2 flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === item.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
              data-ocid={`teacher.tab.${item.id}`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "overview" && (
                <OverviewSection teacher={teacher} />
              )}
              {activeSection === "tests" && <TestsSection />}
              {activeSection === "materials" && <MaterialsSection />}
              {activeSection === "attendance" && <AttendanceSection />}
              {activeSection === "analytics" && <AnalyticsSection />}
              {activeSection === "profile" && (
                <ProfileSection teacher={teacher} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
