import AnimatedSection from "@/components/ui/AnimatedSection";
import CounterAnimation from "@/components/ui/CounterAnimation";
import GlowCard from "@/components/ui/GlowCard";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import MagneticButton from "@/components/ui/MagneticButton";
import ParallaxSection from "@/components/ui/ParallaxSection";
import RippleButton from "@/components/ui/RippleButton";
import { useTestimonials } from "@/hooks/useBackend";
import type { Testimonial } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));
const SocialCanvas = lazy(() => import("@/components/three/SocialCanvas"));

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Students Enrolled", value: 2000, suffix: "+" },
  { label: "Board Results", value: 98, suffix: "%" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Study Materials", value: 500, suffix: "+" },
];

const overviewItems = [
  {
    icon: BookOpen,
    title: "Courses",
    desc: "Commerce mastery programs for Class 11, 12 & CA Foundation.",
    color: "cyan" as const,
    href: "/courses",
    ocid: "home.overview.courses_card",
  },
  {
    icon: Users,
    title: "Faculty",
    desc: "Learn from Ajay Govindani and Bhopal's finest educators.",
    color: "violet" as const,
    href: "/about",
    ocid: "home.overview.faculty_card",
  },
  {
    icon: Trophy,
    title: "Results",
    desc: "98%+ board success, AIR toppers, and hundreds of merit students.",
    color: "magenta" as const,
    href: "/about",
    ocid: "home.overview.results_card",
  },
  {
    icon: FileText,
    title: "Study Materials",
    desc: "Curated PDFs, PYQs, revision notes, and solved papers.",
    color: "cyan" as const,
    href: "/study-materials",
    ocid: "home.overview.materials_card",
  },
  {
    icon: Zap,
    title: "Test Series",
    desc: "Full-length mock tests with instant analytics and rank insights.",
    color: "violet" as const,
    href: "/tests",
    ocid: "home.overview.tests_card",
  },
];

const featuredCourses = [
  {
    subject: "Accountancy",
    title: "Class 12 Accountancy — Complete Mastery",
    duration: "10 Months",
    fees: "₹18,000",
    highlights: ["Live + Recorded Sessions", "Weekly Tests", "Board PYQs"],
    color: "cyan" as const,
    badge: "Most Popular",
    ocid: "home.course_preview.item.1",
  },
  {
    subject: "Economics",
    title: "Class 12 Economics — Micro & Macro",
    duration: "8 Months",
    fees: "₹15,000",
    highlights: ["Case Study Practice", "NCERT Deep Dive", "Mock Papers"],
    color: "violet" as const,
    badge: "High Demand",
    ocid: "home.course_preview.item.2",
  },
  {
    subject: "CA Foundation",
    title: "CA Foundation — Fast Track Batch",
    duration: "6 Months",
    fees: "₹25,000",
    highlights: ["Crash Course Mode", "All 4 Papers", "Doubt Sessions"],
    color: "magenta" as const,
    badge: "New Batch",
    ocid: "home.course_preview.item.3",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    course: "CA Foundation",
    rating: 5,
    quote:
      "Arthashastra's approach completely transformed how I understood Accountancy. Complex topics felt intuitive and I cracked AIR 12!",
  },
  {
    name: "Rohit Verma",
    initials: "RV",
    course: "Class 12 Commerce",
    rating: 5,
    quote:
      "Live tests with instant analytics showed me exactly where I was losing marks. An absolute game-changer for exam prep.",
  },
  {
    name: "Ananya Singh",
    initials: "AS",
    course: "B.Com Preparation",
    rating: 5,
    quote:
      "Ajay Sir breaks down Economics in a way no textbook can. The dashboard keeps me on track every single day.",
  },
  {
    name: "Karan Patel",
    initials: "KP",
    course: "Class 12 Commerce",
    rating: 5,
    quote:
      "PYQs and study materials are top-notch. I cracked my boards with 92% confidence thanks to Arthashastra Classes.",
  },
  {
    name: "Shreya Joshi",
    initials: "SJ",
    course: "CA Foundation",
    rating: 5,
    quote:
      "Best investment for CA preparation. Interactive sessions and doubt-clearing were truly exceptional.",
  },
  {
    name: "Arjun Mehta",
    initials: "AM",
    course: "Class 11 Commerce",
    rating: 5,
    quote:
      "Starting with Arthashastra in Class 11 gave me such a strong foundation. The structured curriculum is unlike anything else.",
  },
  {
    name: "Tanvi Gupta",
    initials: "TG",
    course: "Business Studies",
    rating: 5,
    quote:
      "Business Studies with Arthashastra is a completely different experience. Real-world case studies make everything stick.",
  },
];

