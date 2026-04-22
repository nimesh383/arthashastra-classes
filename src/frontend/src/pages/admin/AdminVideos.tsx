import type { Video, VideoInput } from "@/backend.d";
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
  useCreateVideo,
  useDeleteVideo,
  useVideos,
} from "@/hooks/useBackend";
import {
  Eye,
  Filter,
  PlayCircle,
  Plus,
  Star,
  Trash2,
  Video as VideoIcon,
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

function VideoForm({
  onSave,
  onClose,
  isSaving,
}: {
  onSave: (data: VideoInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const { data: courses } = useAdminCourses();
  const [form, setForm] = useState<VideoInput>({
    title: "",
    description: "",
    courseId: "",
    thumbnailUrl: "",
    videoUrl: "",
    isPreview: false,
    order: 1n,
  });

  const set = <K extends keyof VideoInput>(k: K, v: VideoInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.courseId) {
      toast.error("Please select a course.");
      return;
    }
    if (!form.videoUrl.trim()) {
      toast.error("Please provide a video URL.");
      return;
    }
    onSave(form);
  };

  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.videos.dialog"
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
              Add Video
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a video tutorial to a course
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
            data-ocid="admin.videos.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="vf-title" className="admin-form-label">
              Title *
            </label>
            <input
              id="vf-title"
              required
              className="admin-form-input"
              placeholder="e.g. Introduction to Accountancy"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="admin.videos.title.input"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="vf-desc" className="admin-form-label">
              Description
            </label>
            <textarea
              id="vf-desc"
              rows={2}
              className="admin-form-input resize-none"
              placeholder="Brief description of this video…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              data-ocid="admin.videos.description.textarea"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="vf-course" className="admin-form-label">
              Course *
            </label>
            <select
              id="vf-course"
              required
              className="admin-form-input"
              value={form.courseId}
              onChange={(e) => set("courseId", e.target.value)}
              data-ocid="admin.videos.course.select"
            >
              <option value="">— Select a course —</option>
              {activeCourses.map((c) => (
                <option key={c.id.toString()} value={c.id.toString()}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-field">
            <label htmlFor="vf-url" className="admin-form-label">
              Video URL *
            </label>
            <input
              id="vf-url"
              required
              className="admin-form-input"
              placeholder="https://www.youtube.com/embed/…"
              value={form.videoUrl}
              onChange={(e) => set("videoUrl", e.target.value)}
              data-ocid="admin.videos.video_url.input"
            />
            <p className="text-xs text-muted-foreground">
              Paste a YouTube embed URL (e.g. https://www.youtube.com/embed/…)
            </p>
          </div>

          <div className="admin-form-field">
            <label htmlFor="vf-thumb" className="admin-form-label">
              Thumbnail URL
            </label>
            <input
              id="vf-thumb"
              className="admin-form-input"
              placeholder="https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg"
              value={form.thumbnailUrl}
              onChange={(e) => set("thumbnailUrl", e.target.value)}
              data-ocid="admin.videos.thumbnail_url.input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="vf-order" className="admin-form-label">
                Order / Position
              </label>
              <input
                id="vf-order"
                type="number"
                min={1}
                className="admin-form-input"
                value={Number(form.order)}
                onChange={(e) =>
                  set("order", BigInt(Math.max(1, Number(e.target.value) || 1)))
                }
                data-ocid="admin.videos.order.input"
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="vf-preview" className="admin-form-label">
                Free Preview
              </label>
              <label
                htmlFor="vf-preview"
                className="flex items-center gap-3 h-10 cursor-pointer"
              >
                <input
                  id="vf-preview"
                  type="checkbox"
                  checked={form.isPreview}
                  onChange={(e) => set("isPreview", e.target.checked)}
                  className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-cyan-400"
                  data-ocid="admin.videos.is_preview.checkbox"
                />
                <span className="text-sm text-muted-foreground">
                  Visible without enrollment
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.videos.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.videos.submit_button"
            >
              <Plus className="w-4 h-4" />
              {isSaving ? "Adding…" : "Add Video"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function VideoThumbnail({ video }: { video: Video }) {
  if (video.thumbnailUrl) {
    return (
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-violet-600/10">
      <PlayCircle className="w-8 h-8 text-cyan-400/60" />
    </div>
  );
}

export default function AdminVideos() {
  const { data: videos, isLoading } = useVideos();
  const { data: courses } = useAdminCourses();
  const createVideo = useCreateVideo();
  const deleteVideo = useDeleteVideo();

  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterCourse, setFilterCourse] = useState<string>("all");

  const courseMap = new Map(
    courses?.map((c) => [c.id.toString(), c.title]) ?? [],
  );
  const activeCourses = courses?.filter((c) => !c.isDeleted) ?? [];

  const allVideos = videos ?? [];
  const filtered =
    filterCourse === "all"
      ? allVideos
      : allVideos.filter((v) => v.courseId === filterCourse);

  const handleSave = async (data: VideoInput) => {
    try {
      await createVideo.mutateAsync(data);
      toast.success("Video added successfully.");
      setShowForm(false);
    } catch {
      toast.error("Failed to add video. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteVideo.mutateAsync(deletingId);
      toast.success("Video deleted.");
    } catch {
      toast.error("Failed to delete video.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div data-ocid="admin.videos.page">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Video Tutorials
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {allVideos.length} video{allVideos.length !== 1 ? "s" : ""}
            {filterCourse !== "all"
              ? ` — ${courseMap.get(filterCourse) ?? "filtered"}`
              : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.videos.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Video
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
            data-ocid="admin.videos.filter.select"
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
              data-ocid="admin.videos.filter.clear_button"
            >
              <X className="w-3.5 h-3.5" /> Clear filter
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="admin.videos.loading_state"
        >
          {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
            <Skeleton key={k} className="h-52 w-full rounded-xl bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.videos.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <VideoIcon className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-base">
              {filterCourse !== "all"
                ? "No videos for this course"
                : "No videos yet"}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {filterCourse !== "all"
                ? "Add video tutorials for this course."
                : "Add YouTube embed links as course video tutorials."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow transition-smooth"
            data-ocid="admin.videos.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Add First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-morphism rounded-xl border border-white/10 overflow-hidden flex flex-col"
              data-ocid={`admin.videos.item.${i + 1}`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video bg-[oklch(0.16_0.07_260)] overflow-hidden">
                <VideoThumbnail video={video} />
                {video.isPreview && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wide">
                    <Star className="w-3 h-3" /> Preview
                  </span>
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white/70 text-[10px] font-medium">
                  #{Number(video.order)}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <p className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                  {video.title}
                </p>
                {video.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                )}
                <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground truncate">
                    {courseMap.get(video.courseId) ??
                      `Course ${video.courseId}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {formatDate(video.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 admin-action-btn admin-action-btn-edit justify-center"
                    data-ocid={`admin.videos.view_button.${i + 1}`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Watch
                  </a>
                  <button
                    type="button"
                    onClick={() => setDeletingId(video.id)}
                    className="flex-1 admin-action-btn admin-action-btn-delete justify-center"
                    data-ocid={`admin.videos.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add video modal */}
      <AnimatePresence>
        {showForm && (
          <VideoForm
            onSave={handleSave}
            onClose={() => setShowForm(false)}
            isSaving={createVideo.isPending}
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
          data-ocid="admin.videos.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Video?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This video will be permanently removed from the platform. Students
              enrolled in this course will lose access to this tutorial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.videos.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.videos.delete.confirm_button"
            >
              Delete Video
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
