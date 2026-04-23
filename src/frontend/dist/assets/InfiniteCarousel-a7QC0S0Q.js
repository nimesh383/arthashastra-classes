import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-UQyTW7IZ.js";
function InfiniteCarousel({
  items,
  speed = 40,
  className = "",
  itemClassName = "",
  direction = "left"
}) {
  const containerRef = reactExports.useRef(null);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const tripled = [...items, ...items, ...items];
  const animationDuration = items.length * speed / 4;
  const totalWidth = items.length * 2 * 320 + items.length * 2 * 16;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `overflow-hidden ${className}`,
      ref: containerRef,
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex gap-4 w-max",
          animate: {
            x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0]
          },
          transition: {
            duration: animationDuration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY
          },
          style: {
            willChange: "transform",
            animationPlayState: isPaused ? "paused" : "running"
          },
          children: tripled.map((item, i) => {
            const originalLength = items.length;
            const setIndex = Math.floor(i / originalLength);
            const itemIndex = i % originalLength;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `shrink-0 ${itemClassName}`,
                children: item
              },
              `set-${setIndex}-item-${itemIndex}`
            );
          })
        }
      )
    }
  );
}
export {
  InfiniteCarousel as I
};
