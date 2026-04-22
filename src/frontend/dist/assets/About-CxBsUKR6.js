import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight, b as MapPin, S as Star, G as GraduationCap, B as BookOpen } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { C as CounterAnimation } from "./CounterAnimation-OSL04cJK.js";
import { P as ParallaxSection } from "./ParallaxSection-LKfvhZyH.js";
import { R as Rocket, L as Lightbulb } from "./rocket-VB-SHbnx.js";
import { Z as Zap } from "./zap-C_zSkyH0.js";
import { A as Award } from "./award-l3z9FxqG.js";
import { S as Shield } from "./shield-DJAJPRLQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const stats = [
  { label: "Students Empowered", value: 2e3, suffix: "+" },
  { label: "Pass Rate", value: 98, suffix: "%" },
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Courses Offered", value: 50, suffix: "+" }
];
const missionVision = [
  {
    icon: Target,
    label: "Our Mission",
    color: "cyan",
    heading: "Democratize Commerce Education",
    text: "To break barriers in commerce coaching by merging deep academic expertise with cutting-edge technology — making world-class education accessible to every student in Bhopal and beyond."
  },
  {
    icon: Rocket,
    label: "Our Vision",
    color: "violet",
    heading: "Lead the Future of Learning",
    text: "To be the most innovative and results-driven commerce coaching platform in India, where every student graduates not just with marks but with mastery, confidence, and clarity."
  }
];
const timeline = [
  {
    year: "2009",
    title: "Founded",
    event: "Arthashastra Classes was founded by Ajay Govindani with a single batch of 30 dedicated students in the heart of Bhopal, MP.",
    icon: Rocket,
    color: "cyan"
  },
  {
    year: "2015",
    title: "Gone Digital",
    event: "Launched India's first commerce-focused online test portal and digital study material library, reaching students statewide.",
    icon: Zap,
    color: "violet"
  },
  {
    year: "2020",
    title: "Online Expansion",
    event: "Pivoted to hybrid learning during the pandemic, scaling live online classes to 1,200+ students across Madhya Pradesh.",
    icon: Brain,
    color: "magenta"
  },
  {
    year: "2024",
    title: "Next-Gen Platform",
    event: "Launched AI-powered analytics, personalized learning paths, and this immersive next-generation student platform.",
    icon: Star,
    color: "cyan"
  }
];
const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We set the standard. Every lesson, every revision, every test is engineered to push students beyond their limits.",
    color: "cyan"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace technology as a teaching ally — 3D visualizations, AI analytics, and adaptive testing that evolves with each learner.",
    color: "violet"
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparent results, honest feedback, and a commitment to your growth above all else. No shortcuts, only substance.",
    color: "magenta"
  }
];
const credentials = [
  { label: "Experience", value: "15+ Years" },
  { label: "Specialization", value: "Commerce & CA Foundation" },
  { label: "Affiliation", value: "CBSE & MPBSE Aligned" },
  { label: "Students Taught", value: "2000+" }
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
function AboutPage() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
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
        "data-ocid": "about.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.08),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroParticle, { style: p.style }, p.id)) }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.nav,
                {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.4 },
                  className: "flex items-center gap-2 text-xs text-muted-foreground mb-6",
                  "aria-label": "breadcrumb",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/",
                        className: "hover:text-cyan-400 transition-colors",
                        "data-ocid": "about.breadcrumb.home_link",
                        children: "Home"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", children: "About Us" })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Our Story" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6", children: [
                      "Where Commerce",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet block sm:inline", children: "Meets the Future" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-xl", children: "Founded in Bhopal with a bold vision — Arthashastra Classes has been rewriting what commerce coaching looks like for over 15 years. Rigorous academics, cutting-edge technology, and genuine care for every student." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.4 },
                  className: "mt-8 flex flex-wrap items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/courses",
                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transition-smooth",
                        "data-ocid": "about.hero.explore_courses_link",
                        children: [
                          "Explore Courses ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/contact",
                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-foreground font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth",
                        "data-ocid": "about.hero.contact_link",
                        children: "Contact Us"
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9, x: 40 },
                animate: { opacity: 1, scale: 1, x: 0 },
                transition: { duration: 1, delay: 0.3 },
                className: "relative hidden lg:block",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden neon-border-cyan aspect-video", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/assets/generated/about-hero-visual.dim_1200x600.jpg",
                        alt: "Arthashastra Classes — futuristic education",
                        className: "w-full h-full object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-cyan-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: "Arthashastra Classes — MP Nagar, Bhopal" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { y: [0, -8, 0] },
                      transition: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                      className: "absolute -top-4 -right-4 glass-morphism rounded-xl px-4 py-2 neon-border-violet text-sm font-bold text-violet-400",
                      children: "#1 Commerce Coaching"
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-y border-white/5",
        "data-ocid": "about.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8 text-center", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl lg:text-5xl font-extrabold gradient-text-cyan-violet mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounterAnimation, { target: s.value, suffix: s.suffix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:via-cyan-400/70 transition-smooth" })
        ] }) }, s.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background",
        "data-ocid": "about.mission.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block", children: "Purpose" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Mission &",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Vision" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Everything we do is grounded in two core beliefs." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: missionVision.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedSection,
            {
              delay: i * 0.15,
              direction: i === 0 ? "left" : "right",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowCard,
                {
                  glowColor: item.color,
                  className: "p-8 h-full",
                  "data-ocid": `about.${item.label.toLowerCase().replace(" ", "_")}.card`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : "bg-violet-500/10 text-violet-400"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-7 h-7" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-bold uppercase tracking-widest mb-2 block ${item.color === "cyan" ? "text-cyan-400" : "text-violet-400"}`,
                        children: item.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-4", children: item.heading }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: item.text })
                  ]
                }
              )
            },
            item.label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-muted/10 border-y border-white/5",
        "data-ocid": "about.timeline.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block", children: "Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Our ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Journey" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "From a single classroom in Bhopal to a next-generation learning platform — every year has been a chapter of transformation." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 hidden md:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-12", children: timeline.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimatedSection,
              {
                delay: i * 0.12,
                direction: i % 2 === 0 ? "left" : "right",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `relative flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`,
                    "data-ocid": `about.timeline.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        GlowCard,
                        {
                          glowColor: item.color === "cyan" ? "cyan" : item.color === "violet" ? "violet" : "magenta",
                          className: "p-6",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : item.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `font-display text-sm font-bold uppercase tracking-widest ${item.color === "cyan" ? "text-cyan-400" : item.color === "violet" ? "text-violet-400" : "text-fuchsia-400"}`,
                                  children: item.title
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm leading-relaxed", children: item.event })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-20 h-20 rounded-full glass-morphism border border-cyan-400/30 flex flex-col items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-extrabold gradient-text-cyan-violet leading-none", children: item.year }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-sm hidden md:block" })
                    ]
                  }
                )
              },
              item.year
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParallaxSection, { speed: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background",
        "data-ocid": "about.faculty.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block", children: "Lead Faculty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Meet",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Ajay Govindani" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "The architect of Arthashastra's success story." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "relative rounded-2xl overflow-hidden",
                  whileHover: { scale: 1.02 },
                  transition: { duration: 0.4 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/assets/generated/faculty-ajay-govindani.dim_600x700.jpg",
                        alt: "Ajay Govindani — Founder & Lead Faculty, Arthashastra Classes",
                        className: "w-full object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border border-cyan-400/30 pointer-events-none" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_oklch(0.68_0.24_200/0.15)] pointer-events-none" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  animate: { y: [0, -6, 0] },
                  transition: {
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  className: "absolute -bottom-4 -right-4 glass-morphism rounded-xl p-4 neon-border-violet max-w-[180px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 text-violet-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-violet-400", children: "Founder" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: "M.Com, LLB — 15+ years teaching commerce" })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "right", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-extrabold text-foreground mb-1", children: "Ajay Govindani" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 font-semibold text-sm", children: "Founder & Principal Educator · Arthashastra Classes" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "With over 15 years of dedicated commerce teaching, Ajay Sir has transformed thousands of students' academic futures. Renowned for his ability to break down complex concepts like Financial Statements, Business Studies, and Economics into crystal-clear, exam-ready knowledge, he combines deep subject mastery with a passion for mentorship that is truly unmatched in Bhopal." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "His pedagogical philosophy: every student is capable of excellence — they just need the right guide, the right tools, and the right environment. That belief is the DNA of Arthashastra Classes." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: credentials.map((cred) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-morphism rounded-xl p-4 border border-white/10",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: cred.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-sm", children: cred.value })
                  ]
                },
                cred.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                "CBSE Expert",
                "CA Foundation",
                "MPBSE Topper Coach",
                "15+ Years",
                "2000+ Students"
              ].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30 bg-cyan-400/5 text-cyan-400",
                  children: tag
                },
                tag
              )) })
            ] }) })
          ] })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-muted/10 border-y border-white/5",
        "data-ocid": "about.values.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block", children: "What We Stand For" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "Our ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Values" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "Three pillars that define every interaction, every lesson, every result." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowCard,
            {
              glowColor: v.color,
              className: "p-8 h-full text-center",
              "data-ocid": `about.values.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${v.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : v.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                    whileHover: { rotate: 5, scale: 1.1 },
                    transition: { duration: 0.3 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "w-8 h-8" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-3", children: v.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.desc })
              ]
            }
          ) }, v.title)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 bg-background relative overflow-hidden",
        "data-ocid": "about.cta.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-5 text-cyan-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "MP Nagar, Bhopal, Madhya Pradesh 462011" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5", children: [
              "Ready to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Transform" }),
              " Your Future?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Join 2,000+ students who chose Arthashastra Classes and never looked back. Your journey to commerce mastery begins here." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/contact",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base",
                  "data-ocid": "about.cta.contact_link",
                  children: [
                    "Get Started Today ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/courses",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-foreground font-medium hover:border-violet-400/50 hover:text-violet-400 transition-smooth text-base",
                  "data-ocid": "about.cta.courses_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                    "Browse Courses"
                  ]
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
  AboutPage as default
};
