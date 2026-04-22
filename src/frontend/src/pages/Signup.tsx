import { createActor } from "@/backend";
import MagneticButton from "@/components/ui/MagneticButton";
import RippleButton from "@/components/ui/RippleButton";
import { useAuth } from "@/store/authStore";
import type { ProfileInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Fingerprint,
  Globe,
  Loader2,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const colors = [
      "oklch(0.68 0.24 200)",
      "oklch(0.55 0.2 270)",
      "oklch(0.6 0.25 290)",
    ];
    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    };
    const ps: P[] = Array.from({ length: 50 }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.1,
      color: colors[idx % colors.length],
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
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}

const iiFeatures = [
  {
    icon: Shield,
    title: "Cryptographic Security",
    desc: "Your identity is protected by advanced public-key cryptography — no passwords to steal.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    desc: "One Internet Identity unlocks any app on the Internet Computer seamlessly.",
  },
  {
    icon: Lock,
    title: "Fully Decentralized",
    desc: "No company owns your data. Your identity lives on a blockchain you control.",
  },
];

const shapes = [
  { size: 70, top: "12%", left: "6%", delay: 0 },
  { size: 45, top: "65%", left: "4%", delay: 1.5 },
  { size: 55, top: "18%", right: "6%", delay: 0.7 },
  { size: 35, top: "72%", right: "8%", delay: 2 },
];

// Profile form step shown after II auth to collect name/email/phone
interface ProfileFormProps {
  onSubmit: (data: ProfileInput) => Promise<void>;
  isSubmitting: boolean;
}

function ProfileForm({ onSubmit, isSubmitting }: ProfileFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    await onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="signup.profile_form"
    >
      <div>
        <label
          htmlFor="signup-name"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
        >
          Full Name *
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth"
          data-ocid="signup.name.input"
          required
        />
      </div>
      <div>
        <label
          htmlFor="signup-email"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
        >
          Email Address
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. rahul@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth"
          data-ocid="signup.email.input"
        />
      </div>
      <div>
        <label
          htmlFor="signup-phone"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
        >
          Phone Number
        </label>
        <input
          id="signup-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. +91 98765 43210"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-smooth"
          data-ocid="signup.phone.input"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_24px_oklch(0.55_0.20_270/0.4)] hover:shadow-[0_0_40px_oklch(0.55_0.20_270/0.6)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        data-ocid="signup.profile.submit_button"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {isSubmitting ? "Creating Profile…" : "Complete Registration"}
        {!isSubmitting && <ChevronRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

export default function SignupPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [step, setStep] = useState<"auth" | "profile">("auth");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect already-authenticated users straight to their destination
  useEffect(() => {
    if (isAuthenticated && step === "auth") {
      setStep("profile");
    }
  }, [isAuthenticated, step]);

  const handleIISignup = async () => {
    try {
      toast.loading("Launching Internet Identity…", { id: "ii-signup" });
      await login();
      toast.dismiss("ii-signup");
      setStep("profile");
    } catch {
      toast.error("Authentication failed. Please try again.", {
        id: "ii-signup",
      });
    }
  };

  const handleProfileSubmit = async (data: ProfileInput) => {
    if (!actor) {
      toast.error("Backend not ready, please wait a moment.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.updateStudentProfile(data);
      toast.success("Account created! Welcome to Arthashastra Classes.");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-16 px-4 py-12 relative overflow-hidden"
      data-ocid="signup.page"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/8 via-background to-cyan-500/8 pointer-events-none" />
      <ParticlesBg />

      {/* Floating shapes */}
      {shapes.map((s) => (
        <motion.div
          key={`${s.top}-${s.size}`}
          className="absolute rounded-3xl border border-violet-500/30 pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
            boxShadow: "0 0 16px oklch(0.55 0.2 270 / 0.2)",
          }}
          animate={{ y: [0, -14, 0], rotate: [0, -6, 3, 0] }}
          transition={{
            duration: 4.5 + s.delay,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="w-full max-w-xl relative z-10 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Main card */}
          <div className="glass-morphism rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BookOpen className="w-7 h-7 text-white" />
              </motion.div>
              <h1 className="font-display text-3xl font-extrabold text-foreground">
                {step === "auth"
                  ? "Join Arthashastra Classes"
                  : "Complete Your Profile"}
              </h1>
              <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
                {step === "auth"
                  ? "Create your account using Internet Identity — no password needed, ever."
                  : "Just a few details to personalize your experience."}
              </p>
            </div>

            {step === "auth" ? (
              <>
                {/* II explanation box */}
                <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Fingerprint className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Your Internet Identity is your universal secure login
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Internet Identity uses advanced cryptography to
                        authenticate you without passwords. It works like Face
                        ID or a hardware key — impossibly secure, instantly
                        convenient. One identity unlocks every app on the
                        Internet Computer.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <MagneticButton className="w-full mb-4">
                  <RippleButton
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_30px_oklch(0.55_0.20_270/0.4)] hover:shadow-[0_0_50px_oklch(0.55_0.20_270/0.6)] transition-smooth flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleIISignup}
                    disabled={isLoading}
                    data-ocid="signup.ii_signup.primary_button"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Fingerprint className="w-5 h-5" />
                    )}
                    {isLoading
                      ? "Verifying…"
                      : "Sign Up with Internet Identity"}
                    {!isLoading && <ChevronRight className="w-4 h-4" />}
                  </RippleButton>
                </MagneticButton>

                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <p className="text-xs text-muted-foreground">
                    Takes less than 30 seconds. No email verification. No
                    passwords.
                  </p>
                </div>
              </>
            ) : (
              <ProfileForm
                onSubmit={handleProfileSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            <div className="border-t border-white/10 pt-5 mt-4">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-smooth"
                  data-ocid="signup.login.link"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        {step === "auth" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {iiFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="glass-morphism rounded-xl border border-white/10 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
              >
                <f.icon className="w-4 h-4 text-violet-400 mb-2" />
                <p className="text-xs font-semibold text-foreground mb-1">
                  {f.title}
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
