import { Level, Subject } from "@/backend";
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
  useCreateCourse,
  useDeleteCourse,
  useTeachers,
  useUpdateCourse,
} from "@/hooks/useBackend";
import type { Course, CourseInput } from "@/types";
import { BookOpen, Image, Pencil, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECTS = Object.values(Subject);
const LEVELS = Object.values(Level);

const SUBJECT_COLORS: Record<string, string> = {
  Accountancy: "badge-primary",
  Economics: "badge-warning",
  BST: "badge-success",
  Maths: "badge-destructive",
  Commerce:
    "admin-badge bg-violet-500/15 text-violet-400 border border-violet-500/30",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CourseForm({
  initial,
  onSave,
  onClose,
  isSaving,
}: {
  initial?: Course;
  onSave: (data: CourseInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const { data: teachers } = useTeachers();
  const [form, setForm] = useState<CourseInput>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    subject: initial?.subject ?? Subject.Commerce,
    level: initial?.level ?? Level.Beginner,
    duration: initial?.duration ?? "",
    price: initial?.price ?? 0n,
    teacherIds: initial?.teacherIds ?? [],
    imageUrl: initial?.imageUrl,
  });

  const set = <K extends keyof CourseInput>(k: K, v: CourseInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.courses.dialog"
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
              {initial ? "Edit Course" : "New Course"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initial
                ? "Update course details below"
                : "Fill in the details to create a new course"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
            data-ocid="admin.courses.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="admin-form-field">
            <label htmlFor="cf-title" className="admin-form-label">
              Title *
            </label>
            <input
              id="cf-title"
              required
              className="admin-form-input"
              placeholder="e.g. Commerce Class 11 Complete Course"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="admin.courses.title.input"
            />
          </div>

          {/* Description */}
          <div className="admin-form-field">
            <label htmlFor="cf-desc" className="admin-form-label">
              Description *
            </label>
            <textarea
              id="cf-desc"
              required
              rows={3}
              className="admin-form-input resize-none"
              placeholder="Describe what students will learn…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              data-ocid="admin.courses.description.textarea"
            />
          </div>

          {/* Subject + Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="cf-subject" className="admin-form-label">
                Subject
              </label>
              <select
                id="cf-subject"
                className="admin-form-input"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value as Subject)}
                data-ocid="admin.courses.subject.select"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="cf-level" className="admin-form-label">
                Level
              </label>
              <select
                id="cf-level"
                className="admin-form-input"
                value={form.level}
                onChange={(e) => set("level", e.target.value as Level)}
                data-ocid="admin.courses.level.select"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="cf-duration" className="admin-form-label">
                Duration
              </label>
              <input
                id="cf-duration"
                className="admin-form-input"
                placeholder="e.g. 6 months"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                data-ocid="admin.courses.duration.input"
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="cf-price" className="admin-form-label">
                Price (ICP e8s)
              </label>
              <input
                id="cf-price"
                type="number"
                min="0"
                className="admin-form-input"
                value={form.price.toString()}
                onChange={(e) => set("price", BigInt(e.target.value || "0"))}
                data-ocid="admin.courses.price.input"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="admin-form-field">
            <label htmlFor="cf-img" className="admin-form-label">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" /> Course Image URL
              </span>
            </label>
            <input
              id="cf-img"
              className="admin-form-input"
              placeholder="https://… (paste an image URL)"
              value={form.imageUrl ?? ""}
              onChange={(e) => set("imageUrl", e.target.value || undefined)}
              data-ocid="admin.courses.image_url.input"
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="preview"
                className="mt-1 h-20 w-full object-cover rounded-lg opacity-80"
              />
            )}
          </div>

          {/* Teacher Assignment */}
          {teachers && teachers.filter((t) => !t.isDeleted).length > 0 && (
            <div className="admin-form-field">
              <p className="admin-form-label">Assign Teachers</p>
              <div className="flex flex-wrap gap-2">
                {teachers
                  .filter((t) => !t.isDeleted)
                  .map((t) => {
                    const selected = form.teacherIds.includes(t.id);
                    return (
                      <button
                        key={t.id.toString()}
                        type="button"
                        onClick={() =>
                          set(
                            "teacherIds",
                            selected
                              ? form.teacherIds.filter((id) => id !== t.id)
                              : [...form.teacherIds, t.id],
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${
                          selected
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                            : "border-white/20 text-muted-foreground hover:border-white/40 hover:text-foreground"
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.courses.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50"
              data-ocid="admin.courses.submit_button"
            >
              {isSaving
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Create Course"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminCourses() {
  const { data: courses, isLoading } = useAdminCourses();
  const { data: teachers } = useTeachers();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const teacherMap = new Map(
    teachers?.map((t) => [t.id.toString(), t.name]) ?? [],
  );

  const handleSave = async (data: CourseInput) => {
    try {
      if (editingCourse) {
        await updateCourse.mutateAsync({ id: editingCourse.id, input: data });
        toast.success("Course updated successfully.");
      } else {
        await createCourse.mutateAsync(data);
        toast.success("Course created successfully.");
      }
      setShowForm(false);
      setEditingCourse(undefined);
    } catch {
      toast.error("Failed to save course. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteCourse.mutateAsync(deletingId);
      toast.success("Course deleted.");
    } catch {
      toast.error("Failed to delete course.");
    } finally {
      setDeletingId(null);
    }
  };

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];

  return (
    <div data-ocid="admin.courses.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Courses
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeCourses.length} active course
            {activeCourses.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingCourse(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.courses.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.courses.loading_state"
        >
          {(["s1", "s2", "s3", "s4"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : activeCourses.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.courses.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              No courses yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Create your first course to get started.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingCourse(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth"
            data-ocid="admin.courses.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Add First Course
          </button>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Title</th>
                  <th className="admin-table-th">Subject</th>
                  <th className="admin-table-th">Level</th>
                  <th className="admin-table-th">Duration</th>
                  <th className="admin-table-th">Teachers</th>
                  <th className="admin-table-th text-right">Price (e8s)</th>
                  <th className="admin-table-th">Created</th>
                  <th className="admin-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeCourses.map((c, i) => (
                  <motion.tr
                    key={c.id.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="admin-table-row-hover"
                    data-ocid={`admin.courses.item.${i + 1}`}
                  >
                    <td className="admin-table-td font-medium max-w-[180px]">
                      <div className="flex items-center gap-2.5">
                        {c.imageUrl ? (
                          <img
                            src={c.imageUrl}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                        )}
                        <span className="truncate">{c.title}</span>
                      </div>
                    </td>
                    <td className="admin-table-td">
                      <span
                        className={`admin-badge text-xs ${SUBJECT_COLORS[c.subject] ?? "badge-primary"}`}
                      >
                        {c.subject}
                      </span>
                    </td>
                    <td className="admin-table-td">
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-white/5">
                        {c.level}
                      </span>
                    </td>
                    <td className="admin-table-td text-muted-foreground text-sm">
                      {c.duration || "—"}
                    </td>
                    <td className="admin-table-td max-w-[120px]">
                      {c.teacherIds.length === 0 ? (
                        <span className="text-muted-foreground text-xs">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {c.teacherIds.slice(0, 2).map((tid) => (
                            <span
                              key={tid.toString()}
                              className="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full truncate max-w-[80px]"
                            >
                              {teacherMap.get(tid.toString()) ??
                                `T#${tid.toString()}`}
                            </span>
                          ))}
                          {c.teacherIds.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{c.teacherIds.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="admin-table-td text-right font-mono text-sm">
                      ₹{Number(c.price).toLocaleString("en-IN")}
                    </td>
                    <td className="admin-table-td text-muted-foreground text-xs">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="admin-table-td">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCourse(c);
                            setShowForm(true);
                          }}
                          className="admin-action-btn admin-action-btn-edit"
                          data-ocid={`admin.courses.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(c.id)}
                          className="admin-action-btn admin-action-btn-delete"
                          data-ocid={`admin.courses.delete_button.${i + 1}`}
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

      {/* Course create/edit modal */}
      <AnimatePresence>
        {showForm && (
          <CourseForm
            initial={editingCourse}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditingCourse(undefined);
            }}
            isSaving={createCourse.isPending || updateCourse.isPending}
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
          data-ocid="admin.courses.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Course?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will soft-delete the course. Students who purchased it will
              retain access. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.courses.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.courses.delete.confirm_button"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
