import RippleButton from "@/components/ui/RippleButton";
import { Link } from "@tanstack/react-router";
import { BookOpen, FileText } from "lucide-react";
import { motion } from "motion/react";

export default function MobileCTABar() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 28 }}
      data-ocid="mobile_cta_bar"
    >
      <div className="glass-morphism border-t border-white/10 backdrop-blur-xl px-4 py-3 flex gap-3">
        <Link
          to="/courses"
          className="flex-1"
          data-ocid="mobile_cta_bar.enroll_button"
        >
          <RippleButton className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_oklch(0.68_0.24_200/0.3)] hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.5)] transition-smooth">
            <BookOpen className="w-4 h-4" />
            Enroll Now
          </RippleButton>
        </Link>
        <Link
          to="/study-materials"
          className="flex-1"
          data-ocid="mobile_cta_bar.free_notes_button"
        >
          <RippleButton className="w-full py-3 rounded-xl glass-morphism border border-fuchsia-400/40 text-fuchsia-300 font-bold text-sm flex items-center justify-center gap-2 hover:border-fuchsia-400/80 transition-smooth">
            <FileText className="w-4 h-4" />
            Free Notes
          </RippleButton>
        </Link>
      </div>
    </motion.div>
  );
}
