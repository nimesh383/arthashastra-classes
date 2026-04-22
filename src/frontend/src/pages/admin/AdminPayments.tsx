import { EnrollmentStatus } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminPayments } from "@/hooks/useBackend";
import { CreditCard, Filter, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function formatRupees(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: EnrollmentStatus.Completed, label: "Completed" },
  { value: EnrollmentStatus.Pending, label: "Pending" },
  { value: EnrollmentStatus.Failed, label: "Failed" },
  { value: EnrollmentStatus.Refunded, label: "Refunded" },
];

const statusBadge = (status: EnrollmentStatus) => {
  if (status === EnrollmentStatus.Completed) return "badge-success";
  if (status === EnrollmentStatus.Pending) return "badge-warning";
  if (status === EnrollmentStatus.Refunded)
    return "text-muted-foreground border border-white/15";
  return "badge-destructive";
};

export default function AdminPayments() {
  const { data: payments, isLoading } = useAdminPayments();

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const completedPayments = useMemo(
    () =>
      payments?.filter(
        (p) => p.enrollment.status === EnrollmentStatus.Completed,
      ) ?? [],
    [payments],
  );

  const pendingCount = useMemo(
    () =>
      payments?.filter((p) => p.enrollment.status === EnrollmentStatus.Pending)
        .length ?? 0,
    [payments],
  );

  const totalRevenue = useMemo(
    () => completedPayments.reduce((s, p) => s + p.coursePrice, 0n),
    [completedPayments],
  );

  const filtered = useMemo(() => {
    if (!payments) return [];
    if (filterStatus === "all") return payments;
    return payments.filter((p) => p.enrollment.status === filterStatus);
  }, [payments, filterStatus]);

  return (
    <div data-ocid="admin.payments.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Payments
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {payments?.length ?? 0} total transaction
            {payments?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-morphism rounded-xl border border-teal-500/20 p-5 shadow-[0_0_20px_oklch(0.65_0.22_140/0.15)]"
          data-ocid="admin.payments.revenue_card"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Total Revenue
            </p>
          </div>
          <p className="font-display text-2xl font-extrabold text-teal-400">
            {formatRupees(totalRevenue)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {completedPayments.length} completed payment
            {completedPayments.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-xl border border-amber-500/20 p-5"
          data-ocid="admin.payments.pending_card"
        >
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Pending
            </p>
          </div>
          <p className="font-display text-2xl font-extrabold text-amber-400">
            {pendingCount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting confirmation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-morphism rounded-xl border border-white/10 p-5"
          data-ocid="admin.payments.total_card"
        >
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              All Transactions
            </p>
          </div>
          <p className="font-display text-2xl font-extrabold text-cyan-400">
            {payments?.length ?? 0}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Across all courses
          </p>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="mb-5 flex items-center gap-3">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        <select
          className="admin-form-input max-w-[220px] py-1.5 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          data-ocid="admin.payments.status.filter"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {filterStatus !== "all" && (
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="admin.payments.filter.clear_button"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.payments.loading_state"
        >
          {(["s1", "s2", "s3", "s4"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.payments.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-teal-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              {filterStatus !== "all"
                ? `No ${filterStatus.toLowerCase()} payments`
                : "No payments yet"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {filterStatus !== "all"
                ? "Try a different status filter."
                : "Transactions appear here once students purchase courses."}
            </p>
          </div>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">#</th>
                  <th className="admin-table-th">Course</th>
                  <th className="admin-table-th">Student</th>
                  <th className="admin-table-th">Payment ID</th>
                  <th className="admin-table-th text-right">Amount</th>
                  <th className="admin-table-th">Date</th>
                  <th className="admin-table-th">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.enrollment.id.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="admin-table-row-hover"
                    data-ocid={`admin.payments.item.${i + 1}`}
                  >
                    <td className="admin-table-td text-muted-foreground text-sm">
                      {i + 1}
                    </td>
                    <td className="admin-table-td font-medium max-w-[160px]">
                      <span className="truncate block">{p.courseName}</span>
                    </td>
                    <td className="admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[120px]">
                      {p.studentPrincipal.slice(0, 14)}…
                    </td>
                    <td className="admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[100px]">
                      {p.enrollment.paymentId.length > 12
                        ? `${p.enrollment.paymentId.slice(0, 12)}…`
                        : p.enrollment.paymentId}
                    </td>
                    <td className="admin-table-td text-right font-mono font-semibold">
                      <span
                        className={
                          p.enrollment.status === EnrollmentStatus.Completed
                            ? "text-teal-400"
                            : "text-foreground"
                        }
                      >
                        {formatRupees(p.coursePrice)}
                      </span>
                    </td>
                    <td className="admin-table-td text-muted-foreground text-sm">
                      {formatDate(p.enrollment.purchasedAt)}
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={`admin-badge text-xs ${statusBadge(p.enrollment.status as EnrollmentStatus)}`}
                      >
                        {p.enrollment.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary row */}
          {filterStatus !== "all" && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-white/10 flex items-center justify-end gap-3 bg-white/[0.02]">
              <span className="text-xs text-muted-foreground">
                Showing {filtered.length} of {payments?.length ?? 0}
              </span>
              {filterStatus === EnrollmentStatus.Completed && (
                <>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs font-mono font-semibold text-teal-400">
                    Subtotal:{" "}
                    {formatRupees(
                      filtered.reduce((s, p) => s + p.coursePrice, 0n),
                    )}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
