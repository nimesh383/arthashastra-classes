import { g as useAuth, r as reactExports, z as useStudyMaterials, o as useMyEnrollments, j as jsxRuntimeExports, m as motion, B as BookOpen, L as Link, R as RippleButton, i as LogIn, F as FileText, D as MaterialType, E as Subject, H as ClipboardList, I as FileType, x as ue } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { L as Lock } from "./lock-BiQ5d9JX.js";
import { E as Eye } from "./eye-BiFajpQT.js";
import { D as Download } from "./download-CZc12mda.js";
const TYPE_TABS = ["All", "PDF", "PYQ", "Notes"];
const SUBJECT_FILTERS = [
  "All",
  "Accountancy",
  "Economics",
  "BST",
  "Maths",
  "Commerce"
];
const typeConfig = {
  PDF: {
    icon: FileText,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowColor: "cyan"
  },
  PYQ: {
    icon: ClipboardList,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    glowColor: "violet"
  },
  Notes: {
    icon: BookOpen,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    glowColor: "magenta"
  }
};
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function getMaterialTypeFilter(m) {
  if (m.materialType === MaterialType.PYQ) return "PYQ";
  if (m.materialType === MaterialType.Notes) return "Notes";
  return "PDF";
}
function getSubjectFilter(m) {
  switch (m.subject) {
    case Subject.Accountancy:
      return "Accountancy";
    case Subject.Economics:
      return "Economics";
    case Subject.BST:
      return "BST";
    case Subject.Maths:
      return "Maths";
    case Subject.Commerce:
      return "Commerce";
    default:
      return "Commerce";
  }
}
function WatermarkedImage({ src, alt }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-28 rounded-xl overflow-hidden select-none",
      onContextMenu: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt,
            className: "w-full h-full object-cover pointer-events-none select-none",
            draggable: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden", children: ["wm0", "wm1", "wm2", "wm3"].map((wk, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute font-black text-foreground rotate-[-35deg] tracking-widest uppercase text-[7px] whitespace-nowrap",
            style: {
              opacity: 0.18,
              userSelect: "none",
              top: `${15 + i * 22}%`,
              left: "-10%",
              right: "-10%",
              textAlign: "center"
            },
            children: "ARTHASHASTRA CLASSES"
          },
          wk
        )) })
      ]
    }
  );
}
function LockedOverlay() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/60 flex flex-col items-center justify-center gap-2 z-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-violet-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground text-center px-4", children: "Purchase Course to Access" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/courses",
        className: "text-[10px] text-cyan-400 hover:text-cyan-300 font-medium transition-smooth",
        children: "Browse Courses →"
      }
    )
  ] });
}
function MaterialCard({ material, isUnlocked, index }) {
  const typeKey = getMaterialTypeFilter(material);
  const cfg = typeConfig[typeKey];
  const Icon = cfg.icon;
  const isImage = material.fileType === FileType.Image;
  const handleDownload = () => {
    if (!isUnlocked) {
      ue.error("Purchase this course to download materials.", {
        description: "Enroll in the course to unlock all study materials."
      });
      return;
    }
    window.open(material.fileUrl, "_blank", "noopener");
    ue.success("Opening material…", {
      description: material.title,
      duration: 3e3
    });
  };
  const handlePreview = () => {
    if (!isUnlocked) {
      ue.error("Login and enroll to preview this material.");
      return;
    }
    window.open(material.fileUrl, "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: cfg.glowColor,
      className: "p-5 flex flex-col gap-4 group relative",
      "data-ocid": `study_materials.list.item.${index + 1}`,
      children: [
        !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(LockedOverlay, {}),
        isImage && isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(WatermarkedImage, { src: material.fileUrl, alt: material.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color} ${!isUnlocked ? "opacity-40" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${!isUnlocked ? "opacity-40" : ""}`,
                children: typeKey
              }
            ),
            !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-muted-foreground" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", style: { userSelect: "none" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: `font-semibold text-sm leading-snug mb-1.5 line-clamp-2 ${!isUnlocked ? "text-muted-foreground" : "text-foreground"}`,
              children: material.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded glass-morphism border border-white/10", children: getSubjectFilter(material) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(material.uploadDate) }),
            material.fileSize && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: material.fileSize })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: !isImage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handlePreview,
              className: `flex items-center gap-1 text-xs font-medium transition-smooth ${isUnlocked ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/40 cursor-not-allowed"}`,
              "data-ocid": `study_materials.preview.button.${index + 1}`,
              "aria-label": `Preview ${material.title}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                "Preview"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RippleButton,
            {
              onClick: handleDownload,
              className: `flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-smooth ${isUnlocked ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30" : "bg-muted text-muted-foreground/40 cursor-not-allowed border border-white/5"}`,
              "data-ocid": `study_materials.download.button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                isUnlocked ? "Download" : "Locked"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function MaterialSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-6 rounded-full bg-white/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-white/5 rounded w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-white/5 rounded w-3/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-7 rounded-lg bg-white/5" }) })
  ] });
}
function StudyMaterialsPage() {
  const { isAuthenticated } = useAuth();
  const [activeType, setActiveType] = reactExports.useState("All");
  const [activeSubject, setActiveSubject] = reactExports.useState("All");
  const { data: allMaterials = [], isLoading } = useStudyMaterials();
  const { data: enrollments = [] } = useMyEnrollments();
  const enrolledCourseIds = reactExports.useMemo(
    () => new Set(enrollments.map((e) => e.courseId.toString())),
    [enrollments]
  );
  const filtered = reactExports.useMemo(() => {
    return allMaterials.filter((m) => {
      const matchType = activeType === "All" || getMaterialTypeFilter(m) === activeType;
      const matchSubject = activeSubject === "All" || getSubjectFilter(m) === activeSubject;
      return matchType && matchSubject;
    });
  }, [allMaterials, activeType, activeSubject]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 overflow-hidden",
      onContextMenu: (e) => {
        const target = e.target;
        const isMaterialSection = target.closest(
          "[data-ocid='study_materials.list.section']"
        );
        if (isMaterialSection) e.preventDefault();
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "py-24 relative",
            "data-ocid": "study_materials.hero.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: ["q0", "q1", "q2", "q3", "q4"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute w-1 h-1 rounded-full bg-violet-400/40",
                  style: { left: `${10 + i * 18}%`, top: `${15 + i % 3 * 28}%` },
                  animate: { y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] },
                  transition: {
                    duration: 3.5 + i * 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5
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
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                      "Resources"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
                      "Study ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Materials" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "Curated PDFs, Previous Year Questions, and revision notes — everything you need, organized in one place." })
                  ]
                }
              ) })
            ]
          }
        ),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "pb-2 bg-background",
            "data-ocid": "study_materials.login_gate",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-violet-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 shadow-[0_0_30px_oklch(0.55_0.20_270/0.15)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-violet-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Login to access the full study materials library" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "PYQs, premium notes, and answer keys are locked. Enroll in a course to unlock." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  "data-ocid": "study_materials.login_gate.login_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RippleButton, { className: "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_16px_oklch(0.55_0.20_270/0.35)]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                    "Login / Sign up"
                  ] })
                }
              )
            ] }) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-6 bg-background",
            "data-ocid": "study_materials.filters.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex gap-1 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit", children: TYPE_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveType(t),
                  className: `relative px-5 py-2 rounded-xl text-sm font-medium transition-smooth z-10 ${activeType === t ? "text-white" : "text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `study_materials.type_tab.${t.toLowerCase()}`,
                  children: [
                    activeType === t && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        layoutId: "type-tab-bg",
                        className: "absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_12px_oklch(0.55_0.20_270/0.4)]",
                        transition: {
                          type: "spring",
                          stiffness: 350,
                          damping: 30
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: t })
                  ]
                },
                t
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SUBJECT_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveSubject(s),
                  className: `px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${activeSubject === s ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_oklch(0.68_0.24_200/0.2)]" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-cyan-500/20"}`,
                  "data-ocid": `study_materials.subject_filter.${s.toLowerCase()}`,
                  children: s
                },
                s
              )) }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-4 pb-28 bg-background",
            "data-ocid": "study_materials.list.section",
            onContextMenu: (e) => e.preventDefault(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map(
              (sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(MaterialSkeleton, {}, sk)
            ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                className: "text-center py-28",
                "data-ocid": "study_materials.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-9 h-9 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No materials match your filters" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Try selecting a different type or subject." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setActiveType("All");
                        setActiveSubject("All");
                      },
                      className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90",
                      "data-ocid": "study_materials.empty_state.reset_button",
                      children: "Reset Filters"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MaterialCard,
              {
                material: m,
                isUnlocked: isAuthenticated && enrolledCourseIds.has(m.courseId.toString()),
                index: i
              },
              m.id.toString()
            )) }) })
          }
        )
      ]
    }
  );
}
export {
  StudyMaterialsPage as default
};
