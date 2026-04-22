import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import { useMyEnrollments, useStudyMaterials } from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type { StudyMaterial } from "@/types";
import { FileType, MaterialType, Subject } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  Download,
  Eye,
  FileText,
  Lock,
  LogIn,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Filter types ─────────────────────────────────────────────────────────────
type FilterMaterialType = "All" | "PDF" | "PYQ" | "Notes";
type FilterSubject =
  | "All"
  | "Accountancy"
  | "Economics"
  | "BST"
  | "Maths"
  | "Commerce";

const TYPE_TABS: FilterMaterialType[] = ["All", "PDF", "PYQ", "Notes"];
const SUBJECT_FILTERS: FilterSubject[] = [
  "All",
  "Accountancy",
  "Economics",
  "BST",
  "Maths",
  "Commerce",
];

const typeConfig: Record<
  Exclude<FilterMaterialType, "All">,
  {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    glowColor: "cyan" | "violet" | "magenta";
  }
> = {
  PDF: {
    icon: FileText,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowColor: "cyan",
  },
  PYQ: {
    icon: ClipboardList,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    glowColor: "violet",
  },
  Notes: {
    icon: BookOpen,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    glowColor: "magenta",
  },
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Map backend MaterialType enum value to filter tab string
function getMaterialTypeFilter(
  m: StudyMaterial,
): Exclude<FilterMaterialType, "All"> {
  if (m.materialType === MaterialType.PYQ) return "PYQ";
  if (m.materialType === MaterialType.Notes) return "Notes";
  return "PDF";
}

// Map backend Subject enum value to filter subject string
function getSubjectFilter(m: StudyMaterial): FilterSubject {
  switch (m.subject) {
    case Subject.Accountancy:
      return "Accountancy";
    case Subject.Economics:
      return "Economics";
    case Subject.BST:
      return "BST";
    case Subject.Maths:
      return "Maths";
    case Subject.Commerce:
      return "Commerce";
    default:
      return "Commerce";
  }
}

// ─── Image material with watermark ───────────────────────────────────────────
function WatermarkedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full h-28 rounded-xl overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />
      {/* Diagonal watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {(["wm0", "wm1", "wm2", "wm3"] as const).map((wk, i) => (
          <span
            key={wk}
            className="absolute font-black text-foreground rotate-[-35deg] tracking-widest uppercase text-[7px] whitespace-nowrap"
            style={{
              opacity: 0.18,
              userSelect: "none",
              top: `${15 + i * 22}%`,
              left: "-10%",
              right: "-10%",
              textAlign: "center",
            }}
          >
            ARTHASHASTRA CLASSES
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Locked overlay card ──────────────────────────────────────────────────────
function LockedOverlay() {
  return (
    <div className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/60 flex flex-col items-center justify-center gap-2 z-10">
      <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
        <Lock className="w-4 h-4 text-violet-400" />
      </div>
      <p className="text-xs font-semibold text-foreground text-center px-4">
        Purchase Course to Access
      </p>
      <Link
        to="/courses"
        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium transition-smooth"
      >
        Browse Courses →
      </Link>
    </div>
  );
}

// ─── Material card ────────────────────────────────────────────────────────────
interface MaterialCardProps {
  material: StudyMaterial;
  isUnlocked: boolean;
  index: number;
}

function MaterialCard({ material, isUnlocked, index }: MaterialCardProps) {
  const typeKey = getMaterialTypeFilter(material);
  const cfg = typeConfig[typeKey];
  const Icon = cfg.icon;
  const isImage = material.fileType === FileType.Image;

  const handleDownload = () => {
    if (!isUnlocked) {
      toast.error("Purchase this course to download materials.", {
        description: "Enroll in the course to unlock all study materials.",
      });
      return;
    }
    window.open(material.fileUrl, "_blank", "noopener");
    toast.success("Opening material…", {
      description: material.title,
      duration: 3000,
    });
  };

  const handlePreview = () => {
    if (!isUnlocked) {
      toast.error("Login and enroll to preview this material.");
      return;
    }
    window.open(material.fileUrl, "_blank", "noopener");
  };

  return (
    <AnimatedSection delay={index * 0.06}>
      <GlowCard
        glowColor={cfg.glowColor}
        className="p-5 flex flex-col gap-4 group relative"
        data-ocid={`study_materials.list.item.${index + 1}`}
      >
        {/* Locked overlay */}
        {!isUnlocked && <LockedOverlay />}

        {/* Image preview with watermark */}
        {isImage && isUnlocked && (
          <WatermarkedImage src={material.fileUrl} alt={material.title} />
        )}

        {/* Top row: icon + type badge + lock badge */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color} ${!isUnlocked ? "opacity-40" : ""}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${!isUnlocked ? "opacity-40" : ""}`}
            >
              {typeKey}
            </span>
            {!isUnlocked && (
              <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
            )}
          </div>
        </div>

        {/* Title + meta */}
        <div className="flex-1" style={{ userSelect: "none" }}>
          <h3
            className={`font-semibold text-sm leading-snug mb-1.5 line-clamp-2 ${!isUnlocked ? "text-muted-foreground" : "text-foreground"}`}
          >
            {material.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            <span className="px-2 py-0.5 rounded glass-morphism border border-white/10">
              {getSubjectFilter(material)}
            </span>
            <span>{formatDate(material.uploadDate)}</span>
            {material.fileSize && (
              <>
                <span>·</span>
                <span>{material.fileSize}</span>
              </>
            )}
          </div>
        </div>

        {/* Footer: actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            {!isImage && (
              <button
                type="button"
                onClick={handlePreview}
                className={`flex items-center gap-1 text-xs font-medium transition-smooth ${
                  isUnlocked
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/40 cursor-not-allowed"
                }`}
                data-ocid={`study_materials.preview.button.${index + 1}`}
                aria-label={`Preview ${material.title}`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
            )}
          </div>
          <RippleButton
            onClick={handleDownload}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-smooth ${
              isUnlocked
                ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed border border-white/5"
            }`}
            data-ocid={`study_materials.download.button.${index + 1}`}
          >
            <Download className="w-3.5 h-3.5" />
            {isUnlocked ? "Download" : "Locked"}
          </RippleButton>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────
