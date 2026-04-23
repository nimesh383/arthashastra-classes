import { r as reactExports, ab as useGalleryImages, bc as useCreateGalleryImage, bd as useDeleteGalleryImage, be as useToggleGalleryImageVisibility, j as jsxRuntimeExports, ac as GalleryCategory, a1 as Image, A as AnimatePresence, x as ue, m as motion, X } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { F as Funnel } from "./funnel-CcUuw1JL.js";
import { E as EyeOff } from "./eye-off-CJVZfrhE.js";
import { E as Eye } from "./eye-BiFajpQT.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
const CATEGORY_OPTIONS = [
  { value: GalleryCategory.classroom, label: "Classroom" },
  { value: GalleryCategory.events, label: "Events" },
  { value: GalleryCategory.results, label: "Results" },
  { value: GalleryCategory.team, label: "Team" }
];
function GalleryForm({
  onSave,
  onClose,
  isSaving
}) {
  const [form, setForm] = reactExports.useState({
    title: "",
    imageUrl: "",
    category: GalleryCategory.classroom,
    isVisible: true,
    description: void 0
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) {
      ue.error("Image URL is required.");
      return;
    }
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.gallery.dialog",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Add Gallery Image" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload a photo to the gallery" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close",
                  "data-ocid": "admin.gallery.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "gf-url", className: "admin-form-label", children: "Image URL *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "gf-url",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "https://...",
                    value: form.imageUrl,
                    onChange: (e) => set("imageUrl", e.target.value),
                    "data-ocid": "admin.gallery.image_url.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "gf-title", className: "admin-form-label", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "gf-title",
                    className: "admin-form-input",
                    placeholder: "e.g. Classroom session — Batch 2024",
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    "data-ocid": "admin.gallery.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "gf-category", className: "admin-form-label", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "gf-category",
                      className: "admin-form-input",
                      value: form.category,
                      onChange: (e) => set("category", e.target.value),
                      "data-ocid": "admin.gallery.category.select",
                      children: CATEGORY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "gf-desc", className: "admin-form-label", children: "Caption (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "gf-desc",
                      className: "admin-form-input",
                      placeholder: "Short caption…",
                      value: form.description ?? "",
                      onChange: (e) => set("description", e.target.value || void 0),
                      "data-ocid": "admin.gallery.description.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "gf-visible",
                    type: "checkbox",
                    checked: form.isVisible,
                    onChange: (e) => set("isVisible", e.target.checked),
                    className: "w-4 h-4 accent-cyan-400",
                    "data-ocid": "admin.gallery.visible.checkbox"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "gf-visible",
                    className: "text-sm text-muted-foreground cursor-pointer",
                    children: "Visible on website"
                  }
                )
              ] }),
              form.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-white/10 h-32 bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: form.imageUrl,
                  alt: "Preview",
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.gallery.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.gallery.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isSaving ? "Adding…" : "Add Image"
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
function GalleryCard({
  image,
  index,
  onDelete,
  onToggle
}) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.03 },
      className: `glass-morphism rounded-xl border overflow-hidden flex flex-col ${image.isVisible ? "border-white/10" : "border-white/5 opacity-60"}`,
      "data-ocid": `admin.gallery.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-[oklch(0.16_0.07_260)] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image.imageUrl,
              alt: image.title,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/70 font-medium capitalize", children: ((_a = CATEGORY_OPTIONS.find((o) => o.value === image.category)) == null ? void 0 : _a.label) ?? image.category }),
            !image.isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 font-medium", children: "Hidden" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
          image.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground line-clamp-1", children: image.title }),
          image.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: image.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onToggle,
                className: "flex-1 admin-action-btn admin-action-btn-edit justify-center",
                "data-ocid": `admin.gallery.toggle_button.${index + 1}`,
                children: image.isVisible ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
                "data-ocid": `admin.gallery.delete_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  " Delete"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function AdminGallery() {
  const [filterCategory, setFilterCategory] = reactExports.useState(
    null
  );
  const { data: images = [], isLoading } = useGalleryImages(filterCategory);
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const toggleVisibility = useToggleGalleryImageVisibility();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const handleSave = async (data) => {
    try {
      await createImage.mutateAsync(data);
      ue.success("Image added to gallery.");
      setShowForm(false);
    } catch {
      ue.error("Failed to add image.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteImage.mutateAsync(deletingId);
      ue.success("Image deleted.");
    } catch {
      ue.error("Failed to delete image.");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.gallery.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          images.length,
          " image",
          images.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowForm(true),
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.gallery.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Image"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterCategory(null),
          className: `px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${filterCategory === null ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground"}`,
          "data-ocid": "admin.gallery.filter.all",
          children: "All"
        }
      ),
      CATEGORY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterCategory(opt.value),
          className: `px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${filterCategory === opt.value ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground"}`,
          "data-ocid": `admin.gallery.filter.${opt.value}`,
          children: opt.label
        },
        opt.value
      ))
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
        "data-ocid": "admin.gallery.loading_state",
        children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map(
          (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl bg-white/5" }, k)
        )
      }
    ) : images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.gallery.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10 text-cyan-400/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No images yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add photos from classrooms, events, and results." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(true),
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow",
              "data-ocid": "admin.gallery.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add First Image"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      GalleryCard,
      {
        image: img,
        index: i,
        onDelete: () => setDeletingId(img.id),
        onToggle: () => handleToggle(img.id)
      },
      img.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GalleryForm,
      {
        onSave: handleSave,
        onClose: () => setShowForm(false),
        isSaving: createImage.isPending
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
            "data-ocid": "admin.gallery.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Image?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This image will be permanently removed from the gallery." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.gallery.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.gallery.delete.confirm_button",
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
  AdminGallery as default
};
