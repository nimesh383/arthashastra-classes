import { EnrollmentStatus } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminCourses,
  useAdminPayments,
  useAdminStudents,
} from "@/hooks/useBackend";
import { ChevronDown, ChevronRight, Search, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useMemo, useState } from "react";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatICP(e8s: bigint): string {
  return `${(Number(e8s) / 1e8).toFixed(4)} ICP`;
}

export default function AdminStudents() {
  const { data: students, isLoading } = useAdminStudents();
  const { data: payments } = useAdminPayments();
  const { data: courses } = useAdminCourses();

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const courseMap = useMemo(
    () => new Map(courses?.map((c) => [c.id.toString(), c.title]) ?? []),
    [courses],
  );

  // Map principal -> payments
  const paymentsByStudent = useMemo(() => {
    const map = new Map<string, NonNullable<typeof payments>>();
    if (!payments) return map;
    for (const p of payments) {
      const existing = map.get(p.studentPrincipal) ?? [];
      map.set(p.studentPrincipal, [...existing, p]);
    }
    return map;
  }, [payments]);

  const filtered = useMemo(() => {
    if (!students) return [];
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.profile.name.toLowerCase().includes(q) ||
        s.profile.email.toLowerCase().includes(q),
    );
  }, [students, search]);

  return (
    <div data-ocid="admin.students.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {students?.length ?? 0} registered student
            {students?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name or email…"
          className="admin-form-input pl-9 pr-9 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="admin.students.search_input"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.students.loading_state"
        >
          {(["s1", "s2", "s3", "s4"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.students.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-fuchsia-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              {search ? "No students match your search" : "No students yet"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {search
                ? "Try a different name or email."
                : "Students appear here once they register and log in."}
            </p>
          </div>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th w-8" />
                  <th className="admin-table-th">#</th>
                  <th className="admin-table-th">Student</th>
                  <th className="admin-table-th">Email</th>
                  <th className="admin-table-th">Phone</th>
                  <th className="admin-table-th text-right">Enrollments</th>
                  <th className="admin-table-th text-right">Total Spent</th>
                  <th className="admin-table-th">Principal ID</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const uid = s.profile.userId.toString();
                  const isExpanded = expandedId === uid;
                  const studentPayments = paymentsByStudent.get(uid) ?? [];
                  const totalSpent = studentPayments
                    .filter(
                      (p) => p.enrollment.status === EnrollmentStatus.Completed,
                    )
                    .reduce((sum, p) => sum + p.coursePrice, 0n);

                  return (
                    <React.Fragment key={uid}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="admin-table-row-hover cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : uid)}
                        data-ocid={`admin.students.item.${i + 1}`}
                      >
                        <td className="admin-table-td w-8">
                          <span className="text-muted-foreground flex items-center justify-center">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </span>
                        </td>
                        <td className="admin-table-td text-muted-foreground text-sm">
                          {i + 1}
                        </td>
                        <td className="admin-table-td">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-foreground font-bold text-sm shrink-0">
                              {(s.profile.name || "?")[0]?.toUpperCase()}
                            </div>
                            <span className="font-medium text-foreground truncate max-w-[120px]">
                              {s.profile.name || "—"}
                            </span>
                          </div>
                        </td>
                        <td className="admin-table-td text-muted-foreground text-sm truncate max-w-[160px]">
                          {s.profile.email || "—"}
                        </td>
                        <td className="admin-table-td text-muted-foreground text-sm">
                          {s.profile.phone || "—"}
                        </td>
                        <td className="admin-table-td text-right">
                          <span
                            className={`admin-badge text-xs ${
                              s.profile.enrolledCourses.length > 0
                                ? "badge-success"
                                : "text-muted-foreground border border-white/10"
                            }`}
                          >
                            {s.profile.enrolledCourses.length}
                          </span>
                        </td>
                        <td className="admin-table-td text-right font-mono text-sm">
                          {totalSpent > 0n ? (
                            <span className="text-teal-400">
                              {formatICP(totalSpent)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="admin-table-td">
                          <span className="font-mono text-xs text-muted-foreground">
                            {uid.slice(0, 16)}…
                          </span>
                        </td>
                      </motion.tr>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr
                            key={`${uid}-expanded`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td
                              colSpan={8}
                              className="px-0 py-0 border-b border-white/10"
                            >
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                                data-ocid={`admin.students.enrollment_panel.${i + 1}`}
                              >
                                <div className="px-6 py-4 bg-white/[0.03]">
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                    Enrollment History —{" "}
                                    {s.profile.name || "Student"}
                                  </p>
                                  {studentPayments.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                      No enrollments yet.
                                    </p>
                                  ) : (
                                    <div className="flex flex-col gap-2">
                                      {studentPayments.map((p) => {
                                        const courseName =
                                          courseMap.get(
                                            p.enrollment.courseId.toString(),
                                          ) ?? p.courseName;
                                        return (
                                          <div
                                            key={p.enrollment.id.toString()}
                                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 gap-4"
                                          >
                                            <div className="min-w-0">
                                              <p className="text-sm font-medium text-foreground truncate">
                                                {courseName}
                                              </p>
                                              <p className="text-xs text-muted-foreground mt-0.5">
                                                {formatDate(
                                                  p.enrollment.purchasedAt,
                                                )}{" "}
                                                · ID:{" "}
                                                {p.enrollment.paymentId.slice(
                                                  0,
                                                  12,
                                                )}
                                                …
                                              </p>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                              <span className="font-mono text-sm text-teal-400">
                                                {formatICP(p.coursePrice)}
                                              </span>
                                              <span
                                                className={`admin-badge text-xs ${
                                                  p.enrollment.status ===
                                                  EnrollmentStatus.Completed
                                                    ? "badge-success"
                                                    : p.enrollment.status ===
                                                        EnrollmentStatus.Pending
                                                      ? "badge-warning"
                                                      : "badge-destructive"
                                                }`}
                                              >
                                                {p.enrollment.status}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
