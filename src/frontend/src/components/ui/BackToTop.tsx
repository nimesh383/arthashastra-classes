import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (y) => setVisible(y > 400));
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-5 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          data-ocid="back_to_top_button"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-xl glass-morphism border border-white/20 flex items-center justify-center text-foreground/70 hover:text-cyan-400 hover:border-cyan-400/40 transition-smooth shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
