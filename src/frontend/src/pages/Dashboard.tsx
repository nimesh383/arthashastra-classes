import { createActor } from "@/backend";
import type { Video } from "@/backend.d";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import GlowCard from "@/components/ui/GlowCard";
import VideoPlayer from "@/components/ui/VideoPlayer";
import {
  useAvailableCourses,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMyEnrollments,
  useMyMaterials,
  useMyNotifications,
  useMyResults,
  useMyVideosForCourse,
  useStudentProfile,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type {
  Course,
  Enrollment,
  Notification,
  StudyMaterial,
  TestResult,
} from "@/types";
import { EnrollmentStatus, FileType, NotificationType } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Copy,
  CreditCard,
  Download,
  FileText,
  ImageIcon,
  Info,
  Lightbulb,
  LogOut,
  Megaphone,
  Pencil,
  Play,
  Trophy,
  User,
  Video as VideoIcon,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/30",
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
  },
};

// ─── Inline Profile Edit Form ─────────────────────────────────────────────────
interface ProfileEditFormProps {
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  onClose: () => void;
}

function ProfileEditForm({
  initialName,
  initialEmail,
  initialPhone,
  onClose,
}: ProfileEditFormProps) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      await actor.updateStudentProfile({ name, email, phone });
      qc.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated!");
      onClose();
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="mt-4 flex flex-col gap-3"
      data-ocid="dashboard.profile_edit.form"
    >
      <div>
        <label
          htmlFor="profile-name"
          className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block"
        >
          Name
        </label>
        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth"
          data-ocid="dashboard.profile_name.input"
          required
        />
      </div>
      <div>
        <label
          htmlFor="profile-email"
          className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block"
        >
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth"
          data-ocid="dashboard.profile_email.input"
        />
      </div>
      <div>
        <label
          htmlFor="profile-phone"
          className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block"
        >
          Phone
        </label>
        <input
          id="profile-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth"
          data-ocid="dashboard.profile_phone.input"
        />
      </div>
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-xs hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth disabled:opacity-60"
          data-ocid="dashboard.profile_edit.save_button"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground text-xs font-medium hover:text-foreground transition-smooth"
          data-ocid="dashboard.profile_edit.cancel_button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Material item ────────────────────────────────────────────────────────────
interface MaterialItemProps {
  material: StudyMaterial;
  index: number;
}

