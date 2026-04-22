import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Mail,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const LAST_UPDATED = "April 10, 2025";

const TOC = [
  { id: "overview", title: "Overview" },
  { id: "full-refund", title: "Full Refund (Within 7 Days)" },
  { id: "partial-refund", title: "Partial Refund (7–30 Days)" },
  { id: "no-refund", title: "No Refund Conditions" },
  { id: "non-refundable", title: "Non-Refundable Items" },
  { id: "process", title: "How to Request a Refund" },
  { id: "timeline", title: "Processing Timeline" },
  { id: "exceptions", title: "Exceptions & Special Cases" },
];

import type { LucideIcon } from "lucide-react";

interface RefundTier {
  icon: LucideIcon;
  label: string;
  timeframe: string;
  amount: string;
  details: string;
  color: "cyan" | "violet" | "magenta";
}

const REFUND_TIERS: RefundTier[] = [
  {
    icon: CheckCircle,
    label: "Full Refund",
    timeframe: "Within 7 days of enrollment",
    amount: "100%",
    details:
      "Complete refund of the course fee paid, excluding any payment gateway charges.",
    color: "cyan",
  },
  {
    icon: Clock,
    label: "Partial Refund",
    timeframe: "7–30 days after enrollment",
    amount: "50%",
    details:
      "50% of the course fee refunded, provided less than 30% of course content has been accessed.",
    color: "violet",
  },
  {
    icon: XCircle,
    label: "No Refund",
    timeframe: "After 30 days or after completion",
    amount: "0%",
    details:
      "No refund once 30 days have elapsed from enrollment or if the course has been completed.",
    color: "magenta",
  },
];

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const SECTIONS: PolicySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: [
      "Arthashastra Classes is committed to providing quality education. We understand that circumstances can change, and we have designed our refund policy to be fair to both students and our institution.",
      "This policy applies to all course enrollments made through our platform. Physical products purchased from our store are governed by a separate returns policy.",
      "All refund amounts are processed in Indian Rupees (INR) to the original payment method used at the time of enrollment.",
    ],
  },
  {
    id: "full-refund",
    title: "Full Refund — Within 7 Days",
    content: [
      "A full 100% refund of the course fee is available if you submit your refund request within 7 calendar days of your enrollment date.",
      "To qualify for a full refund, the student must not have accessed more than 10% of the course content (including videos, PDFs, and test papers).",
      "Payment gateway convenience fees (typically 2–3% of the transaction) are non-refundable as they are charged by the payment processor.",
    ],
  },
  {
    id: "partial-refund",
    title: "Partial Refund — 7 to 30 Days",
    content: [
      "A 50% partial refund is available if your refund request is submitted between 7 and 30 calendar days from your enrollment date.",
      "The partial refund applies only if less than 30% of the course content has been accessed. Course access is tracked through our platform analytics.",
      "If you have attended live classes during this period, those classes will be considered part of the 30% content access threshold.",
    ],
  },
  {
    id: "no-refund",
    title: "No Refund Conditions",
    content: [
      "No refund will be issued after 30 calendar days from the enrollment date, regardless of the reason.",
      "If a student has completed or accessed more than 30% of the course content, no refund will be processed even within the 30-day window.",
      "Courses purchased during promotional or discounted periods (flash sales, scholarship batches) are non-refundable.",
      "No refund will be issued for enrollments that have been transferred to another student or course.",
    ],
  },
  {
    id: "non-refundable",
    title: "Non-Refundable Items",
    content: [
      "Study materials, printed notes, revision booklets, and any physical items dispatched or collected are strictly non-refundable once delivered or accessed.",
      "Digital downloads — including PDFs, practice papers, and PYQ bundles — are non-refundable once the download link has been accessed.",
      "Test series subscriptions are non-refundable once any test has been attempted.",
      "Registration fees, admission fees, and processing fees are non-refundable under any circumstance.",
    ],
  },
  {
    id: "process",
    title: "How to Request a Refund",
    content: [
      "Step 1: Email refunds@arthashastraclasses.in with the subject line: REFUND REQUEST — [Your Full Name] — [Enrollment ID]",
      "Step 2: Include your enrollment ID (found in your dashboard), the course name, date of enrollment, and the reason for your refund request.",
      "Step 3: Our team will review your request within 2 business days and respond with a decision and next steps.",
      "Step 4: If approved, the refund will be initiated to your original payment method within 5–10 business days.",
    ],
  },
  {
    id: "timeline",
    title: "Processing Timeline",
    content: [
      "Refund requests are reviewed within 2 business days of receipt. You will receive an email confirmation once your request has been reviewed.",
      "Approved refunds are initiated within 2 business days of approval. Depending on your bank or payment provider, the refund may take an additional 5–7 business days to reflect in your account.",
      "UPI refunds typically appear within 1–3 business days. Credit/debit card refunds may take 5–10 business days depending on your bank's processing time.",
    ],
  },
  {
    id: "exceptions",
    title: "Exceptions & Special Cases",
    content: [
      "Medical emergencies: If a student is unable to continue due to a documented medical emergency, a case-by-case review will be conducted. Supporting medical documentation will be required.",
      "Course cancellation by Arthashastra Classes: If we cancel a course batch with fewer than 10 business days' notice, a full refund will be provided to all enrolled students regardless of access percentage.",
      "Technical issues: If a documented platform outage prevented access to course content for more than 5 consecutive days, this period will not count toward the refund window.",
    ],
  },
];

