import { u as useTestimonials, aW as useCreateTestimonial, aX as useUpdateTestimonial, aY as useDeleteTestimonial, aZ as useToggleTestimonialVisibility, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, x as ue, m as motion, X, S as Star } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { Q as Quote } from "./quote-BgYuZv94.js";
import { P as Pencil } from "./pencil-Bb0ZivwZ.js";
import { E as EyeOff } from "./eye-off-CJVZfrhE.js";
import { E as Eye } from "./eye-BiFajpQT.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
function ratingStars(rating) {
  return [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-3 h-3 ${n <= Number(rating) ? "text-cyan-400 fill-current" : "text-white/20"}`
    },
    n
  ));
}
function TestimonialForm({
  initial,
  onSave,
  onClose,
  isSaving
}) {
  const [form, setForm] = reactExports.useState({
    studentName: (initial == null ? void 0 : initial.studentName) ?? "",
    subject: (initial == null ? void 0 : initial.subject) ?? "",
    marks: (initial == null ? void 0 : initial.marks) ?? "",
    text: (initial == null ? void 0 : initial.text) ?? "",
    photoUrl: initial == null ? void 0 : initial.photoUrl,
    isVisible: (initial == null ? void 0 : initial.isVisible) ?? true,
    rating: (initial == null ? void 0 : initial.rating) ?? 5n,
    isVideo: (initial == null ? void 0 : initial.isVideo) ?? false
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.text.trim()) {
      ue.error("Name and review text are required.");
      return;
    }
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.testimonials.dialog",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: initial ? "Edit Testimonial" : "Add Testimonial" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: initial ? "Update this student review" : "Add a new student review" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close",
                  "data-ocid": "admin.testimonials.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-name", className: "admin-form-label", children: "Student Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "tf-name",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Priya Sharma",
                    value: form.studentName,
                    onChange: (e) => set("studentName", e.target.value),
                    "data-ocid": "admin.testimonials.name.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-subject", className: "admin-form-label", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tf-subject",
                      className: "admin-form-input",
                      placeholder: "e.g. Accountancy",
                      value: form.subject,
                      onChange: (e) => set("subject", e.target.value),
                      "data-ocid": "admin.testimonials.subject.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-marks", className: "admin-form-label", children: "Marks / Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tf-marks",
                      className: "admin-form-input",
                      placeholder: "e.g. 95/100",
                      value: form.marks,
                      onChange: (e) => set("marks", e.target.value),
                      "data-ocid": "admin.testimonials.marks.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-text", className: "admin-form-label", children: "Review Text *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "tf-text",
                    required: true,
                    rows: 3,
                    className: "admin-form-input resize-none",
                    placeholder: "What did this student say about Arthashastra Classes?",
                    value: form.text,
                    onChange: (e) => set("text", e.target.value),
                    "data-ocid": "admin.testimonials.text.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-rating", className: "admin-form-label", children: "Rating (1–5)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "tf-rating",
                      className: "admin-form-input",
                      value: Number(form.rating),
                      onChange: (e) => set("rating", BigInt(e.target.value)),
                      "data-ocid": "admin.testimonials.rating.select",
                      children: [5, 4, 3, 2, 1].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r, children: [
                        "★".repeat(r),
                        " (",
                        r,
                        ")"
                      ] }, r))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tf-photo", className: "admin-form-label", children: "Photo URL (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tf-photo",
                      className: "admin-form-input",
                      placeholder: "https://...",
                      value: form.photoUrl ?? "",
                      onChange: (e) => set("photoUrl", e.target.value || void 0),
                      "data-ocid": "admin.testimonials.photo.input"
                    }
                  )
                ] })
              ] }),
              form.photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: form.photoUrl,
                    alt: "Preview",
                    className: "w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30 shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Photo preview" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tf-visible",
                      type: "checkbox",
                      checked: form.isVisible,
                      onChange: (e) => set("isVisible", e.target.checked),
                      className: "w-4 h-4 accent-cyan-400",
                      "data-ocid": "admin.testimonials.visible.checkbox"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Visible on website" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tf-video",
                      type: "checkbox",
                      checked: form.isVideo,
                      onChange: (e) => set("isVideo", e.target.checked),
                      className: "w-4 h-4 accent-violet-400",
                      "data-ocid": "admin.testimonials.video.checkbox"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Video testimonial" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.testimonials.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.testimonials.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isSaving ? "Saving…" : initial ? "Save Changes" : "Add Testimonial"
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
function TestimonialCard({
  testimonial,
  index,
  onEdit,
  onDelete,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04 },
      className: `glass-morphism rounded-xl border p-5 flex flex-col gap-3 ${testimonial.isVisible ? "border-white/10" : "border-white/5 opacity-60"}`,
      "data-ocid": `admin.testimonials.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          testimonial.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: testimonial.photoUrl,
              alt: testimonial.studentName,
              className: "w-10 h-10 rounded-full object-cover shrink-0"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-cyan-400", children: testimonial.studentName.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: testimonial.studentName }),
              testimonial.isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30", children: "Video" }),
              !testimonial.isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full", children: "Hidden" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-cyan-400", children: [
              testimonial.marks,
              " — ",
              testimonial.subject
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mt-1", children: ratingStars(testimonial.rating) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3", children: testimonial.text })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onEdit,
              className: "flex-1 admin-action-btn admin-action-btn-edit justify-center",
              "data-ocid": `admin.testimonials.edit_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                " Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onToggle,
              className: "flex-1 admin-action-btn admin-action-btn-edit justify-center",
              "data-ocid": `admin.testimonials.toggle_button.${index + 1}`,
              children: testimonial.isVisible ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }),
                " Hide"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                " Show"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onDelete,
              className: "flex-1 admin-action-btn admin-action-btn-delete justify-center",
              "data-ocid": `admin.testimonials.delete_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                " Delete"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const toggleVisibility = useToggleTestimonialVisibility();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateTestimonial.mutateAsync({ id: editing.id, input: data });
        ue.success("Testimonial updated.");
      } else {
        await createTestimonial.mutateAsync(data);
        ue.success("Testimonial added.");
      }
      setShowForm(false);
      setEditing(void 0);
    } catch {
      ue.error("Failed to save testimonial.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteTestimonial.mutateAsync(deletingId);
      ue.success("Testimonial deleted.");
    } catch {
      ue.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleToggle = async (id) => {
    try {
      await toggleVisibility.mutateAsync(id);
      ue.success("Visibility updated.");
    } catch {
      ue.error("Failed to update visibility.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.testimonials.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Testimonials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          testimonials.length,
          " total —",
          " ",
          testimonials.filter((t) => t.isVisible).length,
          " visible"
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
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.testimonials.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Testimonial"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "admin.testimonials.loading_state",
        children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl bg-white/5" }, k))
      }
    ) : testimonials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.testimonials.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-10 h-10 text-cyan-400/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No testimonials yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add student reviews to build social proof." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditing(void 0);
                setShowForm(true);
              },
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow",
              "data-ocid": "admin.testimonials.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add First Testimonial"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestimonialCard,
      {
        testimonial: t,
        index: i,
        onEdit: () => {
          setEditing(t);
          setShowForm(true);
        },
        onDelete: () => setDeletingId(t.id),
        onToggle: () => handleToggle(t.id)
      },
      t.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestimonialForm,
      {
        initial: editing,
        onSave: handleSave,
        onClose: () => {
          setShowForm(false);
          setEditing(void 0);
        },
        isSaving: createTestimonial.isPending || updateTestimonial.isPending
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
            "data-ocid": "admin.testimonials.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Testimonial?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This testimonial will be permanently removed." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.testimonials.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.testimonials.delete.confirm_button",
                    children: "Delete"
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
  AdminTestimonials as default
};
