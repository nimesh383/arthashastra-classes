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
  useCreateTeacher,
  useDeleteTeacher,
  useTeachers,
  useUpdateTeacher,
} from "@/hooks/useBackend";
import type { Teacher, TeacherInput } from "@/types";
import { GraduationCap, Image, Pencil, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function TeacherForm({
  initial,
  onSave,
  onClose,
  isSaving,
}: {
  initial?: Teacher;
  onSave: (data: TeacherInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<TeacherInput>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    specialization: initial?.specialization ?? "",
    profilePhotoUrl: initial?.profilePhotoUrl,
  });

  const set = (k: keyof TeacherInput, v: string | undefined) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.teachers.dialog"
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
              {initial ? "Edit Teacher" : "New Teacher"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initial ? "Update faculty details" : "Add a new faculty member"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
            data-ocid="admin.teachers.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar preview */}
        {form.profilePhotoUrl && (
          <div className="mb-5 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <img
              src={form.profilePhotoUrl}
              alt="Profile preview"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/40"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {form.name || "Teacher"}
              </p>
              <p className="text-xs text-muted-foreground">Profile photo set</p>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="tf-name" className="admin-form-label">
              Full Name *
            </label>
            <input
              id="tf-name"
              required
              className="admin-form-input"
              placeholder="e.g. Dr. Ajay Govindani"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              data-ocid="admin.teachers.name.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="tf-email" className="admin-form-label">
              Email *
            </label>
            <input
              id="tf-email"
              required
              type="email"
              className="admin-form-input"
              placeholder="teacher@arthashastra.in"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              data-ocid="admin.teachers.email.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="tf-spec" className="admin-form-label">
              Specialization *
            </label>
            <input
              id="tf-spec"
              required
              className="admin-form-input"
              placeholder="e.g. Accountancy & Economics"
              value={form.specialization}
              onChange={(e) => set("specialization", e.target.value)}
              data-ocid="admin.teachers.specialization.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="tf-photo" className="admin-form-label">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" /> Profile Photo URL (optional)
              </span>
            </label>
            <input
              id="tf-photo"
              className="admin-form-input"
              placeholder="https://… (paste an image URL)"
              value={form.profilePhotoUrl ?? ""}
              onChange={(e) =>
                set("profilePhotoUrl", e.target.value || undefined)
              }
              data-ocid="admin.teachers.photo_url.input"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.teachers.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50"
              data-ocid="admin.teachers.submit_button"
            >
              {isSaving ? "Saving…" : initial ? "Save Changes" : "Add Teacher"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminTeachers() {
  const { data: teachers, isLoading } = useTeachers();
  const { data: courses } = useAdminCourses();
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Teacher | undefined>();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  // Count how many courses each teacher is assigned to
  const teacherCourseCount = new Map<string, number>();
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

  const handleSave = async (data: TeacherInput) => {
    try {
      if (editing) {
        await updateTeacher.mutateAsync({ id: editing.id, input: data });
        toast.success("Teacher updated successfully.");
      } else {
        await createTeacher.mutateAsync(data);
        toast.success("Teacher added successfully.");
      }
      setShowForm(false);
      setEditing(undefined);
    } catch {
      toast.error("Failed to save teacher. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteTeacher.mutateAsync(deletingId);
      toast.success("Teacher removed.");
    } catch {
      toast.error("Failed to remove teacher.");
    } finally {
      setDeletingId(null);
    }
  };

  const active = teachers?.filter((t) => !t.isDeleted) ?? [];

  return (
    <div data-ocid="admin.teachers.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Teachers
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {active.length} faculty member{active.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.teachers.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="admin.teachers.loading_state"
        >
          {(["s1", "s2", "s3"] as const).map((k) => (
            <Skeleton key={k} className="h-40 w-full rounded-xl bg-white/5" />
          ))}
        </div>
      ) : active.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.teachers.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              No teachers yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Add faculty members to assign them to courses.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-bold shadow-glow transition-smooth"
            data-ocid="admin.teachers.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Add First Teacher
          </button>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Teacher</th>
                  <th className="admin-table-th">Email</th>
                  <th className="admin-table-th">Specialization</th>
                  <th className="admin-table-th text-right">Courses</th>
                  <th className="admin-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {active.map((t, i) => {
                  const courseCount =
                    teacherCourseCount.get(t.id.toString()) ?? 0;
                  return (
                    <motion.tr
                      key={t.id.toString()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="admin-table-row-hover"
                      data-ocid={`admin.teachers.item.${i + 1}`}
                    >
                      <td className="admin-table-td">
                        <div className="flex items-center gap-3">
                          {t.profilePhotoUrl ? (
                            <img
                              src={t.profilePhotoUrl}
                              alt={t.name}
                              className="w-9 h-9 rounded-lg object-cover ring-2 ring-white/10 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-foreground font-bold text-sm shrink-0">
                              {t.name[0]?.toUpperCase()}
                            </div>
                          )}
                          <span className="font-medium text-foreground truncate max-w-[120px]">
                            {t.name}
                          </span>
                        </div>
                      </td>
                      <td className="admin-table-td text-muted-foreground text-sm truncate max-w-[160px]">
                        {t.email}
                      </td>
                      <td className="admin-table-td">
                        <span className="admin-badge badge-warning text-xs">
                          {t.specialization}
                        </span>
                      </td>
                      <td className="admin-table-td text-right">
                        <span
                          className={`admin-badge text-xs ${courseCount > 0 ? "badge-success" : "text-muted-foreground border border-white/10"}`}
                        >
                          {courseCount}
                        </span>
                      </td>
                      <td className="admin-table-td">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditing(t);
                              setShowForm(true);
                            }}
                            className="admin-action-btn admin-action-btn-edit"
                            data-ocid={`admin.teachers.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingId(t.id)}
                            className="admin-action-btn admin-action-btn-delete"
                            data-ocid={`admin.teachers.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit modal */}
      <AnimatePresence>
        {showForm && (
          <TeacherForm
            initial={editing}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditing(undefined);
            }}
            isSaving={createTeacher.isPending || updateTeacher.isPending}
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
          data-ocid="admin.teachers.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Remove Teacher?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This teacher will be removed from the platform and unassigned from
              all courses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.teachers.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.teachers.delete.confirm_button"
            >
              Remove Teacher
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
