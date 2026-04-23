import { c as createLucideIcon, as as useSearch, l as useCourseDetail, r as reactExports, j as jsxRuntimeExports, m as motion, a as CircleCheckBig, L as Link, B as BookOpen, x as ue } from "./index-UQyTW7IZ.js";
import { c as SiWhatsapp } from "./index-CGrCxjM1.js";
import { D as Download } from "./download-CZc12mda.js";
import { C as Copy } from "./copy-DYsgexv4.js";
import { E as ExternalLink } from "./external-link-BU97VLcY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const CONFETTI_COLORS = [
  "oklch(0.68 0.24 200)",
  // cyan
  "oklch(0.55 0.2 270)",
  // violet
  "oklch(0.6 0.25 290)",
  // magenta
  "oklch(0.75 0.18 150)",
  // green
  "oklch(0.8 0.15 60)",
  // amber
  "oklch(0.9 0.02 260)"
  // white
];
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 6 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
    drift: (Math.random() - 0.5) * 80
  }));
}
function Confetti() {
  const particles = reactExports.useRef(generateParticles(60));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 pointer-events-none overflow-hidden z-0",
      "aria-hidden": "true",
      children: [
        particles.current.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-sm",
            style: {
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
              transform: `rotate(${Math.random() * 360}deg)`
            }
          },
          p.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes confettiFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(${Math.random() > 0.5 ? "" : "-"}60px) rotate(720deg); opacity: 0; }
        }
      ` })
      ]
    }
  );
}
function ReceiptRow({
  label,
  value,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "payment-receipt-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "payment-receipt-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: highlight ? "payment-receipt-amount" : "payment-receipt-value",
        children: value
      }
    )
  ] });
}
function PaymentSuccessPage() {
  const search = useSearch({ strict: false });
  const courseIdRaw = (search == null ? void 0 : search.courseId) ?? null;
  const enrollmentId = (search == null ? void 0 : search.enrollmentId) ?? "—";
  const amountPaid = (search == null ? void 0 : search.amount) ? `₹${Number(search.amount).toLocaleString("en-IN")}` : "—";
  const courseId = courseIdRaw ? BigInt(courseIdRaw) : null;
  const { data: course } = useCourseDetail(courseId);
  const [showConfetti, setShowConfetti] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6e3);
    return () => clearTimeout(t);
  }, []);
  const orderDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/courses/${courseIdRaw}` : "";
  const whatsappMessage = encodeURIComponent(
    `🎓 Just enrolled in "${(course == null ? void 0 : course.title) ?? "a course"}" at Arthashastra Classes! Level up your commerce game 🚀 ${shareUrl}`
  );
  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
    ue.success("Link copied to clipboard!");
  }
  function handleDownloadReceipt() {
    window.print();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative min-h-screen pt-24 pb-20 px-4 flex flex-col items-center",
        "data-ocid": "payment_success.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "fixed inset-0 pointer-events-none z-0",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.68 0.24 200 / 0.08) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-2xl space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "payment-success-checkmark",
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2
                  },
                  "data-ocid": "payment_success.checkmark",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      className: "w-12 h-12 text-success",
                      strokeWidth: 1.5
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl gradient-text-cyan-violet", children: "Payment Successful!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-3 text-lg", children: [
                      "You are now enrolled in",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: (course == null ? void 0 : course.title) ?? "the course" }),
                      "."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "You now have full access to all course materials. Start learning in your dashboard." })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "payment-receipt-card",
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.7 },
                "data-ocid": "payment_success.receipt.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Receipt" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-3 py-1 rounded-full bg-success/20 text-success border border-success/40 font-semibold", children: "Enrolled ✓" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ReceiptRow,
                    {
                      label: "Order ID",
                      value: `#AC-${String(enrollmentId).padStart(6, "0")}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Course", value: (course == null ? void 0 : course.title) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Instructor", value: (course == null ? void 0 : course.instructor) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Date", value: orderDate }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Status", value: "Completed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Amount Paid", value: amountPaid, highlight: true })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col sm:flex-row gap-3",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.9 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/dashboard",
                      className: "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-bold text-primary-foreground transition-smooth glow-cyan relative overflow-hidden",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.68 0.24 200), oklch(0.55 0.2 270))"
                      },
                      "data-ocid": "payment_success.go_to_dashboard.primary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }),
                        "Go to Dashboard"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/courses",
                      className: "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-semibold text-foreground border border-primary/40 glass-morphism hover:border-primary transition-smooth",
                      "data-ocid": "payment_success.browse_courses.secondary_button",
                      children: "Browse More Courses"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleDownloadReceipt,
                      className: "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-display font-semibold text-muted-foreground border border-border glass-morphism hover:text-foreground hover:border-foreground/30 transition-smooth",
                      "data-ocid": "payment_success.download_receipt.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                        "Download Receipt"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col items-center gap-4",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 1.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Share your achievement" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-border" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `https://wa.me/?text=${whatsappMessage}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-smooth text-sm font-semibold",
                        "data-ocid": "payment_success.whatsapp_share.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SiWhatsapp, { className: "w-4 h-4" }),
                          "WhatsApp"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleCopyLink,
                        className: "flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-smooth text-sm font-semibold",
                        "data-ocid": "payment_success.copy_link.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                          "Copy Link"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: shareUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:border-border transition-smooth text-sm font-semibold",
                        "data-ocid": "payment_success.open_course.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                          "View Course"
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "p-4 rounded-xl border border-primary/20 bg-primary/5 text-center",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 1.3 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "🎓 You now have full access to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: (course == null ? void 0 : course.title) ?? "this course" }),
                  ". Head to your",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/dashboard",
                      className: "text-primary underline underline-offset-2",
                      "data-ocid": "payment_success.dashboard_inline.link",
                      children: "dashboard"
                    }
                  ),
                  " ",
                  "to start learning."
                ] })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  PaymentSuccessPage as default
};
