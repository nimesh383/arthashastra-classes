import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "data-ocid"?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleButton({
  children,
  className = "",
  onClick,
  disabled = false,
  "data-ocid": ocid,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);
    onClick?.();
  };

  return (
    <button
      type="button"
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
      data-ocid={ocid}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 12, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
