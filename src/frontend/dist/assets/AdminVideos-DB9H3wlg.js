import { aT as useVideos, aH as useAdminCourses, aU as useCreateVideo, aV as useDeleteVideo, r as reactExports, j as jsxRuntimeExports, X, m as motion, S as Star, A as AnimatePresence, x as ue, a9 as CirclePlay } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { F as Funnel } from "./funnel-CcUuw1JL.js";
import { V as Video } from "./video-B8eN7M2n.js";
import { E as Eye } from "./eye-BiFajpQT.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function VideoForm({
  onSave,
  onClose,
  isSaving
}) {
  const { data: courses } = useAdminCourses();
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    courseId: "",
    thumbnailUrl: "",
    videoUrl: "",
    isPreview: false,
    order: 1n
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.courseId) {
      ue.error("Please select a course.");
      return;
    }
    if (!form.videoUrl.trim()) {
      ue.error("Please provide a video URL.");
      return;
    }
    onSave(form);
  };
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.videos.dialog",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Add Video" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Add a video tutorial to a course" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "admin.videos.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-title", className: "admin-form-label", children: "Title *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "vf-title",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Introduction to Accountancy",
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    "data-ocid": "admin.videos.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-desc", className: "admin-form-label", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "vf-desc",
                    rows: 2,
                    className: "admin-form-input resize-none",
                    placeholder: "Brief description of this video…",
                    value: form.description,
                    onChange: (e) => set("description", e.target.value),
                    "data-ocid": "admin.videos.description.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-course", className: "admin-form-label", children: "Course *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "vf-course",
                    required: true,
                    className: "admin-form-input",
                    value: form.courseId,
                    onChange: (e) => set("courseId", e.target.value),
                    "data-ocid": "admin.videos.course.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Select a course —" }),
                      activeCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id.toString(), children: c.title }, c.id.toString()))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-url", className: "admin-form-label", children: "Video URL *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "vf-url",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "https://www.youtube.com/embed/…",
                    value: form.videoUrl,
                    onChange: (e) => set("videoUrl", e.target.value),
                    "data-ocid": "admin.videos.video_url.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Paste a YouTube embed URL (e.g. https://www.youtube.com/embed/…)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-thumb", className: "admin-form-label", children: "Thumbnail URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "vf-thumb",
                    className: "admin-form-input",
                    placeholder: "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg",
                    value: form.thumbnailUrl,
                    onChange: (e) => set("thumbnailUrl", e.target.value),
                    "data-ocid": "admin.videos.thumbnail_url.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-order", className: "admin-form-label", children: "Order / Position" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "vf-order",
                      type: "number",
                      min: 1,
                      className: "admin-form-input",
                      value: Number(form.order),
                      onChange: (e) => set("order", BigInt(Math.max(1, Number(e.target.value) || 1))),
                      "data-ocid": "admin.videos.order.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "vf-preview", className: "admin-form-label", children: "Free Preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "vf-preview",
                      className: "flex items-center gap-3 h-10 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "vf-preview",
                            type: "checkbox",
                            checked: form.isPreview,
                            onChange: (e) => set("isPreview", e.target.checked),
                            className: "w-4 h-4 rounded border border-white/20 bg-white/5 accent-cyan-400",
                            "data-ocid": "admin.videos.is_preview.checkbox"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Visible without enrollment" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.videos.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.videos.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isSaving ? "Adding…" : "Add Video"
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
function VideoThumbnail({ video }) {
  if (video.thumbnailUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: video.thumbnailUrl,
        alt: video.title,
        className: "w-full h-full object-cover",
        onError: (e) => {
          e.currentTarget.style.display = "none";
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-violet-600/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-8 h-8 text-cyan-400/60" }) });
}
function AdminVideos() {
  const { data: videos, isLoading } = useVideos();
  const { data: courses } = useAdminCourses();
  const createVideo = useCreateVideo();
  const deleteVideo = useDeleteVideo();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [filterCourse, setFilterCourse] = reactExports.useState("all");
  const courseMap = new Map(
    (courses == null ? void 0 : courses.map((c) => [c.id.toString(), c.title])) ?? []
  );
  const activeCourses = (courses == null ? void 0 : courses.filter((c) => !c.isDeleted)) ?? [];
  const allVideos = videos ?? [];
  const filtered = filterCourse === "all" ? allVideos : allVideos.filter((v) => v.courseId === filterCourse);
  const handleSave = async (data) => {
    try {
      await createVideo.mutateAsync(data);
      ue.success("Video added successfully.");
      setShowForm(false);
    } catch {
      ue.error("Failed to add video. Please try again.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteVideo.mutateAsync(deletingId);
      ue.success("Video deleted.");
    } catch {
      ue.error("Failed to delete video.");
    } finally {
      setDeletingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.videos.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Video Tutorials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          allVideos.length,
          " video",
          allVideos.length !== 1 ? "s" : "",
          filterCourse !== "all" ? ` — ${courseMap.get(filterCourse) ?? "filtered"}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowForm(true),
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.videos.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Video"
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
          "data-ocid": "admin.videos.filter.select",
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
          "data-ocid": "admin.videos.filter.clear_button",
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
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "admin.videos.loading_state",
        children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl bg-white/5" }, k))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.videos.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-8 h-8 text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-base", children: filterCourse !== "all" ? "No videos for this course" : "No videos yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: filterCourse !== "all" ? "Add video tutorials for this course." : "Add YouTube embed links as course video tutorials." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(true),
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth",
              "data-ocid": "admin.videos.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add First Video"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.04 },
        className: "glass-morphism rounded-xl border border-white/10 overflow-hidden flex flex-col",
        "data-ocid": `admin.videos.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video bg-[oklch(0.16_0.07_260)] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VideoThumbnail, { video }),
            video.isPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wide", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
              " Preview"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white/70 text-[10px] font-medium", children: [
              "#",
              Number(video.order)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug", children: video.title }),
            video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: video.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-2 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: courseMap.get(video.courseId) ?? `Course ${video.courseId}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: formatDate(video.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: video.videoUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex-1 admin-action-btn admin-action-btn-edit justify-center",
                  "data-ocid": `admin.videos.view_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                    " Watch"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setDeletingId(video.id),
                  className: "flex-1 admin-action-btn admin-action-btn-delete justify-center",
                  "data-ocid": `admin.videos.delete_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    " Delete"
                  ]
                }
              )
            ] })
          ] })
        ]
      },
      video.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VideoForm,
      {
        onSave: handleSave,
        onClose: () => setShowForm(false),
        isSaving: createVideo.isPending
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
            "data-ocid": "admin.videos.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Video?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This video will be permanently removed from the platform. Students enrolled in this course will lose access to this tutorial." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.videos.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.videos.delete.confirm_button",
                    children: "Delete Video"
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
  AdminVideos as default
};
