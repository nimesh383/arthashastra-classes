import { z as useStudyMaterials, ap as useUploadMaterial, aq as useDeleteMaterial, aH as useAdminCourses, r as reactExports, j as jsxRuntimeExports, X, F as FileText, m as motion, I as FileType, A as AnimatePresence, x as ue } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { F as Funnel } from "./funnel-CcUuw1JL.js";
import { U as Upload } from "./upload-CHG40MSW.js";
import { E as ExternalLink } from "./external-link-BU97VLcY.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function MaterialForm({
  onSave,
  onClose,
  isSaving
}) {
  const { data: courses } = useAdminCourses();
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    fileType: FileType.PDF,
    courseId: 0n,
    fileUrl: "",
    fileSize: void 0
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (form.courseId === 0n) {
      ue.error("Please select a course.");
      return;
    }
    if (!form.fileUrl.trim()) {
      ue.error("Please provide a file URL.");
      return;
    }
    onSave(form);
  };
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.materials.dialog",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Upload Material" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Add a PDF or image file to a course" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "admin.materials.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-title", className: "admin-form-label", children: "Title *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "mf-title",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Chapter 1 — Introduction Notes",
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    "data-ocid": "admin.materials.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-desc", className: "admin-form-label", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "mf-desc",
                    rows: 2,
                    className: "admin-form-input resize-none",
                    placeholder: "Brief description of this material…",
                    value: form.description,
                    onChange: (e) => set("description", e.target.value),
                    "data-ocid": "admin.materials.description.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-course", className: "admin-form-label", children: "Course *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "mf-course",
                    required: true,
                    className: "admin-form-input",
                    value: form.courseId.toString(),
                    onChange: (e) => set("courseId", BigInt(e.target.value)),
                    "data-ocid": "admin.materials.course.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "— Select a course —" }),
                      activeCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id.toString(), children: c.title }, c.id.toString()))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-ftype", className: "admin-form-label", children: "File Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "mf-ftype",
                      className: "admin-form-input",
                      value: form.fileType,
                      onChange: (e) => set("fileType", e.target.value),
                      "data-ocid": "admin.materials.file_type.select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: FileType.PDF, children: "PDF" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: FileType.Image, children: "Image" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-size", className: "admin-form-label", children: "File Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "mf-size",
                      className: "admin-form-input",
                      placeholder: "e.g. 2.4 MB",
                      value: form.fileSize ?? "",
                      onChange: (e) => set("fileSize", e.target.value || void 0),
                      "data-ocid": "admin.materials.file_size.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mf-url", className: "admin-form-label", children: "File URL *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "mf-url",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "https://… (paste a direct link to the file)",
                    value: form.fileUrl,
                    onChange: (e) => set("fileUrl", e.target.value),
                    "data-ocid": "admin.materials.file_url.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Paste a publicly accessible URL to the PDF or image file." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.materials.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.materials.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                      isSaving ? "Uploading…" : "Upload Material"
                    ]
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
function AdminMaterials() {
  const { data: materials, isLoading } = useStudyMaterials();
  const uploadMaterial = useUploadMaterial();
  const deleteMaterial = useDeleteMaterial();
  const { data: courses } = useAdminCourses();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [filterCourse, setFilterCourse] = reactExports.useState("all");
  const courseMap = new Map(
    (courses == null ? void 0 : courses.map((c) => [c.id.toString(), c.title])) ?? []
  );
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  const active = (materials == null ? void 0 : materials.filter((m) => !m.isDeleted)) ?? [];
  const filtered = filterCourse === "all" ? active : active.filter((m) => m.courseId.toString() === filterCourse);
  const handleSave = async (data) => {
    try {
      await uploadMaterial.mutateAsync(data);
      ue.success("Material uploaded successfully.");
      setShowForm(false);
    } catch {
      ue.error("Upload failed. Please try again.");
    }
  };
  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMaterial.mutateAsync(deletingId);
      ue.success("Material deleted.");
    } catch {
      ue.error("Failed to delete material.");
    } finally {
      setDeletingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.materials.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Study Materials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          active.length,
          " material",
          active.length !== 1 ? "s" : "",
          filterCourse !== "all" ? ` — ${courseMap.get(filterCourse) ?? "filtered"}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowForm(true),
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.materials.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Upload Material"
          ]
        }
      )
    ] }),
    activeCourses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "admin-form-input max-w-[280px] py-1.5 text-sm",
          value: filterCourse,
          onChange: (e) => setFilterCourse(e.target.value),
          "data-ocid": "admin.materials.filter.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Courses" }),
            activeCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id.toString(), children: c.title }, c.id.toString()))
          ]
        }
      ),
      filterCourse !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFilterCourse("all"),
          className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth",
          "data-ocid": "admin.materials.filter.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
            " Clear filter"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.materials.loading_state",
        children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg bg-white/5" }, k))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.materials.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-fuchsia-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: filterCourse !== "all" ? "No materials for this course" : "No materials yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: filterCourse !== "all" ? "Upload PDFs or notes for this course." : "Upload PDFs and notes bundled with courses." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(true),
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth",
              "data-ocid": "admin.materials.empty.upload.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                " Upload First Material"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Upload Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.tr,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: i * 0.04 },
          className: "admin-table-row-hover",
          "data-ocid": `admin.materials.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.fileType === FileType.PDF ? "bg-red-500/10" : "bg-blue-500/10"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FileText,
                    {
                      className: `w-3.5 h-3.5 ${m.fileType === FileType.PDF ? "text-red-400" : "text-blue-400"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[160px]", children: m.title })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm truncate max-w-[140px]", children: courseMap.get(m.courseId.toString()) ?? `Course #${m.courseId.toString()}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `admin-badge text-xs ${m.fileType === FileType.PDF ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-blue-500/15 text-blue-400 border border-blue-500/30"}`,
                children: m.fileType
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-sm", children: m.fileSize ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: formatDate(m.uploadedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: m.fileUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "admin-action-btn admin-action-btn-edit",
                  "data-ocid": `admin.materials.view_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                    " View"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDeletingId(m.id),
                  className: "admin-action-btn admin-action-btn-delete",
                  "data-ocid": `admin.materials.delete_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    " Delete"
                  ]
                }
              )
            ] }) })
          ]
        },
        m.id.toString()
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MaterialForm,
      {
        onSave: handleSave,
        onClose: () => setShowForm(false),
        isSaving: uploadMaterial.isPending
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
            "data-ocid": "admin.materials.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Material?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This material will be permanently removed from the platform. Students who purchased this course will lose access to this file." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.materials.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.materials.delete.confirm_button",
                    children: "Delete Material"
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
  AdminMaterials as default
};
