import { j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight } from "./index-UQyTW7IZ.js";
import { G as GlowCard, A as AnimatedSection } from "./GlowCard-D30Lpwpe.js";
import { S as Shield } from "./shield-BUVvJVcb.js";
const LAST_UPDATED = "April 10, 2025";
const TOC = [
  { id: "information-collected", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "data-storage", title: "Data Storage & Security" },
  { id: "third-party", title: "Third-Party Disclosure" },
  { id: "student-data", title: "Student & Minor Data" },
  { id: "payment-data", title: "Payment Information" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "your-rights", title: "Your Rights" },
  { id: "contact", title: "Contact Us" }
];
const SECTIONS = [
  {
    id: "information-collected",
    title: "Information We Collect",
    content: [
      "We collect personal information you voluntarily provide when registering, purchasing courses, or contacting us — including your full name, email address, phone number, and postal address.",
      "When you use our platform, we automatically collect usage data such as pages visited, session duration, device type, browser, and IP address to improve your learning experience.",
      "If you enroll in a course, we collect enrollment and progress data, including completed lessons, test scores, and attendance records."
    ]
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      "Your information is used to create and manage your student account, process enrollments and payments, deliver course materials, and communicate important updates about your courses.",
      "We use aggregated, anonymized data to improve course content, teaching methodologies, and platform performance.",
      "With your consent, we may send newsletters, promotional offers, and educational content relevant to your studies. You may unsubscribe at any time.",
      "We do not sell, trade, or rent your personal information to third parties for their marketing purposes."
    ]
  },
  {
    id: "data-storage",
    title: "Data Storage & Security",
    content: [
      "All data is stored securely on servers protected with industry-standard encryption (AES-256). We use HTTPS/TLS for all data in transit.",
      "We retain your personal data for as long as your account is active or as required by Indian law (IT Act 2000, DPDP Act 2023). Inactive accounts are purged after 3 years with prior notice.",
      "In the event of a data breach, we will notify affected users within 72 hours as per applicable legal requirements."
    ]
  },
  {
    id: "third-party",
    title: "Third-Party Disclosure",
    content: [
      "We share minimal necessary data with trusted third-party service providers who assist in delivering our services, including payment processors (Razorpay), cloud infrastructure providers, and analytics services.",
      "All third-party partners are contractually bound to maintain confidentiality and may not use your data for any purpose other than providing services to Arthashastra Classes.",
      "We may disclose your information if required by Indian law, court order, or government authority."
    ]
  },
  {
    id: "student-data",
    title: "Student & Minor Data",
    content: [
      "Students under 18 years of age must have parental or guardian consent before registering on our platform.",
      "We do not knowingly collect personal data from children under 13 without verified parental consent. If we become aware that a child under 13 has provided personal data without consent, we will promptly delete it.",
      "Academic performance data (test scores, attendance, progress reports) is accessible only to the student and authorized staff at Arthashastra Classes."
    ]
  },
  {
    id: "payment-data",
    title: "Payment Information",
    content: [
      "All payment transactions are processed via Razorpay, a PCI-DSS compliant payment gateway. We do not store credit/debit card numbers or CVV details on our servers.",
      "Transaction records including payment amount, date, course purchased, and payment status are retained for accounting and tax compliance under GST regulations applicable in India.",
      "Refund processing follows our Refund Policy. Approved refunds are initiated to the original payment method within 5–10 business days."
    ]
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: [
      "We use essential cookies to maintain your login session and preferences. These are required for the platform to function and cannot be disabled.",
      "Analytics cookies (Google Analytics) help us understand how students use the platform so we can improve the experience. You may opt out via your browser settings.",
      "We do not use advertising or cross-site tracking cookies."
    ]
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "Under India's Digital Personal Data Protection Act (DPDP) 2023, you have the right to access, correct, and erase your personal data held by us.",
      "You may request a copy of all personal data we hold about you by contacting us at the email below. We will respond within 30 days.",
      "You have the right to withdraw consent for non-essential data processing at any time, without affecting the lawfulness of processing based on prior consent."
    ]
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "For any privacy-related questions, requests, or concerns, please contact our data protection officer:",
      "Arthashastra Classes | MP Nagar, Bhopal, Madhya Pradesh — 462011 | Email: privacy@arthashastraclasses.in | Phone: +91-755-XXXXXXXX",
      "This privacy policy is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bhopal, Madhya Pradesh."
    ]
  }
];
const GLOW_COLORS = ["cyan", "violet", "magenta"];
function PrivacyPolicyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[50vh] flex flex-col justify-center py-20",
        "data-ocid": "privacy.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-violet-600/8 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-4 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.nav,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "flex items-center gap-2 text-xs text-muted-foreground mb-6",
                "aria-label": "breadcrumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:text-cyan-400 transition-colors",
                      "data-ocid": "privacy.breadcrumb.home_link",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", children: "Privacy Policy" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.1 },
                className: "flex items-start gap-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 neon-border-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-cyan-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Legal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4", children: [
                      "Privacy",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Policy" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base", children: [
                      "Last updated:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: LAST_UPDATED })
                    ] })
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-background",
        "data-ocid": "privacy.content.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24", "data-ocid": "privacy.toc.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: "cyan", className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4", children: "Contents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: TOC.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `#${item.id}`,
                className: "text-muted-foreground hover:text-cyan-400 transition-colors text-sm leading-snug block py-1",
                "data-ocid": `privacy.toc.${item.id}_link`,
                children: item.title
              }
            ) }, item.id)) }) })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowCard, { glowColor: "violet", className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: 'Arthashastra Classes ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and share your information when you use our educational platform, website, or any of our services. By accessing our platform, you agree to the terms of this policy.' }) }) }),
            SECTIONS.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                id: section.id,
                className: "scroll-mt-24",
                "data-ocid": `privacy.section.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: GLOW_COLORS[i % 3], className: "p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-5 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${i % 3 === 0 ? "bg-cyan-500/10 text-cyan-400" : i % 3 === 1 ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                        children: i + 1
                      }
                    ),
                    section.title
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: section.content.map((para, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-muted-foreground leading-relaxed text-sm",
                      children: para
                    },
                    `${section.id}-p${j}`
                  )) })
                ] })
              }
            ) }, section.id))
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  PrivacyPolicyPage as default
};
