import MagneticButton from "@/components/ui/MagneticButton";
import RippleButton from "@/components/ui/RippleButton";
import { useAuth } from "@/store/authStore";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Fingerprint,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

// Floating particle canvas background
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

    const count = 55;
    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    };
    const colors = [
      "oklch(0.68 0.24 200)",
      "oklch(0.55 0.2 270)",
      "oklch(0.6 0.25 290)",
    ];
    const particles: Particle[] = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      color:
        colors[
          (idx + Math.floor(Math.random() * colors.length)) % colors.length
        ],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

const floatingShapes = [
  { size: 80, top: "10%", left: "8%", color: "cyan", delay: 0 },
  { size: 50, top: "70%", left: "5%", color: "violet", delay: 1.2 },
  { size: 60, top: "20%", right: "7%", color: "magenta", delay: 0.6 },
  { size: 40, top: "75%", right: "10%", color: "cyan", delay: 1.8 },
];

const glowColorMap: Record<string, string> = {
  cyan: "oklch(0.68 0.24 200 / 0.25)",
  violet: "oklch(0.55 0.2 270 / 0.25)",
  magenta: "oklch(0.6 0.25 290 / 0.25)",
};

export default function LoginPage() {
  const { isAuthenticated, isLoading, login, role } = useAuth();
  const navigate = useNavigate();

  // Read ?returnTo from query string — useSearch is untyped here, use window.location
  const search =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const returnTo = search.get("returnTo");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (returnTo) {
        navigate({ to: returnTo as never });
      } else if (role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    }
  }, [isAuthenticated, role, navigate, returnTo]);

  const handleIILogin = async () => {
    try {
      toast.loading("Connecting to Internet Identity…", { id: "ii-login" });
      await login();
      toast.dismiss("ii-login");
      // Navigation handled by useEffect above once isAuthenticated updates
    } catch {
      toast.error("Login failed. Please try again.", { id: "ii-login" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-violet-600/8 pointer-events-none" />
      <ParticlesBg />

      {/* Floating geometric shapes */}
      {floatingShapes.map((s) => (
        <motion.div
          key={s.color + s.top}
          className="absolute rounded-2xl border opacity-20 pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
            borderColor: glowColorMap[s.color].replace("/ 0.25", "/ 0.6"),
            boxShadow: `0 0 20px ${glowColorMap[s.color]}`,
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -4, 0] }}
          transition={{
            duration: 5 + s.delay * 0.8,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Card */}
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 36, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="glass-morphism rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookOpen className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Arthashastra Classes
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Sign in with your Internet Identity to continue
            </p>
          </div>

          {/* Internet Identity CTA */}
          <div className="flex flex-col gap-4 mb-6">
            <MagneticButton className="w-full">
              <RippleButton
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-base shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_50px_oklch(0.68_0.24_200/0.6)] transition-smooth flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleIILogin}
                disabled={isLoading}
                data-ocid="login.ii_login.primary_button"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Fingerprint className="w-5 h-5" />
                )}
                {isLoading ? "Verifying…" : "Login with Internet Identity"}
                {!isLoading && <ChevronRight className="w-4 h-4" />}
              </RippleButton>
            </MagneticButton>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                icon: Shield,
                label: "Zero passwords",
                sub: "Cryptographic security",
              },
              {
                icon: Zap,
                label: "One-click access",
                sub: "Instant authentication",
              },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <b.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {b.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {b.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-smooth"
                data-ocid="login.signup.link"
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>

        {/* Sub-note + Forgot access */}
        <div className="text-center mt-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground/60">
            Internet Identity is a secure, passwordless authentication system by
            the Internet Computer.
          </p>
          <a
            href="https://identity.ic0.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-500/70 hover:text-cyan-400 transition-smooth underline underline-offset-2"
            data-ocid="login.recover_ii.link"
          >
            Forgot your access? Recover via Internet Identity
          </a>
        </div>
      </motion.div>
    </div>
  );
}
