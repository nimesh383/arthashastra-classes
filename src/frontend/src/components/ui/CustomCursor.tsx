import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  const sizeMotion = useMotionValue(40);
  const opacityMotion = useMotionValue(0.5);
  const springSize = useSpring(sizeMotion, { stiffness: 300, damping: 25 });
  const springOpacity = useSpring(opacityMotion, {
    stiffness: 300,
    damping: 25,
  });

  const isTouchRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouchRef.current = true;
      return;
    }

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]")
      ) {
        sizeMotion.set(8);
        opacityMotion.set(0.9);
      }
    };

    const handleLeave = () => {
      sizeMotion.set(40);
      opacityMotion.set(0.5);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, sizeMotion, opacityMotion]);

  if (isTouchRef.current) return null;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-400/60"
        style={{
          x: springX,
          y: springY,
          width: springSize,
          height: springSize,
          opacity: springOpacity,
          boxShadow: "0 0 12px oklch(0.68 0.24 200 / 0.6)",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400"
        style={{ x: dotX, y: dotY, width: 8, height: 8 }}
      />
    </>
  );
}
