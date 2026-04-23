import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import {
  useMyEventRegistrations,
  usePastEvents,
  useRegisterForEvent,
  useUpcomingEvents,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import { type Event, type EventRegistration, EventStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Mic,
  Tag,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Utils ────────────────────────────────────────────────────────────────────
function tsToMs(ts: bigint): number {
  return Number(ts) / 1_000_000;
}

function formatEventDate(ts: bigint): string {
  return new Date(tsToMs(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatEventTime(ts: bigint): string {
  return new Date(tsToMs(ts)).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Countdown ────────────────────────────────────────────────────────────────
interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function useCountdown(targetTs: bigint): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, tsToMs(targetTs) - Date.now());
      const s = Math.floor(diff / 1000);
      setParts({
        days: String(Math.floor(s / 86400)).padStart(2, "0"),
        hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
        seconds: String(s % 60).padStart(2, "0"),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetTs]);

  return parts;
}

// ─── Countdown Display ────────────────────────────────────────────────────────
function CountdownDisplay({
  eventDate,
  compact = false,
}: { eventDate: bigint; compact?: boolean }) {
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs font-mono">
        {[
          { v: days, l: "d" },
          { v: hours, l: "h" },
          { v: minutes, l: "m" },
          { v: seconds, l: "s" },
        ].map(({ v, l }) => (
          <div key={l} className="flex flex-col items-center">
            <span className="text-cyan-400 font-bold text-base tabular-nums">
              {v}
            </span>
            <span className="text-muted-foreground text-[9px] uppercase">
              {l}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {[
        { v: days, l: "Days" },
        { v: hours, l: "Hours" },
        { v: minutes, l: "Mins" },
        { v: seconds, l: "Secs" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <div className="glass-morphism border border-cyan-500/30 rounded-xl px-3 py-2 min-w-[52px] text-center shadow-[0_0_12px_oklch(0.68_0.24_200/0.18)]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${l}-${v}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-2xl font-extrabold text-cyan-400 tabular-nums block"
              >
                {v}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Registration Modal ───────────────────────────────────────────────────────
interface RegModalProps {
  event: Event;
  onClose: () => void;
}

function RegistrationModal({ event, onClose }: RegModalProps) {
  const { mutate: register, isPending } = useRegisterForEvent();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all fields.");
      return;
    }
    register(
      {
        eventId: event.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      {
        onSuccess: () => {
          toast.success("Registered successfully!", {
            description: `See you at ${event.title}`,
          });
          onClose();
        },
        onError: () => toast.error("Registration failed. Please try again."),
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(0.08 0.05 260 / 0.8)" }}
      onClick={onClose}
      data-ocid="events.registration.dialog"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-morphism border border-violet-500/30 rounded-2xl p-6 w-full max-w-md shadow-[0_0_40px_oklch(0.55_0.20_270/0.25)]"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Register for Event
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {event.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
            data-ocid="events.registration.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(["name", "email", "phone"] as const).map((field) => (
            <div key={field}>
              <label
                htmlFor={`reg-${field}`}
                className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide"
              >
                {field === "name"
                  ? "Full Name"
                  : field === "email"
                    ? "Email Address"
                    : "Phone Number"}
              </label>
              <input
                id={`reg-${field}`}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                      ? "tel"
                      : "text"
                }
                value={form[field]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [field]: e.target.value }))
                }
                placeholder={
                  field === "name"
                    ? "Your full name"
                    : field === "email"
                      ? "you@example.com"
                      : "+91 98765 43210"
                }
                className="w-full px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-violet-500/40 transition-all"
                data-ocid={`events.registration.${field}_input`}
                required
              />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
              data-ocid="events.registration.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
              data-ocid="events.registration.confirm_button"
            >
              {isPending ? "Registering…" : "Confirm Registration"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
interface EventCardProps {
  event: Event;
  registeredIds: Set<string>;
  index: number;
  featured?: boolean;
}

function EventCard({
  event,
  registeredIds,
  index,
  featured = false,
}: EventCardProps) {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const isRegistered = registeredIds.has(event.id.toString());
  const isFull = event.registeredCount >= event.capacity;

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to register for events.");
      return;
    }
    setShowModal(true);
  };

  if (featured) {
    return (
      <>
        <AnimatedSection delay={0.1}>
          <div
            className="relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_oklch(0.55_0.20_270/0.15)] group"
            data-ocid="events.featured.card"
          >
            <div className="relative h-72 sm:h-96">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full glass-morphism border border-violet-500/30 text-violet-300">
                  <Zap className="w-3 h-3" />
                  Featured Event
                </span>
                {event.topics.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-2 leading-tight">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {formatEventDate(event.eventDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  {formatEventTime(event.eventDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-fuchsia-400" />
                  {event.speaker}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  {event.registeredCount.toString()}/{event.capacity.toString()}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CountdownDisplay eventDate={event.eventDate} />
                {isRegistered ? (
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400 px-4 py-2 rounded-xl glass-morphism border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                    Registered
                  </span>
                ) : (
                  <RippleButton
                    onClick={handleRegisterClick}
                    disabled={isFull}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-40 shadow-[0_0_20px_oklch(0.55_0.20_270/0.35)]"
                    data-ocid="events.featured.register_button"
                  >
                    {isFull ? "Event Full" : "Register Now"}
                  </RippleButton>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatePresence>
          {showModal && (
            <RegistrationModal
              event={event}
              onClose={() => setShowModal(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <AnimatedSection delay={index * 0.07}>
        <GlowCard
          glowColor="violet"
          className="p-5 flex flex-col gap-4 group h-full"
          data-ocid={`events.upcoming.item.${index + 1}`}
        >
          {event.imageUrl ? (
            <div className="relative h-40 rounded-xl overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          ) : (
            <div className="h-40 rounded-xl bg-gradient-to-br from-violet-600/15 to-cyan-500/10 flex items-center justify-center border border-white/5">
              <Calendar className="w-12 h-12 text-violet-400/40" />
            </div>
          )}

          {event.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.topics.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full glass-morphism border border-white/10 text-muted-foreground"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2">
              {event.title}
            </h3>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {formatEventDate(event.eventDate)} ·{" "}
                {formatEventTime(event.eventDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Mic className="w-3 h-3 text-violet-400" />
                {event.speaker}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-emerald-400" />
                {event.registeredCount.toString()} / {event.capacity.toString()}{" "}
                registered
              </span>
            </div>
          </div>

          <div className="py-3 border-t border-b border-white/10">
            <CountdownDisplay eventDate={event.eventDate} compact />
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/events/$eventId"
              params={{ eventId: event.id.toString() }}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-all"
              data-ocid={`events.upcoming.detail_link.${index + 1}`}
            >
              View Details →
            </Link>
            {isRegistered ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-lg glass-morphism border border-emerald-500/25">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Registered
              </span>
            ) : (
              <RippleButton
                onClick={handleRegisterClick}
                disabled={isFull}
                className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/80 to-cyan-500/80 text-white hover:opacity-90 disabled:opacity-40 transition-all"
                data-ocid={`events.upcoming.register_button.${index + 1}`}
              >
                {isFull ? "Full" : "Register"}
              </RippleButton>
            )}
          </div>
        </GlowCard>
      </AnimatedSection>
      <AnimatePresence>
        {showModal && (
          <RegistrationModal
            event={event}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Past Event Card ──────────────────────────────────────────────────────────
function PastEventCard({ event, index }: { event: Event; index: number }) {
  return (
    <AnimatedSection delay={index * 0.07}>
      <GlowCard
        glowColor="cyan"
        className="p-0 overflow-hidden group h-full flex flex-col"
        data-ocid={`events.past.item.${index + 1}`}
      >
        <div className="relative h-44 overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-600/15 to-violet-500/10 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-cyan-400/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground">
            Past Event
          </span>
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
          <h3 className="font-display font-bold text-sm text-foreground line-clamp-2 leading-snug">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatEventDate(event.eventDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Mic className="w-3 h-3" />
              {event.speaker}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              {event.registeredCount.toString()} attended
            </span>
          </div>
          <div className="mt-auto">
            <Link
              to="/events/$eventId"
              params={{ eventId: event.id.toString() }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-all"
              data-ocid={`events.past.detail_link.${index + 1}`}
            >
              View Gallery →
            </Link>
          </div>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function EventSkeleton() {
  return (
    <div className="glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse">
      <div className="h-40 rounded-xl bg-white/5" />
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-white/5 rounded w-4/5" />
        <div className="h-3 bg-white/5 rounded w-3/5" />
        <div className="h-3 bg-white/5 rounded w-2/5" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex justify-between">
        <div className="w-16 h-8 rounded bg-white/5" />
        <div className="w-20 h-8 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

// ─── Static fallback events (shown when backend is initialising / empty) ─────
const FALLBACK_UPCOMING: Event[] = [
  {
    id: BigInt(1),
    status: EventStatus.upcoming,
    title: "Commerce Board Exam Strategy Webinar — Class 12",
    endDate: BigInt(Date.now() + 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    registeredCount: BigInt(124),
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    description:
      "Expert session on last-minute revision strategies, time management, and scoring techniques for CBSE Class 12 Commerce Board Exams.",
    imageUrl: "",
    topics: ["Accountancy", "BST", "Economics", "Board Tips"],
    isVisible: true,
    capacity: BigInt(500),
    speaker: "CA Rahul Sharma",
    eventDate: BigInt(Date.now() + 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: BigInt(2),
    status: EventStatus.upcoming,
    title: "CA Foundation Orientation — June 2026 Batch",
    endDate: BigInt(Date.now() + 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    registeredCount: BigInt(67),
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    description:
      "Kick-off session for new CA Foundation aspirants covering syllabus overview, study schedule, and mock test calendar.",
    imageUrl: "",
    topics: ["CA Foundation", "Accounting", "Study Plan"],
    isVisible: true,
    capacity: BigInt(200),
    speaker: "Prof. Meena Tiwari",
    eventDate: BigInt(Date.now() + 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: BigInt(3),
    status: EventStatus.upcoming,
    title: "Live Economics Doubt-Clearing Session",
    endDate: BigInt(Date.now() + 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    registeredCount: BigInt(89),
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    description:
      "Interactive doubt-clearing class on macro-economics, Indian economy, and development chapters by top faculty.",
    imageUrl: "",
    topics: ["Economics", "Macro", "Indian Economy"],
    isVisible: true,
    capacity: BigInt(300),
    speaker: "Dr. Priya Verma",
    eventDate:
      BigInt(Date.now() + 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

const FALLBACK_PAST: Event[] = [
  {
    id: BigInt(10),
    status: EventStatus.completed,
    title: "Accountancy Full Mock Test — Live Analysis",
    endDate: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    registeredCount: BigInt(312),
    createdAt:
      BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description:
      "Live analysis of Class 12 Accountancy mock test with detailed solutions.",
    imageUrl: "",
    topics: ["Accountancy", "Mock Test", "Analysis"],
    isVisible: true,
    capacity: BigInt(400),
    speaker: "CA Rahul Sharma",
    eventDate:
      BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
  {
    id: BigInt(11),
    status: EventStatus.completed,
    title: "Parent-Teacher Meet — Batch 2025",
    endDate: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    registeredCount: BigInt(98),
    createdAt:
      BigInt(Date.now() - 35 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    description:
      "Annual parent-teacher interaction session discussing student progress and batch performance.",
    imageUrl: "",
    topics: ["Parent Meet", "Progress Review"],
    isVisible: true,
    capacity: BigInt(150),
    speaker: "Arthashastra Faculty",
    eventDate:
      BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const {
    data: upcomingData = [],
    isLoading: loadingUpcoming,
    isFetched: upcomingFetched,
  } = useUpcomingEvents();
  const {
    data: pastData = [],
    isLoading: loadingPast,
    isFetched: pastFetched,
  } = usePastEvents();
  const { data: myRegs = [] } = useMyEventRegistrations();

  // Use real data when fetched; fall back to static samples while loading / unauthenticated
  const upcoming = upcomingFetched ? upcomingData : FALLBACK_UPCOMING;
  const past = pastFetched ? pastData : FALLBACK_PAST;

  const registeredIds = useMemo(
    () => new Set(myRegs.map((r: EventRegistration) => r.eventId.toString())),
    [myRegs],
  );

  const [featuredEvent, ...restUpcoming] = upcoming;

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="events.hero.section">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-500/5" />
          {(["pp0", "pp1", "pp2", "pp3", "pp4", "pp5"] as const).map((k, i) => (
            <motion.div
              key={k}
              className="absolute rounded-full bg-violet-400/30"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${5 + i * 17}%`,
                top: `${10 + (i % 4) * 20}%`,
              }}
              animate={{ y: [-10, 10, -10], opacity: [0.15, 0.6, 0.15] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20">
              <MapPin className="w-3.5 h-3.5" />
              Live Sessions
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Events &{" "}
              <span className="gradient-text-cyan-violet">Webinars</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Join live seminars, expert webinars, and hands-on workshops
              designed to accelerate your commerce mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        className="pb-16 bg-background"
        data-ocid="events.upcoming.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.05}>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-5 h-5 text-violet-400" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                Upcoming Events
              </h2>
            </div>
          </AnimatedSection>

          {loadingUpcoming ? (
            <div className="space-y-6">
              <div className="h-96 glass-morphism rounded-2xl border border-white/10 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(["esk1", "esk2", "esk3"] as const).map((k) => (
                  <EventSkeleton key={k} />
                ))}
              </div>
            </div>
          ) : upcoming.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
              data-ocid="events.upcoming.empty_state"
            >
              <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No upcoming events
              </h3>
              <p className="text-muted-foreground text-sm">
                Stay tuned — new events are announced regularly.
              </p>
            </motion.div>
          ) : (
            <>
              {featuredEvent && (
                <div className="mb-8">
                  <EventCard
                    event={featuredEvent}
                    registeredIds={registeredIds}
                    index={0}
                    featured
                  />
                </div>
              )}
              {restUpcoming.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {restUpcoming.map((evt, i) => (
                    <EventCard
                      key={evt.id.toString()}
                      event={evt}
                      registeredIds={registeredIds}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-background" data-ocid="events.past.section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.05}>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                Past Events Gallery
              </h2>
            </div>
          </AnimatedSection>

          {loadingPast ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(["psk1", "psk2", "psk3"] as const).map((k) => (
                <EventSkeleton key={k} />
              ))}
            </div>
          ) : past.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="events.past.empty_state"
            >
              <p className="text-muted-foreground text-sm">
                Past events will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((evt, i) => (
                <PastEventCard key={evt.id.toString()} event={evt} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
