import MagneticButton from "@/components/ui/MagneticButton";
import RippleButton from "@/components/ui/RippleButton";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const PARTICLES = [
  { left: 42, top: 15 },
  { left: 73, top: 45 },
  { left: 10, top: 63 },
  { left: 88, top: 22 },
  { left: 25, top: 80 },
  { left: 60, top: 8 },
  { left: 5, top: 37 },
  { left: 92, top: 70 },
  { left: 47, top: 55 },
  { left: 18, top: 92 },
  { left: 78, top: 30 },
  { left: 33, top: 18 },
  { left: 65, top: 87 },
  { left: 51, top: 42 },
  { left: 82, top: 60 },
  { left: 14, top: 50 },
  { left: 56, top: 75 },
  { left: 38, top: 28 },
  { left: 70, top: 95 },
  { left: 2, top: 72 },
  { left: 44, top: 6 },
  { left: 96, top: 48 },
  { left: 27, top: 65 },
  { left: 62, top: 33 },
] as const;

function Particles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={`particle-${p.left}-${p.top}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + (p.left % 4),
            repeat: Number.POSITIVE_INFINITY,
            delay: p.top * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const hasReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
      data-ocid="not_found.page"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/6 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/6 blur-[100px]" />

      {!hasReducedMotion && <Particles />}

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="font-display text-[10rem] sm:text-[14rem] font-extrabold leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.24 200), oklch(0.60 0.28 280), oklch(0.65 0.30 330))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px oklch(0.68 0.24 200 / 0.4))",
            }}
            animate={
              hasReducedMotion
                ? {}
                : {
                    filter: [
                      "drop-shadow(0 0 40px oklch(0.68 0.24 200 / 0.4))",
                      "drop-shadow(0 0 60px oklch(0.68 0.24 200 / 0.7))",
                      "drop-shadow(0 0 40px oklch(0.68 0.24 200 / 0.4))",
                    ],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-3 -mt-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base mb-10">
            The page you're looking for doesn't exist or may have been moved.
            Head back to the homepage to continue your learning journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MagneticButton>
            <Link to="/" data-ocid="not_found.home_button">
              <RippleButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-lg shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] hover:shadow-[0_0_50px_oklch(0.68_0.24_200/0.6)] transition-smooth flex items-center gap-2 mx-auto">
                <Home className="w-5 h-5" />
                Back to Home
              </RippleButton>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
