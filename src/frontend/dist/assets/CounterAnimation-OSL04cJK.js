import { r as reactExports, j as jsxRuntimeExports } from "./index-lv5lHg54.js";
import { u as useInView } from "./GlowCard-DyOrzrAz.js";
function formatNumber(n) {
  return n.toLocaleString("en-IN");
}
function CounterAnimation({
  target,
  duration = 2e3,
  suffix = "",
  prefix = "",
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = reactExports.useState(0);
  const startedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className, children: [
    prefix,
    formatNumber(count),
    suffix
  ] });
}
export {
  CounterAnimation as C
};
