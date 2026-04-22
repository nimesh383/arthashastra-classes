import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight, S as Star } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { T as Trophy } from "./trophy-CBSE9LDr.js";
import { C as CircleX } from "./circle-x-DoPV8Imm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
const comparisonData = [
  {
    feature: "Teaching Quality",
    arthashastra: {
      type: "text",
      value: "Expert Faculty · 15+ Yrs",
      highlight: true
    },
    instituteA: { type: "text", value: "Good" },
    instituteB: { type: "text", value: "Average" },
    instituteC: { type: "text", value: "Below Avg" }
  },
  {
    feature: "Digital Learning System",
    arthashastra: {
      type: "text",
      value: "AI-Powered Platform",
      highlight: true
    },
    instituteA: { type: "text", value: "Basic App" },
    instituteB: { type: "cross" },
    instituteC: { type: "cross" }
  },
  {
    feature: "Academic Results",
    arthashastra: { type: "text", value: "98% Pass Rate", highlight: true },
    instituteA: { type: "text", value: "~75%" },
    instituteB: { type: "text", value: "~60%" },
    instituteC: { type: "text", value: "~55%" }
  },
  {
    feature: "Student Support",
    arthashastra: {
      type: "text",
      value: "24/7 Doubt Resolution",
      highlight: true
    },
    instituteA: { type: "text", value: "Office Hours" },
    instituteB: { type: "text", value: "Weekly Only" },
    instituteC: { type: "cross" }
  },
  {
    feature: "Fee Structure",
    arthashastra: {
      type: "text",
      value: "Transparent & Affordable",
      highlight: true
    },
    instituteA: { type: "text", value: "Moderate" },
    instituteB: { type: "text", value: "High" },
    instituteC: { type: "text", value: "Very High" }
  },
  {
    feature: "Study Materials",
    arthashastra: {
      type: "text",
      value: "Exclusive Digital Library",
      highlight: true
    },
    instituteA: { type: "text", value: "Printed Notes" },
    instituteB: { type: "text", value: "Minimal" },
    instituteC: { type: "cross" }
  },
  {
    feature: "Batch Size",
    arthashastra: {
      type: "text",
      value: "Small · Personal Attention",
      highlight: true
    },
    instituteA: { type: "text", value: "Medium" },
    instituteB: { type: "text", value: "Large" },
    instituteC: { type: "text", value: "Overcrowded" }
  },
  {
    feature: "Online Access",
    arthashastra: { type: "check" },
    instituteA: { type: "check" },
    instituteB: { type: "cross" },
    instituteC: { type: "cross" }
  }
];
const highlights = [
  {
    icon: Trophy,
    label: "Best Results",
    value: "98% Pass Rate",
    color: "cyan"
  },
  {
    icon: Star,
    label: "Expert Faculty",
    value: "15+ Years",
    color: "violet"
  },
  {
    icon: Crown,
    label: "Top Rated",
    value: "#1 in Bhopal",
    color: "magenta"
  }
];
function CellContent({ cell }) {
  if (cell.type === "check") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-400", "aria-label": "Yes" }) });
  }
  if (cell.type === "cross") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-500/70", "aria-label": "No" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-sm font-medium ${cell.highlight ? "text-cyan-300" : "text-muted-foreground"}`,
      children: cell.value
    }
  );
}
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
function ComparisonPage() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 19 + 7) % 93}%`,
      top: `${(i * 31 + 5) % 87}%`,
      color: i % 3 === 0 ? "oklch(0.68 0.24 200)" : i % 3 === 1 ? "oklch(0.55 0.2 270)" : "oklch(0.6 0.25 290)",
      duration: 3 + i % 4,
      delay: i * 0.25
    }
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[60vh] flex flex-col justify-center py-20",
        "data-ocid": "comparison.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
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
                      "data-ocid": "comparison.breadcrumb.home_link",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", children: "Comparison" })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Head-to-Head" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6", children: [
                    "Why",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Arthashastra" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Classes?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto", children: "See why thousands of commerce students in Bhopal choose us over the rest. The data speaks for itself." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.5 },
                className: "mt-10 flex flex-wrap justify-center gap-4",
                children: highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-2 px-5 py-3 rounded-xl glass-morphism border ${h.color === "cyan" ? "border-cyan-400/30" : h.color === "violet" ? "border-violet-500/30" : "border-fuchsia-500/30"} `,
                    "data-ocid": `comparison.hero.highlight.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        h.icon,
                        {
                          className: `w-5 h-5 ${h.color === "cyan" ? "text-cyan-400" : h.color === "violet" ? "text-violet-400" : "text-fuchsia-400"}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: h.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-sm font-bold ${h.color === "cyan" ? "text-cyan-300" : h.color === "violet" ? "text-violet-300" : "text-fuchsia-300"}`,
                            children: h.value
                          }
                        )
                      ] })
                    ]
                  },
                  h.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-muted/10 border-y border-white/5",
        "data-ocid": "comparison.table.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 block", children: "Feature Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "The",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Complete Picture" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "An honest, comprehensive comparison across every dimension that matters." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-white/10 shadow-[0_0_40px_oklch(0.68_0.24_200/0.08)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full border-collapse min-w-[700px]",
              "data-ocid": "comparison.table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[oklch(0.18_0.08_260)] border-b border-white/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "sticky left-0 z-10 bg-[oklch(0.18_0.08_260)] px-6 py-5 text-left text-sm font-bold uppercase tracking-widest text-muted-foreground min-w-[180px]",
                      scope: "col",
                      children: "Feature"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "th",
                    {
                      className: "px-6 py-5 text-center min-w-[200px] relative",
                      scope: "col",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-violet-500/5 pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
                            " Best Choice"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-extrabold gradient-text-cyan-violet leading-tight text-center", children: "Arthashastra Classes" })
                        ] })
                      ]
                    }
                  ),
                  ["Institute A", "Institute B", "Institute C"].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "px-6 py-5 text-center text-sm font-semibold text-muted-foreground min-w-[160px]",
                      scope: "col",
                      children: name
                    },
                    name
                  ))
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: comparisonData.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, margin: "-40px" },
                    transition: { duration: 0.45, delay: i * 0.06 },
                    className: "border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-smooth",
                    "data-ocid": `comparison.table.row.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "sticky left-0 z-10 bg-[oklch(0.12_0.05_260)] group-hover:bg-[oklch(0.14_0.06_260)] px-6 py-5 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: row.feature }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-5 text-center relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-violet-500/3 pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellContent, { cell: row.arthashastra }) })
                      ] }),
                      ["instituteA", "instituteB", "instituteC"].map(
                        (key) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellContent, { cell: row[key] }) }, key)
                      )
                    ]
                  },
                  row.feature
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" }),
              "Available / Offered"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500/70" }),
              "Not Available"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-sm bg-gradient-to-r from-cyan-400/30 to-violet-500/30 border border-cyan-400/20" }),
              "Arthashastra Column"
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background",
        "data-ocid": "comparison.advantages.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 block", children: "Our Edge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-4", children: [
              "What Makes Us",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Different" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "Four pillars that set Arthashastra apart from every competitor in Bhopal." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            {
              color: "cyan",
              icon: Trophy,
              title: "Proven Academic Results",
              desc: "With a 98% pass rate and multiple CBSE toppers, our results are publicly verifiable and consistently best-in-class across Bhopal's commerce coaching landscape."
            },
            {
              color: "violet",
              icon: Star,
              title: "Technology-First Learning",
              desc: "We don't just digitize notes — we deliver an AI-powered platform with adaptive testing, personalized dashboards, and live progress analytics for every student."
            },
            {
              color: "magenta",
              icon: Crown,
              title: "Unmatched Student Support",
              desc: "Doubt resolution isn't scheduled — it's always on. Our faculty is accessible via chat, call, and dedicated sessions, ensuring no student gets left behind."
            },
            {
              color: "cyan",
              icon: CircleCheck,
              title: "Transparent & Affordable",
              desc: "No hidden charges. Our fee structure is published, fair, and includes everything: live classes, study materials, test series, and access to the full digital platform."
            }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedSection,
            {
              delay: i * 0.1,
              direction: i % 2 === 0 ? "left" : "right",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowCard,
                {
                  glowColor: item.color,
                  className: "p-7 h-full flex gap-5 items-start",
                  "data-ocid": `comparison.advantages.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : item.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-6 h-6" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.desc })
                    ] })
                  ]
                }
              )
            },
            item.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 bg-muted/10 border-t border-white/5 relative overflow-hidden",
        "data-ocid": "comparison.cta.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 mb-6 mx-auto",
                animate: { y: [0, -8, 0] },
                transition: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10 text-cyan-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl font-extrabold text-foreground mb-5", children: [
              "Join the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Best" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Stop settling for average. 2,000+ students already made the smart choice. Your commerce success story starts with Arthashastra Classes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/courses",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth text-base",
                  "data-ocid": "comparison.cta.explore_courses_link",
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
                  "data-ocid": "comparison.cta.contact_link",
                  children: "Get in Touch"
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
  ComparisonPage as default
};
