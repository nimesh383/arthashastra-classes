import { r as reactExports, d as useScroll, e as useTransform, j as jsxRuntimeExports, m as motion } from "./index-lv5lHg54.js";
function ParallaxSection({
  children,
  className = "",
  speed = 0.3
}) {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * speed * 2, 100 * speed * 2]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `relative overflow-hidden ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { y }, children }) });
}
export {
  ParallaxSection as P
};
