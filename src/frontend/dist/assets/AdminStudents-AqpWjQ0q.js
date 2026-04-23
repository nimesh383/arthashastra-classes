import { al as useAdminStudents, aI as useAdminPayments, aH as useAdminCourses, r as reactExports, j as jsxRuntimeExports, X, U as Users, $ as EnrollmentStatus, a6 as React, m as motion, C as ChevronRight, A as AnimatePresence } from "./index-UQyTW7IZ.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { S as Search } from "./search-hll5qVC-.js";
import { C as ChevronDown } from "./chevron-down-BVam36t5.js";
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatICP(e8s) {
  return `${(Number(e8s) / 1e8).toFixed(4)} ICP`;
}
function AdminStudents() {
  const { data: students, isLoading } = useAdminStudents();
  const { data: payments } = useAdminPayments();
  const { data: courses } = useAdminCourses();
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const courseMap = reactExports.useMemo(
    () => new Map((courses == null ? void 0 : courses.map((c) => [c.id.toString(), c.title])) ?? []),
    [courses]
  );
  const paymentsByStudent = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    if (!payments) return map;
    for (const p of payments) {
      const existing = map.get(p.studentPrincipal) ?? [];
      map.set(p.studentPrincipal, [...existing, p]);
    }
    return map;
  }, [payments]);
  const filtered = reactExports.useMemo(() => {
    if (!students) return [];
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) => s.profile.name.toLowerCase().includes(q) || s.profile.email.toLowerCase().includes(q)
    );
  }, [students, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.students.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Students" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        (students == null ? void 0 : students.length) ?? 0,
        " registered student",
        (students == null ? void 0 : students.length) !== 1 ? "s" : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name or email…",
          className: "admin-form-input pl-9 pr-9 w-full",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "admin.students.search_input"
        }
      ),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSearch(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.students.loading_state",
        children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg bg-white/5" }, k))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.students.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-fuchsia-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: search ? "No students match your search" : "No students yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: search ? "Try a different name or email." : "Students appear here once they register and log in." })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Enrollments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Total Spent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Principal ID" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((s, i) => {
        var _a;
        const uid = s.profile.userId.toString();
        const isExpanded = expandedId === uid;
        const studentPayments = paymentsByStudent.get(uid) ?? [];
        const totalSpent = studentPayments.filter(
          (p) => p.enrollment.status === EnrollmentStatus.Completed
        ).reduce((sum, p) => sum + p.coursePrice, 0n);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.tr,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: i * 0.04 },
              className: "admin-table-row-hover cursor-pointer",
              onClick: () => setExpandedId(isExpanded ? null : uid),
              "data-ocid": `admin.students.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex items-center justify-center", children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-foreground font-bold text-sm shrink-0", children: (_a = (s.profile.name || "?")[0]) == null ? void 0 : _a.toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[120px]", children: s.profile.name || "—" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm truncate max-w-[160px]", children: s.profile.email || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: s.profile.phone || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `admin-badge text-xs ${s.profile.enrolledCourses.length > 0 ? "badge-success" : "text-muted-foreground border border-white/10"}`,
                    children: s.profile.enrolledCourses.length
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-right font-mono text-sm", children: totalSpent > 0n ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-teal-400", children: formatICP(totalSpent) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  uid.slice(0, 16),
                  "…"
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.tr,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 8,
                  className: "px-0 py-0 border-b border-white/10",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { height: 0 },
                      animate: { height: "auto" },
                      exit: { height: 0 },
                      className: "overflow-hidden",
                      "data-ocid": `admin.students.enrollment_panel.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-white/[0.03]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3", children: [
                          "Enrollment History —",
                          " ",
                          s.profile.name || "Student"
                        ] }),
                        studentPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No enrollments yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: studentPayments.map((p) => {
                          const courseName = courseMap.get(
                            p.enrollment.courseId.toString()
                          ) ?? p.courseName;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 gap-4",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: courseName }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                                    formatDate(
                                      p.enrollment.purchasedAt
                                    ),
                                    " ",
                                    "· ID:",
                                    " ",
                                    p.enrollment.paymentId.slice(
                                      0,
                                      12
                                    ),
                                    "…"
                                  ] })
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-teal-400", children: formatICP(p.coursePrice) }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: `admin-badge text-xs ${p.enrollment.status === EnrollmentStatus.Completed ? "badge-success" : p.enrollment.status === EnrollmentStatus.Pending ? "badge-warning" : "badge-destructive"}`,
                                      children: p.enrollment.status
                                    }
                                  )
                                ] })
                              ]
                            },
                            p.enrollment.id.toString()
                          );
                        }) })
                      ] })
                    }
                  )
                }
              )
            },
            `${uid}-expanded`
          ) })
        ] }, uid);
      }) })
    ] }) }) })
  ] });
}
export {
  AdminStudents as default
};
