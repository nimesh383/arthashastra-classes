import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SESSION_KEY = "exit-intent-shown";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const hasShownRef = useRef(false);
  const { actor } = useActor(createActor);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        hasShownRef.current = true;
      }
    } catch {
      /* noop */
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShownRef.current) return;
      if (e.clientY < 10) {
        hasShownRef.current = true;
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* noop */
        }
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    try {
      await actor.submitEnquiry({
        name,
        email,
        phone,
        message: "Get free study materials",
      });
      setSubmitted(true);
      toast.success("We'll send you free study materials shortly!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[91] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            data-ocid="exit_intent_popup.dialog"
          >
            <div
              className="glass-morphism border border-cyan-400/20 rounded-3xl p-8 w-full max-w-md relative shadow-[0_0_60px_oklch(0.68_0.24_200/0.15)] select-none"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-smooth"
                aria-label="Close popup"
                data-ocid="exit_intent_popup.close_button"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div
                  className="text-center py-4"
                  data-ocid="exit_intent_popup.success_state"
                >
                  <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-extrabold text-foreground mb-2">
                    You're all set!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We'll send your free study materials to your inbox shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm hover:shadow-[0_0_20px_oklch(0.68_0.24_200/0.4)] transition-smooth"
                    data-ocid="exit_intent_popup.confirm_button"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <span className="inline-block text-2xl mb-2">🎁</span>
                    <h3 className="font-display text-2xl font-extrabold gradient-text-cyan-violet mb-2">
                      Get Free Study Materials
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Leave your details and we'll send you exclusive
                      Arthashastra notes, PYQs, and revision sheets — for free.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                    data-ocid="exit_intent_popup"
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-smooth"
                      data-ocid="exit_intent_popup.name_input"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-smooth"
                      data-ocid="exit_intent_popup.email_input"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-smooth"
                      data-ocid="exit_intent_popup.phone_input"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.4)] transition-smooth disabled:opacity-60 flex items-center justify-center gap-2"
                      data-ocid="exit_intent_popup.submit_button"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send Me Free Materials"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
