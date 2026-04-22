import { motion, useMotionValue, useSpring } from "motion/react";
import { type ReactNode, useRef, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "magenta";
  "data-ocid"?: string;
}

const glowShadows = {
  cyan: "0 0 30px oklch(0.68 0.24 200 / 0.5), 0 0 60px oklch(0.68 0.24 200 / 0.2)",
  violet:
    "0 0 30px oklch(0.55 0.20 270 / 0.5), 0 0 60px oklch(0.55 0.20 270 / 0.2)",
  magenta:
    "0 0 30px oklch(0.60 0.25 290 / 0.5), 0 0 60px oklch(0.60 0.25 290 / 0.2)",
};

export default function GlowCard({
  children,
  className = "",
  glowColor = "cyan",
  "data-ocid": ocid,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 15);
    rotateX.set(-dy * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass-morphism rounded-xl transition-smooth ${className}`}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        boxShadow: hovered ? glowShadows[glowColor] : "none",
      }}
      data-ocid={ocid}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
