import {
  useConfirmPayment,
  useCourseDetail,
  usePurchaseCourse,
  useValidateCoupon,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import { DiscountType } from "@/types";
import type { Coupon, Course } from "@/types";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Lock,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatRupees(n: bigint | number): string {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

const GST_RATE = 0.18;

// ─── Processing overlay ───────────────────────────────────────────────────────
function ProcessingOverlay() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "oklch(0.12 0.05 260 / 0.92)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-ocid="checkout.loading_state"
      >
        <div className="flex flex-col items-center gap-6 glass-morphism rounded-2xl p-10 border border-primary/40 glow-cyan">
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
            <ShieldCheck className="absolute inset-0 m-auto w-7 h-7 text-primary" />
          </div>
          <p className="font-display font-bold text-xl text-foreground">
            Processing Payment…
          </p>
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            Securing your enrollment on the IC blockchain. Please don't close
            this window.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();

  // ── Search params ────────────────────────────────────────────────────────
  const search = useSearch({ strict: false }) as { courseId?: string };
  const courseIdRaw = search?.courseId ?? null;
  const courseId = courseIdRaw ? BigInt(courseIdRaw) : null;

  // ── Course data ──────────────────────────────────────────────────────────
  const { data: course, isLoading: courseLoading } = useCourseDetail(courseId);

  // ── Coupon ───────────────────────────────────────────────────────────────
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const { data: couponData, isLoading: couponLoading } =
    useValidateCoupon(appliedCoupon);
  const couponValid =
    couponData && !("__kind__" in couponData)
      ? (couponData as Coupon).isActive
      : false;

  // ── Payment form ─────────────────────────────────────────────────────────
  const [cardHolder, setCardHolder] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ cardHolder?: string; email?: string }>(
    {},
  );

  const purchaseMutation = usePurchaseCourse();
  const confirmMutation = useConfirmPayment();

  // ── Pricing ──────────────────────────────────────────────────────────────
  const basePrice = course ? Number(course.price) : 0;

  let discount = 0;
  if (couponValid && couponData) {
    const c = couponData as Coupon;
    if (c.discountType === DiscountType.percent) {
      discount = Math.floor(basePrice * (c.value / 100));
    } else {
      discount = Math.min(c.value, basePrice);
    }
  }

  const subtotal = basePrice - discount;
  const gst = Math.floor(subtotal * GST_RATE);
  const total = subtotal + gst;

  // ── Auth guard ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      login();
    }
  }, [authLoading, isAuthenticated, login]);

  // ── Validation ───────────────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!cardHolder.trim()) newErrors.cardHolder = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Pay handler ───────────────────────────────────────────────────────────
  async function handlePay() {
    if (!validate() || !course || !courseId) return;
    setProcessing(true);
    try {
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const enrollment = await purchaseMutation.mutateAsync({
        courseId,
        amountPaid: BigInt(total),
        paymentId,
      });
      await confirmMutation.mutateAsync({
        enrollmentId: (enrollment as { id: bigint }).id,
        paymentId,
      });
      navigate({
        to: "/payment-success",
        search: {
          courseId: courseIdRaw ?? "",
          enrollmentId: String((enrollment as { id: bigint }).id),
          amount: String(total),
        },
      });
    } catch (err) {
      setProcessing(false);
      toast.error(
        err instanceof Error ? err.message : "Payment failed. Please retry.",
      );
    }
  }

  // ── Apply coupon ──────────────────────────────────────────────────────────
  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setAppliedCoupon(couponInput.trim().toUpperCase());
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
  }

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (courseLoading || authLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="glass-morphism rounded-2xl p-8 animate-pulse space-y-4"
            >
              <div className="h-48 bg-muted/40 rounded-xl" />
              <div className="h-6 bg-muted/40 rounded w-3/4" />
              <div className="h-4 bg-muted/40 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Course not found.</p>
        <Link
          to="/courses"
          className="text-primary underline"
          data-ocid="checkout.back_link"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      {processing && <ProcessingOverlay />}

      <div className="min-h-screen pt-24 pb-20 px-4" data-ocid="checkout.page">
        {/* Page header */}
        <div className="max-w-5xl mx-auto mb-8">
          <Link
            to="/courses/$id"
            params={{ id: courseIdRaw ?? "0" }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth text-sm"
            data-ocid="checkout.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          <motion.h1
            className="font-display font-bold text-3xl md:text-4xl text-foreground mt-4 gradient-text-cyan-violet"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Secure Checkout
          </motion.h1>
          <p className="text-muted-foreground mt-1">
            Complete your enrollment for{" "}
            <span className="text-primary font-semibold">{course.title}</span>
          </p>
        </div>

        {/* Two-column layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Order Summary ─────────────────────────────────────────────── */}
          <motion.div
            className="checkout-summary-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-ocid="checkout.order_summary.card"
          >
            <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Order Summary
            </h2>

            {/* Thumbnail */}
            {course.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-white/10 h-48">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Course info */}
            <div>
              <h3 className="font-display font-bold text-lg text-foreground leading-snug">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Instructor:{" "}
                <span className="text-foreground">{course.instructor}</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Duration:{" "}
                <span className="text-foreground">{course.duration}</span>
              </p>
            </div>

            {/* Price breakdown */}
            <div className="space-y-1">
              <div className="checkout-item-row">
                <span className="text-muted-foreground">Course Price</span>
                <span className="text-foreground">
                  {formatRupees(basePrice)}
                </span>
              </div>
              {discount > 0 && (
                <div className="checkout-item-row text-green-400">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Coupon Discount
                  </span>
                  <span>−{formatRupees(discount)}</span>
                </div>
              )}
              <div className="checkout-item-row">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{formatRupees(gst)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Total</span>
                <span>{formatRupees(total)}</span>
              </div>
            </div>

            {/* Coupon input */}
            <div className="space-y-2" data-ocid="checkout.coupon.section">
              <label
                htmlFor="couponInput"
                className="checkout-form-label flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-primary" />
                Coupon Code
              </label>
              {appliedCoupon && couponValid ? (
                <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-green-400/50 bg-green-400/10">
                  <span className="text-green-400 font-semibold text-sm">
                    {appliedCoupon} applied!
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-muted-foreground hover:text-foreground"
                    data-ocid="checkout.coupon.remove_button"
                    aria-label="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="couponInput"
                    type="text"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value.toUpperCase())
                    }
                    placeholder="Enter code"
                    className="checkout-form-input flex-1"
                    data-ocid="checkout.coupon.input"
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg text-sm font-semibold transition-smooth hover:bg-primary/30 disabled:opacity-50"
                    data-ocid="checkout.coupon.apply_button"
                  >
                    Apply
                  </button>
                </div>
              )}
              {appliedCoupon && !couponValid && !couponLoading && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="checkout.coupon.error_state"
                >
                  Invalid or expired coupon code.
                </p>
              )}
            </div>
          </motion.div>

          {/* ── Payment Form ──────────────────────────────────────────────── */}
          <motion.div
            className="glass-morphism rounded-2xl p-8 border border-white/10 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-ocid="checkout.payment_form.card"
          >
            <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Payment Details
            </h2>

            {/* Card holder name */}
            <div className="checkout-form-group">
              <label htmlFor="cardHolder" className="checkout-form-label">
                Card Holder Name
              </label>
              <input
                id="cardHolder"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                onBlur={validate}
                placeholder="Full name on card"
                className="checkout-form-input"
                data-ocid="checkout.cardholder.input"
              />
              {errors.cardHolder && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="checkout.cardholder.field_error"
                >
                  {errors.cardHolder}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="checkout-form-group">
              <label htmlFor="email" className="checkout-form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validate}
                placeholder="your@email.com"
                className="checkout-form-input"
                data-ocid="checkout.email.input"
              />
              {errors.email && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="checkout.email.field_error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Security notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Secure Payment via IC Backend
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your payment is processed directly on the Internet Computer
                  blockchain. No card data is stored.
                </p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="space-y-2">
              {[
                "Instant course access on payment",
                "Lifetime access to all materials",
                "Secure IC blockchain transaction",
                "30-day refund policy",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Pay button */}
            <motion.button
              onClick={handlePay}
              disabled={processing}
              className="checkout-cta-button relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-ocid="checkout.pay.submit_button"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Pay {formatRupees(total)}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-80" />
            </motion.button>

            <p className="text-center text-xs text-muted-foreground">
              By completing payment, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/refund" className="text-primary hover:underline">
                Refund Policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
