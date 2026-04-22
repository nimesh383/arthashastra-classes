import { u as useTestimonials, j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight, U as Users, G as GraduationCap, S as Star } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { C as CounterAnimation } from "./CounterAnimation-OSL04cJK.js";
import { I as InfiniteCarousel } from "./InfiniteCarousel-CL7Znm1c.js";
import { T as Trophy } from "./trophy-CBSE9LDr.js";
import { T as TrendingUp } from "./trending-up-CYYqlS9F.js";
import { A as Award } from "./award-l3z9FxqG.js";
import { Q as Quote } from "./quote-BEjJPDvZ.js";
const STATS = [
  { label: "Success Stories", value: 500, suffix: "+", icon: Trophy },
  { label: "Students Coached", value: 2e3, suffix: "+", icon: Users },
  { label: "Pass Rate", value: 98, suffix: "%", icon: TrendingUp },
  { label: "Top Scorers", value: 150, suffix: "+", icon: Award }
];
const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Board Toppers",
    desc: "Over 50 CBSE & MPBSE board toppers in Commerce from Arthashastra Classes in the last 3 years alone.",
    color: "cyan",
    metric: "50+ Toppers"
  },
  {
    icon: GraduationCap,
    title: "CA Foundation Clears",
    desc: "Hundreds of students have cleared CA Foundation on their First Attempt — a testament to our rigorous preparation methodology.",
    color: "violet",
    metric: "200+ CA Clears"
  },
  {
    icon: Star,
    title: "95%+ Scorers",
    desc: "A consistent pipeline of students scoring 95% and above in Accountancy, Economics, and BST.",
    color: "magenta",
    metric: "150+ Students"
  }
];
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
function CarouselCard({ t }) {
  const stars = Number(t.rating);
  const colors = ["cyan", "violet", "magenta"];
  const color = colors[Math.abs(t.id.charCodeAt(0) ?? 0) % 3];
  const textColor = color === "cyan" ? "text-cyan-400" : color === "violet" ? "text-violet-400" : "text-fuchsia-400";
  const bgColor = color === "cyan" ? "bg-cyan-500/10" : color === "violet" ? "bg-violet-500/10" : "bg-fuchsia-500/10";
  const initials = t.studentName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: color, className: "p-6 w-80 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: `w-6 h-6 ${textColor} mb-4 opacity-60` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-4", children: t.text }),
    t.marks && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 ${bgColor} mb-3 self-start`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: `w-3 h-3 ${textColor}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${textColor}`, children: t.marks })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5 mb-4", children: ["s1", "s2", "s3", "s4", "s5"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        className: `w-3.5 h-3.5 ${i < stars ? "text-cyan-400 fill-cyan-400" : "text-muted-foreground"}`
      },
      k
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      t.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: t.photoUrl,
          alt: t.studentName,
          className: "w-10 h-10 rounded-full object-cover border border-white/10"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-full ${bgColor} border border-white/10 flex items-center justify-center shrink-0`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${textColor}`, children: initials })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm truncate", children: t.studentName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs truncate", children: t.subject })
      ] })
    ] })
  ] });
}
function StoryCard({ t, index }) {
  const colors = ["cyan", "violet", "magenta"];
  const color = colors[index % 3];
  const textColor = color === "cyan" ? "text-cyan-400" : color === "violet" ? "text-violet-400" : "text-fuchsia-400";
  const bgColor = color === "cyan" ? "bg-cyan-500/10" : color === "violet" ? "bg-violet-500/10" : "bg-fuchsia-500/10";
  const stars = Number(t.rating);
  const initials = t.studentName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index % 3 * 0.1 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlowCard,
        {
          glowColor: color,
          className: "p-8 h-full flex flex-col",
          "data-ocid": `success_stories.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
              t.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: t.photoUrl,
                  alt: t.studentName,
                  className: "w-16 h-16 rounded-full object-cover border-2 border-white/10 shrink-0"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-16 h-16 rounded-full ${bgColor} flex items-center justify-center shrink-0 border border-white/10`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-display text-xl font-extrabold ${textColor}`,
                      children: initials
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-0.5 truncate", children: t.studentName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs font-semibold uppercase tracking-wide ${textColor} mb-1`,
                    children: t.subject
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: ["r1", "r2", "r3", "r4", "r5"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-3 h-3 ${i < stars ? "text-cyan-400 fill-cyan-400" : "text-muted-foreground"}`
                  },
                  k
                )) })
              ] }),
              t.marks && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `ml-auto px-3 py-1.5 rounded-lg ${bgColor} border border-white/10 text-center shrink-0`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display font-extrabold ${textColor} text-sm`, children: t.marks }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Score" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: `w-5 h-5 ${textColor} mb-3 opacity-50` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1", children: t.text })
          ]
        }
      )
    }
  );
}
function SuccessStoriesPage() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const visible = testimonials.filter((t) => t.isVisible);
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 17 + 5) % 95}%`,
      top: `${(i * 23 + 10) % 85}%`,
      color: i % 3 === 0 ? "oklch(0.68 0.24 200)" : i % 3 === 1 ? "oklch(0.55 0.2 270)" : "oklch(0.6 0.25 290)",
      duration: 3 + i % 4,
      delay: i * 0.3
    }
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[70vh] flex flex-col justify-center py-20",
        "data-ocid": "success_stories.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-fuchsia-600/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroParticle, { style: p.style }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.nav,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6",
                "aria-label": "breadcrumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:text-cyan-400 transition-colors",
                      "data-ocid": "success_stories.breadcrumb.home_link",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", children: "Success Stories" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Student Results" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6", children: [
                    "Success ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Stories" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto", children: "Real students. Real results. Discover how Arthashastra Classes has transformed hundreds of commerce students into top scorers and confident achievers." })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-y border-white/5",
        "data-ocid": "success_stories.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8 text-center", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3",
              whileHover: { rotate: 5, scale: 1.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6 text-cyan-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl lg:text-5xl font-extrabold gradient-text-cyan-violet mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounterAnimation, { target: s.value, suffix: s.suffix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:via-cyan-400/70 transition-smooth" })
        ] }) }, s.label)) }) })
      }
    ),
    !isLoading && visible.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-16 bg-background overflow-hidden",
        "data-ocid": "success_stories.carousel.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-10 max-w-6xl mx-auto px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block", children: "Live Testimonials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-extrabold text-foreground", children: [
              "What Students",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Are Saying" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfiniteCarousel,
            {
              items: visible.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselCard, { t }, t.id)),
              speed: 45,
              itemClassName: "w-80"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-muted/10 border-y border-white/5",
        "data-ocid": "success_stories.achievements.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block", children: "Highlights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Achievements" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "Numbers that speak for themselves — year after year, Arthashastra Classes delivers results." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ACHIEVEMENTS.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowCard,
            {
              glowColor: a.color,
              className: "p-8 text-center h-full",
              "data-ocid": `success_stories.achievement.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${a.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : a.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                    whileHover: { rotate: 5, scale: 1.1 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "w-8 h-8" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `font-display text-2xl font-extrabold mb-2 ${a.color === "cyan" ? "text-cyan-400" : a.color === "violet" ? "text-violet-400" : "text-fuchsia-400"}`,
                    children: a.metric
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-3", children: a.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: a.desc })
              ]
            }
          ) }, a.title)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background",
        "data-ocid": "success_stories.grid.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block", children: "In Their Words" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Student",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Testimonials" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "Hear directly from the students who made their dream scores a reality." })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
              "data-ocid": "success_stories.loading_state",
              children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map(
                (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-64 rounded-xl glass-morphism animate-pulse"
                  },
                  k
                )
              )
            }
          ) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24",
              "data-ocid": "success_stories.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Stories Coming Soon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Our students' success stories will be shared here shortly." })
              ]
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: visible.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StoryCard, { t, index: i }, t.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 bg-muted/10 border-t border-white/5 relative overflow-hidden",
        "data-ocid": "success_stories.cta.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5", children: [
              "Your Name Could Be",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Here Next" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Join thousands of successful students at Arthashastra Classes and write your own success story." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/courses",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base",
                  "data-ocid": "success_stories.cta.courses_link",
                  children: [
                    "Explore Courses ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-foreground font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth text-base",
                  "data-ocid": "success_stories.cta.contact_link",
                  children: "Talk to Us"
                }
              )
            ] })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  SuccessStoriesPage as default
};
