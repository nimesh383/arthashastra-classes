import { h as useNavigate, g as useAuth, as as useSearch, l as useCourseDetail, r as reactExports, t as useValidateCoupon, v as usePurchaseCourse, w as useConfirmPayment, at as DiscountType, j as jsxRuntimeExports, L as Link, m as motion, T as Tag, X, a as CircleCheckBig, x as ue, A as AnimatePresence } from "./index-UQyTW7IZ.js";
import { A as ArrowLeft } from "./arrow-left-EvhSeW3I.js";
import { S as ShieldCheck } from "./shield-check-CgJmQh30.js";
import { L as Lock } from "./lock-BiQ5d9JX.js";
function formatRupees(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}
const GST_RATE = 0.18;
function ProcessingOverlay() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center",
      style: { background: "oklch(0.12 0.05 260 / 0.92)" },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "checkout.loading_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6 glass-morphism rounded-2xl p-10 border border-primary/40 glow-cyan", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "absolute inset-0 m-auto w-7 h-7 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: "Processing Payment…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Securing your enrollment on the IC blockchain. Please don't close this window." })
      ] })
    }
  ) });
}
function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();
  const search = useSearch({ strict: false });
  const courseIdRaw = (search == null ? void 0 : search.courseId) ?? null;
  const courseId = courseIdRaw ? BigInt(courseIdRaw) : null;
  const { data: course, isLoading: courseLoading } = useCourseDetail(courseId);
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const { data: couponData, isLoading: couponLoading } = useValidateCoupon(appliedCoupon);
  const couponValid = couponData && !("__kind__" in couponData) ? couponData.isActive : false;
  const [cardHolder, setCardHolder] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [processing, setProcessing] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState(
    {}
  );
  const purchaseMutation = usePurchaseCourse();
  const confirmMutation = useConfirmPayment();
  const basePrice = course ? Number(course.price) : 0;
  let discount = 0;
  if (couponValid && couponData) {
    const c = couponData;
    if (c.discountType === DiscountType.percent) {
      discount = Math.floor(basePrice * (c.value / 100));
    } else {
      discount = Math.min(c.value, basePrice);
    }
  }
  const subtotal = basePrice - discount;
  const gst = Math.floor(subtotal * GST_RATE);
  const total = subtotal + gst;
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      login();
    }
  }, [authLoading, isAuthenticated, login]);
  function validate() {
    const newErrors = {};
    if (!cardHolder.trim()) newErrors.cardHolder = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handlePay() {
    if (!validate() || !course || !courseId) return;
    setProcessing(true);
    try {
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const enrollment = await purchaseMutation.mutateAsync({
        courseId,
        amountPaid: BigInt(total),
        paymentId
      });
      await confirmMutation.mutateAsync({
        enrollmentId: enrollment.id,
        paymentId
      });
      navigate({
        to: "/payment-success",
        search: {
          courseId: courseIdRaw ?? "",
          enrollmentId: String(enrollment.id),
          amount: String(total)
        }
      });
    } catch (err) {
      setProcessing(false);
      ue.error(
        err instanceof Error ? err.message : "Payment failed. Please retry."
      );
    }
  }
  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setAppliedCoupon(couponInput.trim().toUpperCase());
  }
  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
  }
  if (courseLoading || authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-24 pb-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-2xl p-8 animate-pulse space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted/40 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted/40 rounded w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted/40 rounded w-1/2" })
        ]
      },
      i
    )) }) });
  }
  if (!course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Course not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/courses",
          className: "text-primary underline",
          "data-ocid": "checkout.back_link",
          children: "Browse Courses"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    processing && /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessingOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pt-24 pb-20 px-4", "data-ocid": "checkout.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/courses/$id",
            params: { id: courseIdRaw ?? "0" },
            className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth text-sm",
            "data-ocid": "checkout.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Course"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h1,
          {
            className: "font-display font-bold text-3xl md:text-4xl text-foreground mt-4 gradient-text-cyan-violet",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: "Secure Checkout"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          "Complete your enrollment for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: course.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "checkout-summary-card",
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            "data-ocid": "checkout.order_summary.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }),
                "Order Summary"
              ] }),
              course.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-white/10 h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: course.imageUrl,
                  alt: course.title,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground leading-snug", children: course.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
                  "Instructor:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: course.instructor })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                  "Duration:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: course.duration })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-item-row", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Course Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatRupees(basePrice) })
                ] }),
                discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-item-row text-green-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                    " Coupon Discount"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "−",
                    formatRupees(discount)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-item-row", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatRupees(gst) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-total-row", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatRupees(total) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "checkout.coupon.section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "couponInput",
                    className: "checkout-form-label flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
                      "Coupon Code"
                    ]
                  }
                ),
                appliedCoupon && couponValid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 rounded-lg border border-green-400/50 bg-green-400/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-semibold text-sm", children: [
                    appliedCoupon,
                    " applied!"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleRemoveCoupon,
                      className: "text-muted-foreground hover:text-foreground",
                      "data-ocid": "checkout.coupon.remove_button",
                      "aria-label": "Remove coupon",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "couponInput",
                      type: "text",
                      value: couponInput,
                      onChange: (e) => setCouponInput(e.target.value.toUpperCase()),
                      placeholder: "Enter code",
                      className: "checkout-form-input flex-1",
                      "data-ocid": "checkout.coupon.input",
                      onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleApplyCoupon,
                      disabled: couponLoading,
                      className: "px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg text-sm font-semibold transition-smooth hover:bg-primary/30 disabled:opacity-50",
                      "data-ocid": "checkout.coupon.apply_button",
                      children: "Apply"
                    }
                  )
                ] }),
                appliedCoupon && !couponValid && !couponLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-xs",
                    "data-ocid": "checkout.coupon.error_state",
                    children: "Invalid or expired coupon code."
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "glass-morphism rounded-2xl p-8 border border-white/10 space-y-6",
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.2 },
            "data-ocid": "checkout.payment_form.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-primary" }),
                "Payment Details"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cardHolder", className: "checkout-form-label", children: "Card Holder Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cardHolder",
                    type: "text",
                    value: cardHolder,
                    onChange: (e) => setCardHolder(e.target.value),
                    onBlur: validate,
                    placeholder: "Full name on card",
                    className: "checkout-form-input",
                    "data-ocid": "checkout.cardholder.input"
                  }
                ),
                errors.cardHolder && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-xs mt-1",
                    "data-ocid": "checkout.cardholder.field_error",
                    children: errors.cardHolder
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "checkout-form-label", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onBlur: validate,
                    placeholder: "your@email.com",
                    className: "checkout-form-input",
                    "data-ocid": "checkout.email.input"
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-xs mt-1",
                    "data-ocid": "checkout.email.field_error",
                    children: errors.email
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Secure Payment via IC Backend" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your payment is processed directly on the Internet Computer blockchain. No card data is stored." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "Instant course access on payment",
                "Lifetime access to all materials",
                "Secure IC blockchain transaction",
                "30-day refund policy"
              ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    feat
                  ]
                },
                feat
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  onClick: handlePay,
                  disabled: processing,
                  className: "checkout-cta-button relative overflow-hidden",
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  "data-ocid": "checkout.pay.submit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                      "Pay ",
                      formatRupees(total)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-80" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                "By completing payment, you agree to our",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-primary hover:underline", children: "Terms" }),
                " ",
                "and",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/refund", className: "text-primary hover:underline", children: "Refund Policy" }),
                "."
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