const GLOW_COLORS = ["cyan", "violet", "magenta"] as const;

export default function RefundPolicyPage() {
  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[50vh] flex flex-col justify-center py-20"
        data-ocid="refund.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/8 via-background to-cyan-500/8 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-4 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.60 0.25 290) 1px, transparent 1px), linear-gradient(90deg, oklch(0.60 0.25 290) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
            aria-label="breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-cyan-400 transition-colors"
              data-ocid="refund.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-fuchsia-400">Refund Policy</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center shrink-0 border border-fuchsia-500 shadow-[0_0_15px_oklch(0.60_0.25_290/0.5)]">
              <RefreshCw className="w-8 h-8 text-fuchsia-400" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-3 px-3 py-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/5">
                Legal
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Refund <span className="gradient-text-cyan-violet">Policy</span>
              </h1>
              <p className="text-muted-foreground text-base">
                Last updated:{" "}
                <span className="text-foreground font-semibold">
                  {LAST_UPDATED}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK TIERS ── */}
      <section
        className="py-16 bg-muted/10 border-y border-white/5"
        data-ocid="refund.tiers.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">
              At a <span className="gradient-text-cyan-violet">Glance</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              Our refund tiers summarized
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REFUND_TIERS.map((tier, i) => (
              <AnimatedSection key={tier.label} delay={i * 0.1}>
                <GlowCard
                  glowColor={tier.color}
                  className="p-8 text-center h-full"
                  data-ocid={`refund.tier.item.${i + 1}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      tier.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : tier.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                  >
                    <tier.icon className="w-7 h-7" />
                  </div>
                  <div
                    className={`font-display text-4xl font-extrabold mb-2 ${
                      tier.color === "cyan"
                        ? "text-cyan-400"
                        : tier.color === "violet"
                          ? "text-violet-400"
                          : "text-fuchsia-400"
                    }`}
                  >
                    {tier.amount}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {tier.label}
                  </h3>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide mb-3 ${
                      tier.color === "cyan"
                        ? "text-cyan-400"
                        : tier.color === "violet"
                          ? "text-violet-400"
                          : "text-fuchsia-400"
                    }`}
                  >
                    {tier.timeframe}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tier.details}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section
        className="py-16 bg-background"
        data-ocid="refund.content.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" data-ocid="refund.toc.panel">
                <GlowCard glowColor="magenta" className="p-6">
                  <h2 className="font-display text-sm font-bold uppercase tracking-widest text-fuchsia-400 mb-4">
                    Contents
                  </h2>
                  <nav>
                    <ul className="space-y-2">
                      {TOC.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-muted-foreground hover:text-fuchsia-400 transition-colors text-sm leading-snug block py-1"
                            data-ocid={`refund.toc.${item.id}_link`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </GlowCard>

                {/* Contact card */}
                <GlowCard glowColor="cyan" className="p-6 mt-6">
                  <Mail className="w-5 h-5 text-cyan-400 mb-3" />
                  <h3 className="font-display text-sm font-bold text-foreground mb-2">
                    Need help?
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3">
                    Contact our support team for refund assistance.
                  </p>
                  <a
                    href="mailto:refunds@arthashastraclasses.in"
                    className="text-cyan-400 text-xs font-semibold hover:underline"
                    data-ocid="refund.contact.email_link"
                  >
                    refunds@arthashastraclasses.in
                  </a>
                </GlowCard>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Warning banner */}
              <AnimatedSection>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-orange-400/30 bg-orange-400/5">
                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="text-orange-400 font-semibold">
                      Important:{" "}
                    </span>
                    Study materials, printed notes, and downloaded digital
                    resources are non-refundable once accessed. Please review
                    course details carefully before enrollment.
                  </p>
                </div>
              </AnimatedSection>

              {SECTIONS.map((section, i) => (
                <AnimatedSection key={section.id} delay={i * 0.05}>
                  <div
                    id={section.id}
                    className="scroll-mt-24"
                    data-ocid={`refund.section.${i + 1}`}
                  >
                    <GlowCard glowColor={GLOW_COLORS[i % 3]} className="p-8">
                      <h2 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                            i % 3 === 0
                              ? "bg-cyan-500/10 text-cyan-400"
                              : i % 3 === 1
                                ? "bg-violet-500/10 text-violet-400"
                                : "bg-fuchsia-500/10 text-fuchsia-400"
                          }`}
                        >
                          {i + 1}
                        </span>
                        {section.title}
                      </h2>
                      <div className="space-y-3">
                        {section.content.map((para, j) => (
                          <p
                            key={`${section.id}-p${j}`}
                            className="text-muted-foreground leading-relaxed text-sm"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </GlowCard>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:scale-105 transition-smooth text-sm"
                    data-ocid="refund.footer.contact_link"
                  >
                    Contact Support <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/terms"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-muted-foreground hover:border-violet-400/50 hover:text-violet-400 transition-smooth text-sm"
                    data-ocid="refund.footer.terms_link"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
