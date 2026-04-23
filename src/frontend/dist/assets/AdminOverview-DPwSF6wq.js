import { c as createLucideIcon, aH as useAdminCourses, n as useTeachers, al as useAdminStudents, aI as useAdminPayments, $ as EnrollmentStatus, B as BookOpen, G as GraduationCap, U as Users, a3 as CreditCard, j as jsxRuntimeExports, m as motion, an as useAdminTestAnalytics, au as useDownloadItems } from "./index-UQyTW7IZ.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { T as TrendingUp } from "./trending-up-FjEHqHu6.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-lT3w3lb0.js";
import { D as Download } from "./download-CZc12mda.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
];
const ChartLine = createLucideIcon("chart-line", __iconNode);
const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_oklch(0.68_0.24_200/0.2)]",
    border: "border-cyan-500/20"
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_20px_oklch(0.55_0.20_270/0.2)]",
    border: "border-violet-500/20"
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    glow: "shadow-[0_0_20px_oklch(0.60_0.25_290/0.2)]",
    border: "border-fuchsia-500/20"
  },
  success: {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "shadow-[0_0_20px_oklch(0.65_0.22_140/0.2)]",
    border: "border-teal-500/20"
  }
};
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function getMonthLabel(monthIdx) {
  return MONTHS[monthIdx] ?? "—";
}
function buildMonthlyRevenue(payments) {
  const now = /* @__PURE__ */ new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const total = payments.filter((p) => {
      if (p.enrollment.status !== EnrollmentStatus.Completed) return false;
      const ts = new Date(Number(p.enrollment.purchasedAt) / 1e6);
      return ts.getFullYear() === y && ts.getMonth() === m;
    }).reduce((sum, p) => sum + Number(p.coursePrice) / 1e8, 0);
    result.push({ month: getMonthLabel(m), value: total });
  }
  return result;
}
function buildMonthlyEnrollments(payments) {
  const now = /* @__PURE__ */ new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const count = payments.filter((p) => {
      const ts = new Date(Number(p.enrollment.purchasedAt) / 1e6);
      return ts.getFullYear() === y && ts.getMonth() === m;
    }).length;
    result.push({ month: getMonthLabel(m), value: count });
  }
  return result;
}
function RevenueChart({ payments }) {
  const data = buildMonthlyRevenue(payments);
  const maxVal = Math.max(...data.map((d) => d.value), 1e-4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-cyan-500/20 p-5 shadow-[0_0_20px_oklch(0.68_0.24_200/0.1)]",
      "data-ocid": "admin.overview.revenue_chart.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Monthly Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Last 6 months · ICP" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-32", children: data.map((d, i) => {
          const heightPct = maxVal > 0 ? d.value / maxVal * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-cyan-400 font-semibold mb-0.5", children: d.value > 0 ? d.value.toFixed(1) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full rounded-t-lg bg-white/5 overflow-hidden",
                    style: { height: "88px" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-full rounded-t-lg",
                        style: {
                          background: "linear-gradient(to top, oklch(0.68 0.24 200), oklch(0.55 0.2 270))"
                        },
                        initial: { height: "0%" },
                        animate: { height: `${heightPct}%` },
                        transition: {
                          duration: 0.9,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-medium", children: d.month })
              ]
            },
            d.month
          );
        }) })
      ]
    }
  );
}
function EnrollmentTrend({ payments }) {
  const data = buildMonthlyEnrollments(payments);
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const W = 260;
  const H = 72;
  const pts = data.map((d, i) => ({
    x: i / (data.length - 1) * W,
    y: H - d.value / maxVal * (H - 8) - 4
  }));
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-violet-500/20 p-5 shadow-[0_0_20px_oklch(0.55_0.2_270/0.1)]",
      "data-ocid": "admin.overview.enrollment_trend.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { className: "w-4 h-4 text-violet-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Enrollment Trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Last 6 months" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "100%",
            height: H + 20,
            viewBox: `0 0 ${W} ${H + 20}`,
            preserveAspectRatio: "none",
            "aria-hidden": "true",
            role: "img",
            children: [
              [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "0",
                  y1: H - i / 2 * (H - 8) - 4,
                  x2: W,
                  y2: H - i / 2 * (H - 8) - 4,
                  stroke: "oklch(0.55 0.2 270 / 0.15)",
                  strokeWidth: "1"
                },
                i
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "enrollGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "0%",
                    stopColor: "oklch(0.55 0.2 270)",
                    stopOpacity: "0.3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "stop",
                  {
                    offset: "100%",
                    stopColor: "oklch(0.55 0.2 270)",
                    stopOpacity: "0"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "polygon",
                {
                  points: `0,${H} ${polyline} ${W},${H}`,
                  fill: "url(#enrollGrad)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "polyline",
                {
                  points: polyline,
                  fill: "none",
                  stroke: "oklch(0.55 0.2 270)",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ),
              pts.map((p, i) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: "3",
                    fill: "oklch(0.55 0.2 270)"
                  },
                  ((_a = data[i]) == null ? void 0 : _a.month) ?? i
                );
              }),
              data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: i / (data.length - 1) * W,
                  y: H + 16,
                  textAnchor: "middle",
                  fontSize: "9",
                  fill: "oklch(0.6 0.05 260)",
                  children: d.month
                },
                d.month
              ))
            ]
          }
        ) })
      ]
    }
  );
}
function PaymentStatusDonut({ payments }) {
  const completed = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Completed
  ).length;
  const pending = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Pending
  ).length;
  const refunded = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Refunded
  ).length;
  const total = payments.length || 1;
  const segments = [
    {
      label: "Completed",
      count: completed,
      color: "oklch(0.65 0.22 140)",
      pct: completed / total * 100,
      textColor: "text-teal-400"
    },
    {
      label: "Pending",
      count: pending,
      color: "oklch(0.7 0.2 60)",
      pct: pending / total * 100,
      textColor: "text-amber-400"
    },
    {
      label: "Refunded",
      count: refunded,
      color: "oklch(0.6 0.25 290)",
      pct: refunded / total * 100,
      textColor: "text-fuchsia-400"
    }
  ];
  const r = 44;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  let cumulativePct = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-fuchsia-500/20 p-5 shadow-[0_0_20px_oklch(0.60_0.25_290/0.1)]",
      "data-ocid": "admin.overview.payment_donut.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-fuchsia-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Payment Status" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: "120",
              height: "120",
              viewBox: "0 0 120 120",
              "aria-hidden": "true",
              role: "img",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx,
                    cy,
                    r,
                    strokeWidth: "14",
                    stroke: "oklch(0.2 0.05 260)",
                    fill: "none"
                  }
                ),
                segments.map((seg) => {
                  const dashArr = seg.pct / 100 * circumference;
                  const dashOffset = circumference - cumulativePct / 100 * circumference;
                  cumulativePct += seg.pct;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx,
                      cy,
                      r,
                      strokeWidth: "14",
                      fill: "none",
                      stroke: seg.color,
                      strokeDasharray: `${dashArr} ${circumference - dashArr}`,
                      strokeDashoffset: dashOffset,
                      style: {
                        transform: "rotate(-90deg)",
                        transformOrigin: `${cx}px ${cy}px`
                      }
                    },
                    seg.label
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: cx,
                    y: cy - 6,
                    textAnchor: "middle",
                    fontSize: "18",
                    fontWeight: "800",
                    fill: "oklch(0.95 0.02 220)",
                    children: payments.length
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: cx,
                    y: cy + 10,
                    textAnchor: "middle",
                    fontSize: "8",
                    fill: "oklch(0.6 0.05 260)",
                    children: "Total"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 flex-1", children: segments.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: { background: seg.color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: seg.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${seg.textColor}`, children: seg.count })
          ] }, seg.label)) })
        ] })
      ]
    }
  );
}
function ConversionWidget({ enrollmentCount }) {
  const pageVisits = 3200;
  const rate = (enrollmentCount / pageVisits * 100).toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-teal-500/20 p-5 shadow-[0_0_20px_oklch(0.65_0.22_140/0.1)]",
      "data-ocid": "admin.overview.conversion.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-teal-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Lead to Enrollment Rate" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl font-extrabold text-teal-400", children: [
              rate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Conversion rate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400",
              initial: { width: "0%" },
              animate: { width: `${Math.min(Number(rate) * 10, 100)}%` },
              transition: { duration: 1.2, ease: "easeOut" }
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 border border-white/5 p-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-extrabold text-cyan-400", children: enrollmentCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Enrollments" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 border border-white/5 p-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-extrabold text-violet-400", children: pageVisits.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Page Visits" })
          ] })
        ] })
      ]
    }
  );
}
function DownloadAnalytics() {
  const { data: items = [] } = useDownloadItems();
  const totalDownloads = items.reduce(
    (sum, item) => sum + Number(item.downloadCount),
    0
  );
  const topItem = items.reduce(
    (best, item) => Number(item.downloadCount) > Number((best == null ? void 0 : best.downloadCount) ?? 0) ? item : best,
    items[0]
  );
  const thisMonthMock = Math.floor(totalDownloads * 0.3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-cyan-500/20 p-5 shadow-[0_0_20px_oklch(0.68_0.24_200/0.1)]",
      "data-ocid": "admin.overview.download_analytics.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Download Analytics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-3", children: [
          {
            label: "Total Downloads",
            value: totalDownloads,
            color: "text-cyan-400"
          },
          {
            label: "This Month",
            value: thisMonthMock,
            color: "text-violet-400"
          },
          {
            label: "Items Available",
            value: items.length,
            color: "text-fuchsia-400"
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg bg-white/5 border border-white/5 p-2.5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-xl font-extrabold ${s.color}`, children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight mt-0.5", children: s.label })
            ]
          },
          s.label
        )) }),
        topItem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 border border-white/5 p-2.5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Most downloaded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: topItem.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-cyan-400 shrink-0", children: Number(topItem.downloadCount) })
        ] })
      ]
    }
  );
}
function TestAnalyticsSummary() {
  const { data: analytics } = useAdminTestAnalytics(1n);
  const mockStats = [
    { label: "Total Tests", value: analytics ? 1 : 0, color: "text-cyan-400" },
    {
      label: "Attempts",
      value: analytics ? Number(analytics.totalAttempts) : 0,
      color: "text-violet-400"
    },
    {
      label: "Avg Pass Rate",
      value: analytics ? `${analytics.passRate.toFixed(0)}%` : "—",
      color: "text-teal-400"
    },
    {
      label: "Avg Score",
      value: analytics ? `${analytics.avgScore.toFixed(0)}%` : "—",
      color: "text-fuchsia-400"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-violet-500/20 p-5 shadow-[0_0_20px_oklch(0.55_0.2_270/0.1)]",
      "data-ocid": "admin.overview.test_analytics.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-violet-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Test Analytics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: mockStats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg bg-white/5 border border-white/5 p-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-2xl font-extrabold ${s.color}`, children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: s.label })
            ]
          },
          s.label
        )) })
      ]
    }
  );
}
function AdminOverview() {
  const { data: courses } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const { data: students } = useAdminStudents();
  const { data: payments = [] } = useAdminPayments();
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  const activeTeachers = (teachers == null ? void 0 : teachers.filter((t) => !t.isDeleted)) ?? [];
  const completedPayments = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Completed
  );
  const totalRevenue = completedPayments.reduce(
    (sum, p) => sum + p.coursePrice,
    0n
  );
  const stats = [
    {
      label: "Active Courses",
      value: activeCourses.length,
      icon: BookOpen,
      color: "cyan",
      sub: `${(courses == null ? void 0 : courses.length) ?? 0} total`
    },
    {
      label: "Faculty",
      value: activeTeachers.length,
      icon: GraduationCap,
      color: "violet",
      sub: "Teachers"
    },
    {
      label: "Students",
      value: (students == null ? void 0 : students.length) ?? 0,
      icon: Users,
      color: "magenta",
      sub: "Registered"
    },
    {
      label: "Total Revenue",
      value: `${(Number(totalRevenue) / 1e8).toFixed(4)} ICP`,
      icon: CreditCard,
      color: "success",
      sub: `${completedPayments.length} completed`
    }
  ];
  const recentPayments = payments.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.overview.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Platform health at a glance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        className: `glass-morphism rounded-xl p-5 border ${colorMap[s.color].border} ${colorMap[s.color].glow}`,
        "data-ocid": `admin.overview.stats.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colorMap[s.color].bg} ${colorMap[s.color].text}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-display text-2xl font-extrabold ${colorMap[s.color].text}`,
              children: s.value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold mt-0.5", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: s.sub })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.32 },
        className: "mb-6 flex flex-wrap gap-3",
        "data-ocid": "admin.overview.quick_actions.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/admin/courses",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth",
              "data-ocid": "admin.overview.add_course.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add Course"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/admin/teachers",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl glass-morphism border border-violet-500/30 text-violet-400 text-sm font-semibold hover:border-violet-500/60 transition-smooth",
              "data-ocid": "admin.overview.add_teacher.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4" }),
                " Add Teacher"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/admin/materials",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl glass-morphism border border-fuchsia-500/30 text-fuchsia-400 text-sm font-semibold hover:border-fuchsia-500/60 transition-smooth",
              "data-ocid": "admin.overview.upload_material.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Upload Material"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.38 },
        className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueChart, { payments }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EnrollmentTrend, { payments })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.44 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusDonut, { payments }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionWidget, { enrollmentCount: payments.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestAnalyticsSummary, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.48 },
        className: "mb-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadAnalytics, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.54 },
        className: "glass-morphism rounded-xl border border-white/10 overflow-hidden",
        "data-ocid": "admin.overview.recent_payments.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-white/10 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-cyan-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground", children: "Recent Payments" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/admin/payments",
                className: "text-xs text-cyan-400 hover:text-cyan-300 transition-smooth",
                "data-ocid": "admin.overview.view_all_payments.link",
                children: "View all →"
              }
            )
          ] }),
          recentPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-12 text-center text-muted-foreground text-sm",
              "data-ocid": "admin.overview.recent_payments.empty_state",
              children: "No payment records yet."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Course" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentPayments.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "admin-table-row-hover",
                "data-ocid": `admin.overview.payment.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td font-medium", children: p.courseName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[120px]", children: [
                    p.studentPrincipal.slice(0, 14),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-td text-right font-mono", children: [
                    (Number(p.coursePrice) / 1e8).toFixed(4),
                    " ICP"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `admin-badge text-xs ${p.enrollment.status === EnrollmentStatus.Completed ? "badge-success" : p.enrollment.status === EnrollmentStatus.Pending ? "badge-warning" : "badge-destructive"}`,
                      children: p.enrollment.status
                    }
                  ) })
                ]
              },
              p.enrollment.id.toString()
            )) })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  AdminOverview as default
};
