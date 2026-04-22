import { H as React, j as jsxRuntimeExports, m as motion, b as MapPin, P as Phone, I as Mail, R as RippleButton, w as ue } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { u as useForm, S as Send } from "./index.esm-Bn0gU8_n.js";
import { C as Clock } from "./clock-B1Nr3IvY.js";
import { E as ExternalLink } from "./external-link-CdRTWOv8.js";
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function FaLinkedinIn(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" }, "child": [] }] })(props);
}
function SiYoutube(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }, "child": [] }] })(props);
}
function SiX(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" }, "child": [] }] })(props);
}
function SiInstagram(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" }, "child": [] }] })(props);
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