function MaterialItem({ material, index }: MaterialItemProps) {
  const isPDF = material.fileType === FileType.PDF;
  const isImage = material.fileType === FileType.Image;

  const handleDownload = () => {
    if (isPDF) {
      window.open(material.fileUrl, "_blank", "noopener");
    }
  };

  return (
    <div
      className="glass-morphism rounded-xl border border-white/10 p-4 flex items-start gap-3 group"
      onContextMenu={(e) => e.preventDefault()}
      data-ocid={`dashboard.material.item.${index + 1}`}
    >
      {isImage ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 select-none">
          <img
            src={material.fileUrl}
            alt={material.title}
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="text-[5px] font-black text-foreground rotate-[-30deg] tracking-widest uppercase"
              style={{ opacity: 0.2, userSelect: "none", whiteSpace: "nowrap" }}
            >
              ARTHASHASTRA CLASSES
            </span>
          </div>
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-cyan-400" />
        </div>
      )}

      <div className="flex-1 min-w-0" style={{ userSelect: "none" }}>
        <p className="text-sm font-semibold text-foreground truncate">
          {material.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              isImage
                ? "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20"
                : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
            }`}
          >
            {isImage ? "Image" : "PDF"}
          </span>
          {material.fileSize && (
            <span className="text-[10px] text-muted-foreground">
              {material.fileSize}
            </span>
          )}
        </div>
      </div>

      {isPDF && (
        <button
          type="button"
          onClick={handleDownload}
          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-smooth"
          aria-label={`Download ${material.title}`}
          data-ocid={`dashboard.material.download.button.${index + 1}`}
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      )}
      {isImage && (
        <div className="shrink-0">
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

// ─── Course card ──────────────────────────────────────────────────────────────
interface CourseCardProps {
  enrollment: Enrollment;
  course: Course | undefined;
  index: number;
}

function CourseCard({ enrollment, course, index }: CourseCardProps) {
  if (!course) return null;
  const isCompleted = enrollment.status === EnrollmentStatus.Completed;

  return (
    <GlowCard className="p-5" data-ocid={`dashboard.courses.item.${index + 1}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide mb-1">
            {course.subject}
          </p>
          <h3 className="font-semibold text-foreground truncate">
            {course.title}
          </h3>
          {course.instructor && (
            <p className="text-xs text-muted-foreground mt-0.5">
              by {course.instructor}
            </p>
          )}
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
            isCompleted
              ? "text-teal-400 bg-teal-500/10 border border-teal-500/30"
              : "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
          }`}
        >
          {isCompleted ? "Completed" : "Enrolled"}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {course.description}
      </p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Progress
          </span>
          <span className="text-[10px] font-bold text-cyan-400">
            {isCompleted ? "100%" : "68%"}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
            initial={{ width: "0%" }}
            animate={{ width: isCompleted ? "100%" : "68%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-white/10">
        <Link
          to="/study-materials"
          className="flex-1 text-center py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-xs hover:bg-cyan-500/20 transition-smooth"
          data-ocid={`dashboard.courses.view_materials.button.${index + 1}`}
        >
          View Materials
        </Link>
        <Link
          to="/courses/$id"
          params={{ id: course.id.toString() }}
          className="flex-1 text-center py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground font-medium text-xs hover:text-foreground hover:border-white/20 transition-smooth"
          data-ocid={`dashboard.courses.detail.link.${index + 1}`}
        >
          Course Details <ChevronRight className="w-3 h-3 inline ml-0.5" />
        </Link>
      </div>
    </GlowCard>
  );
}

// ─── Tutorial video card ──────────────────────────────────────────────────────
interface TutorialVideoCardProps {
  video: Video;
  index: number;
  onPlay: (video: Video) => void;
}

function TutorialVideoCard({ video, index, onPlay }: TutorialVideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className="group text-left glass-morphism rounded-xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-smooth"
      data-ocid={`dashboard.tutorials.item.${index + 1}`}
    >
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-violet-600/10 flex items-center justify-center">
            <VideoIcon className="w-8 h-8 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-smooth">
          <div className="w-10 h-10 rounded-full bg-cyan-500/80 group-hover:bg-cyan-500 flex items-center justify-center shadow-glow transition-smooth">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {video.isPreview && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/80 text-white uppercase tracking-wide">
            Free Preview
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
          {video.title}
        </p>
        {video.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {video.description}
          </p>
        )}
      </div>
    </button>
  );
}

// ─── Per-course tutorials row ─────────────────────────────────────────────────
interface CourseTutorialRowProps {
  courseId: string;
  courseTitle: string;
}

function CourseTutorialRow({ courseId, courseTitle }: CourseTutorialRowProps) {
  const { data: videos = [], isLoading } = useMyVideosForCourse(courseId);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  if (isLoading) {
    return (
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
          {courseTitle}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="glass-morphism rounded-xl border border-white/10 aspect-video animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
          {courseTitle}
        </p>
        <div
          className="glass-morphism rounded-xl border border-white/10 p-6 text-center"
          data-ocid="dashboard.tutorials.empty_state"
        >
          <VideoIcon className="w-7 h-7 text-muted-foreground mx-auto mb-2 opacity-40" />
          <p className="text-sm text-muted-foreground">
            No tutorials available yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
        {courseTitle}
      </p>
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className="mb-4"
          data-ocid="dashboard.tutorials.player"
        >
          <VideoPlayer
            videoUrl={activeVideo.videoUrl}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
          />
          <div className="mt-2 px-1">
            <p className="text-sm font-semibold text-foreground">
              {activeVideo.title}
            </p>
            {activeVideo.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeVideo.description}
              </p>
            )}
          </div>
        </motion.div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {videos.map((v, i) => (
          <TutorialVideoCard
            key={v.id}
            video={v}
            index={i}
            onPlay={setActiveVideo}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Attendance Ring ──────────────────────────────────────────────────────────
function AttendanceRing({ percentage = 78 }: { percentage?: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <GlowCard
      glowColor="cyan"
      className="p-5"
      data-ocid="dashboard.attendance.card"
    >
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
        Attendance
      </p>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            className="-rotate-90"
            role="img"
            aria-hidden="true"
          >
            <circle
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="10"
              stroke="oklch(0.68 0.24 200 / 0.12)"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              strokeWidth="10"
              fill="none"
              stroke="url(#attendanceGrad)"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient
                id="attendanceGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="oklch(0.68 0.24 200)" />
                <stop offset="100%" stopColor="oklch(0.55 0.2 270)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-extrabold gradient-text-cyan-violet">
              {percentage}%
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Present
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {[
            { label: "Classes Attended", value: "47", color: "text-cyan-400" },
            {
              label: "Total Classes",
              value: "60",
              color: "text-muted-foreground",
            },
            { label: "This Month", value: "12/15", color: "text-violet-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {item.label}
              </span>
              <span className={`text-xs font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
          <div className="mt-1 pt-2 border-t border-white/10">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${percentage >= 75 ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}
            >
              {percentage >= 75 ? "✓ Eligible" : "⚠ Low Attendance"}
            </span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

