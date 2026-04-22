import type { GalleryImage, GalleryImageInput } from "@/backend.d";
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
  useCreateGalleryImage,
  useDeleteGalleryImage,
  useGalleryImages,
  useToggleGalleryImageVisibility,
} from "@/hooks/useBackend";
import { GalleryCategory } from "@/types";
import {
  Eye,
  EyeOff,
  Filter,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS = [
  { value: GalleryCategory.classroom, label: "Classroom" },
  { value: GalleryCategory.events, label: "Events" },
  { value: GalleryCategory.results, label: "Results" },
  { value: GalleryCategory.team, label: "Team" },
];

function GalleryForm({
  onSave,
  onClose,
  isSaving,
}: {
  onSave: (data: GalleryImageInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<GalleryImageInput>({
    title: "",
    imageUrl: "",
    category: GalleryCategory.classroom,
    isVisible: true,
    description: undefined,
  });

  const set = <K extends keyof GalleryImageInput>(
    k: K,
    v: GalleryImageInput[K],
  ) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) {
      toast.error("Image URL is required.");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.gallery.dialog"
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
              Add Gallery Image
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Upload a photo to the gallery
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="admin.gallery.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="gf-url" className="admin-form-label">
              Image URL *
            </label>
            <input
              id="gf-url"
              required
              className="admin-form-input"
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => set("imageUrl", e.target.value)}
              data-ocid="admin.gallery.image_url.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="gf-title" className="admin-form-label">
              Title
            </label>
            <input
              id="gf-title"
              className="admin-form-input"
              placeholder="e.g. Classroom session — Batch 2024"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="admin.gallery.title.input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="gf-category" className="admin-form-label">
                Category
              </label>
              <select
                id="gf-category"
                className="admin-form-input"
                value={form.category}
                onChange={(e) =>
                  set("category", e.target.value as GalleryCategory)
                }
                data-ocid="admin.gallery.category.select"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="gf-desc" className="admin-form-label">
                Caption (optional)
              </label>
              <input
                id="gf-desc"
                className="admin-form-input"
                placeholder="Short caption…"
                value={form.description ?? ""}
                onChange={(e) =>
                  set("description", e.target.value || undefined)
                }
                data-ocid="admin.gallery.description.input"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="gf-visible"
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => set("isVisible", e.target.checked)}
              className="w-4 h-4 accent-cyan-400"
              data-ocid="admin.gallery.visible.checkbox"
            />
            <label
              htmlFor="gf-visible"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Visible on website
            </label>
          </div>

          {form.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-white/10 h-32 bg-black/20">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.gallery.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.gallery.submit_button"
            >
              <Plus className="w-4 h-4" />
              {isSaving ? "Adding…" : "Add Image"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function GalleryCard({
  image,
  index,
  onDelete,
  onToggle,
}: {
  image: GalleryImage;
  index: number;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      className={`glass-morphism rounded-xl border overflow-hidden flex flex-col ${image.isVisible ? "border-white/10" : "border-white/5 opacity-60"}`}
      data-ocid={`admin.gallery.item.${index + 1}`}
    >
      <div className="relative aspect-video bg-[oklch(0.16_0.07_260)] overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/70 font-medium capitalize">
            {CATEGORY_OPTIONS.find((o) => o.value === image.category)?.label ??
              image.category}
          </span>
          {!image.isVisible && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 font-medium">
              Hidden
            </span>
          )}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {image.title && (
          <p className="text-sm font-semibold text-foreground line-clamp-1">
            {image.title}
          </p>
        )}
        {image.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {image.description}
          </p>
        )}
        <div className="flex gap-2 mt-auto">
          <button
            type="button"
            onClick={onToggle}
            className="flex-1 admin-action-btn admin-action-btn-edit justify-center"
            data-ocid={`admin.gallery.toggle_button.${index + 1}`}
          >
            {image.isVisible ? (
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
            data-ocid={`admin.gallery.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminGallery() {
  const [filterCategory, setFilterCategory] = useState<GalleryCategory | null>(
    null,
  );
  const { data: images = [], isLoading } = useGalleryImages(filterCategory);
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const toggleVisibility = useToggleGalleryImageVisibility();

  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (data: GalleryImageInput) => {
    try {
      await createImage.mutateAsync(data);
      toast.success("Image added to gallery.");
      setShowForm(false);
    } catch {
      toast.error("Failed to add image.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteImage.mutateAsync(deletingId);
      toast.success("Image deleted.");
    } catch {
      toast.error("Failed to delete image.");
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
    <div data-ocid="admin.gallery.page">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Gallery
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.gallery.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        <button
          type="button"
          onClick={() => setFilterCategory(null)}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${filterCategory === null ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground"}`}
          data-ocid="admin.gallery.filter.all"
        >
          All
        </button>
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilterCategory(opt.value)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${filterCategory === opt.value ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground"}`}
            data-ocid={`admin.gallery.filter.${opt.value}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="admin.gallery.loading_state"
        >
          {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map(
            (k) => (
              <Skeleton key={k} className="h-48 rounded-xl bg-white/5" />
            ),
          )}
        </div>
      ) : images.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.gallery.empty_state"
        >
          <ImageIcon className="w-10 h-10 text-cyan-400/40" />
          <p className="text-foreground font-semibold">No images yet</p>
          <p className="text-muted-foreground text-sm">
            Add photos from classrooms, events, and results.
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow"
            data-ocid="admin.gallery.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <GalleryCard
              key={img.id}
              image={img}
              index={i}
              onDelete={() => setDeletingId(img.id)}
              onToggle={() => handleToggle(img.id)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <GalleryForm
            onSave={handleSave}
            onClose={() => setShowForm(false)}
            isSaving={createImage.isPending}
          />
        )}
      </AnimatePresence>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent
          className="glass-morphism border border-white/10"
          data-ocid="admin.gallery.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Image?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This image will be permanently removed from the gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.gallery.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.gallery.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
