import { af as useAdminPayments, r as reactExports, W as EnrollmentStatus, j as jsxRuntimeExports, m as motion, a2 as CreditCard } from "./index-lv5lHg54.js";
import { S as Skeleton } from "./skeleton-BH48xlqF.js";
import { T as TrendingUp } from "./trending-up-CYYqlS9F.js";
import { F as Funnel } from "./funnel--V5JvLAs.js";
function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: EnrollmentStatus.Completed, label: "Completed" },
  { value: EnrollmentStatus.Pending, label: "Pending" },
  { value: EnrollmentStatus.Failed, label: "Failed" },
  { value: EnrollmentStatus.Refunded, label: "Refunded" }
];
const statusBadge = (status) => {
  if (status === EnrollmentStatus.Completed) return "badge-success";
  if (status === EnrollmentStatus.Pending) return "badge-warning";
  if (status === EnrollmentStatus.Refunded)
    return "text-muted-foreground border border-white/15";
  return "badge-destructive";
};
function AdminPayments() {
  const { data: payments, isLoading } = useAdminPayments();
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const completedPayments = reactExports.useMemo(
    () => (payments == null ? void 0 : payments.filter(
      (p) => p.enrollment.status === EnrollmentStatus.Completed
    )) ?? [],
    [payments]
  );
  const pendingCount = reactExports.useMemo(
    () => (payments == null ? void 0 : payments.filter((p) => p.enrollment.status === EnrollmentStatus.Pending).length) ?? 0,
    [payments]
  );
  const totalRevenue = reactExports.useMemo(
    () => completedPayments.reduce((s, p) => s + p.coursePrice, 0n),
    [completedPayments]
  );
  const filtered = reactExports.useMemo(() => {
    if (!payments) return [];
    if (filterStatus === "all") return payments;
    return payments.filter((p) => p.enrollment.status === filterStatus);
  }, [payments, filterStatus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.payments.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Payments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        (payments == null ? void 0 : payments.length) ?? 0,
        " total transaction",
        (payments == null ? void 0 : payments.length) !== 1 ? "s" : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 },
          className: "glass-morphism rounded-xl border border-teal-500/20 p-5 shadow-[0_0_20px_oklch(0.65_0.22_140/0.15)]",
          "data-ocid": "admin.payments.revenue_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-teal-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "Total Revenue" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-extrabold text-teal-400", children: formatRupees(totalRevenue) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              completedPayments.length,
              " completed payment",
              completedPayments.length !== 1 ? "s" : ""
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "glass-morphism rounded-xl border border-amber-500/20 p-5",
          "data-ocid": "admin.payments.pending_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "Pending" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-extrabold text-amber-400", children: pendingCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Awaiting confirmation" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "glass-morphism rounded-xl border border-white/10 p-5",
          "data-ocid": "admin.payments.total_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-cyan-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "All Transactions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-extrabold text-cyan-400", children: (payments == null ? void 0 : payments.length) ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Across all courses" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          className: "admin-form-input max-w-[220px] py-1.5 text-sm",
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          "data-ocid": "admin.payments.status.filter",
          children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
        }
      ),
      filterStatus !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterStatus("all"),
          className: "text-xs text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "admin.payments.filter.clear_button",
          children: "Clear filter"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.payments.loading_state",
        children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg bg-white/5" }, k))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.payments.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-8 h-8 text-teal-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: filterStatus !== "all" ? `No ${filterStatus.toLowerCase()} payments` : "No payments yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: filterStatus !== "all" ? "Try a different status filter." : "Transactions appear here once students purchase courses." })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Payment ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: i * 0.03 },
            className: "admin-table-row-hover",
            "data-ocid": `admin.payments.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td font-medium max-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: p.courseName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[120px]", children: [
                p.studentPrincipal.slice(0, 14),
                "…"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground font-mono text-xs truncate max-w-[100px]", children: p.enrollment.paymentId.length > 12 ? `${p.enrollment.paymentId.slice(0, 12)}…` : p.enrollment.paymentId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-right font-mono font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: p.enrollment.status === EnrollmentStatus.Completed ? "text-teal-400" : "text-foreground",
                  children: formatRupees(p.coursePrice)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: formatDate(p.enrollment.purchasedAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `admin-badge text-xs ${statusBadge(p.enrollment.status)}`,
                  children: p.enrollment.status
                }
              ) })
            ]
          },
          p.enrollment.id.toString()
        )) })
      ] }) }),
      filterStatus !== "all" && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-white/10 flex items-center justify-end gap-3 bg-white/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          filtered.length,
          " of ",
          (payments == null ? void 0 : payments.length) ?? 0
        ] }),
        filterStatus === EnrollmentStatus.Completed && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-semibold text-teal-400", children: [
            "Subtotal:",
            " ",
            formatRupees(
              filtered.reduce((s, p) => s + p.coursePrice, 0n)
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminPayments as default
};
