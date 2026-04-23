import { useCourseDetail } from "@/hooks/useBackend";
import { Link, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

// ─── Confetti particle ────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
}

const CONFETTI_COLORS = [
  "oklch(0.68 0.24 200)", // cyan
  "oklch(0.55 0.2 270)", // violet
  "oklch(0.6 0.25 290)", // magenta
  "oklch(0.75 0.18 150)", // green
  "oklch(0.8 0.15 60)", // amber
  "oklch(0.9 0.02 260)", // white
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 6 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
    drift: (Math.random() - 0.5) * 80,
  }));
}

function Confetti() {
  const particles = useRef(generateParticles(60));

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            animationName: "confettiFall",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in",
            animationFillMode: "both",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(${Math.random() > 0.5 ? "" : "-"}60px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Receipt row ──────────────────────────────────────────────────────────────
function ReceiptRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="payment-receipt-row">
      <span className="payment-receipt-label">{label}</span>
      <span
        className={
          highlight ? "payment-receipt-amount" : "payment-receipt-value"
        }
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PaymentSuccessPage() {
  const search = useSearch({ strict: false }) as {
    courseId?: string;
    enrollmentId?: string;
    amount?: string;
  };
  const courseIdRaw = search?.courseId ?? null;
  const enrollmentId = search?.enrollmentId ?? "—";
  const amountPaid = search?.amount
    ? `₹${Number(search.amount).toLocaleString("en-IN")}`
    : "—";
  const courseId = courseIdRaw ? BigInt(courseIdRaw) : null;

  const { data: course } = useCourseDetail(courseId);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/courses/${courseIdRaw}`
      : "";
  const whatsappMessage = encodeURIComponent(
    `🎓 Just enrolled in "${course?.title ?? "a course"}" at Arthashastra Classes! Level up your commerce game 🚀 ${shareUrl}`,
  );

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  }

  function handleDownloadReceipt() {
    window.print();
  }

  return (
    <>
      {showConfetti && <Confetti />}

      <div
        className="relative min-h-screen pt-24 pb-20 px-4 flex flex-col items-center"
        data-ocid="payment_success.page"
      >
        {/* Background glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.68 0.24 200 / 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl space-y-8">
          {/* ── Hero checkmark ──────────────────────────────────────────── */}
          <div className="flex flex-col items-center text-center gap-4">
            <motion.div
              className="payment-success-checkmark"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              data-ocid="payment_success.checkmark"
            >
              <CheckCircle
                className="w-12 h-12 text-success"
                strokeWidth={1.5}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl gradient-text-cyan-violet">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground mt-3 text-lg">
                You are now enrolled in{" "}
                <span className="text-primary font-semibold">
                  {course?.title ?? "the course"}
                </span>
                .
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You now have full access to all course materials. Start learning
                in your dashboard.
              </p>
            </motion.div>
          </div>

          {/* ── Receipt card ─────────────────────────────────────────────── */}
          <motion.div
            className="payment-receipt-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            data-ocid="payment_success.receipt.card"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-xl text-foreground">
                Receipt
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-success/20 text-success border border-success/40 font-semibold">
                Enrolled ✓
              </span>
            </div>

            <ReceiptRow
              label="Order ID"
              value={`#AC-${String(enrollmentId).padStart(6, "0")}`}
            />
            <ReceiptRow label="Course" value={course?.title ?? "—"} />
            <ReceiptRow label="Instructor" value={course?.instructor ?? "—"} />
            <ReceiptRow label="Date" value={orderDate} />
            <ReceiptRow label="Status" value="Completed" />
            <ReceiptRow label="Amount Paid" value={amountPaid} highlight />
          </motion.div>

          {/* ── Action buttons ────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-bold text-primary-foreground transition-smooth glow-cyan relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.24 200), oklch(0.55 0.2 270))",
              }}
              data-ocid="payment_success.go_to_dashboard.primary_button"
            >
              <BookOpen className="w-5 h-5" />
              Go to Dashboard
            </Link>

            <Link
              to="/courses"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-semibold text-foreground border border-primary/40 glass-morphism hover:border-primary transition-smooth"
              data-ocid="payment_success.browse_courses.secondary_button"
            >
              Browse More Courses
            </Link>

            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-semibold text-muted-foreground border border-border glass-morphism hover:text-foreground hover:border-foreground/30 transition-smooth"
              data-ocid="payment_success.download_receipt.button"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </motion.div>

          {/* ── Share row ─────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-px w-16 bg-border" />
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                Share your achievement
              </span>
              <div className="h-px w-16 bg-border" />
            </div>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-smooth text-sm font-semibold"
                data-ocid="payment_success.whatsapp_share.button"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-smooth text-sm font-semibold"
                data-ocid="payment_success.copy_link.button"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>

              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:border-border transition-smooth text-sm font-semibold"
                data-ocid="payment_success.open_course.button"
              >
                <ExternalLink className="w-4 h-4" />
                View Course
              </a>
            </div>
          </motion.div>

          {/* ── Info banner ───────────────────────────────────────────────── */}
          <motion.div
            className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <p className="text-sm text-muted-foreground">
              🎓 You now have full access to{" "}
              <span className="text-primary font-semibold">
                {course?.title ?? "this course"}
              </span>
              . Head to your{" "}
              <Link
                to="/dashboard"
                className="text-primary underline underline-offset-2"
                data-ocid="payment_success.dashboard_inline.link"
              >
                dashboard
              </Link>{" "}
              to start learning.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
