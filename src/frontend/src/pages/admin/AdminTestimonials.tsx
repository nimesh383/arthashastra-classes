import type { Testimonial, TestimonialInput } from "@/backend.d";
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
  useCreateTestimonial,
  useDeleteTestimonial,
  useTestimonials,
  useToggleTestimonialVisibility,
  useUpdateTestimonial,
} from "@/hooks/useBackend";
import {
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Quote,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function ratingStars(rating: bigint) {
  return ([1, 2, 3, 4, 5] as const).map((n) => (
    <Star
      key={n}
      className={`w-3 h-3 ${n <= Number(rating) ? "text-cyan-400 fill-current" : "text-white/20"}`}
    />
  ));
}

function TestimonialForm({
  initial,
  onSave,
  onClose,
  isSaving,
}: {
  initial?: Testimonial;
  onSave: (data: TestimonialInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<TestimonialInput>({
    studentName: initial?.studentName ?? "",
    subject: initial?.subject ?? "",
    marks: initial?.marks ?? "",
    text: initial?.text ?? "",
    photoUrl: initial?.photoUrl,
    isVisible: initial?.isVisible ?? true,
    rating: initial?.rating ?? 5n,
    isVideo: initial?.isVideo ?? false,
  });

  const set = <K extends keyof TestimonialInput>(
    k: K,
    v: TestimonialInput[K],
  ) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.text.trim()) {
      toast.error("Name and review text are required.");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.testimonials.dialog"
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
              {initial ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initial
                ? "Update this student review"
                : "Add a new student review"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="admin.testimonials.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="tf-name" className="admin-form-label">
              Student Name *
            </label>
            <input
              id="tf-name"
              required
              className="admin-form-input"
              placeholder="e.g. Priya Sharma"
              value={form.studentName}
              onChange={(e) => set("studentName", e.target.value)}
              data-ocid="admin.testimonials.name.input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="tf-subject" className="admin-form-label">
                Subject
              </label>
              <input
                id="tf-subject"
                className="admin-form-input"
                placeholder="e.g. Accountancy"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                data-ocid="admin.testimonials.subject.input"
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="tf-marks" className="admin-form-label">
                Marks / Score
              </label>
              <input
                id="tf-marks"
                className="admin-form-input"
                placeholder="e.g. 95/100"
                value={form.marks}
                onChange={(e) => set("marks", e.target.value)}
                data-ocid="admin.testimonials.marks.input"
              />
            </div>
          </div>

          <div className="admin-form-field">
            <label htmlFor="tf-text" className="admin-form-label">
              Review Text *
            </label>
            <textarea
              id="tf-text"
              required
              rows={3}
              className="admin-form-input resize-none"
              placeholder="What did this student say about Arthashastra Classes?"
              value={form.text}
              onChange={(e) => set("text", e.target.value)}
              data-ocid="admin.testimonials.text.textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="tf-rating" className="admin-form-label">
                Rating (1–5)
              </label>
              <select
                id="tf-rating"
                className="admin-form-input"
                value={Number(form.rating)}
                onChange={(e) => set("rating", BigInt(e.target.value))}
                data-ocid="admin.testimonials.rating.select"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {"★".repeat(r)} ({r})
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="tf-photo" className="admin-form-label">
                Photo URL (optional)
              </label>
              <input
                id="tf-photo"
                className="admin-form-input"
                placeholder="https://..."
                value={form.photoUrl ?? ""}
                onChange={(e) => set("photoUrl", e.target.value || undefined)}
                data-ocid="admin.testimonials.photo.input"
              />
            </div>
          </div>

          {form.photoUrl && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <img
                src={form.photoUrl}
                alt="Preview"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30 shrink-0"
              />
              <p className="text-xs text-muted-foreground">Photo preview</p>
            </div>
          )}

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="tf-visible"
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) => set("isVisible", e.target.checked)}
                className="w-4 h-4 accent-cyan-400"
                data-ocid="admin.testimonials.visible.checkbox"
              />
              <span className="text-sm text-muted-foreground">
                Visible on website
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="tf-video"
                type="checkbox"
                checked={form.isVideo}
                onChange={(e) => set("isVideo", e.target.checked)}
                className="w-4 h-4 accent-violet-400"
                data-ocid="admin.testimonials.video.checkbox"
              />
              <span className="text-sm text-muted-foreground">
                Video testimonial
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.testimonials.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.testimonials.submit_button"
            >
              <Plus className="w-4 h-4" />
              {isSaving
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Add Testimonial"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  onEdit,
  onDelete,
  onToggle,
}: {
  testimonial: Testimonial;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`glass-morphism rounded-xl border p-5 flex flex-col gap-3 ${testimonial.isVisible ? "border-white/10" : "border-white/5 opacity-60"}`}
      data-ocid={`admin.testimonials.item.${index + 1}`}
    >
      <div className="flex items-start gap-3">
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt={testimonial.studentName}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
            <span className="font-bold text-cyan-400">
              {testimonial.studentName.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-foreground truncate">
              {testimonial.studentName}
            </p>
            {testimonial.isVideo && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                Video
              </span>
            )}
            {!testimonial.isVisible && (
              <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                Hidden
              </span>
            )}
          </div>
          <p className="text-xs text-cyan-400">
            {testimonial.marks} — {testimonial.subject}
          </p>
          <div className="flex gap-0.5 mt-1">
            {ratingStars(testimonial.rating)}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground line-clamp-3">
          {testimonial.text}
        </p>
      </div>

      <div className="flex gap-2 mt-auto pt-1">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 admin-action-btn admin-action-btn-edit justify-center"
          data-ocid={`admin.testimonials.edit_button.${index + 1}`}
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 admin-action-btn admin-action-btn-edit justify-center"
          data-ocid={`admin.testimonials.toggle_button.${index + 1}`}
        >
          {testimonial.isVisible ? (
            <>
              <EyeOff className="w-3.5 h-3.5" /> Hide
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Show
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 admin-action-btn admin-action-btn-delete justify-center"
          data-ocid={`admin.testimonials.delete_button.${index + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const toggleVisibility = useToggleTestimonialVisibility();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (data: TestimonialInput) => {
    try {
      if (editing) {
        await updateTestimonial.mutateAsync({ id: editing.id, input: data });
        toast.success("Testimonial updated.");
      } else {
        await createTestimonial.mutateAsync(data);
        toast.success("Testimonial added.");
      }
      setShowForm(false);
      setEditing(undefined);
    } catch {
      toast.error("Failed to save testimonial.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteTestimonial.mutateAsync(deletingId);
      toast.success("Testimonial deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleVisibility.mutateAsync(id);
      toast.success("Visibility updated.");
    } catch {
      toast.error("Failed to update visibility.");
    }
  };

  return (
    <div data-ocid="admin.testimonials.page">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Testimonials
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {testimonials.length} total —{" "}
            {testimonials.filter((t) => t.isVisible).length} visible
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.testimonials.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="admin.testimonials.loading_state"
        >
          {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
            <Skeleton key={k} className="h-52 rounded-xl bg-white/5" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.testimonials.empty_state"
        >
          <Quote className="w-10 h-10 text-cyan-400/40" />
          <p className="text-foreground font-semibold">No testimonials yet</p>
          <p className="text-muted-foreground text-sm">
            Add student reviews to build social proof.
          </p>
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow"
            data-ocid="admin.testimonials.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Add First Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              index={i}
              onEdit={() => {
                setEditing(t);
                setShowForm(true);
              }}
              onDelete={() => setDeletingId(t.id)}
              onToggle={() => handleToggle(t.id)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <TestimonialForm
            initial={editing}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditing(undefined);
            }}
            isSaving={
              createTestimonial.isPending || updateTestimonial.isPending
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
          data-ocid="admin.testimonials.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Testimonial?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This testimonial will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.testimonials.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.testimonials.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