const resultBadges = [
  { name: "Priya S.", score: "98%", subject: "Accountancy" },
  { name: "Rohit V.", score: "97%", subject: "Economics" },
  { name: "Ananya S.", score: "95%", subject: "Business Studies" },
  { name: "Karan P.", score: "92%", subject: "Commerce" },
  { name: "Shreya J.", score: "AIR 34", subject: "CA Foundation" },
  { name: "Arjun M.", score: "96%", subject: "Accountancy" },
  { name: "Tanvi G.", score: "94%", subject: "Economics" },
  { name: "Vivek R.", score: "AIR 12", subject: "CA Foundation" },
  { name: "Pooja D.", score: "99%", subject: "Accountancy" },
  { name: "Manish K.", score: "93%", subject: "Business Studies" },
];

const scrollSteps = [
  {
    num: "01",
    icon: GraduationCap,
    title: "Enroll",
    desc: "Browse curated commerce courses — Class 11, 12, CA Foundation — and sign up with a single click. Instant full curriculum access.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-400/30",
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Learn",
    desc: "Study with Ajay Govindani's live and recorded sessions. Real-world analogies, NCERT deep dives, and concept clarity sessions.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-400/30",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Succeed",
    desc: "Ace every exam with PYQs, mock tests, performance analytics, and personal doubt-clearing — backed by a 98% result guarantee.",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10 border-fuchsia-400/30",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

// Backend testimonial card — uses Testimonial type from backend
function BackendTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const stars = Number(testimonial.rating);
  return (
    <div className="w-80 glass-morphism rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 transition-smooth flex flex-col gap-4 shrink-0">
      <div className="flex items-start gap-1 text-cyan-400">
        {["s1", "s2", "s3", "s4", "s5"].slice(0, stars).map((id) => (
          <Star
            key={`${testimonial.id}-${id}`}
            className="w-3.5 h-3.5 fill-cyan-400"
          />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 flex-1">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3 pt-1">
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt={testimonial.studentName}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-xs shrink-0">
            {testimonial.studentName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">
            {testimonial.studentName}
          </p>
          <p className="text-xs text-cyan-400/80 truncate">
            {testimonial.subject} · {testimonial.marks}
          </p>
        </div>
      </div>
    </div>
  );
}

// FAQ accordion item
const FAQ_ITEMS = [
  {
    q: "What courses does Arthashastra Classes offer?",
    a: "We offer Class 11 Commerce, Class 12 Commerce (Accountancy, Economics, Business Studies), and CA Foundation preparation. All courses include live sessions, recorded lectures, study materials, and regular tests.",
  },
  {
    q: "How do I enroll in a course?",
    a: "Click 'Explore Courses', choose your program, and click 'Buy Now'. After secure payment, you instantly get access to all course materials, videos, and the student dashboard.",
  },
  {
    q: "What are the course fees?",
    a: "Fees vary by program — Class 11 starts at ₹12,000, Class 12 at ₹15,000-₹18,000, and CA Foundation at ₹25,000. All include full curriculum access with no hidden charges.",
  },
  {
    q: "Are online and offline classes available?",
    a: "Yes! We offer both online (live + recorded) and offline classroom sessions at our Bhopal centre. You can choose the format that suits you best or opt for a hybrid model.",
  },
  {
    q: "How can I access study materials and PYQs?",
    a: "All enrolled students get instant access to chapter-wise PDFs, previous year question papers, revision notes, and solved papers through the Student Dashboard.",
  },
  {
    q: "What results has Arthashastra Classes achieved?",
    a: "We have a 98%+ board success rate, with multiple AIR toppers in CA Foundation and dozens of students scoring above 95% in Class 12 Commerce boards each year.",
  },
];

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => (
        <motion.div
          key={item.q}
          className="glass-morphism border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/20 transition-smooth"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          data-ocid={`home.faq.item.${i + 1}`}
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
            data-ocid={`home.faq.toggle.${i + 1}`}
          >
            <span className="font-semibold text-foreground text-sm leading-snug group-hover:text-cyan-400 transition-smooth">
              {item.q}
            </span>
            <motion.span
              className="shrink-0 text-muted-foreground group-hover:text-cyan-400 transition-smooth"
              animate={{ rotate: openIdx === i ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-white/5 pt-3">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialCard({
  name,
  initials,
  course,
  rating,
  quote,
}: (typeof testimonials)[0]) {
  return (
    <div className="w-80 glass-morphism rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 transition-smooth flex flex-col gap-4">
      <div className="flex items-start gap-1 text-cyan-400">
        {["s1", "s2", "s3", "s4", "s5"].slice(0, rating).map((id) => (
          <Star key={`${name}-${id}`} className="w-3.5 h-3.5 fill-cyan-400" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 flex-1">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-xs shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{name}</p>
          <p className="text-xs text-cyan-400/80">{course}</p>
        </div>
      </div>
    </div>
  );
}

function ResultBadge({ name, score, subject }: (typeof resultBadges)[0]) {
  const scoreColor = score.startsWith("AIR")
    ? "text-fuchsia-400"
    : "text-cyan-400";
  return (
    <div className="flex items-center gap-3 px-5 py-3 glass-morphism rounded-xl border border-white/10 hover:border-violet-400/40 transition-smooth shrink-0">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <p
          className={`font-display font-extrabold text-lg leading-none ${scoreColor}`}
        >
          {score}
        </p>
        <p className="text-xs text-muted-foreground">{subject}</p>
      </div>
    </div>
  );
}

// ─── 3D Intro Overlay ─────────────────────────────────────────────────────────

function IntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[oklch(0.08_0.04_260)] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full" />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Brand overlay */}
      <div className="relative z-10 text-center px-6 select-none pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">
            <Layers className="w-3 h-3" />
            Arthashastra Classes
          </span>
        </motion.div>
        <motion.h1
          className="font-display text-5xl sm:text-7xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gradient-text-cyan-violet">Commerce</span>
          <br />
          <span className="text-foreground/90">Reimagined</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Where Finance Meets the Future
        </motion.p>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-0.5 rounded-full bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.2, ease: "linear", delay: 0.8 }}
        />
      </motion.div>

      {/* Skip */}
      <motion.button
        className="absolute bottom-12 right-8 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-smooth uppercase tracking-widest pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onDone}
        data-ocid="home.intro.skip_button"
        aria-label="Skip intro"
      >
        Skip <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const { data: backendTestimonials = [] } = useTestimonials();
  // Only show visible testimonials from backend, fall back to static if none
  const visibleBackendTestimonials = backendTestimonials.filter(
    (t) => t.isVisible,
  );

  return (
    <div className="overflow-hidden">
      {/* 3D Intro */}
      <AnimatePresence>
        {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-16"
        data-ocid="home.hero.section"
      >
        {/* Ambient mesh background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-600/5 blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

        <div className="relative z-[2] text-center px-4 sm:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism neon-border-cyan text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <Star className="w-3 h-3 fill-cyan-400" />
              Bhopal's #1 Commerce Coaching Platform
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-6xl sm:text-8xl lg:text-9xl font-extrabold leading-[0.95] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gradient-text-cyan-violet">Commerce</span>
            <br />
            <span className="text-foreground">Reimagined</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-xl sm:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Arthashastra Classes — Where Finance Meets the Future. Next-gen
            coaching for Class 11, 12 &amp; CA Foundation in Bhopal.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <MagneticButton>
              <Link to="/courses" data-ocid="home.hero.explore_button">
                <RippleButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-lg shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_50px_oklch(0.68_0.24_200/0.6)] transition-smooth flex items-center gap-2">
                  Explore Courses <ChevronRight className="w-5 h-5" />
                </RippleButton>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/signup" data-ocid="home.hero.join_button">
                <RippleButton className="px-8 py-4 rounded-xl glass-morphism border border-fuchsia-400/40 text-fuchsia-300 font-bold text-lg hover:border-fuchsia-400/80 hover:shadow-[0_0_20px_oklch(0.60_0.25_290/0.3)] transition-smooth flex items-center gap-2">
                  Join Now <ArrowRight className="w-5 h-5" />
                </RippleButton>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
            Scroll
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section
        className="py-16 border-y border-white/5"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.14 0.07 260/0.8) 0%, oklch(0.16 0.09 270/0.8) 50%, oklch(0.14 0.07 260/0.8) 100%)",
        }}
        data-ocid="home.stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.1}
                className="text-center"
              >
                <div className="font-display text-5xl sm:text-6xl font-extrabold gradient-text-cyan-violet mb-2 leading-none">
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm font-medium tracking-wide">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section
        className="py-24 bg-background"
        data-ocid="home.overview.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Platform Overview
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text-cyan-violet">Excel</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              A full-stack learning ecosystem built for modern commerce
              students.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {overviewItems.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <Link to={item.href} data-ocid={item.ocid}>
                  <GlowCard
                    glowColor={item.color}
                    className="p-6 h-full group cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-smooth group-hover:scale-110 ${
                        item.color === "cyan"
                          ? "bg-cyan-500/15 text-cyan-400"
                          : item.color === "violet"
                            ? "bg-violet-500/15 text-violet-400"
                            : "bg-fuchsia-500/15 text-fuchsia-400"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold transition-smooth group-hover:gap-2 ${
                        item.color === "cyan"
                          ? "text-cyan-400"
                          : item.color === "violet"
                            ? "text-violet-400"
                            : "text-fuchsia-400"
                      }`}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </GlowCard>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section
        className="py-20 overflow-hidden"
        style={{ background: "oklch(0.14 0.06 260 / 0.6)" }}
        data-ocid="home.testimonials.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <AnimatedSection className="text-center">
            <span className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Student Stories
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              What Our{" "}
              <span className="gradient-text-cyan-violet">Students Say</span>
            </h2>
          </AnimatedSection>
        </div>
        <InfiniteCarousel
          items={testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
          itemClassName="w-80"
          speed={50}
        />
      </section>

      {/* Featured Course Preview Cards */}
      <section
        className="py-24 bg-background"
        data-ocid="home.course_preview.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Featured Programs
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
              Choose Your{" "}
              <span className="gradient-text-cyan-violet">Program</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Industry-aligned curricula built for results — not just concepts.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.12}>
                <GlowCard
                  glowColor={course.color}
                  className="p-7 h-full flex flex-col"
                  data-ocid={course.ocid}
                >
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        course.color === "cyan"
                          ? "bg-cyan-500/15 text-cyan-400"
                          : course.color === "violet"
                            ? "bg-violet-500/15 text-violet-400"
                            : "bg-fuchsia-500/15 text-fuchsia-400"
                      }`}
                    >
                      {course.subject}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded border ${
                        course.color === "cyan"
                          ? "border-cyan-400/30 text-cyan-400/80"
                          : course.color === "violet"
                            ? "border-violet-400/30 text-violet-400/80"
                            : "border-fuchsia-400/30 text-fuchsia-400/80"
                      }`}
                    >
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-foreground mb-5 leading-snug flex-1">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-5 mb-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Expert Faculty
                    </span>
                  </div>

                  <ul className="mb-6 space-y-1.5">
                    {course.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className={`w-3.5 h-3.5 shrink-0 ${
                            course.color === "cyan"
                              ? "text-cyan-400"
                              : course.color === "violet"
                                ? "text-violet-400"
                                : "text-fuchsia-400"
                          }`}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="font-display font-extrabold text-2xl text-foreground">
                      {course.fees}
                    </span>
                    <Link
                      to="/courses"
                      className={`flex items-center gap-1.5 text-sm font-bold transition-smooth hover:gap-2.5 ${
                        course.color === "cyan"
                          ? "text-cyan-400"
                          : course.color === "violet"
                            ? "text-violet-400"
                            : "text-fuchsia-400"
                      }`}
                      data-ocid={`home.course_preview.view_button.${i + 1}`}
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section
        className="py-24"
        style={{ background: "oklch(0.15 0.07 270 / 0.5)" }}
        data-ocid="home.faculty.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ParallaxSection speed={0.1}>
            <AnimatedSection>
              <div className="relative glass-morphism rounded-3xl p-10 md:p-14 border border-violet-400/20 overflow-hidden">
                {/* Decorative glows */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row items-center gap-12">
                  {/* Avatar */}
                  <div className="shrink-0 relative">
                    <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_40px_oklch(0.68_0.24_200/0.2)]">
                      <div className="w-36 h-36 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                        <span className="font-display font-extrabold text-4xl text-white">
                          AG
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                      Founder &amp; Lead Educator
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-extrabold gradient-text-cyan-violet mb-4">
                      Ajay Govindani
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0 text-base">
                      With 15+ years of expertise in Commerce education, Ajay
                      Sir has mentored 2,000+ students to top board scores and
                      CA Foundation rank-holders. Based in Bhopal, his unique
                      real-world analogies and structured pedagogy turn complex
                      chapters into intuitive mastery.
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8">
                      {[
                        "Accountancy Expert",
                        "CA Foundation",
                        "15+ Years Teaching",
                        "2000+ Students",
                        "Board Topper Mentor",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full glass-morphism neon-border-cyan text-cyan-400 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <MagneticButton>
                      <Link
                        to="/about"
                        data-ocid="home.faculty.learn_more_button"
                      >
                        <RippleButton className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold flex items-center gap-2 hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] transition-smooth">
                          Meet the Faculty <ArrowRight className="w-4 h-4" />
                        </RippleButton>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </ParallaxSection>
        </div>
      </section>

      {/* Scroll-based Storytelling */}
      <section className="py-24 bg-background" data-ocid="home.journey.section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Your Path to Success
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
              Three Steps to{" "}
              <span className="gradient-text-cyan-violet">Mastery</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A simple, powerful system that transforms how you study commerce.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/60 to-fuchsia-500/40 hidden sm:block" />

            <div className="flex flex-col gap-16 md:gap-20">
              {scrollSteps.map((step, i) => (
                <AnimatedSection
                  key={step.num}
                  delay={i * 0.15}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`flex items-start gap-6 sm:gap-16 ${
                      i % 2 === 1 ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Step circle */}
                    <div className="relative shrink-0 z-10">
                      <div
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${step.bg}`}
                      >
                        <step.icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                        <span className="font-display font-bold text-white text-[10px]">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex-1 pt-2 ${i % 2 === 1 ? "sm:text-right" : ""}`}
                    >
                      <div
                        className={`font-display text-7xl font-extrabold leading-none mb-3 opacity-10 ${step.color}`}
                        aria-hidden="true"
                      >
                        {step.num}
                      </div>
                      <h3 className="font-display font-extrabold text-3xl text-foreground mb-3 -mt-8">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Carousel */}
      <section
        className="py-20 overflow-hidden"
        style={{ background: "oklch(0.13 0.06 260 / 0.7)" }}
        data-ocid="home.results.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <AnimatedSection className="text-center">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Proven Track Record
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
              Our{" "}
              <span className="gradient-text-cyan-violet">Results Speak</span>
            </h2>
          </AnimatedSection>
        </div>
        <InfiniteCarousel
          items={resultBadges.map((r) => (
            <ResultBadge key={`${r.name}-${r.subject}`} {...r} />
          ))}
          itemClassName="shrink-0"
          speed={30}
          direction="right"
        />
        <div className="mt-4">
          <InfiniteCarousel
            items={[...resultBadges]
              .reverse()
              .map((r) => (
                <ResultBadge key={`${r.name}-${r.subject}-rev`} {...r} />
              ))}
            itemClassName="shrink-0"
            speed={35}
            direction="left"
          />
        </div>
      </section>

      {/* Social Media Section */}
      <Suspense fallback={<div className="h-48" />}>
        <SocialCanvas />
      </Suspense>

      {/* Backend Testimonials — from real data */}
      {visibleBackendTestimonials.length > 0 && (
        <section
          className="py-20 overflow-hidden"
          style={{ background: "oklch(0.13 0.07 270 / 0.5)" }}
          data-ocid="home.backend_testimonials.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <AnimatedSection className="text-center">
              <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                Real Student Reviews
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold">
                Words From Our{" "}
                <span className="gradient-text-cyan-violet">Top Students</span>
              </h2>
            </AnimatedSection>
          </div>
          <InfiniteCarousel
            items={visibleBackendTestimonials.map((t) => (
              <BackendTestimonialCard key={t.id} testimonial={t} />
            ))}
            itemClassName="w-80"
            speed={45}
          />
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-24 bg-background" data-ocid="home.faq.section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Common Questions
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
              Frequently Asked{" "}
              <span className="gradient-text-cyan-violet">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Everything you need to know about joining Arthashastra Classes.
            </p>
          </AnimatedSection>
          <FAQAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-28 relative overflow-hidden"
        data-ocid="home.cta.section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.07 260) 0%, oklch(0.18 0.12 280) 50%, oklch(0.14 0.07 260) 100%)",
        }}
      >
        {/* Decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-fuchsia-600/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Trophy className="w-14 h-14 text-cyan-400 mx-auto mb-6" />
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Start Your{" "}
              <span className="gradient-text-cyan-violet">Journey</span> Today
            </h2>
            <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 2,000+ students at Arthashastra Classes who are already
              ahead. Expert faculty, live tests, and a learning platform built
              for results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link to="/signup" data-ocid="home.cta.enroll_button">
                  <RippleButton className="px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-lg shadow-[0_0_40px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_60px_oklch(0.68_0.24_200/0.6)] transition-smooth flex items-center gap-2">
                    Enroll Now <ArrowRight className="w-5 h-5" />
                  </RippleButton>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" data-ocid="home.cta.contact_button">
                  <RippleButton className="px-10 py-5 rounded-xl glass-morphism border border-white/20 text-foreground font-bold text-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-smooth flex items-center gap-2">
                    Contact Us <ChevronRight className="w-5 h-5" />
                  </RippleButton>
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
