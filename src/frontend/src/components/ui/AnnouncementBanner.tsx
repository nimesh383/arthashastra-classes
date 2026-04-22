import { useActiveAnnouncements } from "@/hooks/useBackend";
import type { Announcement } from "@/types";
import { AnnouncementType } from "@/types";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function getStorageKey(id: string) {
  return `announcement-dismissed-${id}`;
}

function isDismissed(id: string) {
  try {
    return localStorage.getItem(getStorageKey(id)) === "1";
  } catch {
    return false;
  }
}

function dismiss(id: string) {
  try {
    localStorage.setItem(getStorageKey(id), "1");
  } catch {
    /* noop */
  }
}

function getTypeStyles(type: AnnouncementType) {
  switch (type) {
    case AnnouncementType.urgent:
      return {
        bar: "bg-red-950/80 border-b border-red-500/40",
        dot: "bg-red-400",
        text: "text-red-200",
        badge: "bg-red-500/20 text-red-300 border-red-500/30",
        close: "hover:bg-red-500/20 text-red-300",
      };
    case AnnouncementType.warning:
      return {
        bar: "bg-amber-950/80 border-b border-amber-500/40",
        dot: "bg-amber-400",
        text: "text-amber-200",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        close: "hover:bg-amber-500/20 text-amber-300",
      };
    default:
      return {
        bar: "bg-cyan-950/80 border-b border-cyan-500/30",
        dot: "bg-cyan-400",
        text: "text-cyan-100",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        close: "hover:bg-cyan-500/20 text-cyan-300",
      };
  }
}

function sortAnnouncements(list: Announcement[]): Announcement[] {
  const typeOrder = {
    [AnnouncementType.urgent]: 0,
    [AnnouncementType.warning]: 1,
    [AnnouncementType.info]: 2,
  };
  return [...list].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return (
      (typeOrder[a.announcementType] ?? 2) -
      (typeOrder[b.announcementType] ?? 2)
    );
  });
}

export default function AnnouncementBanner() {
  const { data: all = [] } = useActiveAnnouncements();
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (all.length === 0) return;
    const undismissed = all.filter((a) => !isDismissed(a.id));
    setVisibleIds(new Set(undismissed.map((a) => a.id)));
  }, [all]);

  const sorted = sortAnnouncements(all.filter((a) => visibleIds.has(a.id)));
  const top = sorted[0];

  if (!top) return null;

  const styles = getTypeStyles(top.announcementType);

  const handleClose = () => {
    dismiss(top.id);
    setVisibleIds((prev) => {
      const next = new Set(prev);
      next.delete(top.id);
      return next;
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key={top.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[60] ${styles.bar} backdrop-blur-md overflow-hidden`}
        data-ocid="announcement_banner"
        role="alert"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${styles.dot}`}
          />
          <div className="flex-1 min-w-0 flex items-center gap-3 flex-wrap">
            {top.title && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border ${styles.badge} shrink-0 uppercase tracking-wider`}
              >
                {top.title}
              </span>
            )}
            <p className={`text-xs font-medium ${styles.text} truncate`}>
              {top.message}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss announcement"
            className={`shrink-0 p-1 rounded transition-smooth ${styles.close}`}
            data-ocid="announcement_banner.close_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
