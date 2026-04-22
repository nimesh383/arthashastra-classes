import { createActor } from "@/backend";
import type { Video } from "@/backend.d";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useConfirmPayment,
  useCourseDetail,
  useMyEnrollments,
  useMyVideosForCourse,
  usePurchaseCourse,
  useTeachers,
  useValidateCoupon,
  useVideosByCourse,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type { StudyMaterial, Teacher } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  LogIn,
  Play,
  ShieldCheck,
  Tag,
  Users,
  Video as VideoIcon,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LEVEL_LABELS: Record<string, string> = {
  Class11: "Class 11",
  Class12: "Class 12",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Dropper: "Dropper",
};

function getGlowColor(subject: string): "cyan" | "violet" | "magenta" {
  if (subject === "Economics" || subject === "Maths") return "violet";
  if (subject === "BST" || subject === "Commerce") return "magenta";
  return "cyan";
}

function getAccentClass(glowColor: "cyan" | "violet" | "magenta") {
  if (glowColor === "violet") return "text-violet-400";
  if (glowColor === "magenta") return "text-fuchsia-400";
  return "text-cyan-400";
}

// ─── Material preview row ────────────────────────────────────────────────────
function MaterialRow({
  material,
  isEnrolled,
  index,
}: {
  material: StudyMaterial;
  isEnrolled: boolean;
  index: number;
}) {
  return (
    <div
      className="relative flex items-center gap-4 glass-morphism rounded-xl p-4 border border-white/10 overflow-hidden"
      data-ocid={`course_detail.material.item.${index + 1}`}
    >
      {/* Background watermark blur for locked content */}
      {!isEnrolled && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-background/40 z-10 flex items-center justify-end pr-4 pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-medium">
            <Lock className="w-3.5 h-3.5" />
            Unlock after purchase
          </div>
        </div>
      )}
      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-cyan-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {material.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {material.materialType}
        </p>
      </div>
      {isEnrolled ? (
        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
      ) : (
        <Lock className="w-4 h-4 text-muted-foreground/40 shrink-0" />
      )}
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function CourseDetailSkeleton() {
  return (
    <div className="pt-16 overflow-hidden">
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32 mb-8 rounded" />
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-10 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>
            <div className="w-full lg:w-80 shrink-0">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Coupon + Purchase card ───────────────────────────────────────────────────
function CouponInput({
  originalPrice,
  onDiscountChange,
}: {
  originalPrice: bigint;
  onDiscountChange: (discounted: bigint | null) => void;
}) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const { data: coupon, isFetching, isError } = useValidateCoupon(applied);

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setApplied(trimmed);
  };

  const handleClear = () => {
    setCode("");
    setApplied(null);
    onDiscountChange(null);
  };

  // Compute discount
  const discountedPrice: bigint | null = (() => {
    if (!coupon || !applied || isError) return null;
    const orig = Number(originalPrice);
    if (coupon.discountType === "percent") {
      return BigInt(Math.max(0, Math.round(orig * (1 - coupon.value / 100))));
    }
    return BigInt(Math.max(0, Math.round(orig - coupon.value)));
  })();

  // Propagate via effect — not during render
  useEffect(() => {
    onDiscountChange(discountedPrice);
  }, [discountedPrice, onDiscountChange]);

  const isValid =
    applied !== null && !isFetching && coupon !== null && coupon !== undefined;
  const isInvalid =
    applied !== null &&
    !isFetching &&
    (coupon === null || coupon === undefined);

  return (
    <div className="mb-4" data-ocid="course_detail.coupon.section">
      <label
        htmlFor="coupon-code-input"
        className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block"
      >
        Coupon Code (optional)
      </label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            id="coupon-code-input"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (applied) setApplied(null);
              onDiscountChange(null);
            }}
            placeholder="Enter code"
            className={`w-full bg-white/5 border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-smooth pr-8 ${
              isValid
                ? "border-cyan-500/50 focus:border-cyan-400"
                : isInvalid
                  ? "border-red-500/50 focus:border-red-400"
                  : "border-white/10 focus:border-white/30"
            }`}
            data-ocid="course_detail.coupon.input"
          />
          {applied && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Clear coupon"
              data-ocid="course_detail.coupon.clear_button"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isFetching}
          className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 transition-smooth text-foreground whitespace-nowrap"
          data-ocid="course_detail.coupon.apply_button"
        >
          {isFetching ? (
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" />
          ) : (
            "Apply"
          )}
        </button>
      </div>

      {isValid && discountedPrice !== null && (
        <p
          className="mt-1.5 text-xs text-cyan-400 flex items-center gap-1.5 font-medium"
          data-ocid="course_detail.coupon.success_state"
        >
          <Tag className="w-3.5 h-3.5" />
          Code applied! You save ₹
          {(Number(originalPrice) - Number(discountedPrice)).toLocaleString(
            "en-IN",
          )}
        </p>
      )}
      {isInvalid && (
        <p
          className="mt-1.5 text-xs text-red-400 font-medium"
          data-ocid="course_detail.coupon.error_state"
        >
          Invalid or expired coupon code.
        </p>
      )}
    </div>
  );
}

