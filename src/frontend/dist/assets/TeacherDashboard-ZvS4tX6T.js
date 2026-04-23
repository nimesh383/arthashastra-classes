import { g as useAuth, h as useNavigate, r as reactExports, n as useTeachers, j as jsxRuntimeExports, A as AnimatePresence, m as motion, X, aj as Menu, G as GraduationCap, ak as LayoutDashboard, H as ClipboardList, F as FileText, U as Users, B as BookOpen, a0 as LogOut, O as useMyMaterials, al as useAdminStudents, am as useCourses, ae as useQuestions, an as useAdminTestAnalytics, ao as useTestLeaderboard, ap as useUploadMaterial, aq as useDeleteMaterial, a as CircleCheckBig, x as ue, ar as useCreateQuestion, I as FileType, ah as QuestionType } from "./index-UQyTW7IZ.js";
import { Z as Zap } from "./zap-BVMbVm3n.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-lT3w3lb0.js";
import { U as User } from "./user-BkDQZZ4n.js";
import { T as Trophy } from "./trophy-4-Wkjeq5.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { U as Upload } from "./upload-CHG40MSW.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
import { S as Save } from "./save-Dvqznh41.js";
const MOCK_BATCHES = [
  "Class 11 - Commerce A",
  "Class 12 - Commerce B",
  "CA Foundation"
];
const MOCK_STUDENTS_BATCH = [
  { id: "s1", name: "Priya Sharma", present: true },
  { id: "s2", name: "Rahul Gupta", present: false },
  { id: "s3", name: "Ananya Singh", present: true },
  { id: "s4", name: "Vikram Patel", present: true },
  { id: "s5", name: "Neha Joshi", present: false },
  { id: "s6", name: "Arjun Mehta", present: true }
];
const MOCK_ATTENDANCE_HISTORY = [
  {
    date: "2026-04-20",
    batch: "Class 11 - Commerce A",
    present: 24,
    total: 28
  },
  {
    date: "2026-04-19",
    batch: "Class 12 - Commerce B",
    present: 18,
    total: 20
  },
  {
    date: "2026-04-18",
    batch: "Class 11 - Commerce A",
    present: 26,
    total: 28
  },
  { date: "2026-04-17", batch: "CA Foundation", present: 15, total: 16 }
];
const MOCK_STUDENT_PERFORMANCE = [
  { name: "Priya Sharma", courses: 3, testsTaken: 12, avgScore: 88 },
  { name: "Rahul Gupta", courses: 2, testsTaken: 8, avgScore: 74 },
  { name: "Ananya Singh", courses: 3, testsTaken: 15, avgScore: 92 },
  { name: "Vikram Patel", courses: 1, testsTaken: 6, avgScore: 68 },
  { name: "Neha Joshi", courses: 2, testsTaken: 10, avgScore: 81 }
];
const RECENT_ATTEMPTS = [
  {
    test: "Microeconomics - Unit 3",
    student: "Priya Sharma",
    score: 88,
    date: "Apr 22"
  },
  {
    test: "Macroeconomics Quiz",
    student: "Rahul Gupta",
    score: 72,
    date: "Apr 21"
  },
  {
    test: "Cost Accounting Test",
    student: "Ananya Singh",
    score: 95,
    date: "Apr 20"
  },
  {
    test: "Business Studies Final",
    student: "Vikram Patel",
    score: 64,
    date: "Apr 20"
  },
  {
    test: "Microeconomics - Unit 3",
    student: "Neha Joshi",
    score: 79,
    date: "Apr 19"
  }
];
const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_oklch(0.68_0.24_200/0.2)]",
    border: "border-cyan-500/20"
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_20px_oklch(0.55_0.20_270/0.2)]",
    border: "border-violet-500/20"
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    glow: "shadow-[0_0_20px_oklch(0.60_0.25_290/0.2)]",
    border: "border-fuchsia-500/20"
  },
  success: {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "shadow-[0_0_20px_oklch(0.65_0.22_140/0.2)]",
    border: "border-teal-500/20"
  }
};
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  index
}) {
  const c = colorMap[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.08 },
      className: `teacher-stat-card ${c.glow}`,
      "data-ocid": `teacher.overview.stat.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-flex p-2.5 rounded-xl ${c.bg} mb-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${c.text}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "teacher-stat-label", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "teacher-stat-value", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
      ]
    }
  );
}
function SectionHeader({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold gradient-text-cyan-violet", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
  ] });
}
function AddQuestionModal({
  testId,
  onClose
}) {
  const createQuestion = useCreateQuestion();
  const [form, setForm] = reactExports.useState({
    text: "",
    type: "mcq",
    options: ["", "", "", ""],
    correct: "",
    explanation: "",
    points: 1
  });
  const setOption = (i, v) => {
    const next = [...form.options];
    next[i] = v;
    setForm((f) => ({ ...f, options: next }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text.trim()) return ue.error("Question text is required");
    const input = {
      testId,
      text: form.text,
      questionType: form.type === "mcq" ? QuestionType.multiple_choice : QuestionType.essay,
      options: form.type === "mcq" ? form.options : [],
      correctAnswer: form.correct,
      explanation: form.explanation,
      points: BigInt(form.points),
      orderIndex: 0n
    };
    try {
      await createQuestion.mutateAsync(input);
      ue.success("Question added successfully");
      onClose();
    } catch {
      ue.error("Failed to add question");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "relative z-10 w-full max-w-lg bg-[oklch(0.16_0.07_260)] border border-white/10 rounded-2xl p-6 shadow-2xl",
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        "data-ocid": "teacher.tests.add_question.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Add Question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors",
                "data-ocid": "teacher.tests.add_question.close_button",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "aq-text",
                  className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block",
                  children: "Question Text *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "aq-text",
                  className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none",
                  rows: 3,
                  placeholder: "Enter question...",
                  value: form.text,
                  onChange: (e) => setForm((f) => ({ ...f, text: e.target.value })),
                  "data-ocid": "teacher.tests.add_question.question_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "aq-type",
                    className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block",
                    children: "Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "aq-type",
                    className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
                    value: form.type,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      type: e.target.value
                    })),
                    "data-ocid": "teacher.tests.add_question.type_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mcq", children: "MCQ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "essay", children: "Essay" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "aq-points",
                    className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block",
                    children: "Points"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "aq-points",
                    type: "number",
                    min: 1,
                    className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
                    value: form.points,
                    onChange: (e) => setForm((f) => ({ ...f, points: Number(e.target.value) })),
                    "data-ocid": "teacher.tests.add_question.points_input"
                  }
                )
              ] })
            ] }),
            form.type === "mcq" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Options" }),
              form.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-2 items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 font-bold", children: String.fromCharCode(65 + i) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: `aq-opt-${i}`, className: "sr-only", children: [
                      "Option ",
                      String.fromCharCode(65 + i)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: `aq-opt-${i}`,
                        className: "flex-1 bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50",
                        placeholder: `Option ${String.fromCharCode(65 + i)}`,
                        value: opt,
                        onChange: (e) => setOption(i, e.target.value),
                        "data-ocid": `teacher.tests.add_question.option_${i + 1}.input`
                      }
                    )
                  ]
                },
                `opt-${String.fromCharCode(65 + i)}`
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "aq-correct",
                  className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block",
                  children: "Correct Answer"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "aq-correct",
                  className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50",
                  placeholder: form.type === "mcq" ? "e.g. A or full option text" : "Model answer...",
                  value: form.correct,
                  onChange: (e) => setForm((f) => ({ ...f, correct: e.target.value })),
                  "data-ocid": "teacher.tests.add_question.correct_answer_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "aq-explain",
                  className: "text-xs text-muted-foreground uppercase tracking-wide mb-1.5 block",
                  children: "Explanation (optional)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "aq-explain",
                  className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 resize-none",
                  rows: 2,
                  placeholder: "Why this is the correct answer...",
                  value: form.explanation,
                  onChange: (e) => setForm((f) => ({ ...f, explanation: e.target.value })),
                  "data-ocid": "teacher.tests.add_question.explanation_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
                  "data-ocid": "teacher.tests.add_question.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: createQuestion.isPending,
                  className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50",
                  "data-ocid": "teacher.tests.add_question.submit_button",
                  children: createQuestion.isPending ? "Adding..." : "Add Question"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function OverviewSection({ teacher }) {
  const { data: materials } = useMyMaterials();
  const { data: students } = useAdminStudents();
  const { data: courses } = useCourses();
  const stats = [
    {
      label: "Tests Created",
      value: (courses == null ? void 0 : courses.length) ?? 0,
      icon: ClipboardList,
      color: "cyan",
      sub: "All time"
    },
    {
      label: "Total Students",
      value: (students == null ? void 0 : students.length) ?? 0,
      icon: Users,
      color: "violet",
      sub: "Enrolled"
    },
    {
      label: "Avg Score %",
      value: "85%",
      icon: Trophy,
      color: "magenta",
      sub: "Across tests"
    },
    {
      label: "Materials Uploaded",
      value: (materials == null ? void 0 : materials.length) ?? 0,
      icon: FileText,
      color: "success",
      sub: "Notes & PDFs"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: `Welcome back, ${(teacher == null ? void 0 : teacher.name) ?? "Teacher"} 👋`,
        subtitle: "Here's your teaching activity at a glance"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, index: i }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
        {
          label: "Create Test",
          icon: Plus,
          color: "cyan",
          ocid: "teacher.overview.create_test.button"
        },
        {
          label: "Upload Material",
          icon: Upload,
          color: "violet",
          ocid: "teacher.overview.upload_material.button"
        },
        {
          label: "View Analytics",
          icon: ChartNoAxesColumn,
          color: "magenta",
          ocid: "teacher.overview.view_analytics.button"
        }
      ].map(({ label, icon: Icon, color, ocid }) => {
        const c = colorMap[color];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.03 },
            whileTap: { scale: 0.97 },
            className: `flex flex-col items-center gap-2 py-4 px-3 rounded-xl border ${c.border} ${c.bg} ${c.glow} text-center transition-smooth`,
            "data-ocid": ocid,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${c.text}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold ${c.text}`, children: label })
            ]
          },
          label
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Recent Student Attempts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-muted-foreground font-medium", children: "Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-muted-foreground font-medium", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 text-muted-foreground font-medium", children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 text-muted-foreground font-medium", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: RECENT_ATTEMPTS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-white/5 hover:bg-white/5 transition-colors",
            "data-ocid": `teacher.overview.attempts.item.${RECENT_ATTEMPTS.indexOf(row) + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-foreground font-medium", children: row.test }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: row.student }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-semibold ${row.score >= 80 ? "text-teal-400" : row.score >= 60 ? "text-cyan-400" : "text-fuchsia-400"}`,
                  children: [
                    row.score,
                    "%"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right text-muted-foreground text-xs", children: row.date })
            ]
          },
          `${row.student}-${row.test}`
        )) })
      ] }) }) })
    ] })
  ] });
}
function TestsSection() {
  const { data: courses } = useCourses();
  const [selectedTestId, setSelectedTestId] = reactExports.useState(null);
  const [showAddQuestion, setShowAddQuestion] = reactExports.useState(false);
  const [analyticsTestId, setAnalyticsTestId] = reactExports.useState(null);
  const [leaderboardTestId, setLeaderboardTestId] = reactExports.useState(
    null
  );
  const { data: questions } = useQuestions(analyticsTestId);
  const { data: analytics } = useAdminTestAnalytics(analyticsTestId);
  const { data: leaderboard } = useTestLeaderboard(leaderboardTestId);
  const tests = reactExports.useMemo(() => (courses ?? []).slice(0, 8), [courses]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "My Tests",
        subtitle: "Manage questions, view analytics, and track student performance"
      }
    ),
    tests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "teacher-stat-card flex flex-col items-center py-12 text-center",
        "data-ocid": "teacher.tests.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No tests available. Contact admin to create test series." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: tests.map((test, i) => {
      var _a, _b, _c;
      const testIdStr = test.id.toString();
      const isAnalyticsOpen = (analyticsTestId == null ? void 0 : analyticsTestId.toString()) === testIdStr;
      const isLeaderOpen = (leaderboardTestId == null ? void 0 : leaderboardTestId.toString()) === testIdStr;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.06 },
          className: "glass-morphism border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-smooth",
          "data-ocid": `teacher.tests.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground truncate", children: test.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-1", children: test.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                    "Questions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                    "Students"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0 flex-wrap justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSelectedTestId(test.id);
                      setShowAddQuestion(true);
                    },
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium hover:bg-cyan-500/20 transition-colors",
                    "data-ocid": `teacher.tests.add_question.button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                      " Add Q"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAnalyticsTestId(isAnalyticsOpen ? null : test.id),
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-medium hover:bg-violet-500/20 transition-colors",
                    "data-ocid": `teacher.tests.view_analytics.button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5" }),
                      " Analytics"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLeaderboardTestId(isLeaderOpen ? null : test.id),
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 text-xs font-medium hover:bg-fuchsia-500/20 transition-colors",
                    "data-ocid": `teacher.tests.view_leaderboard.button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5" }),
                      " Board"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAnalyticsOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "mt-4 pt-4 border-t border-white/10 overflow-hidden",
                "data-ocid": `teacher.tests.analytics.panel.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: analytics ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cyan-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-cyan-400", children: [
                        ((_a = analytics.avgScore) == null ? void 0 : _a.toString()) ?? "—",
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Avg Score" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-violet-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-violet-400", children: [
                        ((_b = analytics.passRate) == null ? void 0 : _b.toString()) ?? "—",
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Pass Rate" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-fuchsia-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-fuchsia-400", children: ((_c = analytics.totalAttempts) == null ? void 0 : _c.toString()) ?? "0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Attempts" })
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cyan-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-cyan-400", children: "84%" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Avg Score" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-violet-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-violet-400", children: "76%" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Pass Rate" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-fuchsia-500/10 rounded-xl p-3 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-fuchsia-400", children: "48" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Attempts" })
                    ] })
                  ] }) }),
                  questions && questions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Question Accuracy" }),
                    questions.slice(0, 5).map((q, qi) => {
                      const pct = 60 + (qi * 17 + 5) % 35;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-5", children: [
                              "Q",
                              qi + 1
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                initial: { width: 0 },
                                animate: { width: `${pct}%` },
                                transition: { delay: qi * 0.1 },
                                className: "h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-9 text-right", children: [
                              pct,
                              "%"
                            ] })
                          ]
                        },
                        q.id.toString()
                      );
                    })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isLeaderOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "mt-4 pt-4 border-t border-white/10 overflow-hidden",
                "data-ocid": `teacher.tests.leaderboard.panel.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: "Top 5 Students" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (leaderboard && leaderboard.length > 0 ? leaderboard.slice(0, 5).map(([name, score]) => ({
                    name,
                    scoreStr: `${score}%`
                  })) : MOCK_STUDENT_PERFORMANCE.slice(0, 5).map((s) => ({
                    name: s.name,
                    scoreStr: `${s.avgScore}%`
                  }))).map((entry, rank) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2",
                      "data-ocid": `teacher.tests.leaderboard.item.${rank + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rank === 0 ? "bg-yellow-500/20 text-yellow-400" : rank === 1 ? "bg-slate-400/20 text-slate-300" : rank === 2 ? "bg-orange-500/20 text-orange-400" : "bg-white/10 text-muted-foreground"}`,
                            children: rank + 1
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground truncate", children: entry.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-cyan-400", children: entry.scoreStr })
                      ]
                    },
                    entry.name
                  )) })
                ]
              }
            ) })
          ]
        },
        testIdStr
      );
    }) }),
    showAddQuestion && selectedTestId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddQuestionModal,
      {
        testId: selectedTestId,
        onClose: () => setShowAddQuestion(false)
      }
    )
  ] });
}
function MaterialsSection() {
  const { data: materials, isLoading } = useMyMaterials();
  const uploadMaterial = useUploadMaterial();
  const deleteMaterial = useDeleteMaterial();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ title: "", description: "", fileUrl: "" });
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.fileUrl.trim())
      return ue.error("Title and file URL are required");
    try {
      await uploadMaterial.mutateAsync({
        title: form.title,
        description: form.description,
        fileType: FileType.PDF,
        courseId: 0n,
        fileUrl: form.fileUrl
      });
      ue.success("Material uploaded");
      setShowForm(false);
      setForm({ title: "", description: "", fileUrl: "" });
    } catch {
      ue.error("Failed to upload material");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          title: "My Materials",
          subtitle: "Manage uploaded notes, PDFs, and resources"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowForm((v) => !v),
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity",
          "data-ocid": "teacher.materials.upload.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            " Upload"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        onSubmit: handleUpload,
        className: "glass-morphism border border-white/10 rounded-xl p-5 space-y-4 overflow-hidden",
        "data-ocid": "teacher.materials.upload.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Upload New Material" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "mat-title",
                  className: "text-xs text-muted-foreground block mb-1.5",
                  children: "Title *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "mat-title",
                  className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
                  placeholder: "e.g. Microeconomics Ch. 3",
                  value: form.title,
                  onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                  "data-ocid": "teacher.materials.title.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "mat-url",
                  className: "text-xs text-muted-foreground block mb-1.5",
                  children: "File URL *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "mat-url",
                  className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
                  placeholder: "https://...",
                  value: form.fileUrl,
                  onChange: (e) => setForm((f) => ({ ...f, fileUrl: e.target.value })),
                  "data-ocid": "teacher.materials.file_url.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "mat-desc",
                className: "text-xs text-muted-foreground block mb-1.5",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "mat-desc",
                className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/50 resize-none",
                rows: 2,
                placeholder: "Brief description...",
                value: form.description,
                onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                "data-ocid": "teacher.materials.description.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowForm(false),
                className: "px-4 py-2 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": "teacher.materials.cancel.button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: uploadMaterial.isPending,
                className: "px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity",
                "data-ocid": "teacher.materials.submit.button",
                children: uploadMaterial.isPending ? "Uploading..." : "Upload Material"
              }
            )
          ] })
        ]
      }
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "teacher.materials.loading_state", children: ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-white/5 rounded-xl animate-pulse" }, k)) }) : !materials || materials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "teacher-stat-card flex flex-col items-center py-12 text-center",
        "data-ocid": "teacher.materials.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No materials uploaded yet. Click Upload to get started." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: materials.map((mat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        className: "glass-morphism border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-cyan-500/20 transition-smooth",
        "data-ocid": `teacher.materials.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: mat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: mat.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: mat.fileUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "px-3 py-1.5 rounded-lg bg-white/5 text-xs text-muted-foreground hover:text-foreground border border-white/10 transition-colors",
              "data-ocid": `teacher.materials.view.button.${i + 1}`,
              children: "View"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => deleteMaterial.mutate(mat.id),
              className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
              "aria-label": "Delete material",
              "data-ocid": `teacher.materials.delete_button.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ]
      },
      mat.id.toString()
    )) })
  ] });
}
function AttendanceSection() {
  const [selectedBatch, setSelectedBatch] = reactExports.useState(MOCK_BATCHES[0]);
  const [selectedDate, setSelectedDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = reactExports.useState(MOCK_STUDENTS_BATCH);
  const [saved, setSaved] = reactExports.useState(false);
  const toggle = (id) => {
    setAttendance(
      (r) => r.map((s) => s.id === id ? { ...s, present: !s.present } : s)
    );
    setSaved(false);
  };
  const presentCount = attendance.filter((r) => r.present).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Attendance",
        subtitle: "Mark and track student attendance per batch"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "att-batch",
            className: "text-xs text-muted-foreground block mb-1.5",
            children: "Select Batch"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "att-batch",
            className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
            value: selectedBatch,
            onChange: (e) => {
              setSelectedBatch(e.target.value);
              setSaved(false);
            },
            "data-ocid": "teacher.attendance.batch.select",
            children: MOCK_BATCHES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "att-date",
            className: "text-xs text-muted-foreground block mb-1.5",
            children: "Date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "att-date",
            type: "date",
            className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
            value: selectedDate,
            onChange: (e) => {
              setSelectedDate(e.target.value);
              setSaved(false);
            },
            "data-ocid": "teacher.attendance.date.input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-white/10 rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3.5 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: selectedBatch }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          presentCount,
          "/",
          attendance.length,
          " present"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-white/5", children: attendance.map((student, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors",
          "data-ocid": `teacher.attendance.student.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-xs font-semibold text-cyan-400", children: student.name.charAt(0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: student.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggle(student.id),
                className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${student.present ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:border-white/20"}`,
                "aria-label": student.present ? "Mark absent" : "Mark present",
                "data-ocid": `teacher.attendance.checkbox.${i + 1}`,
                children: student.present ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        },
        student.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-t border-white/10 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setSaved(true);
            ue.success(`Attendance saved for ${selectedBatch}`);
          },
          className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity",
          "data-ocid": "teacher.attendance.save.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saved ? "Saved ✓" : "Save Attendance"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: [
        "Recent History",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs normal-case text-muted-foreground/60", children: "(Full system coming soon)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism border border-white/10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-muted-foreground font-medium", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-muted-foreground font-medium", children: "Batch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 text-muted-foreground font-medium", children: "Attendance" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_ATTENDANCE_HISTORY.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-white/5 hover:bg-white/5 transition-colors",
            "data-ocid": `teacher.attendance.history.item.${MOCK_ATTENDANCE_HISTORY.indexOf(row) + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-foreground", children: row.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground", children: row.batch }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `font-semibold ${row.present / row.total >= 0.8 ? "text-teal-400" : "text-fuchsia-400"}`,
                    children: [
                      row.present,
                      "/",
                      row.total
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                  "(",
                  Math.round(row.present / row.total * 100),
                  "%)"
                ] })
              ] })
            ]
          },
          `${row.date}-${row.batch}`
        )) })
      ] }) })
    ] })
  ] });
}
function AnalyticsSection() {
  const { data: courses } = useCourses();
  const testScores = reactExports.useMemo(() => {
    const names = (courses == null ? void 0 : courses.slice(0, 6).map((c) => c.title.slice(0, 22))) ?? [
      "Economics",
      "Commerce",
      "Accounts",
      "Business",
      "Statistics",
      "Macroeconomics"
    ];
    return names.map((name, i) => ({ name, avg: 60 + (i * 13 + 7) % 35 }));
  }, [courses]);
  const maxScore = Math.max(...testScores.map((t) => t.avg), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Analytics",
        subtitle: "Performance insights across all your tests and students"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-white/10 rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4", children: "Average Score by Test" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: testScores.map((test, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3",
          "data-ocid": `teacher.analytics.bar.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-36 truncate shrink-0", children: test.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-6 bg-white/5 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${test.avg / maxScore * 100}%` },
                transition: {
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: "easeOut"
                },
                className: "h-full rounded-lg bg-gradient-to-r from-cyan-500/80 to-violet-500/80 flex items-center justify-end pr-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-white", children: [
                  test.avg,
                  "%"
                ] })
              }
            ) })
          ]
        },
        test.name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Student Performance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism border border-white/10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-muted-foreground font-medium", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell", children: "Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell", children: "Tests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 text-muted-foreground font-medium", children: "Avg Score" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_STUDENT_PERFORMANCE.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-white/5 hover:bg-white/5 transition-colors",
            "data-ocid": `teacher.analytics.student.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium text-foreground", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-center text-muted-foreground hidden sm:table-cell", children: s.courses }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-center text-muted-foreground hidden sm:table-cell", children: s.testsTaken }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-semibold ${s.avgScore >= 85 ? "text-teal-400" : s.avgScore >= 70 ? "text-cyan-400" : "text-fuchsia-400"}`,
                  children: [
                    s.avgScore,
                    "%"
                  ]
                }
              ) })
            ]
          },
          s.name
        )) })
      ] }) })
    ] })
  ] });
}
function ProfileSection({ teacher }) {
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", email: "", specialization: "" });
  reactExports.useEffect(() => {
    if (teacher)
      setForm({
        name: teacher.name,
        email: teacher.email,
        specialization: teacher.specialization
      });
  }, [teacher]);
  const profileFields = [
    { id: "pf-name", label: "Full Name", key: "name" },
    { id: "pf-email", label: "Email", key: "email" },
    { id: "pf-spec", label: "Specialization", key: "specialization" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "My Profile",
        subtitle: "Manage your teacher profile and public information"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-white/10 rounded-xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400 shrink-0", children: ((teacher == null ? void 0 : teacher.name) ?? "T").charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: (teacher == null ? void 0 : teacher.name) ?? "Teacher" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (teacher == null ? void 0 : teacher.specialization) ?? "Commerce & Economics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400", children: "Teacher" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditing((v) => !v),
            className: "px-3 py-1.5 rounded-xl border border-white/10 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
            "data-ocid": "teacher.profile.edit_button",
            children: editing ? "Cancel" : "Edit"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: profileFields.map(({ id, label, key }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: id,
            className: "text-xs text-muted-foreground block mb-1.5",
            children: label
          }
        ),
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id,
            className: "w-full bg-[oklch(0.20_0.08_260)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-cyan-500/50",
            value: form[key],
            onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
            "data-ocid": `teacher.profile.${key}.input`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground bg-white/5 rounded-xl px-3 py-2.5 min-h-[40px]", children: form[key] || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Not set" }) })
      ] }, key)) }),
      editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            ue.success("Profile updated");
            setEditing(false);
          },
          className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity",
          "data-ocid": "teacher.profile.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            " Save Changes"
          ]
        }
      ) })
    ] })
  ] });
}
const navItems = [
  { label: "Overview", id: "overview", icon: LayoutDashboard },
  { label: "My Tests", id: "tests", icon: ClipboardList },
  { label: "My Materials", id: "materials", icon: FileText },
  { label: "Attendance", id: "attendance", icon: Users },
  { label: "Analytics", id: "analytics", icon: ChartNoAxesColumn },
  { label: "My Profile", id: "profile", icon: User }
];
function TeacherDashboardPage() {
  const { role, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const { data: teachers } = useTeachers();
  const teacher = teachers == null ? void 0 : teachers[0];
  reactExports.useEffect(() => {
    if (!isLoading && isAuthenticated && role !== "teacher") {
      void navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, role, navigate]);
  const handleLogout = () => {
    logout();
    ue.success("Logged out");
    void navigate({ to: "/" });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" }) });
  }
  if (!isAuthenticated || role !== "teacher") return null;
  const SidebarContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 pb-5 border-b border-white/10 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate", children: "Arthashastra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground tracking-wide uppercase", children: "Teacher Portal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "admin-badge badge-primary text-xs inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" }),
      "Teacher"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 pb-4 flex flex-col gap-0.5 overflow-y-auto", children: navItems.map((item) => {
      const isActive = activeSection === item.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setActiveSection(item.id);
            setSidebarOpen(false);
          },
          className: `admin-sidebar-nav w-full text-sm font-medium text-left ${isActive ? "admin-sidebar-nav-active" : "text-muted-foreground hover:text-foreground"}`,
          "data-ocid": `teacher.sidebar.${item.id}.link`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 shrink-0" }),
            item.label,
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                layoutId: "teacher-nav-indicator",
                className: "ml-auto w-1 h-4 rounded-full bg-[oklch(var(--primary))]"
              }
            )
          ]
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-4 border-t border-white/10 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            void navigate({ to: "/" });
          },
          className: "admin-sidebar-nav w-full text-sm text-muted-foreground hover:text-foreground mb-1",
          "data-ocid": "teacher.sidebar.view_site.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 shrink-0" }),
            " View Site"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleLogout,
          className: "admin-sidebar-nav w-full text-sm text-muted-foreground hover:text-destructive",
          "data-ocid": "teacher.sidebar.logout.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 shrink-0" }),
            " Sign Out"
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground dark flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:flex flex-col w-60 shrink-0 glass-morphism border-r border-white/10 sticky top-0 h-screen overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSidebarOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.aside,
        {
          className: "fixed top-0 left-0 z-50 h-full w-64 bg-[oklch(0.16_0.07_260)] border-r border-white/10 lg:hidden",
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          "data-ocid": "teacher.mobile_sidebar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSidebarOpen(false),
                className: "absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth",
                "aria-label": "Close sidebar",
                "data-ocid": "teacher.sidebar.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {})
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-14 bg-[oklch(0.16_0.07_260)] border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSidebarOpen(true),
            className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth",
            "aria-label": "Open sidebar",
            "data-ocid": "teacher.mobile_topbar.menu.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-3 h-3 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm gradient-text-cyan-violet", children: "Teacher Portal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: (teacher == null ? void 0 : teacher.name) ?? "Teacher" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-cyan-400" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center gap-1 px-8 pt-6 pb-2 flex-wrap", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveSection(item.id),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === item.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
          "data-ocid": `teacher.tab.${item.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-3.5 h-3.5" }),
            item.label
          ]
        },
        item.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.2 },
          children: [
            activeSection === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewSection, { teacher }),
            activeSection === "tests" && /* @__PURE__ */ jsxRuntimeExports.jsx(TestsSection, {}),
            activeSection === "materials" && /* @__PURE__ */ jsxRuntimeExports.jsx(MaterialsSection, {}),
            activeSection === "attendance" && /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceSection, {}),
            activeSection === "analytics" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsSection, {}),
            activeSection === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSection, { teacher })
          ]
        },
        activeSection
      ) }) })
    ] })
  ] });
}
export {
  TeacherDashboardPage as default
};
