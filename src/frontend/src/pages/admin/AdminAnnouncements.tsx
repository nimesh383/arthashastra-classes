import type { Announcement, AnnouncementInput } from "@/backend.d";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useActiveAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useToggleAnnouncementActive,
  useUpdateAnnouncement,
} from "@/hooks/useBackend";
import { AnnouncementType } from "@/types";
import {
  Bell,
  Eye,
  EyeOff,
  Megaphone,
  Pencil,
  Pin,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TYPE_LABELS: Record<string, string> = {
  [AnnouncementType.info]: "Info",
  [AnnouncementType.warning]: "Warning",
  [AnnouncementType.urgent]: "Urgent",
};

const TYPE_COLORS: Record<string, string> = {
  [AnnouncementType.info]: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  [AnnouncementType.warning]:
    "text-amber-400 bg-amber-500/10 border-amber-500/20",
  [AnnouncementType.urgent]: "text-red-400 bg-red-500/10 border-red-500/20",
};

const TYPE_ICON_COLORS: Record<string, string> = {
  [AnnouncementType.info]: "bg-cyan-500/10 text-cyan-400",
  [AnnouncementType.warning]: "bg-amber-500/10 text-amber-400",
  [AnnouncementType.urgent]: "bg-red-500/10 text-red-400",
};

/** Convert backend nanosecond timestamp to datetime-local string */
function tsToDatetimeLocal(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  // Format: YYYY-MM-DDTHH:mm
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Convert datetime-local string to nanosecond timestamp */
function datetimeLocalToTs(val: string): bigint {
  return BigInt(new Date(val).getTime()) * 1_000_000n;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AnnouncementForm({
  initial,
  onSave,
  onClose,
  isSaving,
}: {
  initial?: Announcement;
  onSave: (data: AnnouncementInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<AnnouncementInput>({
    title: initial?.title ?? "",
    message: initial?.message ?? "",
    announcementType: initial?.announcementType ?? AnnouncementType.info,
    isActive: initial?.isActive ?? true,
    isPinned: initial?.isPinned ?? false,
    expiresAt: initial?.expiresAt,
  });
  const [expiresAtLocal, setExpiresAtLocal] = useState<string>(
    initial?.expiresAt ? tsToDatetimeLocal(initial.expiresAt) : "",
  );

  const set = <K extends keyof AnnouncementInput>(
    k: K,
    v: AnnouncementInput[K],
  ) => setForm((f) => ({ ...f, [k]: v }));

  const handleExpiresChange = (val: string) => {
    setExpiresAtLocal(val);
    set("expiresAt", val ? datetimeLocalToTs(val) : undefined);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Title and message are required.");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.announcements.dialog"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="admin-modal-content max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {initial ? "Edit Announcement" : "New Announcement"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initial
                ? "Update this notice"
                : "Publish a notice to all students"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="admin.announcements.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="af-title" className="admin-form-label">
              Title *
            </label>
            <input
              id="af-title"
              required
              className="admin-form-input"
              placeholder="e.g. Board Exam Schedule Released"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="admin.announcements.title.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="af-message" className="admin-form-label">
              Message *
            </label>
            <textarea
              id="af-message"
              required
              rows={3}
              className="admin-form-input resize-none"
              placeholder="Details of the announcement…"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              data-ocid="admin.announcements.message.textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="af-type" className="admin-form-label">
                Type
              </label>
              <select
                id="af-type"
                className="admin-form-input"
                value={form.announcementType}
                onChange={(e) =>
                  set("announcementType", e.target.value as AnnouncementType)
                }
                data-ocid="admin.announcements.type.select"
              >
                {Object.entries(TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="af-expires" className="admin-form-label">
                Expires At (optional)
              </label>
              <input
                id="af-expires"
                type="datetime-local"
                className="admin-form-input"
                value={expiresAtLocal}
                onChange={(e) => handleExpiresChange(e.target.value)}
                data-ocid="admin.announcements.expires_at.input"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => set("isActive", e.target.checked)}
                className="w-4 h-4 accent-cyan-400"
                data-ocid="admin.announcements.active.checkbox"
              />
              <span className="text-sm text-muted-foreground">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPinned}
                onChange={(e) => set("isPinned", e.target.checked)}
                className="w-4 h-4 accent-violet-400"
                data-ocid="admin.announcements.pinned.checkbox"
              />
              <span className="text-sm text-muted-foreground">Pin to top</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.announcements.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.announcements.submit_button"
            >
              <Plus className="w-4 h-4" />
              {isSaving ? "Saving…" : initial ? "Save Changes" : "Publish"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AnnouncementRow({
  announcement,
  index,
  onEdit,
  onDelete,
  onToggle,
}: {
  announcement: Announcement;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const typeColor =
    TYPE_COLORS[announcement.announcementType] ??
    TYPE_COLORS[AnnouncementType.info];
  const iconColor =
    TYPE_ICON_COLORS[announcement.announcementType] ??
    TYPE_ICON_COLORS[AnnouncementType.info];

  return (
    <motion.tr
      key={announcement.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="admin-table-row-hover"
      data-ocid={`admin.announcements.item.${index + 1}`}
    >
      <td className="admin-table-td">
        <div className="flex items-center gap-3 max-w-[280px]">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
          >
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-foreground truncate">
                {announcement.title}
              </span>
              {announcement.isPinned && (
                <Pin className="w-3 h-3 text-violet-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {announcement.message}
            </p>
          </div>
        </div>
      </td>
      <td className="admin-table-td">
        <span
          className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide ${typeColor}`}
        >
          {TYPE_LABELS[announcement.announcementType] ??
            announcement.announcementType}
        </span>
      </td>
      <td className="admin-table-td">
        {announcement.isActive ? (
          <span className="admin-badge badge-success text-xs">Active</span>
        ) : (
          <span className="admin-badge text-muted-foreground border border-white/10 text-xs">
            Inactive
          </span>
        )}
      </td>
      <td className="admin-table-td">
        {announcement.isPinned ? (
          <Pin className="w-4 h-4 text-violet-400" />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </td>
      <td className="admin-table-td text-muted-foreground text-xs">
        {announcement.expiresAt ? formatDate(announcement.expiresAt) : "—"}
      </td>
      <td className="admin-table-td text-muted-foreground text-xs">
        {formatDate(announcement.createdAt)}
      </td>
      <td className="admin-table-td">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="admin-action-btn admin-action-btn-edit"
            data-ocid={`admin.announcements.edit_button.${index + 1}`}
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="admin-action-btn admin-action-btn-edit"
            data-ocid={`admin.announcements.toggle_button.${index + 1}`}
          >
            {announcement.isActive ? (
              <>
                <EyeOff className="w-3.5 h-3.5" /> Off
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" /> On
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="admin-action-btn admin-action-btn-delete"
            data-ocid={`admin.announcements.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default function AdminAnnouncements() {
  const { data: announcements = [], isLoading } = useActiveAnnouncements();
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();
  const toggleActive = useToggleAnnouncementActive();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (data: AnnouncementInput) => {
    try {
      if (editing) {
        await updateAnnouncement.mutateAsync({ id: editing.id, input: data });
        toast.success("Announcement updated.");
      } else {
        await createAnnouncement.mutateAsync(data);
        toast.success("Announcement published.");
      }
      setShowForm(false);
      setEditing(undefined);
    } catch {
      toast.error("Failed to save announcement.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteAnnouncement.mutateAsync(deletingId);
      toast.success("Announcement deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleActive.mutateAsync(id);
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div data-ocid="admin.announcements.page">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Announcements
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {announcements.length} announcement
            {announcements.length !== 1 ? "s" : ""} —{" "}
            {announcements.filter((a) => a.isActive).length} active
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.announcements.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.announcements.loading_state"
        >
          {(["s1", "s2", "s3"] as const).map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.announcements.empty_state"
        >
          <Bell className="w-10 h-10 text-cyan-400/40" />
          <p className="text-foreground font-semibold">No announcements yet</p>
          <p className="text-muted-foreground text-sm">
            Publish notices for exams, results, and offers.
          </p>
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow"
            data-ocid="admin.announcements.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Create First Announcement
          </button>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Title</th>
                  <th className="admin-table-th">Type</th>
                  <th className="admin-table-th">Status</th>
                  <th className="admin-table-th">Pinned</th>
                  <th className="admin-table-th">Expires</th>
                  <th className="admin-table-th">Created</th>
                  <th className="admin-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a, i) => (
                  <AnnouncementRow
                    key={a.id}
                    announcement={a}
                    index={i}
                    onEdit={() => {
                      setEditing(a);
                      setShowForm(true);
                    }}
                    onDelete={() => setDeletingId(a.id)}
                    onToggle={() => handleToggle(a.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <AnnouncementForm
            initial={editing}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditing(undefined);
            }}
            isSaving={
              createAnnouncement.isPending || updateAnnouncement.isPending
            }
          />
        )}
      </AnimatePresence>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent
          className="glass-morphism border border-white/10"
          data-ocid="admin.announcements.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Announcement?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This announcement will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.announcements.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.announcements.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
