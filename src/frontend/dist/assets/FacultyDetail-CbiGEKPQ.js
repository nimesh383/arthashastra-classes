import { k as useParams, ad as useTeacher, j as jsxRuntimeExports, m as motion, G as GraduationCap, L as Link, C as ChevronRight, K as Mail, B as BookOpen, S as Star, U as Users } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { C as CounterAnimation } from "./CounterAnimation-DPWb01v-.js";
import { A as ArrowLeft } from "./arrow-left-EvhSeW3I.js";
import { A as Award } from "./award-DRL66g0V.js";
function HeroParticle({ style }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute rounded-full pointer-events-none",
      style: {
        width: 4,
        height: 4,
        background: style.color,
        left: style.left,
        top: style.top
      },
      animate: { y: [0, -20, 0], opacity: [0.3, 1, 0.3] },
      transition: {
        duration: style.duration,
        repeat: Number.POSITIVE_INFINITY,
        delay: style.delay,
        ease: "easeInOut"
      }
    }
  );
}
function FacultyDetailPage() {
  const params = useParams({ strict: false });
  const teacherId = params.id ? BigInt(params.id) : null;
  const { data: teacher, isLoading } = useTeacher(teacherId);
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 19 + 5) % 95}%`,
      top: `${(i * 27 + 8) % 85}%`,
      color: i % 3 === 0 ? "oklch(0.68 0.24 200)" : i % 3 === 1 ? "oklch(0.55 0.2 270)" : "oklch(0.6 0.25 290)",
      duration: 3 + i % 4,
      delay: i * 0.25
    }
  }));
  const stats = [
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Students Taught", value: 2e3, suffix: "+" },
    { label: "Rating", value: 5, suffix: "/5" },
    { label: "Courses", value: 12, suffix: "+" }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin",
        "data-ocid": "faculty_detail.loading_state"
      }
    ) });
  }
  if (!teacher || teacher.isDeleted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pt-16 min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center",
        "data-ocid": "faculty_detail.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-20 h-20 text-muted-foreground mx-auto mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-extrabold text-foreground mb-3", children: "Faculty Not Found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-md mx-auto", children: "This faculty member may have been removed or the link is incorrect." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/about",
                  className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:scale-105 transition-smooth",
                  "data-ocid": "faculty_detail.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    " Back to All Faculty"
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }
  const avatarInitials = teacher.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[75vh] flex flex-col justify-center py-20",
        "data-ocid": "faculty_detail.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/10 via-background to-cyan-500/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.20_270/0.08),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.55 0.2 270) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.2 270) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroParticle, { style: p.style }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.nav,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "flex items-center gap-2 text-xs text-muted-foreground mb-8",
                "aria-label": "breadcrumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:text-cyan-400 transition-colors",
                      "data-ocid": "faculty_detail.breadcrumb.home_link",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/about",
                      className: "hover:text-cyan-400 transition-colors",
                      "data-ocid": "faculty_detail.breadcrumb.faculty_link",
                      children: "Faculty"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-400 truncate max-w-[160px]", children: teacher.name })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -40 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.8, delay: 0.1 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-5 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-400/5", children: "Faculty Profile" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl font-extrabold leading-tight mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: teacher.name }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 font-semibold text-lg mb-4", children: teacher.specialization }),
                    teacher.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `mailto:${teacher.email}`,
                        className: "inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-smooth text-sm mb-6",
                        "data-ocid": "faculty_detail.email_link",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                          teacher.email
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base leading-relaxed mb-8 max-w-xl", children: [
                      "A dedicated commerce educator at Arthashastra Classes, bringing deep expertise in ",
                      teacher.specialization,
                      " to every classroom. Known for breaking down complex topics into exam-ready concepts with clarity, depth, and a genuine passion for student success."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/courses",
                          className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:scale-105 transition-smooth",
                          "data-ocid": "faculty_detail.hero.courses_link",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                            " View Courses"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/about",
                          className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-foreground hover:border-violet-400/50 hover:text-violet-400 transition-smooth",
                          "data-ocid": "faculty_detail.hero.back_link",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                            " All Faculty"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9, x: 40 },
                  animate: { opacity: 1, scale: 1, x: 0 },
                  transition: { duration: 1, delay: 0.3 },
                  className: "hidden lg:flex justify-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        className: "relative w-72 h-72 rounded-full overflow-hidden neon-border-violet",
                        whileHover: { scale: 1.04 },
                        transition: { duration: 0.4 },
                        children: [
                          teacher.profilePhotoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: teacher.profilePhotoUrl,
                              alt: teacher.name,
                              className: "w-full h-full object-cover"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl font-extrabold gradient-text-cyan-violet", children: avatarInitials }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full shadow-[inset_0_0_40px_oklch(0.55_0.20_270/0.2)] pointer-events-none" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        animate: { y: [0, -8, 0] },
                        transition: {
                          duration: 3.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        },
                        className: "absolute -bottom-4 -right-4 glass-morphism rounded-xl p-4 neon-border-cyan max-w-[180px]",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-cyan-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-cyan-400", children: "Expert" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: teacher.specialization })
                        ]
                      }
                    )
                  ] })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-y border-white/5",
        "data-ocid": "faculty_detail.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8 text-center", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl lg:text-5xl font-extrabold gradient-text-cyan-violet mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounterAnimation, { target: s.value, suffix: s.suffix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent group-hover:via-violet-400/70 transition-smooth" })
        ] }) }, s.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background",
        "data-ocid": "faculty_detail.bio.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block", children: "Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Teaching",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Approach" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            {
              icon: GraduationCap,
              title: "Specialization",
              desc: teacher.specialization,
              color: "violet"
            },
            {
              icon: Star,
              title: "Methodology",
              desc: "Concept-first teaching — every principle is explained from fundamentals to exam application, leaving no gaps in understanding.",
              color: "cyan"
            },
            {
              icon: Users,
              title: "Student Focus",
              desc: "Personalized doubt-clearing sessions, regular mock tests, and mentorship that tracks each student's progress individually.",
              color: "magenta"
            }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowCard,
            {
              glowColor: item.color,
              className: "p-8 h-full text-center",
              "data-ocid": `faculty_detail.detail.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${item.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : item.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                    whileHover: { rotate: 5, scale: 1.1 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-7 h-7" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-3", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.desc })
              ]
            }
          ) }, item.title)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-muted/10 border-t border-white/5",
        "data-ocid": "faculty_detail.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl font-extrabold text-foreground mb-5", children: [
            "Learn from the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Best" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: [
            "Join a batch taught by ",
            teacher.name,
            " and take your commerce scores to the next level."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/courses",
              className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 transition-smooth",
              "data-ocid": "faculty_detail.cta.enroll_link",
              children: [
                "Explore Courses ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
              ]
            }
          )
        ] }) })
      }
    )
  ] });
}
export {
  FacultyDetailPage as default
};
