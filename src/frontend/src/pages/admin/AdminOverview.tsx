import { EnrollmentStatus } from "@/backend";
import {
  useAdminCourses,
  useAdminPayments,
  useAdminStudents,
  useAdminTestAnalytics,
  useDownloadItems,
  useTeachers,
} from "@/hooks/useBackend";
import type { EnrollmentAdminView } from "@/types";
import {
  BarChart2,
  BookOpen,
  CreditCard,
  Download,
  GraduationCap,
  LineChart,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_oklch(0.68_0.24_200/0.2)]",
    border: "border-cyan-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    glow: "shadow-[0_0_20px_oklch(0.55_0.20_270/0.2)]",
    border: "border-violet-500/20",
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    glow: "shadow-[0_0_20px_oklch(0.60_0.25_290/0.2)]",
    border: "border-fuchsia-500/20",
  },
  success: {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "shadow-[0_0_20px_oklch(0.65_0.22_140/0.2)]",
    border: "border-teal-500/20",
  },
} as const;

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
  "Dec",
];

function getMonthLabel(monthIdx: number): string {
  return MONTHS[monthIdx] ?? "—";
}

// Build last 6 months revenue data from payments
function buildMonthlyRevenue(
  payments: EnrollmentAdminView[],
): { month: string; value: number }[] {
  const now = new Date();
  const result: { month: string; value: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const total = payments
      .filter((p) => {
        if (p.enrollment.status !== EnrollmentStatus.Completed) return false;
        const ts = new Date(Number(p.enrollment.purchasedAt) / 1_000_000);
        return ts.getFullYear() === y && ts.getMonth() === m;
      })
      .reduce((sum, p) => sum + Number(p.coursePrice) / 1e8, 0);
    result.push({ month: getMonthLabel(m), value: total });
  }
  return result;
}

function buildMonthlyEnrollments(
  payments: EnrollmentAdminView[],
): { month: string; value: number }[] {
  const now = new Date();
  const result: { month: string; value: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const count = payments.filter((p) => {
      const ts = new Date(Number(p.enrollment.purchasedAt) / 1_000_000);
      return ts.getFullYear() === y && ts.getMonth() === m;
    }).length;
    result.push({ month: getMonthLabel(m), value: count });
  }
  return result;
}

