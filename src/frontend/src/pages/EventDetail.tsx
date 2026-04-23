import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import {
  useEventDetail,
  useMyEventRegistrations,
  useRegisterForEvent,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import type { EventRegistration } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Mic,
  Tag,
  Users,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Utils ────────────────────────────────────────────────────────────────────
function tsToMs(ts: bigint): number {
  return Number(ts) / 1_000_000;
}

function formatDate(ts: bigint): string {
  return new Date(tsToMs(ts)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(ts: bigint): string {
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
function CountdownBlock({ targetTs }: { targetTs: bigint }) {
  const { days, hours, minutes, seconds } = useCountdown(targetTs);
  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Mins" },
    { v: seconds, l: "Secs" },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <div className="glass-morphism border border-cyan-500/30 rounded-xl px-4 py-2.5 min-w-[60px] text-center shadow-[0_0_12px_oklch(0.68_0.24_200/0.18)]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${l}-${v}`}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-3xl font-extrabold text-cyan-400 tabular-nums block"
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

// ─── Registration Form ────────────────────────────────────────────────────────
interface RegFormProps {
  eventId: bigint;
  eventTitle: string;
  isRegistered: boolean;
  isFull: boolean;
}

function RegistrationForm({
  eventId,
  eventTitle,
  isRegistered,
  isFull,
}: RegFormProps) {
  const { isAuthenticated } = useAuth();
  const { mutate: register, isPending } = useRegisterForEvent();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to register.");
      return;
    }
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all fields.");
      return;
    }
    register(
      { eventId, name: form.name, email: form.email, phone: form.phone },
      {
        onSuccess: () =>
          toast.success("Registered!", {
            description: `You're in for ${eventTitle}`,
          }),
        onError: () => toast.error("Registration failed. Please try again."),
      },
    );
  };

  if (isRegistered) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-morphism border border-emerald-500/30 bg-emerald-500/5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="font-semibold text-sm text-emerald-400">
            You're registered!
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            We'll remind you before the event starts.
          </p>
        </div>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="p-4 rounded-2xl glass-morphism border border-destructive/30 bg-destructive/5 text-center">
        <p className="text-sm font-semibold text-destructive">
          This event is full
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Check back for future events or join our waitlist.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="event_detail.registration_form"
    >
      {(["name", "email", "phone"] as const).map((field) => (
        <div key={field}>
          <label
            htmlFor={`detail-reg-${field}`}
            className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide"
          >
            {field === "name"
              ? "Full Name"
              : field === "email"
                ? "Email Address"
                : "Phone Number"}
          </label>
          <input
            id={`detail-reg-${field}`}
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
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
            data-ocid={`event_detail.${field}_input`}
            required
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={isPending || !isAuthenticated}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_20px_oklch(0.55_0.20_270/0.3)]"
        data-ocid="event_detail.submit_button"
      >
        {!isAuthenticated
          ? "Login to Register"
          : isPending
            ? "Registering…"
            : "Confirm Registration"}
      </button>
      {!isAuthenticated && (
        <p className="text-xs text-center text-muted-foreground">
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
            Login
          </Link>{" "}
          to complete registration.
        </p>
      )}
    </form>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 animate-pulse">
      <div className="h-72 sm:h-96 rounded-2xl bg-white/5 mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 bg-white/5 rounded w-3/4" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-4/5" />
        </div>
        <div className="h-72 bg-white/5 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventDetailPage() {
  const { eventId } = useParams({ from: "/public/events/$eventId" });
  const id = useMemo(() => {
    try {
      return BigInt(eventId);
    } catch {
      return null;
    }
  }, [eventId]);

  const { data: eventOpt, isLoading } = useEventDetail(id);
  const { data: myRegs = [] } = useMyEventRegistrations();

  const registeredIds = useMemo(
    () => new Set(myRegs.map((r: EventRegistration) => r.eventId.toString())),
    [myRegs],
  );

  if (isLoading)
    return (
      <div className="min-h-screen bg-background">
        <DetailSkeleton />
      </div>
    );

  const event = eventOpt ?? null;

  if (!event) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 pt-16"
        data-ocid="event_detail.not_found"
      >
        <Calendar className="w-16 h-16 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold text-foreground">
          Event Not Found
        </h1>
        <p className="text-muted-foreground text-sm">
          This event may have been removed or the link is invalid.
        </p>
        <Link to="/events">
          <RippleButton className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </RippleButton>
        </Link>
      </div>
    );
  }

  const statusKey = Object.keys(event.status)[0] as string;
  const isPast = statusKey === "past";
  const isRegistered = registeredIds.has(event.id.toString());
  const isFull = event.registeredCount >= event.capacity;

  return (
    <div
      className="pt-16 bg-background min-h-screen"
      data-ocid="event_detail.page"
    >
      {/* Hero Image */}
      <section className="relative h-72 sm:h-[420px] overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-all mb-4"
            data-ocid="event_detail.back_link"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Events
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border glass-morphism ${isPast ? "text-muted-foreground border-white/10" : "text-violet-300 border-violet-500/30"}`}
            >
              {isPast ? "Past Event" : "Upcoming"}
            </span>
            {event.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground"
              >
                <Tag className="w-2.5 h-2.5" />
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event meta */}
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: Calendar,
                    label: "Date",
                    value: formatDate(event.eventDate),
                    color: "text-cyan-400",
                  },
                  {
                    icon: Clock,
                    label: "Time",
                    value: formatTime(event.eventDate),
                    color: "text-violet-400",
                  },
                  {
                    icon: Mic,
                    label: "Speaker",
                    value: event.speaker,
                    color: "text-fuchsia-400",
                  },
                  {
                    icon: Users,
                    label: "Registered",
                    value: `${event.registeredCount}/${event.capacity}`,
                    color: "text-emerald-400",
                  },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="glass-morphism border border-white/10 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Countdown (only for upcoming) */}
            {!isPast && (
              <AnimatedSection delay={0.15}>
                <div className="glass-morphism border border-cyan-500/20 rounded-2xl p-6 bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-medium">
                    Event starts in
                  </p>
                  <CountdownBlock targetTs={event.eventDate} />
                </div>
              </AnimatedSection>
            )}

            {/* Description */}
            <AnimatedSection delay={0.2}>
              <GlowCard glowColor="violet" className="p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">
                  About this Event
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description ||
                    "Join us for an insightful session designed to help you excel in your commerce studies."}
                </p>
              </GlowCard>
            </AnimatedSection>

            {/* Topics */}
            {event.topics.length > 0 && (
              <AnimatedSection delay={0.25}>
                <div className="space-y-3">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Topics Covered
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {event.topics.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.06 }}
                        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl glass-morphism border border-cyan-500/20 text-cyan-300"
                      >
                        <Tag className="w-3 h-3" />
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Past event: recording */}
            {isPast && (
              <AnimatedSection delay={0.3}>
                <GlowCard
                  glowColor="cyan"
                  className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      Event Recording
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Recording may be available for enrolled students. Check
                      your dashboard or contact support.
                    </p>
                  </div>
                  <Link to="/dashboard" className="shrink-0">
                    <RippleButton
                      className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30 transition-all"
                      data-ocid="event_detail.dashboard_link"
                    >
                      Go to Dashboard
                    </RippleButton>
                  </Link>
                </GlowCard>
              </AnimatedSection>
            )}
          </div>

          {/* Right: Registration */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.12}>
              <div className="sticky top-24">
                <GlowCard glowColor="violet" className="p-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-5">
                    {isPast ? "Event Summary" : "Register for this Event"}
                  </h2>

                  {/* Capacity bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Capacity</span>
                      <span className="font-semibold text-foreground">
                        {event.registeredCount.toString()} /{" "}
                        {event.capacity.toString()}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (Number(event.registeredCount) / Number(event.capacity)) * 100)}%`,
                        }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
                      />
                    </div>
                  </div>

                  {isPast ? (
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {event.registeredCount.toString()} participants attended
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                        {formatDate(event.eventDate)}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-violet-400 shrink-0" />
                        {event.speaker}
                      </p>
                    </div>
                  ) : (
                    <RegistrationForm
                      eventId={event.id}
                      eventTitle={event.title}
                      isRegistered={isRegistered}
                      isFull={isFull}
                    />
                  )}
                </GlowCard>

                <Link
                  to="/events"
                  className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-all justify-center"
                  data-ocid="event_detail.back_bottom_link"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  View all events
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
