import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      /* noop */
    }
  }, []);

  const handleDecision = (accepted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "declined");
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          aria-modal="true"
          aria-label="Cookie consent"
          data-ocid="cookie_banner"
        >
          <div className="glass-morphism border border-white/15 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs text-muted-foreground flex-1">
                We use cookies to enhance your experience. By continuing, you
                accept our{" "}
                <Link
                  to="/privacy-policy"
                  className="text-cyan-400 hover:text-cyan-300 transition-smooth underline underline-offset-2"
                >
                  cookie policy
                </Link>
                .
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDecision(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground glass-morphism border border-white/10 hover:text-foreground hover:border-white/20 transition-smooth"
                  data-ocid="cookie_banner.decline_button"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => handleDecision(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:shadow-[0_0_16px_oklch(0.68_0.24_200/0.4)] transition-smooth"
                  data-ocid="cookie_banner.accept_button"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
