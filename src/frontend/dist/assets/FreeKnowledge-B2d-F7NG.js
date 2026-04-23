import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight, B as BookOpen } from "./index-UQyTW7IZ.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-lT3w3lb0.js";
import { T as TrendingUp } from "./trending-up-FjEHqHu6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
const topics = [
  {
    category: "Accountancy",
    color: "cyan",
    items: [
      {
        title: "What is Double-Entry Bookkeeping?",
        excerpt: "Every financial transaction affects at least two accounts. Learn the foundation of all modern accounting."
      },
      {
        title: "Understanding the Balance Sheet",
        excerpt: "A snapshot of what a business owns (assets), owes (liabilities), and what's left for owners (equity)."
      },
      {
        title: "Depreciation Methods Explained",
        excerpt: "SLM vs WDV — which method suits which scenario, and how each affects profit calculations."
      }
    ]
  },
  {
    category: "Economics",
    color: "violet",
    items: [
      {
        title: "Supply & Demand Fundamentals",
        excerpt: "Why prices rise and fall — the core equilibrium model that governs markets."
      },
      {
        title: "GDP vs GNP: What's the Difference?",
        excerpt: "Gross Domestic Product measures output within borders; Gross National Product tracks output by residents."
      },
      {
        title: "Inflation: Causes and Effects",
        excerpt: "Too much money chasing too few goods — how central banks manage the money supply."
      }
    ]
  },
  {
    category: "Business Studies",
    color: "magenta",
    items: [
      {
        title: "Forms of Business Organisation",
        excerpt: "Sole proprietorship, partnership, LLP, and company — trade-offs in liability and control."
      },
      {
        title: "Marketing Mix — The 4 Ps",
        excerpt: "Product, Price, Place, Promotion: how companies position and sell their offerings."
      },
      {
        title: "Consumer Rights Under COPRA",
        excerpt: "Six rights every Indian consumer should know, and how to file a complaint."
      }
    ]
  }
];
const colorMap = {
  cyan: {
    badge: "badge-primary",
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30"
  },
  violet: {
    badge: "admin-badge bg-violet-500/15 text-violet-400 border border-violet-500/30",
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/30"
  },
  magenta: {
    badge: "admin-badge bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/30",
    icon: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "hover:border-fuchsia-500/30"
  }
};
const stats = [
  { label: "Topics Covered", value: "30+", icon: BookOpen },
  { label: "Subjects", value: "5", icon: ChartNoAxesColumn },
  { label: "Free Forever", value: "100%", icon: DollarSign },
  { label: "Updated", value: "2026", icon: TrendingUp }
];
function FreeKnowledge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 min-h-screen", "data-ocid": "free_knowledge.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 relative overflow-hidden bg-muted/10",
        "data-ocid": "free_knowledge.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-violet-600/8 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4",
                children: "Free Knowledge"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.08 },
                className: "font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-6",
                children: [
                  "Learn Commerce.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "For Free." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.16 },
                className: "text-muted-foreground text-lg max-w-2xl mx-auto mb-8",
                children: "Essential concepts in Accountancy, Economics, and Business Studies — no login required. Build your foundation before diving deeper."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.24 },
                className: "flex justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/courses",
                    className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_50px_oklch(0.68_0.24_200/0.6)] transition-smooth",
                    "data-ocid": "free_knowledge.explore_courses.link",
                    children: [
                      "Explore Full Courses ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 bg-background border-b border-white/5",
        "data-ocid": "free_knowledge.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.07 },
            className: "glass-morphism rounded-xl border border-white/10 p-5 text-center",
            "data-ocid": `free_knowledge.stats.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4.5 h-4.5 text-cyan-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-extrabold gradient-text-cyan-violet", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: s.label })
            ]
          },
          s.label
        )) }) })
      }
    ),
    topics.map((cat, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: `py-14 ${ci % 2 === 0 ? "bg-background" : "bg-muted/10"}`,
        "data-ocid": `free_knowledge.${cat.category.toLowerCase().replace(/\s+/g, "_")}.section`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: "flex items-center gap-3 mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `admin-badge ${colorMap[cat.color].badge}`, children: cat.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: cat.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.article,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: `glass-morphism rounded-xl border border-white/10 p-6 transition-smooth cursor-default ${colorMap[cat.color].border}`,
              "data-ocid": `free_knowledge.${cat.category.toLowerCase()}.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-lg ${colorMap[cat.color].bg} flex items-center justify-center mb-4`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      BookOpen,
                      {
                        className: `w-4 h-4 ${colorMap[cat.color].icon}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2 leading-snug", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.excerpt })
              ]
            },
            item.title
          )) })
        ] })
      },
      cat.category
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-t border-white/5",
        "data-ocid": "free_knowledge.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "font-display text-3xl font-extrabold text-foreground mb-4",
              children: "Ready to go deeper?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.08 },
              className: "text-muted-foreground mb-8",
              children: "Enroll in a full course for live classes, PYQs, mock tests, and direct mentorship from Ajay Govindani."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.16 },
              className: "flex flex-col sm:flex-row gap-4 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/courses",
                    className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth",
                    "data-ocid": "free_knowledge.cta.courses.link",
                    children: [
                      "View All Courses ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/login",
                    className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground/80 font-medium hover:text-foreground hover:border-white/40 transition-smooth",
                    "data-ocid": "free_knowledge.cta.login.link",
                    children: "Login / Sign Up"
                  }
                )
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  FreeKnowledge as default
};
