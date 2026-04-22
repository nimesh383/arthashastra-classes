import { createActor } from "@/backend";
import type { Video } from "@/backend.d";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyEnrollments, useMyVideosForCourse } from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Lock,
  LogIn,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Preview videos hook ──────────────────────────────────────────────────────
function usePreviewVideos() {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching;
  return useQuery<Video[]>({
    queryKey: ["videos", "preview"],
    queryFn: () => actor!.getPreviewVideos(),
    enabled,
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getGlowForIndex(i: number): "cyan" | "violet" | "magenta" {
  const colors = ["cyan", "violet", "magenta"] as const;
  return colors[i % 3];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function VideoCardSkeleton() {
  return (
    <div className="glass-morphism rounded-xl overflow-hidden flex flex-col">
      <Skeleton className="w-full aspect-video" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}

// ─── Locked video card ─────────────────────────────────────────────────────────
function LockedVideoCard({ index }: { courseId: string; index: number }) {
  const glowColor = getGlowForIndex(index);
  return (
    <AnimatedSection delay={index * 0.08}>
      <GlowCard
        glowColor={glowColor}
        className="overflow-hidden flex flex-col group"
        data-ocid={`tutorials.locked_item.${index + 1}`}
      >
        <div className="relative aspect-video bg-[oklch(0.10_0.05_260)] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-violet-600/15 to-cyan-500/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_oklch(0.55_0.20_270/0.4)]">
              <Lock className="w-5 h-5 text-violet-300" />
            </div>
            <p className="text-xs font-semibold text-foreground/80">
              Enroll to Watch
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-sm text-foreground opacity-60 line-clamp-2">
            Full Course Lecture Series
          </h3>
          <p className="text-xs text-muted-foreground opacity-50 line-clamp-2">
            Enroll in this course to access the complete video library with
            detailed lectures, solved examples and revision sessions.
          </p>
          <Link
            to="/courses"
            className="mt-1 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-smooth"
            data-ocid={`tutorials.enroll_link.${index + 1}`}
          >
            <ChevronRight className="w-3 h-3" />
            Browse Courses
          </Link>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Accessible video card ─────────────────────────────────────────────────────
interface VideoCardProps {
  video: Video;
  index: number;
  onPlay: (video: Video) => void;
}

function VideoCard({ video, index, onPlay }: VideoCardProps) {
  const glowColor = getGlowForIndex(index);

  return (
    <AnimatedSection delay={index * 0.07}>
      <GlowCard
        glowColor={glowColor}
        className="overflow-hidden flex flex-col group"
        data-ocid={`tutorials.video_item.${index + 1}`}
      >
        {/* Thumbnail — button for a11y */}
        <button
          type="button"
          onClick={() => onPlay(video)}
          className="relative aspect-video overflow-hidden w-full cursor-pointer"
          aria-label={`Play ${video.title}`}
        >
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-fuchsia-500/10" />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-[0_0_24px_oklch(0.68_0.24_200/0.5)] group-hover:shadow-[0_0_36px_oklch(0.68_0.24_200/0.8)] group-hover:scale-110 transition-all duration-300">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          {video.isPreview && (
            <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_10px_oklch(0.68_0.24_200/0.5)]">
              Free Preview
            </span>
          )}
        </button>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
          <button
            type="button"
            onClick={() => onPlay(video)}
            className="mt-auto pt-2 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-smooth"
            data-ocid={`tutorials.play_button.${index + 1}`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Watch Now
          </button>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Video modal ───────────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-ocid="tutorials.video_modal.dialog"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-2 z-20 w-9 h-9 rounded-full bg-card border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-smooth shadow-lg"
          aria-label="Close video"
          data-ocid="tutorials.video_modal.close_button"
        >
          <X className="w-4 h-4" />
        </button>
        <VideoPlayer
          videoUrl={video.videoUrl}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl || undefined}
        />
        <div className="mt-3 px-1">
          <h3 className="font-display font-bold text-foreground text-base">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Enrolled course video section ────────────────────────────────────────────
function EnrolledCourseSection({
  courseId,
  onPlay,
}: {
  courseId: string;
  onPlay: (v: Video) => void;
}) {
  const { data: videos = [], isLoading } = useMyVideosForCourse(courseId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {[1, 2, 3].map((k) => (
          <VideoCardSkeleton key={k} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="w-4 h-px bg-cyan-400/50" />
        Course {courseId.slice(-6)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v, i) => (
          <VideoCard key={v.id} video={v} index={i} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function TutorialsPage() {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const { data: previewVideos = [], isLoading: previewLoading } =
    usePreviewVideos();
  const { data: enrollments = [] } = useMyEnrollments();

  // Unique course IDs from preview videos for filter tabs
  const courseIds = useMemo(
    () => Array.from(new Set(previewVideos.map((v) => v.courseId))),
    [previewVideos],
  );

  // Enrolled course IDs (as strings) for unlocked sections
  const enrolledCourseIds = useMemo(
    () => enrollments.map((e) => e.courseId.toString()),
    [enrollments],
  );

  const filteredPreviews = useMemo(() => {
    if (activeFilter === "All") return previewVideos;
    return previewVideos.filter((v) => v.courseId === activeFilter);
  }, [previewVideos, activeFilter]);

  // Locked course IDs = preview course IDs not enrolled
  const lockedCourseIds = useMemo(
    () => courseIds.filter((id) => !enrolledCourseIds.includes(id)),
    [courseIds, enrolledCourseIds],
  );

  return (
    <div className="pt-16 overflow-hidden">
      {/* Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="py-24 relative" data-ocid="tutorials.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {(["v0", "v1", "v2", "v3", "v4", "v5"] as const).map((key, i) => (
            <motion.div
              key={key}
              className="absolute w-1 h-1 rounded-full bg-fuchsia-400/40"
              style={{ left: `${12 + i * 15}%`, top: `${18 + (i % 3) * 26}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 3.2 + i * 0.55,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.45,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-fuchsia-500/20">
              <PlayCircle className="w-3.5 h-3.5" />
              Video Tutorials
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Video <span className="gradient-text-cyan-violet">Tutorials</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Watch free preview lessons from our top-ranked teachers. Enroll in
              a course to unlock the complete video library for your batch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login gate */}
      {!isAuthenticated && (
        <section
          className="pb-4 bg-background"
          data-ocid="tutorials.login_gate"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.05}>
              <div className="glass-morphism border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cyan-500/5 to-violet-600/5 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground text-sm">
                      Login to access your enrolled course videos
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Free previews are available below. Full course videos
                      unlock after enrollment.
                    </p>
                  </div>
                </div>
                <Link to="/login" data-ocid="tutorials.login_gate.login_button">
                  <button
                    type="button"
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_16px_oklch(0.68_0.24_200/0.35)]"
                  >
                    <LogIn className="w-4 h-4" />
                    Login / Sign up
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Course filter tabs — only show when there are multiple courses */}
      {courseIds.length > 1 && (
        <section
          className="py-6 bg-background"
          data-ocid="tutorials.filters.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="relative flex gap-1 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit flex-wrap">
                {["All", ...courseIds].map((id) => {
                  const label =
                    id === "All" ? "All Courses" : `Course ${id.slice(-6)}`;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveFilter(id)}
                      className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-smooth z-10 ${
                        activeFilter === id
                          ? "text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`tutorials.filter_tab.${id === "All" ? "all" : id.slice(-6)}`}
                    >
                      {activeFilter === id && (
                        <motion.div
                          layoutId="tutorial-tab-bg"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_14px_oklch(0.68_0.24_200/0.4)]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Free Preview Videos */}
      <section
        className="py-6 pb-10 bg-background"
        data-ocid="tutorials.preview.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/20 flex items-center justify-center">
                <PlayCircle className="w-4 h-4 text-cyan-400" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground">
                Free Previews
              </h2>
              {!previewLoading && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  {filteredPreviews.length} video
                  {filteredPreviews.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </AnimatedSection>

          {previewLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="tutorials.loading_state"
            >
              {[1, 2, 3, 4, 5, 6].map((k) => (
                <VideoCardSkeleton key={k} />
              ))}
            </div>
          ) : filteredPreviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
              data-ocid="tutorials.preview.empty_state"
            >
              <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No preview videos yet
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon — our teachers are uploading lessons regularly.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPreviews.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  index={i}
                  onPlay={setActiveVideo}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enrolled students — full course videos */}
      {isAuthenticated && enrolledCourseIds.length > 0 && (
        <section
          className="py-8 pb-16 bg-background"
          data-ocid="tutorials.enrolled.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Your Course Videos
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  Enrolled
                </span>
              </div>
            </AnimatedSection>
            {enrolledCourseIds.map((courseId) => (
              <EnrolledCourseSection
                key={courseId}
                courseId={courseId}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
        </section>
      )}

      {/* Locked teaser for non-enrolled visitors */}
      {!isAuthenticated && lockedCourseIds.length > 0 && (
        <section
          className="py-8 pb-24 bg-background"
          data-ocid="tutorials.locked.section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Full Course Videos
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  Enroll to Unlock
                </span>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lockedCourseIds.slice(0, 3).map((courseId, i) => (
                <LockedVideoCard key={courseId} courseId={courseId} index={i} />
              ))}
            </div>
            <AnimatedSection delay={0.3}>
              <div className="mt-10 text-center">
                <Link to="/courses" data-ocid="tutorials.browse_courses_button">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_20px_oklch(0.55_0.20_270/0.35)]"
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse Courses to Unlock Videos
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <div className="pb-24" />
    </div>
  );
}