// ─── Daily Study Tracker ──────────────────────────────────────────────────────
const STUDY_DAYS = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 1.0 },
];
const MAX_HOURS = 4;

function DailyStudyTracker() {
  return (
    <GlowCard
      glowColor="violet"
      className="p-5"
      data-ocid="dashboard.study_tracker.card"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Daily Study Tracker
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Track your daily progress
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold">
          Coming Soon
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-24">
        {STUDY_DAYS.map((d, i) => {
          const heightPct = (d.hours / MAX_HOURS) * 100;
          return (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full rounded-t-lg overflow-hidden bg-white/5 flex items-end"
                style={{ height: "80px" }}
              >
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.68 0.24 200), oklch(0.55 0.2 270))",
                  }}
                  initial={{ height: "0%" }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground font-medium">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          Avg: <span className="text-cyan-400 font-semibold">2.5h/day</span>
        </span>
        <span className="text-[10px] text-muted-foreground">
          Goal: <span className="text-violet-400 font-semibold">4h/day</span>
        </span>
      </div>
    </GlowCard>
  );
}

// ─── AI Recommendations ───────────────────────────────────────────────────────
const AI_RECS = [
  {
    topic: "Financial Statement Analysis",
    subject: "Accountancy",
    reason: "Based on enrolled course",
  },
  {
    topic: "Demand & Supply Elasticity",
    subject: "Economics",
    reason: "Trending in your batch",
  },
  {
    topic: "Partnership Accounts",
    subject: "Accountancy",
    reason: "Upcoming in curriculum",
  },
  {
    topic: "Business Environment",
    subject: "BST",
    reason: "Recommended by faculty",
  },
];

function AIRecommendations() {
  return (
    <GlowCard
      glowColor="magenta"
      className="p-5"
      data-ocid="dashboard.ai_recommendations.card"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 text-fuchsia-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">
            AI Study Recommendations
          </p>
          <p className="text-[10px] text-muted-foreground">
            Personalised for you
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        {AI_RECS.map((rec, i) => (
          <motion.div
            key={rec.topic}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-fuchsia-500/20 transition-smooth"
            data-ocid={`dashboard.ai_rec.item.${i + 1}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 mt-1.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {rec.topic}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {rec.subject} · {rec.reason}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <Link
        to="/study-materials"
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-semibold text-xs hover:bg-fuchsia-500/20 transition-smooth"
        data-ocid="dashboard.ai_rec.view_all.link"
      >
        View All Recommendations <ChevronRight className="w-3 h-3" />
      </Link>
    </GlowCard>
  );
}

// ─── Leaderboard Widget ───────────────────────────────────────────────────────
const MOCK_LEADERS = [
  { rank: 1, name: "Priya Sharma", score: 94, color: "text-amber-400" },
  { rank: 2, name: "Rohit Verma", score: 91, color: "text-slate-300" },
  { rank: 3, name: "Ananya Singh", score: 88, color: "text-amber-600" },
  { rank: 4, name: "Karan Patel", score: 85, color: "text-muted-foreground" },
  { rank: 5, name: "Shreya Joshi", score: 82, color: "text-muted-foreground" },
];

function LeaderboardWidget() {
  return (
    <GlowCard
      glowColor="cyan"
      className="p-5"
      data-ocid="dashboard.leaderboard.card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-cyan-400" />
        <p className="font-bold text-foreground text-sm">Class Leaderboard</p>
      </div>
      <div className="flex flex-col gap-1.5">
        {MOCK_LEADERS.map((leader, i) => (
          <motion.div
            key={leader.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 py-2 px-2.5 rounded-lg bg-white/5 border border-white/5"
            data-ocid={`dashboard.leaderboard.item.${i + 1}`}
          >
            <span
              className={`text-sm font-extrabold w-5 text-center ${leader.color}`}
            >
              {leader.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {leader.name}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="h-1.5 w-16 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${leader.score}%` }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                />
              </div>
              <span className="text-xs font-bold text-cyan-400 w-8 text-right">
                {leader.score}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-3">
        Based on recent test performance
      </p>
    </GlowCard>
  );
}

// ─── Test Results Summary ─────────────────────────────────────────────────────
function getGradeColor(grade: string): string {
  if (grade.startsWith("A"))
    return "text-teal-400 bg-teal-500/10 border-teal-500/20";
  if (grade.startsWith("B"))
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  if (grade.startsWith("C"))
    return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
}

function TestResultsSummary({ results }: { results: TestResult[] }) {
  const recent = results.slice(0, 3);

  return (
    <GlowCard
      glowColor="violet"
      className="p-5"
      data-ocid="dashboard.test_results.card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-violet-400" />
        <p className="font-bold text-foreground text-sm">Recent Test Results</p>
      </div>
      {recent.length === 0 ? (
        <div
          className="text-center py-4"
          data-ocid="dashboard.test_results.empty_state"
        >
          <Award className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" />
          <p className="text-xs text-muted-foreground">No tests taken yet</p>
          <Link
            to="/tests"
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-smooth mt-1 inline-block"
            data-ocid="dashboard.test_results.browse.link"
          >
            Browse Tests →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {recent.map((r, i) => (
            <div
              key={r.id.toString()}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5"
              data-ocid={`dashboard.test_results.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  Test #{r.testId.toString()}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {formatDate(r.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-cyan-400">
                  {r.percentage.toFixed(0)}%
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getGradeColor(r.grade)}`}
                >
                  {r.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        to="/tests"
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg mt-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold text-xs hover:bg-violet-500/20 transition-smooth"
        data-ocid="dashboard.test_results.view_all.link"
      >
        View All Tests <ChevronRight className="w-3 h-3" />
      </Link>
    </GlowCard>
  );
}

// ─── Payment History ─────────────────────────────────────────────────────────
function PaymentHistoryPanel({ enrollments }: { enrollments: Enrollment[] }) {
  const paid = enrollments.filter(
    (e) =>
      e.status !== EnrollmentStatus.Pending &&
      e.status !== EnrollmentStatus.Refunded,
  );

  return (
    <GlowCard
      glowColor="cyan"
      className="p-5"
      data-ocid="dashboard.payment_history.card"
    >
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-4 h-4 text-cyan-400" />
        <p className="font-bold text-foreground text-sm">Payment History</p>
      </div>
      {paid.length === 0 ? (
        <div
          className="text-center py-4"
          data-ocid="dashboard.payment_history.empty_state"
        >
          <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" />
          <p className="text-xs text-muted-foreground">No payments yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {paid.slice(0, 4).map((e, i) => (
            <div
              key={e.id.toString()}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5"
              data-ocid={`dashboard.payment_history.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  Course #{e.courseId.toString()}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {formatDate(e.purchasedAt)} ·{" "}
                  {e.paymentId ? `ID: ${e.paymentId.slice(0, 8)}…` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-teal-400">
                  {(Number(e.amountPaid) / 1e8).toFixed(2)} ICP
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold">
                  Paid
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlowCard>
  );
}

// ─── Notification helpers ─────────────────────────────────────────────────────

function NotificationIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case NotificationType.enrollment:
      return <CheckCircle className="w-4 h-4 text-cyan-400" />;
    case NotificationType.payment:
      return <CreditCard className="w-4 h-4 text-violet-400" />;
    case NotificationType.announcement:
      return <Megaphone className="w-4 h-4 text-fuchsia-400" />;
    default:
      return <Info className="w-4 h-4 text-muted-foreground" />;
  }
}

function getNotificationBadge(type: NotificationType) {
  switch (type) {
    case NotificationType.enrollment:
      return {
        label: "Enrollment",
        cls: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      };
    case NotificationType.payment:
      return {
        label: "Payment",
        cls: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      };
    case NotificationType.announcement:
      return {
        label: "Announcement",
        cls: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
      };
    default:
      return {
        label: "General",
        cls: "bg-white/5 text-muted-foreground border-white/10",
      };
  }
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  isMarkingAll: boolean;
}

function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  isMarkingAll,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Group by type
  const grouped = notifications
    .slice(0, 8)
    .reduce<Record<string, Notification[]>>((acc, n) => {
      const key = n.notificationType as string;
      if (!acc[key]) acc[key] = [];
      acc[key].push(n);
      return acc;
    }, {});

  return (
    <AnimatedSection delay={0.08}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          Notifications
          {unreadCount > 0 && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-white min-w-[20px] text-center"
              data-ocid="dashboard.notifications.badge"
            >
              {unreadCount}
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            disabled={isMarkingAll}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-smooth disabled:opacity-50 font-medium"
            data-ocid="dashboard.notifications.mark_all_read_button"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-8 text-center"
          data-ocid="dashboard.notifications.empty_state"
        >
          <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
          <p className="text-sm text-muted-foreground">No notifications yet</p>
        </div>
      ) : (
        <div
          className="flex flex-col gap-3"
          data-ocid="dashboard.notifications.list"
        >
          {Object.entries(grouped).map(([type, items]) => {
            const badge = getNotificationBadge(type as NotificationType);
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.cls}`}
                  >
                    {badge.label}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                {items.map((n, i) => (
                  <button
                    type="button"
                    key={n.id}
                    onClick={() => !n.isRead && onMarkRead(n.id)}
                    className={`w-full text-left glass-morphism rounded-xl border p-3 transition-smooth flex items-start gap-3 mb-1.5 group ${
                      n.isRead
                        ? "border-white/5 opacity-70"
                        : "border-cyan-500/20 hover:border-cyan-500/40 cursor-pointer"
                    }`}
                    data-ocid={`dashboard.notifications.item.${i + 1}`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <NotificationIcon type={n.notificationType} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-semibold truncate ${n.isRead ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {n.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                    </div>
                    {!n.isRead && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-1.5" />
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </AnimatedSection>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function DashboardContent() {
  const { principalId, logout } = useAuth();
  const navigate = useNavigate();
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  const { data: enrollments = [], isLoading: loadingEnrollments } =
    useMyEnrollments();
  const { data: materials = [], isLoading: loadingMaterials } =
    useMyMaterials();
  const { data: allCourses = [] } = useAvailableCourses();
  const { data: profileOpt } = useStudentProfile();
  const { data: notifications = [] } = useMyNotifications();
  const { data: testResults = [] } = useMyResults();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  const profile = profileOpt ?? null;

  const courseMap = new Map<string, Course>(
    allCourses.map((c) => [c.id.toString(), c]),
  );

  const materialsByCourse = materials.reduce<Record<string, StudyMaterial[]>>(
    (acc, m) => {
      const key = m.courseId.toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(m);
      return acc;
    },
    {},
  );

  const activeEnrollments = enrollments.filter(
    (e) => e.status !== EnrollmentStatus.Refunded,
  );

  const handleLogout = useCallback(() => {
    logout();
    toast.success("You have been logged out.");
    navigate({ to: "/" });
  }, [logout, navigate]);

  const copyPrincipal = () => {
    if (!principalId) return;
    navigator.clipboard.writeText(principalId).catch(() => {});
    setCopiedPrincipal(true);
    toast.success("Principal ID copied!");
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };

  const quickActions = [
    {
      icon: BookOpen,
      label: "Browse Courses",
      to: "/courses",
      color: "cyan" as const,
      desc: "Explore all subjects",
    },
    {
      icon: FileText,
      label: "Study Materials",
      to: "/study-materials",
      color: "magenta" as const,
      desc: "PDFs & PYQs",
    },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero / Welcome header */}
      <section
        className="py-10 relative bg-muted/10 border-b border-white/5"
        data-ocid="dashboard.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              Student Dashboard
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
              Welcome back,{" "}
              <span className="gradient-text-cyan-violet">
                {profile?.name ?? "Student"}
              </span>{" "}
              👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Here's your learning summary for today.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Link
              to="/courses"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30 transition-smooth text-sm"
              data-ocid="dashboard.browse_courses.link"
            >
              <BookOpen className="w-4 h-4" /> Browse Courses
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-red-400 hover:border-red-500/30 transition-smooth text-sm"
              data-ocid="dashboard.logout.button"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section
        className="py-8 bg-background"
        data-ocid="dashboard.stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                label: "Courses Enrolled",
                value: activeEnrollments.length,
                color: "cyan" as const,
              },
              {
                icon: FileText,
                label: "Study Materials",
                value: materials.length,
                color: "violet" as const,
              },
              {
                icon: Award,
                label: "Tests Taken",
                value: testResults.length,
                color: "magenta" as const,
                text: undefined as string | undefined,
              },
              {
                icon: User,
                label: "Profile Status",
                value: null,
                color: "cyan" as const,
                text: profile ? "Active" : "Incomplete",
              },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <GlowCard
                  glowColor={s.color}
                  className="p-5"
                  data-ocid={`dashboard.stats.item.${i + 1}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${colorMap[s.color].bg} ${colorMap[s.color].text}`}
                  >
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div className="font-display text-3xl font-extrabold gradient-text-cyan-violet">
                    {s.value !== null && s.value !== undefined ? (
                      <CounterAnimation target={s.value} suffix="" />
                    ) : (
                      <span className="text-xl">{s.text}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">
                    {s.label}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Attendance + Study Tracker Row */}
      <section
        className="pb-6 bg-background"
        data-ocid="dashboard.analytics.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Learning Analytics
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedSection delay={0.05}>
              <AttendanceRing percentage={78} />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <DailyStudyTracker />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section
        className="py-8 pb-6 bg-background"
        data-ocid="dashboard.main.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Enrolled Courses + My Materials + Tutorials */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Enrolled Courses */}
              <AnimatedSection>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  My Courses
                </h2>
                {loadingEnrollments ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        className="glass-morphism rounded-xl border border-white/10 h-32 animate-pulse"
                      />
                    ))}
                  </div>
                ) : activeEnrollments.length === 0 ? (
                  <div
                    className="glass-morphism rounded-xl border border-white/10 p-10 text-center"
                    data-ocid="dashboard.courses.empty_state"
                  >
                    <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground mb-2">
                      No courses enrolled yet
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Start learning by enrolling in a course.
                    </p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white transition-smooth"
                      data-ocid="dashboard.browse_courses_cta.link"
                    >
                      Browse Courses <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {activeEnrollments.map((enrollment, i) => (
                      <CourseCard
                        key={enrollment.id.toString()}
                        enrollment={enrollment}
                        course={courseMap.get(enrollment.courseId.toString())}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </AnimatedSection>

              {/* My Tutorials */}
              <AnimatedSection delay={0.15}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  My Tutorials
                </h2>
                {activeEnrollments.length === 0 ? (
                  <div
                    className="glass-morphism rounded-xl border border-white/10 p-8 text-center"
                    data-ocid="dashboard.tutorials.empty_state"
                  >
                    <VideoIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="font-semibold text-foreground mb-2">
                      No tutorials yet
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Enroll in a course to access its video tutorials.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {activeEnrollments.map((enrollment) => {
                      const course = courseMap.get(
                        enrollment.courseId.toString(),
                      );
                      return (
                        <CourseTutorialRow
                          key={enrollment.id.toString()}
                          courseId={enrollment.courseId.toString()}
                          courseTitle={course?.title ?? "Course Tutorials"}
                        />
                      );
                    })}
                  </div>
                )}
              </AnimatedSection>

              {/* My Study Materials */}
              <AnimatedSection delay={0.2}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  My Study Materials
                </h2>
                {loadingMaterials ? (
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="glass-morphism rounded-xl border border-white/10 h-16 animate-pulse"
                      />
                    ))}
                  </div>
                ) : materials.length === 0 ? (
                  <div
                    className="glass-morphism rounded-xl border border-white/10 p-8 text-center"
                    data-ocid="dashboard.materials.empty_state"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground mb-2">
                      No materials yet
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Enroll in a course to unlock its study materials.
                    </p>
                    <Link
                      to="/study-materials"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-violet-400 font-semibold text-sm hover:from-violet-600 hover:to-cyan-500 hover:text-white transition-smooth"
                      data-ocid="dashboard.browse_materials_cta.link"
                    >
                      Browse Materials <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div
                    className="flex flex-col gap-6"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {Object.entries(materialsByCourse).map(
                      ([courseId, mats]) => {
                        const course = courseMap.get(courseId);
                        return (
                          <div key={courseId}>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
                              {course?.title ?? "Course Materials"}
                            </p>
                            <div className="flex flex-col gap-2">
                              {mats.map((m, idx) => (
                                <MaterialItem
                                  key={m.id.toString()}
                                  material={m}
                                  index={idx}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-6">
              <AnimatedSection delay={0.05}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-col gap-3">
                  {quickActions.map((a, i) => (
                    <Link
                      key={a.label}
                      to={a.to}
                      data-ocid={`dashboard.quick_action.item.${i + 1}`}
                    >
                      <GlowCard
                        glowColor={a.color}
                        className="p-4 cursor-pointer hover:border-white/20 transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[a.color].bg} ${colorMap[a.color].text}`}
                          >
                            <a.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground text-sm">
                              {a.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {a.desc}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      </GlowCard>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>

              {/* Test Results Summary */}
              <AnimatedSection delay={0.07}>
                <TestResultsSummary results={testResults} />
              </AnimatedSection>

              {/* Leaderboard */}
              <AnimatedSection delay={0.09}>
                <LeaderboardWidget />
              </AnimatedSection>

              <NotificationCenter
                notifications={notifications}
                onMarkRead={(id) => markReadMutation.mutate(id)}
                onMarkAllRead={() => markAllReadMutation.mutate()}
                isMarkingAll={markAllReadMutation.isPending}
              />

              {/* AI Recommendations */}
              <AnimatedSection delay={0.1}>
                <AIRecommendations />
              </AnimatedSection>

              {/* Payment History */}
              <AnimatedSection delay={0.12}>
                <PaymentHistoryPanel enrollments={activeEnrollments} />
              </AnimatedSection>

              {/* Profile section */}
              <AnimatedSection delay={0.15}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-400" /> My Profile
                </h2>
                <GlowCard
                  glowColor="violet"
                  className="p-5"
                  data-ocid="dashboard.profile.card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {(profile?.name ?? "S")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {profile?.name ?? "Student"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {profile?.email ?? ""}
                      </p>
                      {profile?.phone && (
                        <p className="text-xs text-muted-foreground truncate">
                          {profile.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 mb-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        Enrolled Courses
                      </p>
                      <span className="text-xs font-bold text-cyan-400">
                        {activeEnrollments.length}
                      </span>
                    </div>
                  </div>

                  {principalId && (
                    <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 mb-3">
                      <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">
                        Principal ID
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground font-mono truncate">
                          {principalId}
                        </span>
                        <button
                          type="button"
                          onClick={copyPrincipal}
                          className="shrink-0 text-muted-foreground hover:text-cyan-400 transition-smooth"
                          aria-label="Copy principal ID"
                          data-ocid="dashboard.copy_principal.button"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {copiedPrincipal && (
                        <p className="text-[10px] text-cyan-400 mt-1">
                          Copied!
                        </p>
                      )}
                    </div>
                  )}

                  {!editingProfile ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProfile(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-xs hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth"
                        data-ocid="dashboard.edit_profile.button"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit Profile
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex-1 py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground text-xs font-medium hover:text-red-400 hover:border-red-500/30 transition-smooth flex items-center justify-center gap-1.5"
                        data-ocid="dashboard.profile_logout.button"
                      >
                        <LogOut className="w-3 h-3" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-foreground">
                          Edit Profile
                        </p>
                        <button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                          className="text-muted-foreground hover:text-foreground transition-smooth"
                          aria-label="Close edit form"
                          data-ocid="dashboard.profile_edit.close_button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <ProfileEditForm
                        initialName={profile?.name ?? ""}
                        initialEmail={profile?.email ?? ""}
                        initialPhone={profile?.phone ?? ""}
                        onClose={() => setEditingProfile(false)}
                      />
                    </div>
                  )}
                </GlowCard>
              </AnimatedSection>

              {/* Quick Links */}
              <AnimatedSection delay={0.2}>
                <GlowCard glowColor="cyan" className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Quick Links
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      {
                        label: "My Enrolled Courses",
                        to: "/courses",
                        icon: BookOpen,
                      },
                      {
                        label: "Browse All Materials",
                        to: "/study-materials",
                        icon: FileText,
                      },
                      {
                        label: "About the Institute",
                        to: "/about",
                        icon: Briefcase,
                      },
                    ].map((link, i) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth"
                        data-ocid={`dashboard.quick_link.item.${i + 1}`}
                      >
                        <link.icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </GlowCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <DashboardContent />
    </ProtectedRoute>
  );
}
