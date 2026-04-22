import { motion } from "motion/react";
import { type ReactNode, useRef, useState } from "react";

interface InfiniteCarouselProps {
  items: ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  direction?: "left" | "right";
}

export default function InfiniteCarousel({
  items,
  speed = 40,
  className = "",
  itemClassName = "",
  direction = "left",
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tripled = [...items, ...items, ...items];

  const animationDuration = (items.length * speed) / 4;
  const totalWidth = items.length * 2 * 320 + items.length * 2 * 16;

  return (
    <div
      className={`overflow-hidden ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          willChange: "transform",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {tripled.map((item, i) => {
          const originalLength = items.length;
          const setIndex = Math.floor(i / originalLength);
          const itemIndex = i % originalLength;
          return (
            <div
              key={`set-${setIndex}-item-${itemIndex}`}
              className={`shrink-0 ${itemClassName}`}
            >
              {item}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
