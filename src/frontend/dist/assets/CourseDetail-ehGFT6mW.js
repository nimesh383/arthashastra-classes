import { k as useParams, l as useCourseDetail, n as useTeachers, o as useMyEnrollments, p as useActor, g as useAuth, r as reactExports, q as useMyVideosForCourse, s as useVideosByCourse, j as jsxRuntimeExports, L as Link, m as motion, U as Users, B as BookOpen, G as GraduationCap, a as CircleCheckBig, F as FileText, i as LogIn, t as useValidateCoupon, X, T as Tag, h as useNavigate, v as usePurchaseCourse, w as useConfirmPayment, M as MagneticButton, C as ChevronRight, x as ue, y as createActor } from "./index-UQyTW7IZ.js";
import { G as GlowCard, A as AnimatedSection } from "./GlowCard-D30Lpwpe.js";
import { V as VideoPlayer, P as Play } from "./VideoPlayer-B4CMSxn4.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { A as ArrowLeft } from "./arrow-left-EvhSeW3I.js";
import { C as Clock } from "./clock-CRcJU_VI.js";
import { S as ShieldCheck } from "./shield-check-CgJmQh30.js";
import { L as Lock } from "./lock-BiQ5d9JX.js";
import { V as Video } from "./video-B8eN7M2n.js";
const LEVEL_LABELS = {
  Class11: "Class 11",
  Class12: "Class 12",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Dropper: "Dropper"
};
function getGlowColor(subject) {
  if (subject === "Economics" || subject === "Maths") return "violet";
  if (subject === "BST" || subject === "Commerce") return "magenta";
  return "cyan";
}
function getAccentClass(glowColor) {
  if (glowColor === "violet") return "text-violet-400";
  if (glowColor === "magenta") return "text-fuchsia-400";
  return "text-cyan-400";
}
function MaterialRow({
  material,
  isEnrolled,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center gap-4 glass-morphism rounded-xl p-4 border border-white/10 overflow-hidden",
      "data-ocid": `course_detail.material.item.${index + 1}`,
      children: [
        !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 backdrop-blur-[2px] bg-background/40 z-10 flex items-center justify-end pr-4 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground/60 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
          "Unlock after purchase"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-cyan-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: material.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: material.materialType })
        ] }),
        isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-cyan-400 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground/40 shrink-0" })
      ]
    }
  );
}
function CourseDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mb-8 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 rounded" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-80 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }) })
    ] })
  ] }) }) });
}
function CouponInput({
  originalPrice,
  onDiscountChange
}) {
  const [code, setCode] = reactExports.useState("");
  const [applied, setApplied] = reactExports.useState(null);
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
  const discountedPrice = (() => {
    if (!coupon || !applied || isError) return null;
    const orig = Number(originalPrice);
    if (coupon.discountType === "percent") {
      return BigInt(Math.max(0, Math.round(orig * (1 - coupon.value / 100))));
    }
    return BigInt(Math.max(0, Math.round(orig - coupon.value)));
  })();
  reactExports.useEffect(() => {
    onDiscountChange(discountedPrice);
  }, [discountedPrice, onDiscountChange]);
  const isValid = applied !== null && !isFetching && coupon !== null && coupon !== void 0;
  const isInvalid = applied !== null && !isFetching && (coupon === null || coupon === void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", "data-ocid": "course_detail.coupon.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: "coupon-code-input",
        className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block",
        children: "Coupon Code (optional)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "coupon-code-input",
            value: code,
            onChange: (e) => {
              setCode(e.target.value.toUpperCase());
              if (applied) setApplied(null);
              onDiscountChange(null);
            },
            placeholder: "Enter code",
            className: `w-full bg-white/5 border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-smooth pr-8 ${isValid ? "border-cyan-500/50 focus:border-cyan-400" : isInvalid ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-white/30"}`,
            "data-ocid": "course_detail.coupon.input"
          }
        ),
        applied && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleClear,
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
            "aria-label": "Clear coupon",
            "data-ocid": "course_detail.coupon.clear_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleApply,
          disabled: !code.trim() || isFetching,
          className: "px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 transition-smooth text-foreground whitespace-nowrap",
          "data-ocid": "course_detail.coupon.apply_button",
          children: isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" }) : "Apply"
        }
      )
    ] }),
    isValid && discountedPrice !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "mt-1.5 text-xs text-cyan-400 flex items-center gap-1.5 font-medium",
        "data-ocid": "course_detail.coupon.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
          "Code applied! You save ₹",
          (Number(originalPrice) - Number(discountedPrice)).toLocaleString(
            "en-IN"
          )
        ]
      }
    ),
    isInvalid && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "mt-1.5 text-xs text-red-400 font-medium",
        "data-ocid": "course_detail.coupon.error_state",
        children: "Invalid or expired coupon code."
      }
    )
  ] });
}
function PurchaseButton({
  courseId,
  price,
  title
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const purchaseMutation = usePurchaseCourse();
  const confirmMutation = useConfirmPayment();
  const [isPurchasing, setIsPurchasing] = reactExports.useState(false);
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      window.location.href = `/login?returnTo=/courses/${courseId}`;
      return;
    }
    setIsPurchasing(true);
    try {
      const paymentRef = `stripe_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const enrollment = await purchaseMutation.mutateAsync({
        courseId,
        amountPaid: price,
        paymentId: paymentRef
      });
      const confirmed = await confirmMutation.mutateAsync({
        enrollmentId: enrollment.id,
        paymentId: paymentRef
      });
      if (confirmed) {
        ue.success(
          `Enrolled in "${title}"! Access your course from the dashboard.`,
          {
            duration: 5e3
          }
        );
        navigate({ to: "/dashboard" });
      } else {
        ue.error("Payment could not be confirmed. Please contact support.");
      }
    } catch {
      ue.error("Enrollment failed. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handlePurchase,
        className: "block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth",
        "data-ocid": "course_detail.login_to_access.button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
          "Login to Access"
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handlePurchase,
      disabled: isPurchasing,
      className: "block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
      "data-ocid": "course_detail.purchase.button",
      children: isPurchasing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" }),
        "Processing…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
        "Buy Now — Instant Access",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
      ] })
    }
  ) });
}
function CourseDetailPage() {
  const { id } = useParams({ strict: false });
  const courseId = id ? BigInt(id) : null;
  const courseIdStr = id ?? null;
  const { data: course, isLoading: courseLoading } = useCourseDetail(courseId);
  const { data: teachers } = useTeachers();
  const { data: enrollments } = useMyEnrollments();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const [materials, setMaterials] = reactExports.useState([]);
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  const [discountedPrice, setDiscountedPrice] = reactExports.useState(null);
  const isEnrolled = reactExports.useMemo(() => {
    if (!enrollments || !courseId) return false;
    return enrollments.some(
      (e) => e.courseId === courseId && e.status === "Completed"
    );
  }, [enrollments, courseId]);
  const { data: myVideos = [], isLoading: loadingMyVideos } = useMyVideosForCourse(isEnrolled ? courseIdStr : null);
  const { data: publicVideos = [], isLoading: loadingPublicVideos } = useVideosByCourse(!isEnrolled ? courseIdStr : null);
  const videos = isEnrolled ? myVideos : publicVideos;
  const loadingVideos = isEnrolled ? loadingMyVideos : loadingPublicVideos;
  reactExports.useEffect(() => {
    if (!actor || actorFetching || !courseId) return;
    actor.getMaterialsForCourse(courseId).then(setMaterials).catch(() => setMaterials([]));
  }, [actor, actorFetching, courseId]);
  reactExports.useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);
  if (courseLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(CourseDetailSkeleton, {});
  if (!course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-16 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", "data-ocid": "course_detail.not_found", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Course not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/courses",
          className: "text-cyan-400 hover:text-cyan-300 transition-smooth flex items-center gap-2 justify-center",
          "data-ocid": "course_detail.back.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Courses"
          ]
        }
      )
    ] }) });
  }
  const glowColor = getGlowColor(course.subject);
  const accentClass = getAccentClass(glowColor);
  const courseTeachers = (teachers ?? []).filter(
    (t) => course.teacherIds.some((tid) => tid === t.id)
  );
  const teacherNames = courseTeachers.length > 0 ? courseTeachers.map((t) => t.name).join(", ") : course.instructor;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 overflow-hidden select-none",
      onContextMenu: (e) => e.preventDefault(),
      "data-ocid": "course_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "py-20 relative",
            "data-ocid": "course_detail.hero.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -rotate-[25deg] text-white/[0.03] text-7xl font-bold whitespace-nowrap tracking-widest", children: "ARTHASHASTRA CLASSES" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `absolute inset-0 bg-gradient-to-br pointer-events-none opacity-30 ${glowColor === "cyan" ? "from-cyan-500/10 to-transparent" : glowColor === "violet" ? "from-violet-600/10 to-transparent" : "from-fuchsia-600/10 to-transparent"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/courses",
                        className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8",
                        "data-ocid": "course_detail.back.link",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                          " Back to Courses"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-12", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs font-bold uppercase tracking-widest mb-3 block ${accentClass}`,
                            children: course.subject
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight", children: course.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-6", children: course.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground mb-8", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-cyan-400" }),
                            course.duration
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-cyan-400" }),
                            teacherNames
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-cyan-400" }),
                            LEVEL_LABELS[course.level] ?? course.level
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 text-cyan-400" }),
                            course.subject
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                          "Live Sessions",
                          "Recorded Lectures",
                          "Doubt Clearing",
                          "Study Materials",
                          "Mock Boards",
                          "PYQ Analysis"
                        ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-xs px-3 py-1.5 rounded-full glass-morphism border border-white/10 text-foreground/80 flex items-center gap-1",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-cyan-400" }),
                              f
                            ]
                          },
                          f
                        )) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-80 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor, className: "p-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: discountedPrice !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl font-extrabold gradient-text-cyan-violet", children: [
                            "₹",
                            Number(discountedPrice).toLocaleString("en-IN")
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg font-bold text-muted-foreground line-through", children: [
                            "₹",
                            Number(course.price).toLocaleString("en-IN")
                          ] })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl font-extrabold gradient-text-cyan-violet", children: [
                          "₹",
                          Number(course.price).toLocaleString("en-IN")
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-4", children: [
                          "Full ",
                          course.duration,
                          " program"
                        ] }),
                        materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-cyan-400 mb-4 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 shrink-0" }),
                          "Includes ",
                          materials.length,
                          " study material",
                          materials.length !== 1 ? "s" : ""
                        ] }),
                        isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "space-y-3",
                            "data-ocid": "course_detail.enrolled.badge",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm justify-center", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                                "You're Enrolled!"
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Link,
                                {
                                  to: "/dashboard",
                                  className: "block w-full text-center px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground text-sm font-medium hover:border-cyan-400/50 transition-smooth",
                                  "data-ocid": "course_detail.dashboard.link",
                                  children: "Go to Dashboard"
                                }
                              )
                            ]
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CouponInput,
                            {
                              originalPrice: course.price,
                              onDiscountChange: setDiscountedPrice
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            PurchaseButton,
                            {
                              courseId: course.id,
                              price: discountedPrice ?? course.price,
                              title: course.title
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/contact",
                              className: "block w-full text-center px-6 py-3 rounded-xl glass-morphism border border-white/20 text-foreground text-sm font-medium hover:border-cyan-400/50 transition-smooth",
                              "data-ocid": "course_detail.enquiry.button",
                              children: "Ask a Question"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4 flex items-center gap-1.5 justify-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-cyan-400/70" }),
                          "Secure payment · Instant access"
                        ] })
                      ] }) })
                    ] })
                  ]
                }
              ) })
            ]
          }
        ),
        materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-16 bg-muted/10 relative",
            "data-ocid": "course_detail.materials.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-extrabold text-foreground", children: "Included Study Materials" }),
                  !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                    "Purchase to unlock"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isEnrolled ? "All materials are unlocked. Access them from your dashboard." : "Enroll once to access all materials for this course." })
              ] }),
              !isAuthenticated && Number(course.price) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5 },
                  className: "relative",
                  "data-ocid": "course_detail.materials.auth_gate",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 select-none pointer-events-none", children: [
                      materials.slice(0, 3).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "relative flex items-center gap-4 glass-morphism rounded-xl p-4 border border-white/10 overflow-hidden",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 backdrop-blur-sm bg-background/50 z-10" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-cyan-400" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: m.title }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: m.materialType })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground/40 shrink-0" })
                          ]
                        },
                        String(m.id)
                      )),
                      materials.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pt-1", children: [
                        "+",
                        materials.length - 3,
                        " more materials"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center glass-morphism border border-white/10 rounded-2xl p-8", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-cyan-400" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-2", children: "Login to Access Course Materials" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-5 max-w-xs mx-auto", children: [
                        "Sign in to enroll and unlock all ",
                        materials.length,
                        " study materials included in this course."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            window.location.href = `/login?returnTo=/courses/${courseId}`;
                          },
                          className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-smooth",
                          "data-ocid": "course_detail.materials.login_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                            "Login to Access"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: materials.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                MaterialRow,
                {
                  material: m,
                  isEnrolled,
                  index: i
                }
              ) }, String(m.id))) }),
              isAuthenticated && !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.3, className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-4", children: [
                "One payment unlocks all ",
                materials.length,
                " materials for this course."
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-16 bg-muted/5 relative",
            "data-ocid": "course_detail.tutorials.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-extrabold text-foreground", children: "Course Tutorials" }),
                  !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                    "Enroll to unlock all"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isEnrolled ? "All video tutorials are unlocked. Watch them anytime." : "Preview free lessons. Enroll to unlock the full playlist." })
              ] }),
              activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  className: "mb-8",
                  "data-ocid": "course_detail.tutorials.player",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VideoPlayer,
                      {
                        videoUrl: activeVideo.videoUrl,
                        title: activeVideo.title,
                        onClose: () => setActiveVideo(null)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 px-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: activeVideo.title }),
                      activeVideo.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: activeVideo.description })
                    ] })
                  ]
                }
              ),
              loadingVideos ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 h-16 animate-pulse"
                },
                n
              )) }) : videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 p-10 text-center",
                  "data-ocid": "course_detail.tutorials.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No tutorials yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Video content will be added here soon." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: videos.map((video, i) => {
                const isLocked = !isEnrolled && !video.isPreview;
                const isActive = (activeVideo == null ? void 0 : activeVideo.id) === video.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: isLocked,
                    onClick: () => isLocked ? void 0 : setActiveVideo(video),
                    className: `w-full text-left flex items-center gap-4 glass-morphism rounded-xl border p-3 transition-smooth group ${isActive ? "border-cyan-500/50 bg-cyan-500/5" : isLocked ? "border-white/5 opacity-60 cursor-not-allowed" : "border-white/10 hover:border-cyan-500/30 cursor-pointer"}`,
                    "data-ocid": `course_detail.tutorials.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${isActive ? "bg-cyan-500 text-white" : isLocked ? "bg-white/5 text-muted-foreground/40" : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"}`,
                          children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-white" }) : isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i + 1 })
                        }
                      ),
                      video.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-10 rounded-md overflow-hidden shrink-0 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: video.thumbnailUrl,
                          alt: video.title,
                          className: "w-full h-full object-cover",
                          draggable: false
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-sm font-medium truncate ${isActive ? "text-cyan-400" : "text-foreground"}`,
                            children: video.title
                          }
                        ),
                        video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: video.description })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 ml-2", children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
                        "Enroll to Watch"
                      ] }) : video.isPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-smooth" }) })
                    ]
                  }
                ) }, video.id);
              }) }),
              !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.3, className: "mt-8 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: "Login and enroll to unlock all video tutorials." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      window.location.href = `/login?returnTo=/courses/${courseId}`;
                    },
                    className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white transition-smooth",
                    "data-ocid": "course_detail.tutorials.login_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                      "Login to Unlock"
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        courseTeachers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "py-16 bg-background",
            "data-ocid": "course_detail.teachers.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-extrabold text-foreground mb-2", children: "Meet Your Faculty" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: courseTeachers.map((teacher, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowCard,
                {
                  glowColor,
                  className: "p-5 flex items-center gap-4",
                  "data-ocid": `course_detail.teacher.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 flex items-center justify-center shrink-0 text-lg font-bold text-foreground", children: teacher.name.charAt(0) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight truncate", children: teacher.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: teacher.specialization })
                    ] })
                  ]
                }
              ) }, String(teacher.id))) })
            ] })
          }
        )
      ]
    }
  );
}
export {
  CourseDetailPage as default
};
