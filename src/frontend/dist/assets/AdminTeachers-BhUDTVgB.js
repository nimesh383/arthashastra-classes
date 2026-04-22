import { l as useTeachers, ad as useAdminCourses, ak as useCreateTeacher, al as useUpdateTeacher, am as useDeleteTeacher, r as reactExports, j as jsxRuntimeExports, G as GraduationCap, m as motion, A as AnimatePresence, w as ue, X, Z as Image } from "./index-lv5lHg54.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-D66AY3id.js";
import { S as Skeleton } from "./skeleton-BH48xlqF.js";
import { P as Plus } from "./plus-BFzoboAS.js";
import { P as Pencil } from "./pencil-CPKiGrcr.js";
function TeacherForm({
  initial,
  onSave,
  onClose,
  isSaving
}) {
  const [form, setForm] = reactExports.useState({
    name: (initial == null ? void 0 : initial.name) ?? "",
    email: (initial == null ? void 0 : initial.email) ?? "",
    specialization: (initial == null ? void 0 : initial.specialization) ?? "",
    profilePhotoUrl: initial == null ? void 0 : initial.profilePhotoUrl
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.teachers.dialog",
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 8 },
          className: "admin-modal-content",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: initial ? "Edit Teacher" : "New Teacher" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: initial ? "Update faculty details" : "Add a new faculty member" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "admin.teachers.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            form.profilePhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: form.profilePhotoUrl,
                  alt: "Profile preview",
                  className: "w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/40"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: form.name || "Teacher" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Profile photo set" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-name", className: "admin-form-label", children: "Full Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "tf-name",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Dr. Ajay Govindani",
                    value: form.name,
                    onChange: (e) => set("name", e.target.value),
                    "data-ocid": "admin.teachers.name.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-email", className: "admin-form-label", children: "Email *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "tf-email",
                    required: true,
                    type: "email",
                    className: "admin-form-input",
                    placeholder: "teacher@arthashastra.in",
                    value: form.email,
                    onChange: (e) => set("email", e.target.value),
                    "data-ocid": "admin.teachers.email.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-spec", className: "admin-form-label", children: "Specialization *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "tf-spec",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Accountancy & Economics",
                    value: form.specialization,
                    onChange: (e) => set("specialization", e.target.value),
                    "data-ocid": "admin.teachers.specialization.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-photo", className: "admin-form-label", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                  " Profile Photo URL (optional)"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "tf-photo",
                    className: "admin-form-input",
                    placeholder: "https://… (paste an image URL)",
                    value: form.profilePhotoUrl ?? "",
                    onChange: (e) => set("profilePhotoUrl", e.target.value || void 0),
                    "data-ocid": "admin.teachers.photo_url.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.teachers.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50",
                    "data-ocid": "admin.teachers.submit_button",
                    children: isSaving ? "Saving…" : initial ? "Save Changes" : "Add Teacher"
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
function AdminTeachers() {
  const { data: teachers, isLoading } = useTeachers();
  const { data: courses } = useAdminCourses();
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const teacherCourseCount = /* @__PURE__ */ new Map();
  if (courses) {
    for (const c of courses) {
      if (!c.isDeleted) {
        for (const tid of c.teacherIds) {
          const key = tid.toString();
          teacherCourseCount.set(key, (teacherCourseCount.get(key) ?? 0) + 1);
        }
      }
    }
  }
  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateTeacher.mutateAsync({ id: editing.id, input: data });
        ue.success("Teacher updated successfully.");
      } else {
        await createTeacher.mutateAsync(data);
        ue.success("Teacher added successfully.");
      }
      setShowForm(false);
      setEditing(void 0);
    } catch {
      ue.error("Failed to save teacher. Please try again.");
    }
  };
  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteTeacher.mutateAsync(deletingId);
      ue.success("Teacher removed.");
    } catch {
      ue.error("Failed to remove teacher.");
    } finally {
      setDeletingId(null);
    }
  };
  const active = (teachers == null ? void 0 : teachers.filter((t) => !t.isDeleted)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.teachers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Teachers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          active.length,
          " faculty member",
          active.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setEditing(void 0);
            setShowForm(true);
          },
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.teachers.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Teacher"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "admin.teachers.loading_state",
        children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl bg-white/5" }, k))
      }
    ) : active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.teachers.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8 text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: "No teachers yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Add faculty members to assign them to courses." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditing(void 0);
                setShowForm(true);
              },
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow transition-smooth",
              "data-ocid": "admin.teachers.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add First Teacher"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Teacher" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Specialization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th text-right", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: active.map((t, i) => {
        var _a;
        const courseCount = teacherCourseCount.get(t.id.toString()) ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: i * 0.05 },
            className: "admin-table-row-hover",
            "data-ocid": `admin.teachers.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                t.profilePhotoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: t.profilePhotoUrl,
                    alt: t.name,
                    className: "w-9 h-9 rounded-lg object-cover ring-2 ring-white/10 shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-foreground font-bold text-sm shrink-0", children: (_a = t.name[0]) == null ? void 0 : _a.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[120px]", children: t.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm truncate max-w-[160px]", children: t.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge badge-warning text-xs", children: t.specialization }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `admin-badge text-xs ${courseCount > 0 ? "badge-success" : "text-muted-foreground border border-white/10"}`,
                  children: courseCount
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setEditing(t);
                      setShowForm(true);
                    },
                    className: "admin-action-btn admin-action-btn-edit",
                    "data-ocid": `admin.teachers.edit_button.${i + 1}`,
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
                    onClick: () => setDeletingId(t.id),
                    className: "admin-action-btn admin-action-btn-delete",
                    "data-ocid": `admin.teachers.delete_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      " Remove"
                    ]
                  }
                )
              ] }) })
            ]
          },
          t.id.toString()
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TeacherForm,
      {
        initial: editing,
        onSave: handleSave,
        onClose: () => {
          setShowForm(false);
          setEditing(void 0);
        },
        isSaving: createTeacher.isPending || updateTeacher.isPending
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
            "data-ocid": "admin.teachers.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Remove Teacher?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This teacher will be removed from the platform and unassigned from all courses. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.teachers.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.teachers.delete.confirm_button",
                    children: "Remove Teacher"
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
  AdminTeachers as default
};
