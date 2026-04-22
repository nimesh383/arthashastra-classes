import { aa as resolveElements, r as reactExports, j as jsxRuntimeExports, m as motion, ab as useMotionValue, ac as useSpring } from "./index-lv5lHg54.js";
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up"
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };
  const initial = { opacity: 0, ...directionMap[direction] };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      className,
      initial,
      animate: isInView ? { opacity: 1, x: 0, y: 0 } : initial,
      transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      children
    }
  );
}
const glowShadows = {
  cyan: "0 0 30px oklch(0.68 0.24 200 / 0.5), 0 0 60px oklch(0.68 0.24 200 / 0.2)",
  violet: "0 0 30px oklch(0.55 0.20 270 / 0.5), 0 0 60px oklch(0.55 0.20 270 / 0.2)",
  magenta: "0 0 30px oklch(0.60 0.25 290 / 0.5), 0 0 60px oklch(0.60 0.25 290 / 0.2)"
};
function GlowCard({
  children,
  className = "",
  glowColor = "cyan",
  "data-ocid": ocid
}) {
  const ref = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const handleMouseMove = (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      className: `glass-morphism rounded-xl transition-smooth ${className}`,
      style: {
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        boxShadow: hovered ? glowShadows[glowColor] : "none"
      },
      "data-ocid": ocid,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: handleMouseLeave,
      children
    }
  );
}
export {
  AnimatedSection as A,
  GlowCard as G,
  useInView as u
};
