import { FileType } from "@/backend";
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
  useAdminCourses,
  useDeleteMaterial,
  useStudyMaterials,
  useUploadMaterial,
} from "@/hooks/useBackend";
import type { MaterialInput } from "@/types";
import {
  ExternalLink,
  FileText,
  Filter,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MaterialForm({
  onSave,
  onClose,
  isSaving,
}: {
  onSave: (data: MaterialInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const { data: courses } = useAdminCourses();
  const [form, setForm] = useState<MaterialInput>({
    title: "",
    description: "",
    fileType: FileType.PDF,
    courseId: 0n,
    fileUrl: "",
    fileSize: undefined,
  });

  const set = <K extends keyof MaterialInput>(k: K, v: MaterialInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.courseId === 0n) {
      toast.error("Please select a course.");
      return;
    }
    if (!form.fileUrl.trim()) {
      toast.error("Please provide a file URL.");
      return;
    }
    onSave(form);
  };

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.materials.dialog"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Upload Material
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a PDF or image file to a course
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
            data-ocid="admin.materials.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="mf-title" className="admin-form-label">
              Title *
            </label>
            <input
              id="mf-title"
              required
              className="admin-form-input"
              placeholder="e.g. Chapter 1 — Introduction Notes"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="admin.materials.title.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="mf-desc" className="admin-form-label">
              Description
            </label>
            <textarea
              id="mf-desc"
              rows={2}
              className="admin-form-input resize-none"
              placeholder="Brief description of this material…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              data-ocid="admin.materials.description.textarea"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="mf-course" className="admin-form-label">
              Course *
            </label>
            <select
              id="mf-course"
              required
              className="admin-form-input"
              value={form.courseId.toString()}
              onChange={(e) => set("courseId", BigInt(e.target.value))}
              data-ocid="admin.materials.course.select"
            >
              <option value="0">— Select a course —</option>
              {activeCourses.map((c) => (
                <option key={c.id.toString()} value={c.id.toString()}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="mf-ftype" className="admin-form-label">
                File Type
              </label>
              <select
                id="mf-ftype"
                className="admin-form-input"
                value={form.fileType}
                onChange={(e) => set("fileType", e.target.value as FileType)}
                data-ocid="admin.materials.file_type.select"
              >
                <option value={FileType.PDF}>PDF</option>
                <option value={FileType.Image}>Image</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="mf-size" className="admin-form-label">
                File Size
              </label>
              <input
                id="mf-size"
                className="admin-form-input"
                placeholder="e.g. 2.4 MB"
                value={form.fileSize ?? ""}
                onChange={(e) => set("fileSize", e.target.value || undefined)}
                data-ocid="admin.materials.file_size.input"
              />
            </div>
          </div>

          <div className="admin-form-field">
            <label htmlFor="mf-url" className="admin-form-label">
              File URL *
            </label>
            <input
              id="mf-url"
              required
              className="admin-form-input"
              placeholder="https://… (paste a direct link to the file)"
              value={form.fileUrl}
              onChange={(e) => set("fileUrl", e.target.value)}
              data-ocid="admin.materials.file_url.input"
            />
            <p className="text-xs text-muted-foreground">
              Paste a publicly accessible URL to the PDF or image file.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.materials.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.materials.submit_button"
            >
              <Upload className="w-4 h-4" />
              {isSaving ? "Uploading…" : "Upload Material"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminMaterials() {
  const { data: materials, isLoading } = useStudyMaterials();
  const uploadMaterial = useUploadMaterial();
  const deleteMaterial = useDeleteMaterial();
  const { data: courses } = useAdminCourses();

  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>("all");

  const courseMap = new Map(
    courses?.map((c) => [c.id.toString(), c.title]) ?? [],
  );

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];

  const active = materials?.filter((m) => !m.isDeleted) ?? [];
  const filtered =
    filterCourse === "all"
      ? active
      : active.filter((m) => m.courseId.toString() === filterCourse);

  const handleSave = async (data: MaterialInput) => {
    try {
      await uploadMaterial.mutateAsync(data);
      toast.success("Material uploaded successfully.");
      setShowForm(false);
    } catch {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMaterial.mutateAsync(deletingId);
      toast.success("Material deleted.");
    } catch {
      toast.error("Failed to delete material.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div data-ocid="admin.materials.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Study Materials
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {active.length} material{active.length !== 1 ? "s" : ""}
            {filterCourse !== "all"
              ? ` — ${courseMap.get(filterCourse) ?? "filtered"}`
              : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.materials.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Upload Material
        </button>
      </div>

      {/* Filter bar */}
      {activeCourses.length > 0 && (
        <div className="mb-5 flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            className="admin-form-input max-w-[280px] py-1.5 text-sm"
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            data-ocid="admin.materials.filter.select"
          >
            <option value="all">All Courses</option>
            {activeCourses.map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.title}
              </option>
            ))}
          </select>
          {filterCourse !== "all" && (
            <button
              type="button"
              onClick={() => setFilterCourse("all")}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth"
              data-ocid="admin.materials.filter.clear_button"
            >
              <X className="w-3.5 h-3.5" /> Clear filter
            </button>
          )}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.materials.loading_state"
        >
          {(["s1", "s2", "s3"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.materials.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-fuchsia-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              {filterCourse !== "all"
                ? "No materials for this course"
                : "No materials yet"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {filterCourse !== "all"
                ? "Upload PDFs or notes for this course."
                : "Upload PDFs and notes bundled with courses."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth"
            data-ocid="admin.materials.empty.upload.button"
          >
            <Upload className="w-4 h-4" /> Upload First Material
          </button>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Title</th>
                  <th className="admin-table-th">Course</th>
                  <th className="admin-table-th">Type</th>
                  <th className="admin-table-th">Size</th>
                  <th className="admin-table-th">Upload Date</th>
                  <th className="admin-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <motion.tr
                    key={m.id.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="admin-table-row-hover"
                    data-ocid={`admin.materials.item.${i + 1}`}
                  >
                    <td className="admin-table-td font-medium">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            m.fileType === FileType.PDF
                              ? "bg-red-500/10"
                              : "bg-blue-500/10"
                          }`}
                        >
                          <FileText
                            className={`w-3.5 h-3.5 ${
                              m.fileType === FileType.PDF
                                ? "text-red-400"
                                : "text-blue-400"
                            }`}
                          />
                        </div>
                        <span className="truncate max-w-[160px]">
                          {m.title}
                        </span>
                      </div>
                    </td>
                    <td className="admin-table-td text-muted-foreground text-sm truncate max-w-[140px]">
                      {courseMap.get(m.courseId.toString()) ??
                        `Course #${m.courseId.toString()}`}
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={`admin-badge text-xs ${
                          m.fileType === FileType.PDF
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {m.fileType}
                      </span>
                    </td>
                    <td className="admin-table-td text-muted-foreground text-sm">
                      {m.fileSize ?? "—"}
                    </td>
                    <td className="admin-table-td text-muted-foreground text-xs">
                      {formatDate(m.uploadedAt)}
                    </td>
                    <td className="admin-table-td">
                      <div className="flex items-center gap-2">
                        <a
                          href={m.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-action-btn admin-action-btn-edit"
                          data-ocid={`admin.materials.view_button.${i + 1}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View
                        </a>
                        <button
                          type="button"
                          onClick={() => setDeletingId(m.id)}
                          className="admin-action-btn admin-action-btn-delete"
                          data-ocid={`admin.materials.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload modal */}
      <AnimatePresence>
        {showForm && (
          <MaterialForm
            onSave={handleSave}
            onClose={() => setShowForm(false)}
            isSaving={uploadMaterial.isPending}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm dialog */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent
          className="glass-morphism border border-white/10"
          data-ocid="admin.materials.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Material?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This material will be permanently removed from the platform.
              Students who purchased this course will lose access to this file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.materials.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.materials.delete.confirm_button"
            >
              Delete Material
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