// ─── Purchase button component ────────────────────────────────────────────────
function PurchaseButton({
  courseId,
  price,
  title,
}: {
  courseId: bigint;
  price: bigint;
  title: string;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const purchaseMutation = usePurchaseCourse();
  const confirmMutation = useConfirmPayment();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      window.location.href = `/login?returnTo=/courses/${courseId}`;
      return;
    }

    setIsPurchasing(true);
    try {
      // Generate a payment reference ID for Stripe integration
      const paymentRef = `stripe_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      // Create enrollment with pending status
      const enrollment = await purchaseMutation.mutateAsync({
        courseId,
        amountPaid: price,
        paymentId: paymentRef,
      });

      // Confirm payment to mark enrollment as completed
      const confirmed = await confirmMutation.mutateAsync({
        enrollmentId: enrollment.id,
        paymentId: paymentRef,
      });

      if (confirmed) {
        toast.success(
          `Enrolled in "${title}"! Access your course from the dashboard.`,
          {
            duration: 5000,
          },
        );
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Payment could not be confirmed. Please contact support.");
      }
    } catch {
      toast.error("Enrollment failed. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <MagneticButton className="w-full">
        <button
          type="button"
          onClick={handlePurchase}
          className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth"
          data-ocid="course_detail.login_to_access.button"
        >
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Login to Access
          </span>
        </button>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton className="w-full">
      <button
        type="button"
        onClick={handlePurchase}
        disabled={isPurchasing}
        className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
        data-ocid="course_detail.purchase.button"
      >
        {isPurchasing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Processing…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Buy Now — Instant Access
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </button>
    </MagneticButton>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const courseId = id ? BigInt(id) : null;
  const courseIdStr = id ?? null;

  const { data: course, isLoading: courseLoading } = useCourseDetail(courseId);
  const { data: teachers } = useTeachers();
  const { data: enrollments } = useMyEnrollments();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<bigint | null>(null);

  const isEnrolled = useMemo(() => {
    if (!enrollments || !courseId) return false;
    return enrollments.some(
      (e) => e.courseId === courseId && e.status === "Completed",
    );
  }, [enrollments, courseId]);

  // Videos — enrolled students get full unlocked list; others get public list
  const { data: myVideos = [], isLoading: loadingMyVideos } =
    useMyVideosForCourse(isEnrolled ? courseIdStr : null);
  const { data: publicVideos = [], isLoading: loadingPublicVideos } =
    useVideosByCourse(!isEnrolled ? courseIdStr : null);

  const videos = isEnrolled ? myVideos : publicVideos;
  const loadingVideos = isEnrolled ? loadingMyVideos : loadingPublicVideos;

  // Fetch materials for this course
  useEffect(() => {
    if (!actor || actorFetching || !courseId) return;
    actor
      .getMaterialsForCourse(courseId)
      .then(setMaterials)
      .catch(() => setMaterials([]));
  }, [actor, actorFetching, courseId]);

  // Content protection — disable right click on this page
  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  if (courseLoading) return <CourseDetailSkeleton />;

  if (!course) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center" data-ocid="course_detail.not_found">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Course not found
          </h2>
          <Link
            to="/courses"
            className="text-cyan-400 hover:text-cyan-300 transition-smooth flex items-center gap-2 justify-center"
            data-ocid="course_detail.back.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const glowColor = getGlowColor(course.subject);
  const accentClass = getAccentClass(glowColor);

  // Match teachers for this course
  const courseTeachers: Teacher[] = (teachers ?? []).filter((t) =>
    course.teacherIds.some((tid) => tid === t.id),
  );

  const teacherNames =
    courseTeachers.length > 0
      ? courseTeachers.map((t) => t.name).join(", ")
      : course.instructor;

  return (
    <div
      className="pt-16 overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
      data-ocid="course_detail.page"
    >
      {/* Hero Section */}
      <section
        className="py-20 relative"
        data-ocid="course_detail.hero.section"
      >
        {/* Watermark overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <p className="absolute top-1/3 left-1/2 -translate-x-1/2 -rotate-[25deg] text-white/[0.03] text-7xl font-bold whitespace-nowrap tracking-widest">
            ARTHASHASTRA CLASSES
          </p>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br pointer-events-none opacity-30 ${
            glowColor === "cyan"
              ? "from-cyan-500/10 to-transparent"
              : glowColor === "violet"
                ? "from-violet-600/10 to-transparent"
                : "from-fuchsia-600/10 to-transparent"
          }`}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8"
              data-ocid="course_detail.back.link"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left — course info */}
              <div className="flex-1">
                <span
                  className={`text-xs font-bold uppercase tracking-widest mb-3 block ${accentClass}`}
                >
                  {course.subject}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Meta badges */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    {teacherNames}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    {LEVEL_LABELS[course.level] ?? course.level}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    {course.subject}
                  </span>
                </div>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Live Sessions",
                    "Recorded Lectures",
                    "Doubt Clearing",
                    "Study Materials",
                    "Mock Boards",
                    "PYQ Analysis",
                  ].map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1.5 rounded-full glass-morphism border border-white/10 text-foreground/80 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — purchase card */}
              <div className="w-full lg:w-80 shrink-0">
                <GlowCard glowColor={glowColor} className="p-6">
                  {/* Price display */}
                  <div className="mb-1">
                    {discountedPrice !== null ? (
                      <div className="flex items-baseline gap-3">
                        <div className="font-display text-4xl font-extrabold gradient-text-cyan-violet">
                          ₹{Number(discountedPrice).toLocaleString("en-IN")}
                        </div>
                        <div className="font-display text-lg font-bold text-muted-foreground line-through">
                          ₹{Number(course.price).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ) : (
                      <div className="font-display text-4xl font-extrabold gradient-text-cyan-violet">
                        ₹{Number(course.price).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Full {course.duration} program
                  </p>

                  {/* Material count badge */}
                  {materials.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-cyan-400 mb-4 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      Includes {materials.length} study material
                      {materials.length !== 1 ? "s" : ""}
                    </div>
                  )}

                  {isEnrolled ? (
                    <div
                      className="space-y-3"
                      data-ocid="course_detail.enrolled.badge"
                    >
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm justify-center">
                        <CheckCircle className="w-4 h-4" />
                        You're Enrolled!
                      </div>
                      <Link
                        to="/dashboard"
                        className="block w-full text-center px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground text-sm font-medium hover:border-cyan-400/50 transition-smooth"
                        data-ocid="course_detail.dashboard.link"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Coupon code input */}
                      <CouponInput
                        originalPrice={course.price}
                        onDiscountChange={setDiscountedPrice}
                      />
                      <PurchaseButton
                        courseId={course.id}
                        price={discountedPrice ?? course.price}
                        title={course.title}
                      />
                      <Link
                        to="/contact"
                        className="block w-full text-center px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground text-sm font-medium hover:border-cyan-400/50 transition-smooth"
                        data-ocid="course_detail.enquiry.button"
                      >
                        Ask a Question
                      </Link>
                    </div>
                  )}

                  {/* Security notice */}
                  <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400/70" />
                    Secure payment · Instant access
                  </p>
                </GlowCard>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Study Materials Preview */}
      {materials.length > 0 && (
        <section
          className="py-16 bg-muted/10 relative"
          data-ocid="course_detail.materials.section"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-3xl font-extrabold text-foreground">
                  Included Study Materials
                </h2>
                {!isEnrolled && (
                  <span className="text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Purchase to unlock
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {isEnrolled
                  ? "All materials are unlocked. Access them from your dashboard."
                  : "Enroll once to access all materials for this course."}
              </p>
            </AnimatedSection>

            {/* Auth gate overlay for paid courses */}
            {!isAuthenticated && Number(course.price) > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
                data-ocid="course_detail.materials.auth_gate"
              >
                {/* Blurred preview rows */}
                <div className="space-y-3 select-none pointer-events-none">
                  {materials.slice(0, 3).map((m) => (
                    <div
                      key={String(m.id)}
                      className="relative flex items-center gap-4 glass-morphism rounded-xl p-4 border border-white/10 overflow-hidden"
                    >
                      <div className="absolute inset-0 backdrop-blur-sm bg-background/50 z-10" />
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {m.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {m.materialType}
                        </p>
                      </div>
                      <Lock className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    </div>
                  ))}
                  {materials.length > 3 && (
                    <p className="text-center text-xs text-muted-foreground pt-1">
                      +{materials.length - 3} more materials
                    </p>
                  )}
                </div>

                {/* CTA overlay */}
                <div className="mt-6 text-center glass-morphism border border-white/10 rounded-2xl p-8">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    Login to Access Course Materials
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto">
                    Sign in to enroll and unlock all {materials.length} study
                    materials included in this course.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/login?returnTo=/courses/${courseId}`;
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-smooth"
                    data-ocid="course_detail.materials.login_button"
                  >
                    <LogIn className="w-4 h-4" />
                    Login to Access
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {materials.map((m, i) => (
                  <AnimatedSection key={String(m.id)} delay={i * 0.06}>
                    <MaterialRow
                      material={m}
                      isEnrolled={isEnrolled}
                      index={i}
                    />
                  </AnimatedSection>
                ))}
              </div>
            )}

            {isAuthenticated && !isEnrolled && (
              <AnimatedSection delay={0.3} className="mt-8 text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  One payment unlocks all {materials.length} materials for this
                  course.
                </p>
              </AnimatedSection>
            )}
          </div>
        </section>
      )}

      {/* Course Tutorials Section */}
      <section
        className="py-16 bg-muted/5 relative"
        data-ocid="course_detail.tutorials.section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-3xl font-extrabold text-foreground">
                Course Tutorials
              </h2>
              {!isEnrolled && (
                <span className="text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Enroll to unlock all
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {isEnrolled
                ? "All video tutorials are unlocked. Watch them anytime."
                : "Preview free lessons. Enroll to unlock the full playlist."}
            </p>
          </AnimatedSection>

          {/* Active player */}
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
              data-ocid="course_detail.tutorials.player"
            >
              <VideoPlayer
                videoUrl={activeVideo.videoUrl}
                title={activeVideo.title}
                onClose={() => setActiveVideo(null)}
              />
              <div className="mt-3 px-1">
                <p className="font-semibold text-foreground">
                  {activeVideo.title}
                </p>
                {activeVideo.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activeVideo.description}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Playlist */}
          {loadingVideos ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="glass-morphism rounded-xl border border-white/10 h-16 animate-pulse"
                />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div
              className="glass-morphism rounded-xl border border-white/10 p-10 text-center"
              data-ocid="course_detail.tutorials.empty_state"
            >
              <VideoIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-foreground mb-1">
                No tutorials yet
              </p>
              <p className="text-muted-foreground text-sm">
                Video content will be added here soon.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {videos.map((video, i) => {
                const isLocked = !isEnrolled && !video.isPreview;
                const isActive = activeVideo?.id === video.id;
                return (
                  <AnimatedSection key={video.id} delay={i * 0.05}>
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() =>
                        isLocked ? undefined : setActiveVideo(video)
                      }
                      className={`w-full text-left flex items-center gap-4 glass-morphism rounded-xl border p-3 transition-smooth group ${
                        isActive
                          ? "border-cyan-500/50 bg-cyan-500/5"
                          : isLocked
                            ? "border-white/5 opacity-60 cursor-not-allowed"
                            : "border-white/10 hover:border-cyan-500/30 cursor-pointer"
                      }`}
                      data-ocid={`course_detail.tutorials.item.${i + 1}`}
                    >
                      {/* Number / play icon */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                          isActive
                            ? "bg-cyan-500 text-white"
                            : isLocked
                              ? "bg-white/5 text-muted-foreground/40"
                              : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"
                        }`}
                      >
                        {isActive ? (
                          <Play className="w-4 h-4 fill-white" />
                        ) : isLocked ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>

                      {/* Thumbnail */}
                      {video.thumbnailUrl && (
                        <div className="w-16 h-10 rounded-md overflow-hidden shrink-0 bg-black">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${isActive ? "text-cyan-400" : "text-foreground"}`}
                        >
                          {video.title}
                        </p>
                        {video.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {video.description}
                          </p>
                        )}
                      </div>

                      {/* Badge */}
                      <div className="shrink-0 ml-2">
                        {isLocked ? (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            Enroll to Watch
                          </span>
                        ) : video.isPreview ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            Free
                          </span>
                        ) : (
                          <Play className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-smooth" />
                        )}
                      </div>
                    </button>
                  </AnimatedSection>
                );
              })}
            </div>
          )}

          {!isAuthenticated && (
            <AnimatedSection delay={0.3} className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-3">
                Login and enroll to unlock all video tutorials.
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/login?returnTo=/courses/${courseId}`;
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white transition-smooth"
                data-ocid="course_detail.tutorials.login_button"
              >
                <LogIn className="w-4 h-4" />
                Login to Unlock
              </button>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Teachers Section */}
      {courseTeachers.length > 0 && (
        <section
          className="py-16 bg-background"
          data-ocid="course_detail.teachers.section"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">
                Meet Your Faculty
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courseTeachers.map((teacher, i) => (
                <AnimatedSection key={String(teacher.id)} delay={i * 0.1}>
                  <GlowCard
                    glowColor={glowColor}
                    className="p-5 flex items-center gap-4"
                    data-ocid={`course_detail.teacher.item.${i + 1}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 flex items-center justify-center shrink-0 text-lg font-bold text-foreground">
                      {teacher.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-foreground text-sm leading-tight truncate">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {teacher.specialization}
                      </p>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
