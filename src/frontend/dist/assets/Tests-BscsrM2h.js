import { c as createLucideIcon, g as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion, H as ClipboardList, R as RippleButton, x as ue, A as AnimatePresence, X } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { Z as Zap } from "./zap-BVMbVm3n.js";
import { C as Clock } from "./clock-CRcJU_VI.js";
import { T as TrendingUp } from "./trending-up-FjEHqHu6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);
const ALL_TESTS = [
  {
    id: 1,
    title: "Accountancy Full Syllabus — Class 12",
    subject: "Accountancy",
    duration: 120,
    totalQuestions: 60,
    difficulty: "Hard",
    color: "cyan",
    desc: "Covers all chapters of CBSE Class 12 Accountancy. Timed test with instant analytics."
  },
  {
    id: 2,
    title: "Economics Chapter-wise Tests",
    subject: "Economics",
    duration: 45,
    totalQuestions: 25,
    difficulty: "Medium",
    color: "violet",
    desc: "Chapter-by-chapter micro and macro economics tests to identify weak areas."
  },
  {
    id: 3,
    title: "Business Studies Mock Board",
    subject: "Business Studies",
    duration: 180,
    totalQuestions: 80,
    difficulty: "Hard",
    color: "magenta",
    desc: "Full-length CBSE Board pattern mock test for Business Studies Class 12."
  },
  {
    id: 4,
    title: "CA Foundation — Accounting Basics",
    subject: "CA Foundation",
    duration: 60,
    totalQuestions: 30,
    difficulty: "Medium",
    color: "cyan",
    desc: "Quick-fire accounting concepts test aligned to ICAI Foundation syllabus."
  },
  {
    id: 5,
    title: "Commerce Olympiad Prep",
    subject: "Commerce",
    duration: 90,
    totalQuestions: 50,
    difficulty: "Hard",
    color: "violet",
    desc: "Challenge-level questions for commerce olympiads and competitive exams."
  },
  {
    id: 6,
    title: "Class 11 Accountancy — Revision Test",
    subject: "Accountancy",
    duration: 60,
    totalQuestions: 30,
    difficulty: "Easy",
    color: "cyan",
    desc: "Revision test covering Class 11 accounting fundamentals before Class 12."
  },
  {
    id: 7,
    title: "Economics — Indian Economy Overview",
    subject: "Economics",
    duration: 30,
    totalQuestions: 15,
    difficulty: "Easy",
    color: "violet",
    desc: "Introduction to Indian economic policies, growth, and development concepts."
  },
  {
    id: 8,
    title: "Business Studies — Marketing & Finance",
    subject: "Business Studies",
    duration: 75,
    totalQuestions: 40,
    difficulty: "Medium",
    color: "magenta",
    desc: "Focused test on marketing management and financial management chapters."
  }
];
const difficultyStyles = {
  Easy: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  Medium: "text-violet-400 bg-violet-500/10 border border-violet-500/20",
  Hard: "text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20"
};
const SUBJECTS = [
  "All",
  "Accountancy",
  "Economics",
  "Business Studies",
  "CA Foundation",
  "Commerce"
];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
function TestModal({ test, onClose }) {
  const handleBegin = () => {
    ue.info("🚀 Coming soon — full test system launching next!", {
      description: "We're building an immersive exam experience. Stay tuned!",
      duration: 5e3
    });
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
            onClick: onClose,
            initial: { opacity: 0 },
            animate: { opacity: 1 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md glass-morphism rounded-2xl border border-white/10 p-7 shadow-2xl",
            initial: { opacity: 0, scale: 0.9, y: 30 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: 30 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            "data-ocid": "tests.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "tests.modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[test.difficulty]}`,
                  children: test.difficulty
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: test.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: test.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [
                {
                  icon: Clock,
                  label: "Duration",
                  value: `${test.duration} minutes`
                },
                {
                  icon: CircleHelp,
                  label: "Questions",
                  value: `${test.totalQuestions} total`
                },
                { icon: TrendingUp, label: "Subject", value: test.subject },
                { icon: ClipboardList, label: "Pattern", value: "CBSE Board" }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg bg-white/5 border border-white/10 p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-3 h-3 text-cyan-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: item.label })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.value })
                  ]
                },
                item.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-3.5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-cyan-400 mb-1.5", children: "Instructions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Each question carries equal marks. No negative marking." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You can review and change answers before final submission." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Timer starts as soon as you begin — stay focused!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Detailed solutions are shown after submission." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-3 rounded-xl glass-morphism border border-white/10 text-muted-foreground text-sm font-medium hover:text-foreground transition-smooth",
                    "data-ocid": "tests.modal.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RippleButton,
                  {
                    className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.6)] transition-smooth",
                    onClick: handleBegin,
                    "data-ocid": "tests.modal.confirm_button",
                    children: "Begin Test →"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
function TestsPage() {
  const { isAuthenticated } = useAuth();
  const [activeDifficulty, setActiveDifficulty] = reactExports.useState("All");
  const [activeSubject, setActiveSubject] = reactExports.useState("All");
  const [selectedTest, setSelectedTest] = reactExports.useState(null);
  const filtered = ALL_TESTS.filter((t) => {
    const byDiff = activeDifficulty === "All" || t.difficulty === activeDifficulty;
    const bySub = activeSubject === "All" || t.subject === activeSubject;
    return byDiff && bySub;
  });
  const handleStartTest = (test) => {
    if (!isAuthenticated) {
      ue.error("Please login to take tests", {
        description: "Create your free account to access all test series.",
        action: {
          label: "Login",
          onClick: () => window.location.assign("/login")
        }
      });
      return;
    }
    setSelectedTest(test);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "tests.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 via-transparent to-cyan-500/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-4 block", children: "Online Tests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6", children: [
              "Test ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Series" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Subject-wise mock tests, full-length boards, and analytics to track every improvement." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 bg-muted/10 border-y border-white/5",
        "data-ocid": "tests.features.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
          {
            icon: Zap,
            title: "Instant Results",
            desc: "Get detailed score breakdowns immediately after submission."
          },
          {
            icon: CircleHelp,
            title: "Detailed Solutions",
            desc: "Every question comes with a step-by-step explanation."
          },
          {
            icon: ClipboardList,
            title: "Performance Analytics",
            desc: "Track progress over time with visual charts."
          }
        ].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-1", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: f.desc })
          ] })
        ] }) }, f.title)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-6 bg-background", "data-ocid": "tests.filters.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium mr-1", children: "Subject:" }),
        SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveSubject(s),
            className: `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-smooth border ${activeSubject === s ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"}`,
            "data-ocid": `tests.subject_filter.${s.toLowerCase().replace(/\s+/g, "_")}`,
            children: s
          },
          s
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium mr-1", children: "Difficulty:" }),
        DIFFICULTIES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveDifficulty(d),
            className: `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-smooth border ${activeDifficulty === d ? d === "Easy" ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : d === "Medium" ? "bg-violet-500/20 border-violet-500/50 text-violet-400" : d === "Hard" ? "bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400" : "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"}`,
            "data-ocid": `tests.difficulty_filter.${d.toLowerCase()}`,
            children: d
          },
          d
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-24 bg-background",
        "data-ocid": "tests.list.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-20",
            "data-ocid": "tests.list.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No tests match your filters." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setActiveDifficulty("All");
                    setActiveSubject("All");
                  },
                  className: "mt-4 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-smooth",
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: filtered.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowCard,
          {
            glowColor: t.color,
            className: "p-5 h-full flex flex-col",
            "data-ocid": `tests.list.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground", children: t.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyStyles[t.difficulty]}`,
                    children: t.difficulty
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mb-2 leading-snug", children: t.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed flex-1 mb-4 line-clamp-3", children: t.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  " ",
                  t.duration,
                  " min"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-3 h-3" }),
                  " ",
                  t.totalQuestions,
                  " Qs"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-white/10", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                RippleButton,
                {
                  className: "w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth flex items-center justify-center gap-2",
                  onClick: () => handleStartTest(t),
                  "data-ocid": `tests.start.button.${i + 1}`,
                  children: "Start Test →"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/login",
                  className: "w-full px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground font-semibold text-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-smooth flex items-center justify-center gap-2",
                  "data-ocid": `tests.login.button.${i + 1}`,
                  children: "Login to Take Test →"
                }
              ) })
            ]
          }
        ) }, t.id)) }) })
      }
    ),
    selectedTest && /* @__PURE__ */ jsxRuntimeExports.jsx(TestModal, { test: selectedTest, onClose: () => setSelectedTest(null) })
  ] });
}
export {
  TestsPage as default
};
