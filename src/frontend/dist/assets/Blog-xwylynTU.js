import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, T as Tag, C as ChevronRight } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { U as User } from "./user-DFFlS3bJ.js";
import { C as Clock } from "./clock-B1Nr3IvY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const posts = [
  {
    id: 1,
    title: "How to Score 95+ in CBSE Accountancy Class 12",
    excerpt: "Discover the proven strategies, revision techniques, and practice schedules that top scorers use to ace the board exam.",
    date: "Apr 10, 2026",
    category: "Commerce Tips",
    readTime: "6 min read",
    author: "Ajay Govindani",
    color: "cyan"
  },
  {
    id: 2,
    title: "Understanding Cash Flow Statement: A Complete Guide",
    excerpt: "Cash flow statements confuse many students. This step-by-step guide breaks down direct and indirect methods with examples.",
    date: "Apr 5, 2026",
    category: "Commerce Tips",
    readTime: "8 min read",
    author: "Ajay Govindani",
    color: "violet"
  },
  {
    id: 3,
    title: "CA Foundation vs. B.Com: Which Path Is Right for You?",
    excerpt: "A detailed comparison of career paths, timelines, earning potential, and skill requirements for commerce graduates.",
    date: "Mar 28, 2026",
    category: "Career Advice",
    readTime: "5 min read",
    author: "Priya Sharma",
    color: "magenta"
  },
  {
    id: 4,
    title: "Macroeconomics Made Simple: Money, Banking & Inflation",
    excerpt: "Break down complex macro topics with simple analogies and visual frameworks. Perfect for board and competitive exam prep.",
    date: "Mar 20, 2026",
    category: "Study Strategies",
    readTime: "7 min read",
    author: "Ajay Govindani",
    color: "cyan"
  },
  {
    id: 5,
    title: "Top 10 Business Studies Case Study Patterns for CBSE",
    excerpt: "Pattern recognition in case studies can earn you 20+ extra marks. We analyzed 5 years of papers to find the formula.",
    date: "Mar 15, 2026",
    category: "Study Strategies",
    readTime: "9 min read",
    author: "Riya Verma",
    color: "violet"
  },
  {
    id: 6,
    title: "How Arthashastra's Online Tests Changed My Score",
    excerpt: "A student success story — from 62% to 91% in six months using structured test series and performance analytics.",
    date: "Mar 8, 2026",
    category: "News",
    readTime: "4 min read",
    author: "Rohan Mehta",
    color: "magenta"
  }
];
const CATEGORIES = [
  "All",
  "Commerce Tips",
  "Study Strategies",
  "Career Advice",
  "News"
];
const categoryColors = {
  "Commerce Tips": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Study Strategies": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Career Advice": "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  News: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
};
function BlogPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "blog.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 block", children: "Insights & Updates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6", children: [
              "The ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Blog" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Expert articles, exam strategies, and student success stories to fuel your commerce journey." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-8 bg-background", "data-ocid": "blog.filters.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveCategory(c),
        className: `px-4 py-2 rounded-xl text-sm font-semibold transition-smooth border ${activeCategory === c ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/50 text-cyan-400" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"}`,
        "data-ocid": `blog.filter.${c.toLowerCase().replace(/\s+/g, "_")}.tab`,
        children: [
          c,
          activeCategory === c && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs opacity-70", children: c === "All" ? posts.length : filtered.length })
        ]
      },
      c
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-4 pb-24 bg-background",
        "data-ocid": "blog.list.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-20",
            "data-ocid": "blog.list.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No posts in this category yet." })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowCard,
          {
            glowColor: post.color,
            className: "p-6 h-full flex flex-col group cursor-pointer",
            "data-ocid": `blog.list.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                    post.category
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-3 leading-snug line-clamp-2 group-hover:text-cyan-400 transition-smooth", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3 mb-4", children: post.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-violet-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/80 truncate", children: post.author })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                    post.date
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    post.readTime
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-smooth flex items-center gap-0.5",
                    "data-ocid": `blog.read_more.button.${i + 1}`,
                    children: [
                      "Read More ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            ]
          }
        ) }, post.id)) }) })
      }
    )
  ] });
}
export {
  BlogPage as default
};
