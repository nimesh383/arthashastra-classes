import { aH as useAdminCourses, n as useTeachers, aJ as useCreateCourse, aK as useUpdateCourse, aL as useDeleteCourse, r as reactExports, j as jsxRuntimeExports, B as BookOpen, m as motion, A as AnimatePresence, x as ue, aM as Level, E as Subject, X, a1 as Image } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { P as Pencil } from "./pencil-Bb0ZivwZ.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
const SUBJECTS = Object.values(Subject);
const LEVELS = Object.values(Level);
const SUBJECT_COLORS = {
  Accountancy: "badge-primary",
  Economics: "badge-warning",
  BST: "badge-success",
  Maths: "badge-destructive",
  Commerce: "admin-badge bg-violet-500/15 text-violet-400 border border-violet-500/30"
};
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CourseForm({
  initial,
  onSave,
  onClose,
  isSaving
}) {
  const { data: teachers } = useTeachers();
  const [form, setForm] = reactExports.useState({
    title: (initial == null ? void 0 : initial.title) ?? "",
    description: (initial == null ? void 0 : initial.description) ?? "",
    subject: (initial == null ? void 0 : initial.subject) ?? Subject.Commerce,
    level: (initial == null ? void 0 : initial.level) ?? Level.Beginner,
    duration: (initial == null ? void 0 : initial.duration) ?? "",
    price: (initial == null ? void 0 : initial.price) ?? 0n,
    teacherIds: (initial == null ? void 0 : initial.teacherIds) ?? [],
    imageUrl: initial == null ? void 0 : initial.imageUrl
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.courses.dialog",
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 8 },
          className: "admin-modal-content max-h-[90vh] overflow-y-auto",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: initial ? "Edit Course" : "New Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: initial ? "Update course details below" : "Fill in the details to create a new course" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "admin.courses.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-title", className: "admin-form-label", children: "Title *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cf-title",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Commerce Class 11 Complete Course",
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    "data-ocid": "admin.courses.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-desc", className: "admin-form-label", children: "Description *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "cf-desc",
                    required: true,
                    rows: 3,
                    className: "admin-form-input resize-none",
                    placeholder: "Describe what students will learn…",
                    value: form.description,
                    onChange: (e) => set("description", e.target.value),
                    "data-ocid": "admin.courses.description.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-subject", className: "admin-form-label", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "cf-subject",
                      className: "admin-form-input",
                      value: form.subject,
                      onChange: (e) => set("subject", e.target.value),
                      "data-ocid": "admin.courses.subject.select",
                      children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-level", className: "admin-form-label", children: "Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "cf-level",
                      className: "admin-form-input",
                      value: form.level,
                      onChange: (e) => set("level", e.target.value),
                      "data-ocid": "admin.courses.level.select",
                      children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l, children: l }, l))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-duration", className: "admin-form-label", children: "Duration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cf-duration",
                      className: "admin-form-input",
                      placeholder: "e.g. 6 months",
                      value: form.duration,
                      onChange: (e) => set("duration", e.target.value),
                      "data-ocid": "admin.courses.duration.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-price", className: "admin-form-label", children: "Price (ICP e8s)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cf-price",
                      type: "number",
                      min: "0",
                      className: "admin-form-input",
                      value: form.price.toString(),
                      onChange: (e) => set("price", BigInt(e.target.value || "0")),
                      "data-ocid": "admin.courses.price.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-img", className: "admin-form-label", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                  " Course Image URL"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cf-img",
                    className: "admin-form-input",
                    placeholder: "https://… (paste an image URL)",
                    value: form.imageUrl ?? "",
                    onChange: (e) => set("imageUrl", e.target.value || void 0),
                    "data-ocid": "admin.courses.image_url.input"
                  }
                ),
                form.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: form.imageUrl,
                    alt: "preview",
                    className: "mt-1 h-20 w-full object-cover rounded-lg opacity-80"
                  }
                )
              ] }),
              teachers && teachers.filter((t) => !t.isDeleted).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "admin-form-label", children: "Assign Teachers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: teachers.filter((t) => !t.isDeleted).map((t) => {
                  const selected = form.teacherIds.includes(t.id);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => set(
                        "teacherIds",
                        selected ? form.teacherIds.filter((id) => id !== t.id) : [...form.teacherIds, t.id]
                      ),
                      className: `px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${selected ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "border-white/20 text-muted-foreground hover:border-white/40 hover:text-foreground"}`,
                      children: t.name
                    },
                    t.id.toString()
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.courses.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50",
                    "data-ocid": "admin.courses.submit_button",
                    children: isSaving ? "Saving…" : initial ? "Save Changes" : "Create Course"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function AdminCourses() {
  const { data: courses, isLoading } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingCourse, setEditingCourse] = reactExports.useState();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const teacherMap = new Map(
    (teachers == null ? void 0 : teachers.map((t) => [t.id.toString(), t.name])) ?? []
  );
  const handleSave = async (data) => {
    try {
      if (editingCourse) {
        await updateCourse.mutateAsync({ id: editingCourse.id, input: data });
        ue.success("Course updated successfully.");
      } else {
        await createCourse.mutateAsync(data);
        ue.success("Course created successfully.");
      }
      setShowForm(false);
      setEditingCourse(void 0);
    } catch {
      ue.error("Failed to save course. Please try again.");
    }
  };
  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteCourse.mutateAsync(deletingId);
      ue.success("Course deleted.");
    } catch {
      ue.error("Failed to delete course.");
    } finally {
      setDeletingId(null);
    }
  };
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.courses.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          activeCourses.length,
          " active course",
          activeCourses.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setEditingCourse(void 0);
            setShowForm(true);
          },
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.courses.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Course"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.courses.loading_state",
        children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg bg-white/5" }, k))
      }
    ) : activeCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.courses.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: "No courses yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Create your first course to get started." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditingCourse(void 0);
                setShowForm(true);
              },
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth",
              "data-ocid": "admin.courses.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add First Course"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Teachers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Price (e8s)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: activeCourses.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.tr,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: i * 0.04 },
          className: "admin-table-row-hover",
          "data-ocid": `admin.courses.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td font-medium max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              c.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: c.imageUrl,
                  alt: "",
                  className: "w-8 h-8 rounded-lg object-cover shrink-0"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-cyan-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.title })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `admin-badge text-xs ${SUBJECT_COLORS[c.subject] ?? "badge-primary"}`,
                children: c.subject
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-2 py-1 rounded-md bg-white/5", children: c.level }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: c.duration || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td max-w-[120px]", children: c.teacherIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              c.teacherIds.slice(0, 2).map((tid) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full truncate max-w-[80px]",
                  children: teacherMap.get(tid.toString()) ?? `T#${tid.toString()}`
                },
                tid.toString()
              )),
              c.teacherIds.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "+",
                c.teacherIds.length - 2
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-td text-right font-mono text-sm", children: [
              "₹",
              Number(c.price).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: formatDate(c.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingCourse(c);
                    setShowForm(true);
                  },
                  className: "admin-action-btn admin-action-btn-edit",
                  "data-ocid": `admin.courses.edit_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                    " Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDeletingId(c.id),
                  className: "admin-action-btn admin-action-btn-delete",
                  "data-ocid": `admin.courses.delete_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    " Delete"
                  ]
                }
              )
            ] }) })
          ]
        },
        c.id.toString()
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseForm,
      {
        initial: editingCourse,
        onSave: handleSave,
        onClose: () => {
          setShowForm(false);
          setEditingCourse(void 0);
        },
        isSaving: createCourse.isPending || updateCourse.isPending
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deletingId !== null,
        onOpenChange: (open) => !open && setDeletingId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialogContent,
          {
            className: "glass-morphism border border-white/10",
            "data-ocid": "admin.courses.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Course?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This will soft-delete the course. Students who purchased it will retain access. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.courses.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.courses.delete.confirm_button",
                    children: "Delete Course"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminCourses as default
};
