import { c as createLucideIcon, a_ as useActiveAnnouncements, a$ as useCreateAnnouncement, b0 as useUpdateAnnouncement, b1 as useDeleteAnnouncement, b2 as useToggleAnnouncementActive, r as reactExports, j as jsxRuntimeExports, a2 as Bell, A as AnimatePresence, x as ue, b3 as AnnouncementType, m as motion, X } from "./index-UQyTW7IZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BpAC3AGc.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { P as Plus } from "./plus-DAHusTig.js";
import { M as Megaphone } from "./megaphone-BYa0HmR5.js";
import { P as Pencil } from "./pencil-Bb0ZivwZ.js";
import { E as EyeOff } from "./eye-off-CJVZfrhE.js";
import { E as Eye } from "./eye-BiFajpQT.js";
import { T as Trash2 } from "./trash-2-Bf-MG1rP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode);
const TYPE_LABELS = {
  [AnnouncementType.info]: "Info",
  [AnnouncementType.warning]: "Warning",
  [AnnouncementType.urgent]: "Urgent"
};
const TYPE_COLORS = {
  [AnnouncementType.info]: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  [AnnouncementType.warning]: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  [AnnouncementType.urgent]: "text-red-400 bg-red-500/10 border-red-500/20"
};
const TYPE_ICON_COLORS = {
  [AnnouncementType.info]: "bg-cyan-500/10 text-cyan-400",
  [AnnouncementType.warning]: "bg-amber-500/10 text-amber-400",
  [AnnouncementType.urgent]: "bg-red-500/10 text-red-400"
};
function tsToDatetimeLocal(ts) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function datetimeLocalToTs(val) {
  return BigInt(new Date(val).getTime()) * 1000000n;
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function AnnouncementForm({
  initial,
  onSave,
  onClose,
  isSaving
}) {
  const [form, setForm] = reactExports.useState({
    title: (initial == null ? void 0 : initial.title) ?? "",
    message: (initial == null ? void 0 : initial.message) ?? "",
    announcementType: (initial == null ? void 0 : initial.announcementType) ?? AnnouncementType.info,
    isActive: (initial == null ? void 0 : initial.isActive) ?? true,
    isPinned: (initial == null ? void 0 : initial.isPinned) ?? false,
    expiresAt: initial == null ? void 0 : initial.expiresAt
  });
  const [expiresAtLocal, setExpiresAtLocal] = reactExports.useState(
    (initial == null ? void 0 : initial.expiresAt) ? tsToDatetimeLocal(initial.expiresAt) : ""
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleExpiresChange = (val) => {
    setExpiresAtLocal(val);
    set("expiresAt", val ? datetimeLocalToTs(val) : void 0);
  };
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      ue.error("Title and message are required.");
      return;
    }
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.announcements.dialog",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: initial ? "Edit Announcement" : "New Announcement" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: initial ? "Update this notice" : "Publish a notice to all students" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close",
                  "data-ocid": "admin.announcements.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "af-title", className: "admin-form-label", children: "Title *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "af-title",
                    required: true,
                    className: "admin-form-input",
                    placeholder: "e.g. Board Exam Schedule Released",
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    "data-ocid": "admin.announcements.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "af-message", className: "admin-form-label", children: "Message *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "af-message",
                    required: true,
                    rows: 3,
                    className: "admin-form-input resize-none",
                    placeholder: "Details of the announcement…",
                    value: form.message,
                    onChange: (e) => set("message", e.target.value),
                    "data-ocid": "admin.announcements.message.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "af-type", className: "admin-form-label", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "af-type",
                      className: "admin-form-input",
                      value: form.announcementType,
                      onChange: (e) => set("announcementType", e.target.value),
                      "data-ocid": "admin.announcements.type.select",
                      children: Object.entries(TYPE_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, children: label }, val))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "af-expires", className: "admin-form-label", children: "Expires At (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "af-expires",
                      type: "datetime-local",
                      className: "admin-form-input",
                      value: expiresAtLocal,
                      onChange: (e) => handleExpiresChange(e.target.value),
                      "data-ocid": "admin.announcements.expires_at.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: form.isActive,
                      onChange: (e) => set("isActive", e.target.checked),
                      className: "w-4 h-4 accent-cyan-400",
                      "data-ocid": "admin.announcements.active.checkbox"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Active" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: form.isPinned,
                      onChange: (e) => set("isPinned", e.target.checked),
                      className: "w-4 h-4 accent-violet-400",
                      "data-ocid": "admin.announcements.pinned.checkbox"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Pin to top" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.announcements.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.announcements.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isSaving ? "Saving…" : initial ? "Save Changes" : "Publish"
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
function AnnouncementRow({
  announcement,
  index,
  onEdit,
  onDelete,
  onToggle
}) {
  const typeColor = TYPE_COLORS[announcement.announcementType] ?? TYPE_COLORS[AnnouncementType.info];
  const iconColor = TYPE_ICON_COLORS[announcement.announcementType] ?? TYPE_ICON_COLORS[AnnouncementType.info];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: index * 0.04 },
      className: "admin-table-row-hover",
      "data-ocid": `admin.announcements.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 max-w-[280px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: announcement.title }),
              announcement.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-3 h-3 text-violet-400 shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-0.5", children: announcement.message })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide ${typeColor}`,
            children: TYPE_LABELS[announcement.announcementType] ?? announcement.announcementType
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: announcement.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge badge-success text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge text-muted-foreground border border-white/10 text-xs", children: "Inactive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: announcement.isPinned ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4 text-violet-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: announcement.expiresAt ? formatDate(announcement.expiresAt) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: formatDate(announcement.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onEdit,
              className: "admin-action-btn admin-action-btn-edit",
              "data-ocid": `admin.announcements.edit_button.${index + 1}`,
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
              className: "admin-action-btn admin-action-btn-edit",
              "data-ocid": `admin.announcements.toggle_button.${index + 1}`,
              children: announcement.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }),
                " Off"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                " On"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onDelete,
              className: "admin-action-btn admin-action-btn-delete",
              "data-ocid": `admin.announcements.delete_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                " Delete"
              ]
            }
          )
        ] }) })
      ]
    },
    announcement.id
  );
}
function AdminAnnouncements() {
  const { data: announcements = [], isLoading } = useActiveAnnouncements();
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();
  const toggleActive = useToggleAnnouncementActive();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateAnnouncement.mutateAsync({ id: editing.id, input: data });
        ue.success("Announcement updated.");
      } else {
        await createAnnouncement.mutateAsync(data);
        ue.success("Announcement published.");
      }
      setShowForm(false);
      setEditing(void 0);
    } catch {
      ue.error("Failed to save announcement.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteAnnouncement.mutateAsync(deletingId);
      ue.success("Announcement deleted.");
    } catch {
      ue.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleToggle = async (id) => {
    try {
      await toggleActive.mutateAsync(id);
      ue.success("Status updated.");
    } catch {
      ue.error("Failed to update status.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.announcements.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Announcements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          announcements.length,
          " announcement",
          announcements.length !== 1 ? "s" : "",
          " —",
          " ",
          announcements.filter((a) => a.isActive).length,
          " active"
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
          "data-ocid": "admin.announcements.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Announcement"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.announcements.loading_state",
        children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg bg-white/5" }, k))
      }
    ) : announcements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.announcements.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-10 h-10 text-cyan-400/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No announcements yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Publish notices for exams, results, and offers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditing(void 0);
                setShowForm(true);
              },
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow",
              "data-ocid": "admin.announcements.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Create First Announcement"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Pinned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: announcements.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AnnouncementRow,
        {
          announcement: a,
          index: i,
          onEdit: () => {
            setEditing(a);
            setShowForm(true);
          },
          onDelete: () => setDeletingId(a.id),
          onToggle: () => handleToggle(a.id)
        },
        a.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AnnouncementForm,
      {
        initial: editing,
        onSave: handleSave,
        onClose: () => {
          setShowForm(false);
          setEditing(void 0);
        },
        isSaving: createAnnouncement.isPending || updateAnnouncement.isPending
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
            "data-ocid": "admin.announcements.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Announcement?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This announcement will be permanently removed." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.announcements.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.announcements.delete.confirm_button",
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
  AdminAnnouncements as default
};
