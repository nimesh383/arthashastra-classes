import { k as useParams, r as reactExports, aD as useEventDetail, aA as useMyEventRegistrations, j as jsxRuntimeExports, L as Link, R as RippleButton, T as Tag, U as Users, m as motion, A as AnimatePresence, g as useAuth, aC as useRegisterForEvent, x as ue } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { C as Calendar } from "./calendar-BLcTgi-O.js";
import { A as ArrowLeft } from "./arrow-left-EvhSeW3I.js";
import { C as Clock } from "./clock-CRcJU_VI.js";
import { M as Mic } from "./mic-BNm_ycbM.js";
import { V as Video } from "./video-B8eN7M2n.js";
import { C as CircleCheck } from "./circle-check-mAf9Hbwv.js";
function tsToMs(ts) {
  return Number(ts) / 1e6;
}
function formatDate(ts) {
  return new Date(tsToMs(ts)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatTime(ts) {
  return new Date(tsToMs(ts)).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function useCountdown(targetTs) {
  const [parts, setParts] = reactExports.useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });
  reactExports.useEffect(() => {
    function calc() {
      const diff = Math.max(0, tsToMs(targetTs) - Date.now());
      const s = Math.floor(diff / 1e3);
      setParts({
        days: String(Math.floor(s / 86400)).padStart(2, "0"),
        hours: String(Math.floor(s % 86400 / 3600)).padStart(2, "0"),
        minutes: String(Math.floor(s % 3600 / 60)).padStart(2, "0"),
        seconds: String(s % 60).padStart(2, "0")
      });
    }
    calc();
    const id = setInterval(calc, 1e3);
    return () => clearInterval(id);
  }, [targetTs]);
  return parts;
}
function CountdownBlock({ targetTs }) {
  const { days, hours, minutes, seconds } = useCountdown(targetTs);
  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Mins" },
    { v: seconds, l: "Secs" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: units.map(({ v, l }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism border border-cyan-500/30 rounded-xl px-4 py-2.5 min-w-[60px] text-center shadow-[0_0_12px_oklch(0.68_0.24_200/0.18)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { y: -12, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 12, opacity: 0 },
        transition: { duration: 0.2 },
        className: "font-mono text-3xl font-extrabold text-cyan-400 tabular-nums block",
        children: v
      },
      `${l}-${v}`
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: l })
  ] }, l)) });
}
function RegistrationForm({
  eventId,
  eventTitle,
  isRegistered,
  isFull
}) {
  const { isAuthenticated } = useAuth();
  const { mutate: register, isPending } = useRegisterForEvent();
  const [form, setForm] = reactExports.useState({ name: "", email: "", phone: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      ue.error("Please login to register.");
      return;
    }
    if (!form.name || !form.email || !form.phone) {
      ue.error("Please fill all fields.");
      return;
    }
    register(
      { eventId, name: form.name, email: form.email, phone: form.phone },
      {
        onSuccess: () => ue.success("Registered!", {
          description: `You're in for ${eventTitle}`
        }),
        onError: () => ue.error("Registration failed. Please try again.")
      }
    );
  };
  if (isRegistered) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-2xl glass-morphism border border-emerald-500/30 bg-emerald-500/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-emerald-400", children: "You're registered!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "We'll remind you before the event starts." })
      ] })
    ] });
  }
  if (isFull) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl glass-morphism border border-destructive/30 bg-destructive/5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "This event is full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Check back for future events or join our waitlist." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "event_detail.registration_form",
      children: [
        ["name", "email", "phone"].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `detail-reg-${field}`,
              className: "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide",
              children: field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `detail-reg-${field}`,
              type: field === "email" ? "email" : field === "phone" ? "tel" : "text",
              value: form[field],
              onChange: (e) => setForm((p) => ({ ...p, [field]: e.target.value })),
              placeholder: field === "name" ? "Your full name" : field === "email" ? "you@example.com" : "+91 98765 43210",
              className: "w-full px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-violet-500/40 transition-all",
              "data-ocid": `event_detail.${field}_input`,
              required: true
            }
          )
        ] }, field)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isPending || !isAuthenticated,
            className: "w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_20px_oklch(0.55_0.20_270/0.3)]",
            "data-ocid": "event_detail.submit_button",
            children: !isAuthenticated ? "Login to Register" : isPending ? "Registering…" : "Confirm Registration"
          }
        ),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-cyan-400 hover:text-cyan-300", children: "Login" }),
          " ",
          "to complete registration."
        ] })
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 sm:h-96 rounded-2xl bg-white/5 mb-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-white/5 rounded w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-white/5 rounded w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-white/5 rounded w-4/5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 bg-white/5 rounded-2xl" })
    ] })
  ] });
}
function EventDetailPage() {
  const { eventId } = useParams({ from: "/public/events/$eventId" });
  const id = reactExports.useMemo(() => {
    try {
      return BigInt(eventId);
    } catch {
      return null;
    }
  }, [eventId]);
  const { data: eventOpt, isLoading } = useEventDetail(id);
  const { data: myRegs = [] } = useMyEventRegistrations();
  const registeredIds = reactExports.useMemo(
    () => new Set(myRegs.map((r) => r.eventId.toString())),
    [myRegs]
  );
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {}) });
  const event = eventOpt ?? null;
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 pt-16",
        "data-ocid": "event_detail.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-16 h-16 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Event Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This event may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RippleButton, { className: "mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Events"
          ] }) })
        ]
      }
    );
  }
  const statusKey = Object.keys(event.status)[0];
  const isPast = statusKey === "past";
  const isRegistered = registeredIds.has(event.id.toString());
  const isFull = event.registeredCount >= event.capacity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 bg-background min-h-screen",
      "data-ocid": "event_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-72 sm:h-[420px] overflow-hidden", children: [
          event.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: event.imageUrl,
              alt: event.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 sm:p-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/events",
                className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-all mb-4",
                "data-ocid": "event_detail.back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                  "Back to Events"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-bold uppercase px-2.5 py-1 rounded-full border glass-morphism ${isPast ? "text-muted-foreground border-white/10" : "text-violet-300 border-violet-500/30"}`,
                  children: isPast ? "Past Event" : "Upcoming"
                }
              ),
              event.topics.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1 text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                    t
                  ]
                },
                t
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-5xl font-extrabold text-foreground leading-tight", children: event.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
              {
                icon: Calendar,
                label: "Date",
                value: formatDate(event.eventDate),
                color: "text-cyan-400"
              },
              {
                icon: Clock,
                label: "Time",
                value: formatTime(event.eventDate),
                color: "text-violet-400"
              },
              {
                icon: Mic,
                label: "Speaker",
                value: event.speaker,
                color: "text-fuchsia-400"
              },
              {
                icon: Users,
                label: "Registered",
                value: `${event.registeredCount}/${event.capacity}`,
                color: "text-emerald-400"
              }
            ].map(({ icon: Icon, label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-morphism border border-white/10 rounded-xl p-4 flex flex-col gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: value })
                ]
              },
              label
            )) }) }),
            !isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-cyan-500/20 rounded-2xl p-6 bg-gradient-to-r from-cyan-500/5 to-violet-500/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-4 font-medium", children: "Event starts in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownBlock, { targetTs: event.eventDate })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: "violet", className: "p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-4", children: "About this Event" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-line", children: event.description || "Join us for an insightful session designed to help you excel in your commerce studies." })
            ] }) }),
            event.topics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.25, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "Topics Covered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: event.topics.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.25 + i * 0.06 },
                  className: "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl glass-morphism border border-cyan-500/20 text-cyan-300",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                    t
                  ]
                },
                t
              )) })
            ] }) }),
            isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlowCard,
              {
                glowColor: "cyan",
                className: "p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-6 h-6 text-cyan-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Event Recording" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Recording may be available for enrolled students. Check your dashboard or contact support." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RippleButton,
                    {
                      className: "text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30 transition-all",
                      "data-ocid": "event_detail.dashboard_link",
                      children: "Go to Dashboard"
                    }
                  ) })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: "violet", className: "p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-5", children: isPast ? "Event Summary" : "Register for this Event" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Capacity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                    event.registeredCount.toString(),
                    " /",
                    " ",
                    event.capacity.toString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: {
                      width: `${Math.min(100, Number(event.registeredCount) / Number(event.capacity) * 100)}%`
                    },
                    transition: { duration: 1, delay: 0.3 },
                    className: "h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
                  }
                ) })
              ] }),
              isPast ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                  event.registeredCount.toString(),
                  " participants attended"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-cyan-400 shrink-0" }),
                  formatDate(event.eventDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 text-violet-400 shrink-0" }),
                  event.speaker
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                RegistrationForm,
                {
                  eventId: event.id,
                  eventTitle: event.title,
                  isRegistered,
                  isFull
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/events",
                className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-all justify-center",
                "data-ocid": "event_detail.back_bottom_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                  "View all events"
                ]
              }
            )
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  EventDetailPage as default
};
