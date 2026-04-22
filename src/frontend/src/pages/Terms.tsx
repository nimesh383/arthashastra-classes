import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import { Link } from "@tanstack/react-router";
import { ChevronRight, FileText } from "lucide-react";
import { motion } from "motion/react";

const LAST_UPDATED = "April 10, 2025";

const TOC = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "enrollment", title: "Enrollment Terms" },
  { id: "payment", title: "Payment Terms" },
  { id: "refund-reference", title: "Refund Policy Reference" },
  { id: "conduct", title: "Code of Conduct" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "disclaimer", title: "Disclaimer of Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "amendments", title: "Amendments" },
];

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const SECTIONS: PolicySection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the Arthashastra Classes platform, website, or any of our educational services, you agree to be legally bound by these Terms & Conditions.",
      "If you do not agree with any part of these terms, you must not use our services. Your continued use of the platform after any changes to these terms constitutes your acceptance of the updated terms.",
      "These terms apply to all users including students, guardians, teachers, and visitors.",
    ],
  },
  {
    id: "enrollment",
    title: "Enrollment Terms",
    content: [
      "Enrollment in any course offered by Arthashastra Classes is subject to availability and payment of applicable fees. Enrollment is confirmed only upon receipt of full payment.",
      "Batch timings, course schedules, and faculty assignments are subject to change at the discretion of Arthashastra Classes. We will provide reasonable advance notice of any significant changes.",
      "Students must meet the eligibility criteria (class/grade level) for the course they enroll in. Arthashastra Classes reserves the right to transfer a student to a more appropriate batch.",
      "Access to course materials, videos, and resources is granted for the duration of the enrolled course or batch only, unless stated otherwise.",
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      "All fees are quoted and charged in Indian Rupees (INR) inclusive of applicable GST. Payment must be made in full before course access is granted, unless an installment plan is explicitly agreed upon.",
      "We accept UPI, debit cards, credit cards, and net banking via our secure payment partner Razorpay.",
      "Course fees do not include the cost of physical textbooks, stationery, or third-party materials unless explicitly stated in the course description.",
      "Arthashastra Classes reserves the right to revise course fees for new admissions. Existing enrolled students will not be affected mid-course.",
    ],
  },
  {
    id: "refund-reference",
    title: "Refund Policy Reference",
    content: [
      "Our detailed refund policy is available at arthashastraclasses.in/refund. Key highlights: full refund within 7 days, partial refund within 7–30 days, no refund after 30 days or after course completion.",
      "Study materials, printed notes, and digital downloads are non-refundable once accessed.",
      "Refund requests must be submitted via email to refunds@arthashastraclasses.in with your enrollment ID and reason.",
    ],
  },
  {
    id: "conduct",
    title: "Code of Conduct",
    content: [
      "Students are expected to maintain respectful and professional conduct in all interactions with faculty, staff, and fellow students — both online and offline.",
      "Sharing, distributing, reproducing, or selling course materials, lecture recordings, PDFs, or test papers is strictly prohibited and may result in immediate account termination and legal action.",
      "Disruptive behavior in live classes, doubt sessions, or on any platform forum may result in suspension or termination of enrollment without refund.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "All course content, study materials, lecture notes, test questions, videos, brand assets, and website content are the exclusive intellectual property of Arthashastra Classes and its educators.",
      "You are granted a limited, non-exclusive, non-transferable license to access course materials solely for your personal educational use during your enrollment period.",
      "Any reproduction, modification, distribution, or commercial use of our intellectual property without prior written consent is strictly prohibited.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    content: [
      "Arthashastra Classes provides coaching and educational support. We do not guarantee specific marks, grades, or board examination results. Academic outcomes depend on individual effort, aptitude, and factors outside our control.",
      "The platform is provided on an as-is basis without warranties of any kind. We do not warrant that the service will be uninterrupted, error-free, or completely secure.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by Indian law, Arthashastra Classes shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, our services.",
      "Our total liability in any matter arising from or related to these terms shall not exceed the fees paid by you in the three months preceding the event giving rise to the claim.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Disputes",
    content: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India, including the Indian Contract Act 1872, Consumer Protection Act 2019, and Information Technology Act 2000.",
      "Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Bhopal, Madhya Pradesh, India.",
      "Before initiating legal proceedings, parties agree to attempt to resolve disputes amicably through written notice and a 30-day good-faith negotiation period.",
    ],
  },
  {
    id: "amendments",
    title: "Amendments",
    content: [
      "Arthashastra Classes reserves the right to update or modify these Terms & Conditions at any time. Changes will be effective upon posting to our website.",
      "We will make reasonable efforts to notify registered users of material changes via email or in-platform notification at least 7 days in advance.",
      "For questions, contact us at legal@arthashastraclasses.in or visit our office at MP Nagar, Bhopal, Madhya Pradesh — 462011.",
    ],
  },
];

const GLOW_COLORS = ["violet", "cyan", "magenta"] as const;

export default function TermsPage() {
  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[50vh] flex flex-col justify-center py-20"
        data-ocid="terms.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 via-background to-cyan-500/8 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-4 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.55 0.2 270) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.2 270) 1px, transparent 1px)",
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
              data-ocid="terms.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-violet-400">Terms & Conditions</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-start gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center shrink-0 neon-border-violet">
              <FileText className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-3 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-400/5">
                Legal
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Terms &amp;{" "}
                <span className="gradient-text-cyan-violet">Conditions</span>
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

      {/* ── CONTENT ── */}
      <section
        className="py-16 bg-background"
        data-ocid="terms.content.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" data-ocid="terms.toc.panel">
                <GlowCard glowColor="violet" className="p-6">
                  <h2 className="font-display text-sm font-bold uppercase tracking-widest text-violet-400 mb-4">
                    Contents
                  </h2>
                  <nav>
                    <ul className="space-y-2">
                      {TOC.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-muted-foreground hover:text-violet-400 transition-colors text-sm leading-snug block py-1"
                            data-ocid={`terms.toc.${item.id}_link`}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </GlowCard>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              <AnimatedSection>
                <GlowCard glowColor="cyan" className="p-6">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Welcome to Arthashastra Classes. These Terms & Conditions
                    govern your use of our educational platform, website, and
                    services. Please read them carefully before enrolling in any
                    course or using any feature of our platform.
                  </p>
                </GlowCard>
              </AnimatedSection>

              {SECTIONS.map((section, i) => (
                <AnimatedSection key={section.id} delay={i * 0.05}>
                  <div
                    id={section.id}
                    className="scroll-mt-24"
                    data-ocid={`terms.section.${i + 1}`}
                  >
                    <GlowCard glowColor={GLOW_COLORS[i % 3]} className="p-8">
                      <h2 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                            i % 3 === 0
                              ? "bg-violet-500/10 text-violet-400"
                              : i % 3 === 1
                                ? "bg-cyan-500/10 text-cyan-400"
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
                    to="/privacy-policy"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-muted-foreground hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth text-sm"
                    data-ocid="terms.footer.privacy_link"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/refund"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-muted-foreground hover:border-violet-400/50 hover:text-violet-400 transition-smooth text-sm"
                    data-ocid="terms.footer.refund_link"
                  >
                    Refund Policy
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:scale-105 transition-smooth text-sm"
                    data-ocid="terms.footer.contact_link"
                  >
                    Contact Us
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