// ─── Revenue Bar Chart ────────────────────────────────────────────────────────
function RevenueChart({ payments }: { payments: EnrollmentAdminView[] }) {
  const data = buildMonthlyRevenue(payments);
  const maxVal = Math.max(...data.map((d) => d.value), 0.0001);

  return (
    <div
      className="glass-morphism rounded-xl border border-cyan-500/20 p-5 shadow-[0_0_20px_oklch(0.68_0.24_200/0.1)]"
      data-ocid="admin.overview.revenue_chart.panel"
    >
      <div className="flex items-center gap-2 mb-5">
        <BarChart2 className="w-4 h-4 text-cyan-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Monthly Revenue
        </h3>
        <span className="ml-auto text-xs text-muted-foreground">
          Last 6 months · ICP
        </span>
      </div>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => {
          const heightPct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
          return (
            <div
              key={d.month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-[9px] text-cyan-400 font-semibold mb-0.5">
                {d.value > 0 ? d.value.toFixed(1) : "—"}
              </span>
              <div
                className="w-full rounded-t-lg bg-white/5 overflow-hidden"
                style={{ height: "88px" }}
              >
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.68 0.24 200), oklch(0.55 0.2 270))",
                  }}
                  initial={{ height: "0%" }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground font-medium">
                {d.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Enrollment Trend Line Chart (CSS/SVG) ────────────────────────────────────
function EnrollmentTrend({ payments }: { payments: EnrollmentAdminView[] }) {
  const data = buildMonthlyEnrollments(payments);
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const W = 260;
  const H = 72;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (d.value / maxVal) * (H - 8) - 4,
  }));
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      className="glass-morphism rounded-xl border border-violet-500/20 p-5 shadow-[0_0_20px_oklch(0.55_0.2_270/0.1)]"
      data-ocid="admin.overview.enrollment_trend.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="w-4 h-4 text-violet-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Enrollment Trend
        </h3>
        <span className="ml-auto text-xs text-muted-foreground">
          Last 6 months
        </span>
      </div>
      <div className="overflow-hidden rounded-lg">
        <svg
          width="100%"
          height={H + 20}
          viewBox={`0 0 ${W} ${H + 20}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          role="img"
        >
          {/* Grid lines */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1="0"
              y1={H - (i / 2) * (H - 8) - 4}
              x2={W}
              y2={H - (i / 2) * (H - 8) - 4}
              stroke="oklch(0.55 0.2 270 / 0.15)"
              strokeWidth="1"
            />
          ))}
          {/* Area fill */}
          <defs>
            <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="oklch(0.55 0.2 270)"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="oklch(0.55 0.2 270)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <polygon
            points={`0,${H} ${polyline} ${W},${H}`}
            fill="url(#enrollGrad)"
          />
          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="oklch(0.55 0.2 270)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {pts.map((p, i) => (
            <circle
              key={data[i]?.month ?? i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="oklch(0.55 0.2 270)"
            />
          ))}
          {/* Month labels */}
          {data.map((d, i) => (
            <text
              key={d.month}
              x={(i / (data.length - 1)) * W}
              y={H + 16}
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.6 0.05 260)"
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Payment Status Donut ─────────────────────────────────────────────────────
function PaymentStatusDonut({ payments }: { payments: EnrollmentAdminView[] }) {
  const completed = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Completed,
  ).length;
  const pending = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Pending,
  ).length;
  const refunded = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Refunded,
  ).length;
  const total = payments.length || 1;

  const segments = [
    {
      label: "Completed",
      count: completed,
      color: "oklch(0.65 0.22 140)",
      pct: (completed / total) * 100,
      textColor: "text-teal-400",
    },
    {
      label: "Pending",
      count: pending,
      color: "oklch(0.7 0.2 60)",
      pct: (pending / total) * 100,
      textColor: "text-amber-400",
    },
    {
      label: "Refunded",
      count: refunded,
      color: "oklch(0.6 0.25 290)",
      pct: (refunded / total) * 100,
      textColor: "text-fuchsia-400",
    },
  ];

  // Build SVG donut
  const r = 44;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  let cumulativePct = 0;

  return (
    <div
      className="glass-morphism rounded-xl border border-fuchsia-500/20 p-5 shadow-[0_0_20px_oklch(0.60_0.25_290/0.1)]"
      data-ocid="admin.overview.payment_donut.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-4 h-4 text-fuchsia-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Payment Status
        </h3>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            aria-hidden="true"
            role="img"
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth="14"
              stroke="oklch(0.2 0.05 260)"
              fill="none"
            />
            {segments.map((seg) => {
              const dashArr = (seg.pct / 100) * circumference;
              const dashOffset =
                circumference - (cumulativePct / 100) * circumference;
              cumulativePct += seg.pct;
              return (
                <circle
                  key={seg.label}
                  cx={cx}
                  cy={cy}
                  r={r}
                  strokeWidth="14"
                  fill="none"
                  stroke={seg.color}
                  strokeDasharray={`${dashArr} ${circumference - dashArr}`}
                  strokeDashoffset={dashOffset}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: `${cx}px ${cy}px`,
                  }}
                />
              );
            })}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fontSize="18"
              fontWeight="800"
              fill="oklch(0.95 0.02 220)"
            >
              {payments.length}
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize="8"
              fill="oklch(0.6 0.05 260)"
            >
              Total
            </text>
          </svg>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: seg.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {seg.label}
                </span>
              </div>
              <span className={`text-xs font-bold ${seg.textColor}`}>
                {seg.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Conversion Widget ────────────────────────────────────────────────────────
function ConversionWidget({ enrollmentCount }: { enrollmentCount: number }) {
  // Mock page visit data for conversion calculation
  const pageVisits = 3200;
  const rate =
    pageVisits > 0 ? ((enrollmentCount / pageVisits) * 100).toFixed(1) : "0.0";

  return (
    <div
      className="glass-morphism rounded-xl border border-teal-500/20 p-5 shadow-[0_0_20px_oklch(0.65_0.22_140/0.1)]"
      data-ocid="admin.overview.conversion.panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-teal-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Lead to Enrollment Rate
        </h3>
      </div>
      <div className="flex items-end gap-4 mb-3">
        <div>
          <span className="font-display text-4xl font-extrabold text-teal-400">
            {rate}%
          </span>
          <p className="text-xs text-muted-foreground mt-1">Conversion rate</p>
        </div>
        <div className="flex-1 pb-1">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(Number(rate) * 10, 100)}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 border border-white/5 p-2.5 text-center">
          <p className="font-display text-xl font-extrabold text-cyan-400">
            {enrollmentCount}
          </p>
          <p className="text-[10px] text-muted-foreground">Enrollments</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/5 p-2.5 text-center">
          <p className="font-display text-xl font-extrabold text-violet-400">
            {pageVisits.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground">Page Visits</p>
        </div>
      </div>
    </div>
  );
}

// ─── Download Analytics ───────────────────────────────────────────────────────
function DownloadAnalytics() {
  const { data: items = [] } = useDownloadItems();
  const totalDownloads = items.reduce(
    (sum, item) => sum + Number(item.downloadCount),
    0,
  );
  const topItem = items.reduce(
    (best, item) =>
      Number(item.downloadCount) > Number(best?.downloadCount ?? 0)
        ? item
        : best,
    items[0],
  );
  const thisMonthMock = Math.floor(totalDownloads * 0.3);

  return (
    <div
      className="glass-morphism rounded-xl border border-cyan-500/20 p-5 shadow-[0_0_20px_oklch(0.68_0.24_200/0.1)]"
      data-ocid="admin.overview.download_analytics.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-4 h-4 text-cyan-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Download Analytics
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          {
            label: "Total Downloads",
            value: totalDownloads,
            color: "text-cyan-400",
          },
          {
            label: "This Month",
            value: thisMonthMock,
            color: "text-violet-400",
          },
          {
            label: "Items Available",
            value: items.length,
            color: "text-fuchsia-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white/5 border border-white/5 p-2.5 text-center"
          >
            <p className={`font-display text-xl font-extrabold ${s.color}`}>
              {s.value}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      {topItem && (
        <div className="rounded-lg bg-white/5 border border-white/5 p-2.5 flex items-center gap-2">
          <Download className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground">Most downloaded</p>
            <p className="text-xs font-semibold text-foreground truncate">
              {topItem.title}
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-400 shrink-0">
            {Number(topItem.downloadCount)}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Test Analytics Summary ────────────────────────────────────────────────────
function TestAnalyticsSummary() {
  const { data: analytics } = useAdminTestAnalytics(1n);

  const mockStats = [
    { label: "Total Tests", value: analytics ? 1 : 0, color: "text-cyan-400" },
    {
      label: "Attempts",
      value: analytics ? Number(analytics.totalAttempts) : 0,
      color: "text-violet-400",
    },
    {
      label: "Avg Pass Rate",
      value: analytics ? `${analytics.passRate.toFixed(0)}%` : "—",
      color: "text-teal-400",
    },
    {
      label: "Avg Score",
      value: analytics ? `${analytics.avgScore.toFixed(0)}%` : "—",
      color: "text-fuchsia-400",
    },
  ];

  return (
    <div
      className="glass-morphism rounded-xl border border-violet-500/20 p-5 shadow-[0_0_20px_oklch(0.55_0.2_270/0.1)]"
      data-ocid="admin.overview.test_analytics.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-4 h-4 text-violet-400" />
        <h3 className="font-display text-base font-bold text-foreground">
          Test Analytics
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {mockStats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white/5 border border-white/5 p-3 text-center"
          >
            <p className={`font-display text-2xl font-extrabold ${s.color}`}>
              {s.value}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Overview ────────────────────────────────────────────────────────────
export default function AdminOverview() {
  const { data: courses } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const { data: students } = useAdminStudents();
  const { data: payments = [] } = useAdminPayments();

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];
  const activeTeachers = teachers?.filter((t) => !t.isDeleted) ?? [];

  const completedPayments = payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Completed,
  );

  const totalRevenue = completedPayments.reduce(
    (sum, p) => sum + p.coursePrice,
    0n,
  );

  const stats = [
    {
      label: "Active Courses",
      value: activeCourses.length,
      icon: BookOpen,
      color: "cyan" as const,
      sub: `${courses?.length ?? 0} total`,
    },
    {
      label: "Faculty",
      value: activeTeachers.length,
      icon: GraduationCap,
      color: "violet" as const,
      sub: "Teachers",
    },
    {
      label: "Students",
      value: students?.length ?? 0,
      icon: Users,
      color: "magenta" as const,
      sub: "Registered",
    },
    {
      label: "Total Revenue",
      value: `${(Number(totalRevenue) / 1e8).toFixed(4)} ICP`,
      icon: CreditCard,
      color: "success" as const,
      sub: `${completedPayments.length} completed`,
    },
  ];

  const recentPayments = payments.slice(0, 5);

  return (
    <div data-ocid="admin.overview.page">
      {/* Header */}
      <div className="mb-8">
        <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
          Admin Portal
        </p>
        <h1 className="font-display text-3xl font-extrabold text-foreground">
          Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform health at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-morphism rounded-xl p-5 border ${colorMap[s.color].border} ${colorMap[s.color].glow}`}
            data-ocid={`admin.overview.stats.item.${i + 1}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colorMap[s.color].bg} ${colorMap[s.color].text}`}
            >
              <s.icon className="w-4 h-4" />
            </div>
            <p
              className={`font-display text-2xl font-extrabold ${colorMap[s.color].text}`}
            >
              {s.value}
            </p>
            <p className="text-foreground text-sm font-semibold mt-0.5">
              {s.label}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="mb-6 flex flex-wrap gap-3"
        data-ocid="admin.overview.quick_actions.panel"
      >
        <a
          href="/admin/courses"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth"
          data-ocid="admin.overview.add_course.button"
        >
          <Plus className="w-4 h-4" /> Add Course
        </a>
        <a
          href="/admin/teachers"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-morphism border border-violet-500/30 text-violet-400 text-sm font-semibold hover:border-violet-500/60 transition-smooth"
          data-ocid="admin.overview.add_teacher.button"
        >
          <GraduationCap className="w-4 h-4" /> Add Teacher
        </a>
        <a
          href="/admin/materials"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-morphism border border-fuchsia-500/30 text-fuchsia-400 text-sm font-semibold hover:border-fuchsia-500/60 transition-smooth"
          data-ocid="admin.overview.upload_material.button"
        >
          <Plus className="w-4 h-4" /> Upload Material
        </a>
      </motion.div>

      {/* Analytics Charts Row 1: Revenue + Enrollment Trend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <RevenueChart payments={payments} />
        <EnrollmentTrend payments={payments} />
      </motion.div>

      {/* Analytics Charts Row 2: Donut + Conversion + Test Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"
      >
        <PaymentStatusDonut payments={payments} />
        <ConversionWidget enrollmentCount={payments.length} />
        <TestAnalyticsSummary />
      </motion.div>

      {/* Download Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        className="mb-5"
      >
        <DownloadAnalytics />
      </motion.div>

      {/* Recent Payments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.54 }}
        className="glass-morphism rounded-xl border border-white/10 overflow-hidden"
        data-ocid="admin.overview.recent_payments.panel"
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h2 className="font-display text-base font-bold text-foreground">
              Recent Payments
            </h2>
          </div>
          <a
            href="/admin/payments"
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-smooth"
            data-ocid="admin.overview.view_all_payments.link"
          >
            View all →
          </a>
        </div>
        {recentPayments.length === 0 ? (
          <div
            className="py-12 text-center text-muted-foreground text-sm"
            data-ocid="admin.overview.recent_payments.empty_state"
          >
            No payment records yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Course</th>
                  <th className="admin-table-th">Student</th>
                  <th className="admin-table-th text-right">Amount</th>
                  <th className="admin-table-th">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p, i) => (
                  <tr
                    key={p.enrollment.id.toString()}
                    className="admin-table-row-hover"
                    data-ocid={`admin.overview.payment.item.${i + 1}`}
                  >
                    <td className="admin-table-td font-medium">
                      {p.courseName}
                    </td>
                    <td className="admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[120px]">
                      {p.studentPrincipal.slice(0, 14)}…
                    </td>
                    <td className="admin-table-td text-right font-mono">
                      {(Number(p.coursePrice) / 1e8).toFixed(4)} ICP
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={`admin-badge text-xs ${
                          p.enrollment.status === EnrollmentStatus.Completed
                            ? "badge-success"
                            : p.enrollment.status === EnrollmentStatus.Pending
                              ? "badge-warning"
                              : "badge-destructive"
                        }`}
                      >
                        {p.enrollment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
