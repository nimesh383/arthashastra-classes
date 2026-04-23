import { k as useParams, h as useNavigate, ai as useAttemptAnswers, W as useMyResults, ae as useQuestions, j as jsxRuntimeExports, m as motion, r as reactExports, A as AnimatePresence } from "./index-UQyTW7IZ.js";
function getGradeConfig(grade) {
  const g = grade.replace("+", "").replace("-", "").toUpperCase();
  if (g === "A")
    return {
      color: "oklch(0.68 0.24 200)",
      glow: "glow-cyan",
      bg: "bg-primary/10",
      border: "border-primary/50"
    };
  if (g === "B")
    return {
      color: "oklch(0.65 0.22 140)",
      glow: "glow-success",
      bg: "bg-success/10",
      border: "border-success/50"
    };
  if (g === "C")
    return {
      color: "oklch(0.75 0.19 65)",
      glow: "",
      bg: "bg-warning/10",
      border: "border-warning/50"
    };
  if (g === "D")
    return {
      color: "oklch(0.62 0.21 25)",
      glow: "",
      bg: "bg-destructive/10",
      border: "border-destructive/50"
    };
  return {
    color: "oklch(0.62 0.21 25)",
    glow: "",
    bg: "bg-destructive/10",
    border: "border-destructive/50"
  };
}
function ScoreRing({ pct, grade }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - pct / 100 * circ;
  const cfg = getGradeConfig(grade);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-48 h-48 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "absolute inset-0 -rotate-90",
        width: "192",
        height: "192",
        viewBox: "0 0 192 192",
        "aria-label": "Score progress ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Score progress ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "96",
              cy: "96",
              r,
              fill: "none",
              stroke: "oklch(0.25 0.1 260)",
              strokeWidth: "12"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.circle,
            {
              cx: "96",
              cy: "96",
              r,
              fill: "none",
              stroke: cfg.color,
              strokeWidth: "12",
              strokeLinecap: "round",
              strokeDasharray: circ,
              initial: { strokeDashoffset: circ },
              animate: { strokeDashoffset: offset },
              transition: { duration: 1.8, ease: "easeOut", delay: 0.3 },
              style: { filter: `drop-shadow(0 0 12px ${cfg.color})` }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "font-display text-4xl font-bold",
          style: { color: cfg.color },
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.5, type: "spring", bounce: 0.4 },
          children: [
            Math.round(pct),
            "%"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Score" })
    ] })
  ] });
}
function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  const colors = [
    "oklch(0.68 0.24 200)",
    "oklch(0.6 0.25 290)",
    "oklch(0.55 0.2 270)",
    "oklch(0.65 0.22 140)"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none z-50 overflow-hidden", children: pieces.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute w-2 h-3 rounded-sm",
      style: {
        left: `${Math.random() * 100}%`,
        top: "-10px",
        background: colors[i % colors.length],
        rotate: Math.random() * 360
      },
      animate: {
        y: ["0vh", "110vh"],
        rotate: [0, 720],
        opacity: [1, 0.8, 0]
      },
      transition: {
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 1.5,
        ease: "easeIn"
      }
    },
    i
  )) });
}
function ReviewItem({
  index,
  questionText,
  studentAnswer,
  correctAnswer,
  isCorrect,
  explanation,
  points,
  pointsAwarded
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `result.review_item.${index + 1}`,
      className: "glass-morphism rounded-xl border overflow-hidden",
      style: {
        borderColor: isCorrect ? "oklch(0.65 0.22 140 / 0.4)" : "oklch(0.62 0.21 25 / 0.4)"
      },
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 p-4 text-left",
            onClick: () => setOpen((v) => !v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  style: {
                    background: isCorrect ? "oklch(0.65 0.22 140 / 0.2)" : "oklch(0.62 0.21 25 / 0.2)",
                    color: isCorrect ? "oklch(0.65 0.22 140)" : "oklch(0.62 0.21 25)"
                  },
                  children: isCorrect ? "✓" : "✗"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium text-foreground line-clamp-2", children: questionText }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex-shrink-0 text-xs font-display font-bold",
                  style: {
                    color: isCorrect ? "oklch(0.65 0.22 140)" : "oklch(0.62 0.21 25)"
                  },
                  children: [
                    pointsAwarded.toString(),
                    "/",
                    points.toString()
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 text-muted-foreground text-xs", children: open ? "▲" : "▼" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "px-4 pb-4 space-y-3",
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex-1 min-w-0 rounded-lg p-3",
                    style: {
                      background: "oklch(0.62 0.21 25 / 0.1)",
                      border: "1px solid oklch(0.62 0.21 25 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Your Answer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: studentAnswer || "Not answered" })
                    ]
                  }
                ),
                !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex-1 min-w-0 rounded-lg p-3",
                    style: {
                      background: "oklch(0.65 0.22 140 / 0.1)",
                      border: "1px solid oklch(0.65 0.22 140 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Correct Answer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm",
                          style: { color: "oklch(0.65 0.22 140)" },
                          children: correctAnswer
                        }
                      )
                    ]
                  }
                )
              ] }),
              explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg p-3 bg-muted/20 border border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Explanation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: explanation })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function TestResultPage() {
  const { attemptId } = useParams({ from: "/public/test-result/$attemptId" });
  const navigate = useNavigate();
  const attemptIdNum = BigInt(attemptId);
  const { data: answers = [], isLoading: answersLoading } = useAttemptAnswers(attemptIdNum);
  const { data: results = [], isLoading: resultsLoading } = useMyResults();
  const result = results.find((r) => r.attemptId === attemptIdNum);
  const { data: questions = [], isLoading: questionsLoading } = useQuestions(
    (result == null ? void 0 : result.testId) ?? null
  );
  const isLoading = answersLoading || resultsLoading || questionsLoading;
  if (isLoading || !result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-t-primary animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-3xl", children: "📊" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold gradient-text-cyan-violet mb-1", children: isLoading ? "Loading Results…" : "Result Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isLoading ? "Fetching your score…" : "This result may not exist." })
      ] }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold transition-smooth hover:opacity-90 glow-cyan",
          onClick: () => navigate({ to: "/tests" }),
          children: "Back to Tests"
        }
      )
    ] }) });
  }
  const pct = result.percentage;
  const grade = result.grade;
  const cfg = getGradeConfig(grade);
  const totalPts = Number(result.totalPoints);
  const maxPts = Number(result.maxPoints);
  const timeTakenSec = Number(result.timeTaken);
  const timeTakenStr = timeTakenSec < 60 ? `${timeTakenSec}s` : timeTakenSec < 3600 ? `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s` : `${Math.floor(timeTakenSec / 3600)}h ${Math.floor(timeTakenSec % 3600 / 60)}m`;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = answers.length > 0 ? Math.round(correctCount / answers.length * 100) : 0;
  const isAGrade = grade.toUpperCase().startsWith("A");
  const questionMap = new Map(questions.map((q) => [q.id, q]));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-12", children: [
    isAGrade && /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-5",
        style: {
          background: `radial-gradient(circle, ${cfg.color}, transparent)`
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": "result.hero",
          className: "glass-morphism rounded-3xl p-8 mb-8 text-center border",
          style: { borderColor: `${cfg.color}40` },
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            isAGrade && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "text-2xl mb-2",
                initial: { scale: 0, rotate: -20 },
                animate: { scale: 1, rotate: 0 },
                transition: { delay: 0.8, type: "spring", bounce: 0.6 },
                children: "🎉"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground uppercase tracking-widest mb-6 font-medium", children: "Test Result" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { pct, grade }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    "data-ocid": "result.grade_badge",
                    className: `result-grade-badge ${cfg.glow}`,
                    style: {
                      background: `linear-gradient(135deg, oklch(0.18 0.08 260), ${cfg.color}30)`,
                      border: `2px solid ${cfg.color}`,
                      color: cfg.color
                    },
                    initial: { scale: 0, rotate: 180 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { delay: 0.6, type: "spring", bounce: 0.4 },
                    children: grade
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Grade" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "text-center",
                  initial: { opacity: 0, x: 30 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-display text-5xl font-bold",
                        style: { color: cfg.color },
                        children: totalPts
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-sm", children: [
                      "of ",
                      maxPts,
                      " points"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Total Score" })
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8", children: [
        { label: "Time Taken", value: timeTakenStr, icon: "⏱" },
        { label: "Answered", value: `${answers.length}`, icon: "📝" },
        { label: "Correct", value: `${correctCount}`, icon: "✅" },
        { label: "Accuracy", value: `${accuracy}%`, icon: "🎯" }
      ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `result.stat.${i + 1}`,
          className: "result-accuracy-card text-center",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 + i * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: stat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-accuracy-value text-2xl", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-accuracy-label", children: stat.label })
          ]
        },
        stat.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": "result.accuracy_bar",
          className: "glass-morphism rounded-2xl p-6 mb-8 border border-border/50",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-4", children: "Performance Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Accuracy" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                    accuracy,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "test-progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full",
                    style: {
                      background: `linear-gradient(90deg, ${cfg.color}, oklch(0.6 0.25 290))`
                    },
                    initial: { width: "0%" },
                    animate: { width: `${accuracy}%` },
                    transition: { duration: 1.2, ease: "easeOut", delay: 0.7 }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                    Math.round(pct),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "test-progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "test-progress-fill",
                    initial: { width: "0%" },
                    animate: { width: `${pct}%` },
                    transition: { duration: 1.4, ease: "easeOut", delay: 0.9 }
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: [
              "A (90-100%)",
              "B (75-89%)",
              "C (60-74%)",
              "D (45-59%)",
              "F (<45%)"
            ].map((item) => {
              const letter = item[0];
              const isCurrent = grade.toUpperCase().startsWith(letter ?? "");
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-1 rounded text-xs font-medium",
                  style: {
                    background: isCurrent ? `${cfg.color}20` : "oklch(0.2 0.06 260)",
                    border: `1px solid ${isCurrent ? cfg.color : "oklch(0.3 0.08 260)"}`,
                    color: isCurrent ? cfg.color : "oklch(0.55 0.04 260)",
                    fontWeight: isCurrent ? 700 : 400
                  },
                  children: item
                },
                item
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": "result.answer_review",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-xl text-foreground mb-4", children: [
              "Answer Review",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 text-sm font-body font-normal text-muted-foreground", children: [
                correctCount,
                " correct, ",
                answers.length - correctCount,
                " incorrect"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: answers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl p-8 text-center text-muted-foreground", children: "No answer details available." }) : answers.map((ans, i) => {
              const q = questionMap.get(ans.questionId);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReviewItem,
                {
                  index: i,
                  questionText: (q == null ? void 0 : q.text) ?? `Question ${ans.questionId}`,
                  studentAnswer: ans.studentAnswer,
                  correctAnswer: (q == null ? void 0 : q.correctAnswer) ?? "N/A",
                  isCorrect: ans.isCorrect,
                  explanation: (q == null ? void 0 : q.explanation) ?? "",
                  points: (q == null ? void 0 : q.points) ?? 1n,
                  pointsAwarded: ans.pointsAwarded
                },
                ans.id.toString()
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-wrap gap-4 mt-10 justify-center",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "result.retake_button",
                className: "px-6 py-3 rounded-xl border border-primary/50 text-primary font-semibold transition-smooth hover:bg-primary/10 hover:glow-cyan",
                onClick: () => navigate({ to: `/tests/${result.testId}` }),
                children: "🔁 Retake Test"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "result.back_button",
                className: "px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold transition-smooth hover:opacity-90 glow-cyan",
                onClick: () => navigate({ to: "/tests" }),
                children: "← Back to Tests"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "result.share_button",
                className: "px-6 py-3 rounded-xl border border-border text-muted-foreground font-semibold transition-smooth hover:border-accent hover:text-accent",
                onClick: () => {
                  const text = `I scored ${Math.round(pct)}% (Grade ${grade}) on my Arthashastra Classes test! 📚`;
                  if (navigator.share) {
                    void navigator.share({ title: "My Test Result", text });
                  } else {
                    void navigator.clipboard.writeText(text);
                  }
                },
                children: "📤 Share Result"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  TestResultPage as default
};
