import { g as useAuth, p as useActor, h as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, B as BookOpen, M as MagneticButton, R as RippleButton, C as ChevronRight, L as Link, x as ue, y as createActor } from "./index-UQyTW7IZ.js";
import { F as Fingerprint, L as LoaderCircle } from "./loader-circle-DxkwdBkn.js";
import { Z as Zap } from "./zap-BVMbVm3n.js";
import { S as Shield } from "./shield-BUVvJVcb.js";
import { G as Globe } from "./globe-Zm9b4nY2.js";
import { L as Lock } from "./lock-BiQ5d9JX.js";
function ParticlesBg() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const colors = [
      "oklch(0.68 0.24 200)",
      "oklch(0.55 0.2 270)",
      "oklch(0.6 0.25 290)"
    ];
    const ps = Array.from({ length: 50 }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.1,
      color: colors[idx % colors.length]
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 w-full h-full pointer-events-none opacity-60"
    }
  );
}
const iiFeatures = [
  {
    icon: Shield,
    title: "Cryptographic Security",
    desc: "Your identity is protected by advanced public-key cryptography — no passwords to steal."
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    desc: "One Internet Identity unlocks any app on the Internet Computer seamlessly."
  },
  {
    icon: Lock,
    title: "Fully Decentralized",
    desc: "No company owns your data. Your identity lives on a blockchain you control."
  }
];
const shapes = [
  { size: 70, top: "12%", left: "6%", delay: 0 },
  { size: 45, top: "65%", left: "4%", delay: 1.5 },
  { size: 55, top: "18%", right: "6%", delay: 0.7 },
  { size: 35, top: "72%", right: "8%", delay: 2 }
];
function ProfileForm({ onSubmit, isSubmitting }) {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Name is required");
      return;
    }
    await onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-4",
      "data-ocid": "signup.profile_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "signup-name",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
              children: "Full Name *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "signup-name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. Rahul Sharma",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth",
              "data-ocid": "signup.name.input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "signup-email",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
              children: "Email Address"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "signup-email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "e.g. rahul@example.com",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth",
              "data-ocid": "signup.email.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "signup-phone",
              className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
              children: "Phone Number"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "signup-phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "e.g. +91 98765 43210",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth",
              "data-ocid": "signup.phone.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_24px_oklch(0.55_0.20_270/0.4)] hover:shadow-[0_0_40px_oklch(0.55_0.20_270/0.6)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
            "data-ocid": "signup.profile.submit_button",
            children: [
              isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null,
              isSubmitting ? "Creating Profile…" : "Complete Registration",
              !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ]
    }
  );
}
function SignupPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState("auth");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated && step === "auth") {
      setStep("profile");
    }
  }, [isAuthenticated, step]);
  const handleIISignup = async () => {
    try {
      ue.loading("Launching Internet Identity…", { id: "ii-signup" });
      await login();
      ue.dismiss("ii-signup");
      setStep("profile");
    } catch {
      ue.error("Authentication failed. Please try again.", {
        id: "ii-signup"
      });
    }
  };
  const handleProfileSubmit = async (data) => {
    if (!actor) {
      ue.error("Backend not ready, please wait a moment.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.updateStudentProfile(data);
      ue.success("Account created! Welcome to Arthashastra Classes.");
      navigate({ to: "/dashboard" });
    } catch {
      ue.error("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center pt-16 px-4 py-12 relative overflow-hidden",
      "data-ocid": "signup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-bl from-violet-600/8 via-background to-cyan-500/8 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParticlesBg, {}),
        shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-3xl border border-violet-500/30 pointer-events-none",
            style: {
              width: s.size,
              height: s.size,
              top: s.top,
              left: "left" in s ? s.left : void 0,
              right: "right" in s ? s.right : void 0,
              boxShadow: "0 0 16px oklch(0.55 0.2 270 / 0.2)"
            },
            animate: { y: [0, -14, 0], rotate: [0, -6, 3, 0] },
            transition: {
              duration: 4.5 + s.delay,
              delay: s.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          },
          `${s.top}-${s.size}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl relative z-10 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-2xl border border-white/10 p-8 shadow-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mx-auto mb-4",
                      whileHover: { scale: 1.08, rotate: -4 },
                      transition: { type: "spring", stiffness: 300 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-7 h-7 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: step === "auth" ? "Join Arthashastra Classes" : "Complete Your Profile" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 max-w-sm mx-auto", children: step === "auth" ? "Create your account using Internet Identity — no password needed, ever." : "Just a few details to personalize your experience." })
                ] }),
                step === "auth" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-5 h-5 text-cyan-400 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Your Internet Identity is your universal secure login" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Internet Identity uses advanced cryptography to authenticate you without passwords. It works like Face ID or a hardware key — impossibly secure, instantly convenient. One identity unlocks every app on the Internet Computer." })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "w-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    RippleButton,
                    {
                      className: "w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_30px_oklch(0.55_0.20_270/0.4)] hover:shadow-[0_0_50px_oklch(0.55_0.20_270/0.6)] transition-smooth flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed",
                      onClick: handleIISignup,
                      disabled: isLoading,
                      "data-ocid": "signup.ii_signup.primary_button",
                      children: [
                        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-5 h-5" }),
                        isLoading ? "Verifying…" : "Sign Up with Internet Identity",
                        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-cyan-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Takes less than 30 seconds. No email verification. No passwords." })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProfileForm,
                  {
                    onSubmit: handleProfileSubmit,
                    isSubmitting
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 pt-5 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/login",
                      className: "text-cyan-400 hover:text-cyan-300 font-semibold transition-smooth",
                      "data-ocid": "signup.login.link",
                      children: "Sign in"
                    }
                  )
                ] }) })
              ] })
            }
          ),
          step === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: iiFeatures.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "glass-morphism rounded-xl border border-white/10 p-4",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 + i * 0.12, duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-4 h-4 text-violet-400 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-relaxed", children: f.desc })
              ]
            },
            f.title
          )) })
        ] })
      ]
    }
  );
}
export {
  SignupPage as default
};
