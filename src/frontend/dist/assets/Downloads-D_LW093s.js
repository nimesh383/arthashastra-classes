import { c as createLucideIcon, g as useAuth, r as reactExports, au as useDownloadItems, av as useMyDownloads, j as jsxRuntimeExports, m as motion, G as GraduationCap, L as Link, R as RippleButton, i as LogIn, F as FileText, aw as useIncrementDownload, B as BookOpen, ax as DownloadCategory, x as ue } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { D as Download } from "./download-CZc12mda.js";
import { S as Search } from "./search-hll5qVC-.js";
import { A as Award } from "./award-DRL66g0V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 10h2", key: "8sgtl7" }],
  ["path", { d: "M16 14h2", key: "epxaof" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0", key: "n6f512" }],
  ["circle", { cx: "9", cy: "11", r: "2", key: "yxgjnd" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
];
const IdCard = createLucideIcon("id-card", __iconNode$1);
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
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
const TABS = [
  "All",
  "Study Notes",
  "Admit Cards",
  "Hall Tickets",
  "Certificates"
];
const TAB_CATEGORY = {
  "Study Notes": DownloadCategory.study_notes,
  "Admit Cards": DownloadCategory.admit_card,
  "Hall Tickets": DownloadCategory.hall_ticket,
  Certificates: DownloadCategory.certificate
};
const CATEGORY_CFG = {
  [DownloadCategory.study_notes]: {
    icon: BookOpen,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowColor: "cyan",
    badge: "Study Notes"
  },
  [DownloadCategory.admit_card]: {
    icon: IdCard,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    glowColor: "violet",
    badge: "Admit Card"
  },
  [DownloadCategory.hall_ticket]: {
    icon: Ticket,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    glowColor: "magenta",
    badge: "Hall Ticket"
  },
  [DownloadCategory.certificate]: {
    icon: Award,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    glowColor: "cyan",
    badge: "Certificate"
  }
};
function getCfg(item) {
  const key = Object.keys(item.category)[0];
  return CATEGORY_CFG[key] ?? CATEGORY_CFG[DownloadCategory.study_notes];
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function DownloadSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-6 rounded-full bg-white/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-white/5 rounded w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-white/5 rounded w-3/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-white/5 rounded w-2/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-4 bg-white/5 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-8 rounded-lg bg-white/5" })
    ] })
  ] });
}
function DownloadCard({ item, isEnrolled, index }) {
  const cfg = getCfg(item);
  const Icon = cfg.icon;
  const { mutate: increment } = useIncrementDownload();
  const canDownload = item.isPublic || isEnrolled;
  const handleDownload = () => {
    if (!canDownload) {
      ue.error("Login & enroll to download this file.", {
        description: "Enroll in a course to unlock premium downloads."
      });
      return;
    }
    increment(item.id);
    window.open(item.fileUrl, "_blank", "noopener");
    ue.success("Download started!", {
      description: item.title,
      duration: 3e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: cfg.glowColor,
      className: "p-5 flex flex-col gap-4 group relative h-full",
      "data-ocid": `downloads.item.${index + 1}`,
      children: [
        !canDownload && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/60 flex flex-col items-center justify-center gap-2 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground text-center px-4", children: "Login & Enroll to Download" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/courses",
              className: "text-[10px] text-cyan-400 hover:text-cyan-300 font-medium",
              children: "Browse Courses →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color} ${!canDownload ? "opacity-40" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${!canDownload ? "opacity-40" : ""}`,
              children: cfg.badge
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: `font-semibold text-sm leading-snug mb-2 line-clamp-2 ${!canDownload ? "text-muted-foreground" : "text-foreground"}`,
              children: item.title
            }
          ),
          item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-2", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
            item.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded glass-morphism border border-white/10", children: item.subject }),
            item.batchYear && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded glass-morphism border border-white/10", children: item.batchYear }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(item.createdAt) }),
            item.fileSize && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.fileSize })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              item.downloadCount.toString(),
              " downloads"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RippleButton,
            {
              onClick: handleDownload,
              className: `flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${canDownload ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30" : "bg-muted text-muted-foreground/40 cursor-not-allowed border border-white/5"}`,
              "data-ocid": `downloads.download_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                canDownload ? "Download" : "Locked"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function DownloadsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const category = activeTab === "All" ? null : TAB_CATEGORY[activeTab];
  const { data: allItems = [], isLoading } = useDownloadItems(category);
  const { data: myDownloads = [] } = useMyDownloads();
  const myDownloadIds = reactExports.useMemo(
    () => new Set(myDownloads.map((d) => d.id.toString())),
    [myDownloads]
  );
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (d) => d.title.toLowerCase().includes(q) || d.subject.toLowerCase().includes(q)
    );
  }, [allItems, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "downloads.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-violet-500/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: ["p0", "p1", "p2", "p3", "p4"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute w-1 h-1 rounded-full bg-cyan-400/40",
          style: { left: `${8 + i * 20}%`, top: `${10 + i % 3 * 30}%` },
          animate: { y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] },
          transition: {
            duration: 3.5 + i * 0.6,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5
          }
        },
        k
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-cyan-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Resources"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
              "Download ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Center" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "Notes, admit cards, hall tickets, and certificates — all your essential documents in one secure place." })
          ]
        }
      ) })
    ] }),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pb-4 bg-background",
        "data-ocid": "downloads.login_gate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-cyan-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Login to unlock your enrolled downloads" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Premium files are locked. Enroll in a course to access all resources." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "data-ocid": "downloads.login_gate.login_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RippleButton, { className: "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 shadow-[0_0_16px_oklch(0.68_0.24_200/0.35)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
            "Login / Sign up"
          ] }) })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-6 bg-background",
        "data-ocid": "downloads.filters.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "search",
                placeholder: "Search by title or subject…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "w-full pl-9 pr-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-cyan-500/40 transition-all",
                "data-ocid": "downloads.search_input"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(tab),
              className: `relative px-4 py-2 rounded-xl text-xs font-medium transition-all z-10 ${activeTab === tab ? "text-white" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `downloads.tab.${tab.toLowerCase().replace(/\s/g, "_")}`,
              children: [
                activeTab === tab && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    layoutId: "download-tab-bg",
                    className: "absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_12px_oklch(0.68_0.24_200/0.35)]",
                    transition: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: tab })
              ]
            },
            tab
          )) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-4 pb-28 bg-background",
        "data-ocid": "downloads.list.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map(
          (sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadSkeleton, {}, sk)
        ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "text-center py-28",
            "data-ocid": "downloads.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-9 h-9 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No downloads available yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Check back soon or try a different category." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setActiveTab("All");
                    setSearch("");
                  },
                  className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90",
                  "data-ocid": "downloads.empty_state.reset_button",
                  children: "Show All"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DownloadCard,
          {
            item,
            isEnrolled: isAuthenticated && myDownloadIds.has(item.id.toString()),
            index: i
          },
          item.id.toString()
        )) }) })
      }
    )
  ] });
}
export {
  DownloadsPage as default
};
