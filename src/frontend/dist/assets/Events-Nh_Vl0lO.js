import { ay as useUpcomingEvents, az as usePastEvents, aA as useMyEventRegistrations, r as reactExports, aB as EventStatus, j as jsxRuntimeExports, m as motion, b as MapPin, g as useAuth, U as Users, R as RippleButton, A as AnimatePresence, T as Tag, L as Link, x as ue, aC as useRegisterForEvent, X } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { Z as Zap } from "./zap-BVMbVm3n.js";
import { C as Calendar } from "./calendar-BLcTgi-O.js";
import { C as Clock } from "./clock-CRcJU_VI.js";
import { M as Mic } from "./mic-BNm_ycbM.js";
import { C as CircleCheck } from "./circle-check-mAf9Hbwv.js";
function tsToMs(ts) {
  return Number(ts) / 1e6;
}
function formatEventDate(ts) {
  return new Date(tsToMs(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatEventTime(ts) {
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
function CountdownDisplay({
  eventDate,
  compact = false
}) {
  const { days, hours, minutes, seconds } = useCountdown(eventDate);
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-xs font-mono", children: [
      { v: days, l: "d" },
      { v: hours, l: "h" },
      { v: minutes, l: "m" },
      { v: seconds, l: "s" }
    ].map(({ v, l }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 font-bold text-base tabular-nums", children: v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[9px] uppercase", children: l })
    ] }, l)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Mins" },
    { v: seconds, l: "Secs" }
  ].map(({ v, l }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism border border-cyan-500/30 rounded-xl px-3 py-2 min-w-[52px] text-center shadow-[0_0_12px_oklch(0.68_0.24_200/0.18)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 10, opacity: 0 },
        transition: { duration: 0.2 },
        className: "font-mono text-2xl font-extrabold text-cyan-400 tabular-nums block",
        children: v
      },
      `${l}-${v}`
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: l })
  ] }, l)) });
}
function RegistrationModal({ event, onClose }) {
  const { mutate: register, isPending } = useRegisterForEvent();
  const [form, setForm] = reactExports.useState({ name: "", email: "", phone: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      ue.error("Please fill all fields.");
      return;
    }
    register(
      {
        eventId: event.id,
        name: form.name,
        email: form.email,
        phone: form.phone
      },
      {
        onSuccess: () => {
          ue.success("Registered successfully!", {
            description: `See you at ${event.title}`
          });
          onClose();
        },
        onError: () => ue.error("Registration failed. Please try again.")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { backgroundColor: "oklch(0.08 0.05 260 / 0.8)" },
      onClick: onClose,
      "data-ocid": "events.registration.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 25 },
          onClick: (e) => e.stopPropagation(),
          className: "glass-morphism border border-violet-500/30 rounded-2xl p-6 w-full max-w-md shadow-[0_0_40px_oklch(0.55_0.20_270/0.25)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Register for Event" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: event.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-lg glass-morphism flex items-center justify-center text-muted-foreground hover:text-foreground transition-all",
                  "data-ocid": "events.registration.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              ["name", "email", "phone"].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: `reg-${field}`,
                    className: "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide",
                    children: field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: `reg-${field}`,
                    type: field === "email" ? "email" : field === "phone" ? "tel" : "text",
                    value: form[field],
                    onChange: (e) => setForm((p) => ({ ...p, [field]: e.target.value })),
                    placeholder: field === "name" ? "Your full name" : field === "email" ? "you@example.com" : "+91 98765 43210",
                    className: "w-full px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-violet-500/40 transition-all",
                    "data-ocid": `events.registration.${field}_input`,
                    required: true
                  }
                )
              ] }, field)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 px-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground transition-all",
                    "data-ocid": "events.registration.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isPending,
                    className: "flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all",
                    "data-ocid": "events.registration.confirm_button",
                    children: isPending ? "Registering…" : "Confirm Registration"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function EventCard({
  event,
  registeredIds,
  index,
  featured = false
}) {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = reactExports.useState(false);
  const isRegistered = registeredIds.has(event.id.toString());
  const isFull = event.registeredCount >= event.capacity;
  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      ue.error("Please login to register for events.");
      return;
    }
    setShowModal(true);
  };
  if (featured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-[0_0_40px_oklch(0.55_0.20_270/0.15)] group",
          "data-ocid": "events.featured.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-72 sm:h-96", children: [
              event.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: event.imageUrl,
                  alt: event.title,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 sm:p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full glass-morphism border border-violet-500/30 text-violet-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
                  "Featured Event"
                ] }),
                event.topics.slice(0, 2).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground",
                    children: t
                  },
                  t
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-2 leading-tight", children: event.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-cyan-400" }),
                  formatEventDate(event.eventDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-violet-400" }),
                  formatEventTime(event.eventDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3.5 h-3.5 text-fuchsia-400" }),
                  event.speaker
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-emerald-400" }),
                  event.registeredCount.toString(),
                  "/",
                  event.capacity.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownDisplay, { eventDate: event.eventDate }),
                isRegistered ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm font-semibold text-emerald-400 px-4 py-2 rounded-xl glass-morphism border border-emerald-500/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  "Registered"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RippleButton,
                  {
                    onClick: handleRegisterClick,
                    disabled: isFull,
                    className: "flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-40 shadow-[0_0_20px_oklch(0.55_0.20_270/0.35)]",
                    "data-ocid": "events.featured.register_button",
                    children: isFull ? "Event Full" : "Register Now"
                  }
                )
              ] })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RegistrationModal,
        {
          event,
          onClose: () => setShowModal(false)
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlowCard,
      {
        glowColor: "violet",
        className: "p-5 flex flex-col gap-4 group h-full",
        "data-ocid": `events.upcoming.item.${index + 1}`,
        children: [
          event.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: event.imageUrl,
                alt: event.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-xl bg-gradient-to-br from-violet-600/15 to-cyan-500/10 flex items-center justify-center border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-12 h-12 text-violet-400/40" }) }),
          event.topics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: event.topics.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full glass-morphism border border-white/10 text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                t
              ]
            },
            t
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2", children: event.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-cyan-400" }),
                formatEventDate(event.eventDate),
                " ·",
                " ",
                formatEventTime(event.eventDate)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3 h-3 text-violet-400" }),
                event.speaker
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 text-emerald-400" }),
                event.registeredCount.toString(),
                " / ",
                event.capacity.toString(),
                " ",
                "registered"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3 border-t border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownDisplay, { eventDate: event.eventDate, compact: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/events/$eventId",
                params: { eventId: event.id.toString() },
                className: "text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-all",
                "data-ocid": `events.upcoming.detail_link.${index + 1}`,
                children: "View Details →"
              }
            ),
            isRegistered ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-lg glass-morphism border border-emerald-500/25", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
              "Registered"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              RippleButton,
              {
                onClick: handleRegisterClick,
                disabled: isFull,
                className: "text-xs font-semibold px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/80 to-cyan-500/80 text-white hover:opacity-90 disabled:opacity-40 transition-all",
                "data-ocid": `events.upcoming.register_button.${index + 1}`,
                children: isFull ? "Full" : "Register"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationModal,
      {
        event,
        onClose: () => setShowModal(false)
      }
    ) })
  ] });
}
function PastEventCard({ event, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "cyan",
      className: "p-0 overflow-hidden group h-full flex flex-col",
      "data-ocid": `events.past.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden", children: [
          event.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: event.imageUrl,
              alt: event.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-cyan-600/15 to-violet-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-12 h-12 text-cyan-400/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full glass-morphism border border-white/10 text-muted-foreground", children: "Past Event" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground line-clamp-2 leading-snug", children: event.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              formatEventDate(event.eventDate)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3 h-3" }),
              event.speaker
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
              event.registeredCount.toString(),
              " attended"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/events/$eventId",
              params: { eventId: event.id.toString() },
              className: "inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-all",
              "data-ocid": `events.past.detail_link.${index + 1}`,
              children: "View Gallery →"
            }
          ) })
        ] })
      ]
    }
  ) });
}
function EventSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-xl bg-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-white/5 rounded w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-white/5 rounded w-3/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-white/5 rounded w-2/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-8 rounded bg-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-8 rounded-lg bg-white/5" })
    ] })
  ] });
}
const FALLBACK_UPCOMING = [
  {
    id: BigInt(1),
    status: EventStatus.upcoming,
    title: "Commerce Board Exam Strategy Webinar — Class 12",
    endDate: BigInt(Date.now() + 3 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    registeredCount: BigInt(124),
    createdAt: BigInt(Date.now()) * BigInt(1e6),
    description: "Expert session on last-minute revision strategies, time management, and scoring techniques for CBSE Class 12 Commerce Board Exams.",
    imageUrl: "",
    topics: ["Accountancy", "BST", "Economics", "Board Tips"],
    isVisible: true,
    capacity: BigInt(500),
    speaker: "CA Rahul Sharma",
    eventDate: BigInt(Date.now() + 3 * 24 * 60 * 60 * 1e3) * BigInt(1e6)
  },
  {
    id: BigInt(2),
    status: EventStatus.upcoming,
    title: "CA Foundation Orientation — June 2026 Batch",
    endDate: BigInt(Date.now() + 7 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    registeredCount: BigInt(67),
    createdAt: BigInt(Date.now()) * BigInt(1e6),
    description: "Kick-off session for new CA Foundation aspirants covering syllabus overview, study schedule, and mock test calendar.",
    imageUrl: "",
    topics: ["CA Foundation", "Accounting", "Study Plan"],
    isVisible: true,
    capacity: BigInt(200),
    speaker: "Prof. Meena Tiwari",
    eventDate: BigInt(Date.now() + 7 * 24 * 60 * 60 * 1e3) * BigInt(1e6)
  },
  {
    id: BigInt(3),
    status: EventStatus.upcoming,
    title: "Live Economics Doubt-Clearing Session",
    endDate: BigInt(Date.now() + 10 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    registeredCount: BigInt(89),
    createdAt: BigInt(Date.now()) * BigInt(1e6),
    description: "Interactive doubt-clearing class on macro-economics, Indian economy, and development chapters by top faculty.",
    imageUrl: "",
    topics: ["Economics", "Macro", "Indian Economy"],
    isVisible: true,
    capacity: BigInt(300),
    speaker: "Dr. Priya Verma",
    eventDate: BigInt(Date.now() + 10 * 24 * 60 * 60 * 1e3) * BigInt(1e6)
  }
];
const FALLBACK_PAST = [
  {
    id: BigInt(10),
    status: EventStatus.completed,
    title: "Accountancy Full Mock Test — Live Analysis",
    endDate: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    registeredCount: BigInt(312),
    createdAt: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    description: "Live analysis of Class 12 Accountancy mock test with detailed solutions.",
    imageUrl: "",
    topics: ["Accountancy", "Mock Test", "Analysis"],
    isVisible: true,
    capacity: BigInt(400),
    speaker: "CA Rahul Sharma",
    eventDate: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1e3) * BigInt(1e6)
  },
  {
    id: BigInt(11),
    status: EventStatus.completed,
    title: "Parent-Teacher Meet — Batch 2025",
    endDate: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    registeredCount: BigInt(98),
    createdAt: BigInt(Date.now() - 35 * 24 * 60 * 60 * 1e3) * BigInt(1e6),
    description: "Annual parent-teacher interaction session discussing student progress and batch performance.",
    imageUrl: "",
    topics: ["Parent Meet", "Progress Review"],
    isVisible: true,
    capacity: BigInt(150),
    speaker: "Arthashastra Faculty",
    eventDate: BigInt(Date.now() - 30 * 24 * 60 * 60 * 1e3) * BigInt(1e6)
  }
];
function EventsPage() {
  const {
    data: upcomingData = [],
    isLoading: loadingUpcoming,
    isFetched: upcomingFetched
  } = useUpcomingEvents();
  const {
    data: pastData = [],
    isLoading: loadingPast,
    isFetched: pastFetched
  } = usePastEvents();
  const { data: myRegs = [] } = useMyEventRegistrations();
  const upcoming = upcomingFetched ? upcomingData : FALLBACK_UPCOMING;
  const past = pastFetched ? pastData : FALLBACK_PAST;
  const registeredIds = reactExports.useMemo(
    () => new Set(myRegs.map((r) => r.eventId.toString())),
    [myRegs]
  );
  const [featuredEvent, ...restUpcoming] = upcoming;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "events.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-500/5" }),
        ["pp0", "pp1", "pp2", "pp3", "pp4", "pp5"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-full bg-violet-400/30",
            style: {
              width: `${2 + i % 3}px`,
              height: `${2 + i % 3}px`,
              left: `${5 + i * 17}%`,
              top: `${10 + i % 4 * 20}%`
            },
            animate: { y: [-10, 10, -10], opacity: [0.15, 0.6, 0.15] },
            transition: {
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4
            }
          },
          k
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
              "Live Sessions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
              "Events &",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Webinars" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "Join live seminars, expert webinars, and hands-on workshops designed to accelerate your commerce mastery." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pb-16 bg-background",
        "data-ocid": "events.upcoming.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-violet-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Upcoming Events" })
          ] }) }),
          loadingUpcoming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 glass-morphism rounded-2xl border border-white/10 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["esk1", "esk2", "esk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventSkeleton, {}, k)) })
          ] }) : upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "text-center py-20",
              "data-ocid": "events.upcoming.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-9 h-9 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No upcoming events" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Stay tuned — new events are announced regularly." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            featuredEvent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              EventCard,
              {
                event: featuredEvent,
                registeredIds,
                index: 0,
                featured: true
              }
            ) }),
            restUpcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: restUpcoming.map((evt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              EventCard,
              {
                event: evt,
                registeredIds,
                index: i
              },
              evt.id.toString()
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background", "data-ocid": "events.past.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-cyan-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Past Events Gallery" })
      ] }) }),
      loadingPast ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["psk1", "psk2", "psk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventSkeleton, {}, k)) }) : past.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-12",
          "data-ocid": "events.past.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Past events will appear here." })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: past.map((evt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PastEventCard, { event: evt, index: i }, evt.id.toString())) })
    ] }) })
  ] });
}
export {
  EventsPage as default
};
