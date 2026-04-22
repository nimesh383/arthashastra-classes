import { EnrollmentStatus } from "@/backend";
import {
  useAdminCourses,
  useAdminPayments,
  useAdminStudents,
  useTeachers,
} from "@/hooks/useBackend";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
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

export default function AdminOverview() {
  const { data: courses } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const { data: students } = useAdminStudents();
  const { data: payments } = useAdminPayments();

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];
  const activeTeachers = teachers?.filter((t) => !t.isDeleted) ?? [];

  const completedPayments =
    payments?.filter(
      (p) => p.enrollment.status === EnrollmentStatus.Completed,
    ) ?? [];

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

  const recentPayments = payments?.slice(0, 5) ?? [];

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

      {/* Recent Payments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
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