function MaterialSkeleton() {
  return (
    <div className="glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="w-12 h-6 rounded-full bg-white/5" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-white/5 rounded w-4/5" />
        <div className="h-3 bg-white/5 rounded w-3/5" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex justify-end">
        <div className="w-20 h-7 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudyMaterialsPage() {
  const { isAuthenticated } = useAuth();
  const [activeType, setActiveType] = useState<FilterMaterialType>("All");
  const [activeSubject, setActiveSubject] = useState<FilterSubject>("All");

  const { data: allMaterials = [], isLoading } = useStudyMaterials();
  const { data: enrollments = [] } = useMyEnrollments();

  // Build set of enrolled course IDs for O(1) lookup
  const enrolledCourseIds = useMemo(
    () => new Set(enrollments.map((e) => e.courseId.toString())),
    [enrollments],
  );

  const filtered = useMemo(() => {
    return allMaterials.filter((m) => {
      const matchType =
        activeType === "All" || getMaterialTypeFilter(m) === activeType;
      const matchSubject =
        activeSubject === "All" || getSubjectFilter(m) === activeSubject;
      return matchType && matchSubject;
    });
  }, [allMaterials, activeType, activeSubject]);

  return (
    <div
      className="pt-16 overflow-hidden"
      onContextMenu={(e) => {
        // Prevent right-click on the whole page for content protection
        const target = e.target as HTMLElement;
        const isMaterialSection = target.closest(
          "[data-ocid='study_materials.list.section']",
        );
        if (isMaterialSection) e.preventDefault();
      }}
    >
      {/* Hero */}
      <section
        className="py-24 relative"
        data-ocid="study_materials.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {(["q0", "q1", "q2", "q3", "q4"] as const).map((key, i) => (
            <motion.div
              key={key}
              className="absolute w-1 h-1 rounded-full bg-violet-400/40"
              style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 28}%` }}
              animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 3.5 + i * 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
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
            <span className="inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              Resources
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Study <span className="gradient-text-cyan-violet">Materials</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Curated PDFs, Previous Year Questions, and revision notes —
              everything you need, organized in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Gate Banner — only shown to non-authenticated users */}
      {!isAuthenticated && (
        <section
          className="pb-2 bg-background"
          data-ocid="study_materials.login_gate"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.05}>
              <div className="glass-morphism border border-violet-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 shadow-[0_0_30px_oklch(0.55_0.20_270/0.15)]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground text-sm">
                      Login to access the full study materials library
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      PYQs, premium notes, and answer keys are locked. Enroll in
                      a course to unlock.
                    </p>
                  </div>
                </div>
                <Link
                  to="/login"
                  data-ocid="study_materials.login_gate.login_button"
                >
                  <RippleButton className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_16px_oklch(0.55_0.20_270/0.35)]">
                    <LogIn className="w-4 h-4" />
                    Login / Sign up
                  </RippleButton>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Filters */}
      <section
        className="py-6 bg-background"
        data-ocid="study_materials.filters.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Type Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="relative flex gap-1 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit">
              {TYPE_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-smooth z-10 ${
                    activeType === t
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`study_materials.type_tab.${t.toLowerCase()}`}
                >
                  {activeType === t && (
                    <motion.div
                      layoutId="type-tab-bg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_12px_oklch(0.55_0.20_270/0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Subject Chips */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_FILTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSubject(s)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-smooth border ${
                    activeSubject === s
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_oklch(0.68_0.24_200/0.2)]"
                      : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-cyan-500/20"
                  }`}
                  data-ocid={`study_materials.subject_filter.${s.toLowerCase()}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Materials Grid */}
      <section
        className="py-4 pb-28 bg-background"
        data-ocid="study_materials.list.section"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map(
                (sk) => (
                  <MaterialSkeleton key={sk} />
                ),
              )}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-28"
              data-ocid="study_materials.empty_state"
            >
              <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No materials match your filters
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Try selecting a different type or subject.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveType("All");
                  setActiveSubject("All");
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90"
                data-ocid="study_materials.empty_state.reset_button"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((m, i) => (
                <MaterialCard
                  key={m.id.toString()}
                  material={m}
                  isUnlocked={
                    isAuthenticated &&
                    enrolledCourseIds.has(m.courseId.toString())
                  }
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
