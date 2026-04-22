import { r as reactExports, f as useAvailableCourses, j as jsxRuntimeExports, m as motion, G as GraduationCap, g as useAuth, h as useNavigate, U as Users, R as RippleButton, C as ChevronRight, B as BookOpen } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { S as Skeleton } from "./skeleton-BH48xlqF.js";
import { C as Clock } from "./clock-B1Nr3IvY.js";
import { L as LogIn } from "./log-in-C6bE2VCu.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-CoprvsEO.js";
import { B as Briefcase } from "./briefcase-RrWviYyo.js";
const SUBJECT_FILTERS = [
  "All",
  "Accountancy",
  "Economics",
  "BST",
  "Maths",
  "Commerce"
];
const LEVEL_FILTERS = [
  "All",
  "Class11",
  "Class12",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Dropper"
];
const LEVEL_LABELS = {
  Class11: "Class 11",
  Class12: "Class 12",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Dropper: "Dropper"
};
function getSubjectIcon(subject) {
  if (subject === "Economics") return ChartNoAxesColumn;
  if (subject === "BST") return Briefcase;
  if (subject === "Maths") return GraduationCap;
  return BookOpen;
}
function getGlowColor(subject) {
  if (subject === "Economics" || subject === "Maths") return "violet";
  if (subject === "BST" || subject === "Commerce") return "magenta";
  return "cyan";
}
function getSubjectBadge(subject) {
  if (subject === "Economics")
    return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  if (subject === "BST")
    return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
  if (subject === "Maths")
    return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
  return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
}
function getLevelBadge(level) {
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
function CourseCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-11 h-11 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-6 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-6 rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-xl" })
    ] })
  ] });
}
function CourseCard({ course, index }) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor,
      className: "p-6 h-full flex flex-col group",
      "data-ocid": `courses.list.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-11 h-11 rounded-xl flex items-center justify-center ${glowColor === "cyan" ? "bg-cyan-500/10 text-cyan-400" : glowColor === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-wrap justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${subjectColor}`,
                children: course.subject
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor}`,
                children: LEVEL_LABELS[course.level] ?? course.level
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2 leading-snug", children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-5 flex-1 line-clamp-3", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground mb-5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-cyan-400/70" }),
            course.duration
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-violet-400/70" }),
            course.instructor
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Fees" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-lg", children: [
              "₹",
              Number(course.price).toLocaleString("en-IN"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-1", children: "/course" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RippleButton,
            {
              onClick: handleEnroll,
              className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)]",
              "data-ocid": `courses.enroll.link.${index + 1}`,
              children: isPaid && !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                "Login to Enroll"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Enroll Now",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ] })
            }
          )
        ] })
      ]
    }
  ) });
}
function CoursesPage() {
  const [activeSubject, setActiveSubject] = reactExports.useState("All");
  const [activeLevel, setActiveLevel] = reactExports.useState("All");
  const { data: courses, isLoading } = useAvailableCourses();
  const filtered = (courses ?? []).filter((c) => {
    const matchSubject = activeSubject === "All" || c.subject === activeSubject;
    const matchLevel = activeLevel === "All" || c.level === activeLevel;
    return matchSubject && matchLevel;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "courses.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: ["p0", "p1", "p2", "p3", "p4", "p5"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute w-1 h-1 rounded-full bg-cyan-400/40",
          style: { left: `${15 + i * 14}%`, top: `${20 + i % 3 * 25}%` },
          animate: { y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] },
          transition: {
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4
          }
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-cyan-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-3.5 h-3.5" }),
              "All Courses"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
              "Our ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Courses" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "From Class 11 to Dropper Batches — structured programs crafted for clarity, consistency, and top board results." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pb-8 bg-background",
        "data-ocid": "courses.filters.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SUBJECT_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveSubject(s),
                className: `px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${activeSubject === s ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-[0_0_12px_oklch(0.68_0.24_200/0.4)]" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-cyan-500/30"}`,
                "data-ocid": `courses.subject_filter.${s.toLowerCase()}`,
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-12 bg-white/10 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: LEVEL_FILTERS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveLevel(l),
                className: `px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${activeLevel === l ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_12px_oklch(0.55_0.20_270/0.4)]" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-violet-500/30"}`,
                "data-ocid": `courses.level_filter.${l.toLowerCase()}`,
                children: LEVEL_LABELS[l] ?? l
              },
              l
            )) })
          ] })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-28 bg-background",
        "data-ocid": "courses.list.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            "data-ocid": "courses.loading_state",
            children: Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is stable
              /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCardSkeleton, {}, i)
            ))
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "text-center py-28",
            "data-ocid": "courses.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-9 h-9 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No courses match your filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Try selecting a different subject or level." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setActiveSubject("All");
                    setActiveLevel("All");
                  },
                  className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90",
                  "data-ocid": "courses.empty_state.reset_button",
                  children: "Reset Filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course, index: i }, String(course.id))) }) })
      }
    )
  ] });
}
export {
  CoursesPage as default
};
