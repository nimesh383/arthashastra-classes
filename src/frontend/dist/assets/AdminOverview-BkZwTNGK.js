import { ad as useAdminCourses, l as useTeachers, ae as useAdminStudents, af as useAdminPayments, W as EnrollmentStatus, B as BookOpen, G as GraduationCap, U as Users, a2 as CreditCard, j as jsxRuntimeExports, m as motion } from "./index-lv5lHg54.js";
import { P as Plus } from "./plus-BFzoboAS.js";
import { T as TrendingUp } from "./trending-up-CYYqlS9F.js";
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
function AdminOverview() {
  const { data: courses } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const { data: students } = useAdminStudents();
  const { data: payments } = useAdminPayments();
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  const activeTeachers = (teachers == null ? void 0 : teachers.filter((t) => !t.isDeleted)) ?? [];
  const completedPayments = (payments == null ? void 0 : payments.filter(
    (p) => p.enrollment.status === EnrollmentStatus.Completed
  )) ?? [];
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
  const recentPayments = (payments == null ? void 0 : payments.slice(0, 5)) ?? [];
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
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.42 },
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
