import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users, B as BookOpen, b as MapPin, C as ChevronRight, R as RippleButton, w as ue } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { u as useForm, S as Send } from "./index.esm-Bn0gU8_n.js";
import { L as Lightbulb, R as Rocket } from "./rocket-VB-SHbnx.js";
import { C as Clock } from "./clock-B1Nr3IvY.js";
import { B as Briefcase } from "./briefcase-RrWviYyo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
const openings = [
  {
    id: 1,
    title: "Commerce Faculty — Accountancy",
    department: "Academic",
    type: "Full-time",
    location: "Bhopal (On-site)",
    description: "Deliver engaging live and recorded Accountancy sessions for Class 11–12 and CA Foundation. Proven track record required."
  },
  {
    id: 2,
    title: "Economics Educator",
    department: "Academic",
    type: "Part-time / Remote",
    location: "Remote",
    description: "Create video lectures and study notes for Economics. Proficiency in CBSE and competitive exam syllabi needed."
  },
  {
    id: 3,
    title: "Full-stack Developer",
    department: "Technology",
    type: "Full-time",
    location: "Bhopal / Remote",
    description: "Build and maintain the Arthashastra learning platform. Experience with React, TypeScript, and modern backend technologies."
  },
  {
    id: 4,
    title: "Content & SEO Writer",
    department: "Marketing",
    type: "Part-time / Freelance",
    location: "Remote",
    description: "Write compelling blog posts, study tips, and SEO-optimized articles. Commerce background is a plus."
  }
];
const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We build education experiences that feel more like a product launch than a textbook. Your ideas shape what we ship.",
    color: "cyan"
  },
  {
    icon: Heart,
    title: "Impact-Driven Work",
    desc: "Every line of code, every lecture, every article directly affects thousands of students across India.",
    color: "violet"
  },
  {
    icon: Rocket,
    title: "Fast-Track Growth",
    desc: "Grow at startup speed. Take ownership early, ship fast, and build skills that compound year over year.",
    color: "magenta"
  }
];
const perks = [
  {
    icon: Users,
    label: "Collaborative team",
    sub: "Flat hierarchy, everyone's voice matters"
  },
  {
    icon: BookOpen,
    label: "Learning budget",
    sub: "Annual allowance for courses & books"
  },
  {
    icon: Clock,
    label: "Flexible hours",
    sub: "Remote-first culture, async by default"
  },
  {
    icon: Rocket,
    label: "Equity upside",
    sub: "Early joiners share in our growth"
  }
];
function CareersPage() {
  const [selectedJob, setSelectedJob] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Application submitted:", data);
    ue.success("Application received! We'll be in touch.", {
      description: "Our team reviews applications within 3–5 business days."
    });
    reset();
    setSelectedJob(null);
  };
  const deptColors = {
    Academic: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    Technology: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    Marketing: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "careers.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 block", children: "Join Our Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6", children: [
              "Build the",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Future" }),
              " of Education"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "We're looking for passionate educators, developers, and creators who believe education can be cinematic, immersive, and truly transformational." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-y border-white/5",
        "data-ocid": "careers.values.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-400 text-xs font-bold uppercase tracking-widest mb-3 block", children: "Why Work With Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground", children: [
              "A team that",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "thinks differently" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowCard,
            {
              glowColor: v.color,
              className: "p-6 h-full",
              "data-ocid": `careers.values.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${v.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : v.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: v.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: v.desc })
              ]
            }
          ) }, v.title)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8", children: perks.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.36 + i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-5 h-5 text-cyan-400 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: p.sub })
          ] }) }, p.label)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-background",
        "data-ocid": "careers.openings.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-extrabold text-foreground", children: "Open Positions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              openings.length,
              " role",
              openings.length !== 1 ? "s" : "",
              " currently open"
            ] })
          ] }),
          openings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20",
              "data-ocid": "careers.openings.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No openings right now. Check back soon!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: openings.map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GlowCard,
            {
              className: "p-6",
              "data-ocid": `careers.openings.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: job.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full border font-semibold ${deptColors[job.department] ?? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"}`,
                        children: job.department
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-3", children: job.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-cyan-400" }),
                      " ",
                      job.location
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-cyan-400" }),
                      " ",
                      job.type
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedJob(job.title),
                    className: "shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth",
                    "data-ocid": `careers.apply.button.${i + 1}`,
                    children: [
                      "Apply Now ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ] })
            }
          ) }, job.id)) })
        ] })
      }
    ),
    selectedJob && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-t border-white/5",
        "data-ocid": "careers.application.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-2xl p-8 border border-white/10 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Apply for" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 font-semibold mt-0.5", children: selectedJob })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedJob(null),
                className: "w-8 h-8 rounded-lg glass-morphism border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth text-sm",
                "aria-label": "Close form",
                "data-ocid": "careers.close_form.button",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit(onSubmit),
              className: "flex flex-col gap-5",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-medium text-foreground mb-2",
                      htmlFor: "car-name",
                      children: "Full Name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "car-name",
                      type: "text",
                      placeholder: "Your full name",
                      className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth",
                      "data-ocid": "careers.name.input",
                      ...register("name", { required: "Name is required" })
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-red-400 mt-1",
                      "data-ocid": "careers.name.field_error",
                      children: errors.name.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-medium text-foreground mb-2",
                      htmlFor: "car-email",
                      children: "Email"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "car-email",
                      type: "email",
                      placeholder: "your@email.com",
                      className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth",
                      "data-ocid": "careers.email.input",
                      ...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email"
                        }
                      })
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-red-400 mt-1",
                      "data-ocid": "careers.email.field_error",
                      children: errors.email.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-medium text-foreground mb-2",
                      htmlFor: "car-role",
                      children: "Role Applying For"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "car-role",
                      className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-400/50 transition-smooth appearance-none",
                      "data-ocid": "careers.role.select",
                      defaultValue: selectedJob,
                      ...register("role", {
                        required: "Please select a role"
                      }),
                      children: openings.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.title, children: o.title }, o.id))
                    }
                  ),
                  errors.role && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-red-400 mt-1",
                      "data-ocid": "careers.role.field_error",
                      children: errors.role.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-medium text-foreground mb-2",
                      htmlFor: "car-resume",
                      children: "Resume / Portfolio Link"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "car-resume",
                      type: "url",
                      placeholder: "https://drive.google.com/...",
                      className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth",
                      "data-ocid": "careers.resume.input",
                      ...register("resumeLink", {
                        required: "Please provide a resume link"
                      })
                    }
                  ),
                  errors.resumeLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-red-400 mt-1",
                      "data-ocid": "careers.resume.field_error",
                      children: errors.resumeLink.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-medium text-foreground mb-2",
                      htmlFor: "car-message",
                      children: "Cover Letter"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "car-message",
                      rows: 4,
                      placeholder: "Why do you want to join Arthashastra Classes? What makes you the right fit?",
                      className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth resize-none",
                      "data-ocid": "careers.message.textarea",
                      ...register("message", {
                        required: "Please add a cover letter"
                      })
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-red-400 mt-1",
                      "data-ocid": "careers.message.field_error",
                      children: errors.message.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedJob(null),
                      className: "flex-1 py-3 rounded-xl glass-morphism border border-white/10 text-muted-foreground text-sm font-medium hover:text-foreground transition-smooth",
                      "data-ocid": "careers.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RippleButton,
                    {
                      className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_oklch(0.68_0.24_200/0.3)] hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.5)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-50",
                      disabled: isSubmitting,
                      "data-ocid": "careers.submit_button",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Submitting…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Submit Application ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
                      ] })
                    }
                  )
                ] })
              ]
            }
          )
        ] }) }) })
      }
    )
  ] });
}
export {
  CareersPage as default
};
