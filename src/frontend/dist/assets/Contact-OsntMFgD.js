import { J as GenIcon, j as jsxRuntimeExports, m as motion, b as MapPin, P as Phone, K as Mail, R as RippleButton, x as ue } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { u as useForm, S as Send } from "./index.esm-BHCRwV9j.js";
import { S as SiX, a as SiInstagram, b as SiYoutube } from "./index-CGrCxjM1.js";
import { C as Clock } from "./clock-CRcJU_VI.js";
import { E as ExternalLink } from "./external-link-BU97VLcY.js";
function FaLinkedinIn(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" }, "child": [] }] })(props);
}
const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Arthashastra Classes, MP Nagar Zone-I, Bhopal, MP 462011",
    color: "cyan"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "violet"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@arthashastraclasses.com",
    href: "mailto:info@arthashastraclasses.com",
    color: "magenta"
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    color: "cyan"
  }
];
const socialLinks = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "text-cyan-400",
    border: "border-cyan-400/30 hover:border-cyan-400",
    bg: "hover:bg-cyan-400/10"
  },
  {
    icon: SiX,
    label: "Twitter / X",
    href: "https://twitter.com",
    color: "text-violet-400",
    border: "border-violet-400/30 hover:border-violet-400",
    bg: "hover:bg-violet-400/10"
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "text-fuchsia-400",
    border: "border-fuchsia-400/30 hover:border-fuchsia-400",
    bg: "hover:bg-fuchsia-400/10"
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "text-cyan-300",
    border: "border-cyan-300/30 hover:border-cyan-300",
    bg: "hover:bg-cyan-300/10"
  }
];
const courses = [
  "Class 11 Commerce",
  "Class 12 Commerce",
  "CA Foundation",
  "Economics Honours",
  "Business Studies",
  "Accountancy Advanced",
  "Other / General Enquiry"
];
function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { course: "" }
  });
  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 900));
      console.log("Enquiry submitted:", data);
      ue.success("Enquiry sent! We'll reach out within 24 hours.", {
        duration: 5e3,
        description: `Thanks, ${data.name}! Our team will call you shortly.`
      });
      reset();
    } catch {
      ue.error("Something went wrong. Please try again.", {
        duration: 4e3
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 overflow-hidden",
        "data-ocid": "contact.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-fuchsia-600/8 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,oklch(0.60_0.25_290/0.06),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
                backgroundSize: "80px 80px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] },
              transition: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              className: "absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none",
              style: { background: "oklch(0.60 0.25 290 / 0.12)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2
              },
              className: "absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none",
              style: { background: "oklch(0.68 0.24 200 / 0.10)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Get In Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6", children: [
                  "Let's ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Connect" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "Ready to start your commerce mastery journey? Ask us anything — courses, admissions, schedules, or just say hello." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-24 bg-background",
        "data-ocid": "contact.main.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { direction: "left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "Reach Out Directly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: contactInfo.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowCard,
                {
                  glowColor: item.color,
                  className: "p-5",
                  "data-ocid": `contact.info.${item.label.toLowerCase()}_card`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : item.color === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-fuchsia-500/10 text-fuchsia-400"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-0.5", children: item.label }),
                      item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: item.href,
                          className: "font-medium text-sm break-all hover:underline transition-colors text-violet-400",
                          children: item.value
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm", children: item.value })
                    ] })
                  ] })
                },
                item.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "left", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]",
                "data-ocid": "contact.map.section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-violet-400 rounded-bl-lg z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-violet-400 rounded-br-lg z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "iframe",
                    {
                      title: "Arthashastra Classes — Bhopal Location",
                      src: "https://www.openstreetmap.org/export/embed.html?bbox=77.38,23.24,77.44,23.28&layer=mapnik",
                      width: "100%",
                      height: "240",
                      style: {
                        border: 0,
                        filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
                        display: "block"
                      },
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: "https://www.openstreetmap.org/?mlat=23.26&mlon=77.41#map=14/23.26/77.41",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2 px-4 py-2.5 bg-card/90 backdrop-blur border-t border-white/5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors group",
                      "data-ocid": "contact.map.open_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "MP Nagar Zone-I, Bhopal, MP" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })
                      ]
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "left", delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "contact.social.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 font-medium", children: "Follow us on social media" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: socialLinks.map((social) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.a,
                {
                  href: social.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": social.label,
                  className: `w-11 h-11 rounded-xl glass-morphism border flex items-center justify-center transition-smooth ${social.color} ${social.border} ${social.bg}`,
                  whileHover: { scale: 1.15, rotate: 5 },
                  whileTap: { scale: 0.95 },
                  "data-ocid": `contact.social.${social.label.toLowerCase().replace(/\s.*/, "")}_link`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(social.icon, { className: "w-4 h-4" })
                },
                social.label
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { direction: "right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: "violet", className: "p-8 md:p-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Send an Enquiry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Fill in the form and our counselor will get back to you within 24 hours." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit(onSubmit),
                className: "flex flex-col gap-5",
                noValidate: true,
                "data-ocid": "contact.enquiry.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "block text-sm font-medium text-foreground mb-2",
                          htmlFor: "contact-name",
                          children: [
                            "Full Name",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", "aria-hidden": true, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "contact-name",
                          type: "text",
                          placeholder: "Rahul Sharma",
                          className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth",
                          "data-ocid": "contact.name.input",
                          ...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters"
                            }
                          })
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-red-400 mt-1.5 flex items-center gap-1",
                          "data-ocid": "contact.name.field_error",
                          role: "alert",
                          children: errors.name.message
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "block text-sm font-medium text-foreground mb-2",
                          htmlFor: "contact-phone",
                          children: [
                            "Phone",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", "aria-hidden": true, children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "contact-phone",
                          type: "tel",
                          placeholder: "+91 98765 43210",
                          className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth",
                          "data-ocid": "contact.phone.input",
                          ...register("phone", {
                            required: "Phone number is required",
                            minLength: {
                              value: 10,
                              message: "Enter a valid phone number"
                            }
                          })
                        }
                      ),
                      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-red-400 mt-1.5",
                          "data-ocid": "contact.phone.field_error",
                          role: "alert",
                          children: errors.phone.message
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-2",
                        htmlFor: "contact-email",
                        children: [
                          "Email Address",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", "aria-hidden": true, children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "contact-email",
                        type: "email",
                        placeholder: "rahul@example.com",
                        className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth",
                        "data-ocid": "contact.email.input",
                        ...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                          }
                        })
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-red-400 mt-1.5",
                        "data-ocid": "contact.email.field_error",
                        role: "alert",
                        children: errors.email.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-2",
                        htmlFor: "contact-course",
                        children: "Course of Interest"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "contact-course",
                        className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth appearance-none cursor-pointer",
                        "data-ocid": "contact.course.select",
                        ...register("course"),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "option",
                            {
                              value: "",
                              className: "bg-card text-muted-foreground",
                              children: "Select a course..."
                            }
                          ),
                          courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, className: "bg-card", children: c }, c))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-2",
                        htmlFor: "contact-message",
                        children: [
                          "Your Message",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", "aria-hidden": true, children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "contact-message",
                        rows: 4,
                        placeholder: "Tell us about your goals, questions, or anything you'd like to know...",
                        className: "w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth resize-none",
                        "data-ocid": "contact.message.textarea",
                        ...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters"
                          }
                        })
                      }
                    ),
                    errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-red-400 mt-1.5",
                        "data-ocid": "contact.message.field_error",
                        role: "alert",
                        children: errors.message.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "By submitting, you agree to be contacted by our counseling team. We respect your privacy and never share your data." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RippleButton,
                    {
                      className: "w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-base shadow-lg hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.5)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                      disabled: isSubmitting,
                      "data-ocid": "contact.submit_button",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.span,
                        {
                          animate: { opacity: [0.5, 1, 0.5] },
                          transition: {
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY
                          },
                          className: "flex items-center gap-2",
                          "data-ocid": "contact.loading_state",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" }),
                            "Sending..."
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Send Enquiry",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
                      ] })
                    }
                  )
                ]
              }
            )
          ] }) }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/10 border-t border-white/5",
        "data-ocid": "contact.faq.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-extrabold text-foreground mb-3", children: [
              "Quick ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Answers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Common questions before you reach out." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            {
              q: "How do I enroll in a course?",
              a: "Fill out the enquiry form above or call us directly. Our counselor will guide you through the enrollment process."
            },
            {
              q: "Do you offer online classes?",
              a: "Yes! We offer both offline classes in Bhopal and live online sessions accessible from anywhere in India."
            },
            {
              q: "What courses are available?",
              a: "We cover Class 11 & 12 Commerce, CA Foundation, Accountancy, Business Studies, Economics, and more."
            },
            {
              q: "Is there a free demo class?",
              a: "Absolutely. Register your interest and we'll schedule a complimentary demo class within 48 hours."
            }
          ].map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowCard,
            {
              glowColor: i % 2 === 0 ? "cyan" : "violet",
              className: "p-6 h-full",
              "data-ocid": `contact.faq.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm mb-2", children: faq.q }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: faq.a })
              ]
            }
          ) }, faq.q)) })
        ] })
      }
    )
  ] });
}
export {
  ContactPage as default
};
