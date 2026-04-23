import { useActiveAnnouncements } from "@/hooks/useBackend";
import { AnnouncementType } from "@/types";
import type { Announcement } from "@/types";

const FALLBACK_ITEMS: Announcement[] = [
  {
    id: "f1",
    title: "Admissions Open",
    message: "Admissions Open for 2025–26 Batch",
    announcementType: AnnouncementType.info,
    isActive: true,
    isPinned: false,
    createdAt: BigInt(0),
  },
  {
    id: "f2",
    title: "New Batch Starting",
    message: "New Commerce Batch Starting June 2025",
    announcementType: AnnouncementType.info,
    isActive: true,
    isPinned: false,
    createdAt: BigInt(0),
  },
  {
    id: "f3",
    title: "Test Schedule",
    message: "Check New Test Schedule — Register Now",
    announcementType: AnnouncementType.warning,
    isActive: true,
    isPinned: false,
    createdAt: BigInt(0),
  },
  {
    id: "f4",
    title: "Free Demo",
    message: "Free Demo Class Available — Book Your Slot",
    announcementType: AnnouncementType.info,
    isActive: true,
    isPinned: false,
    createdAt: BigInt(0),
  },
  {
    id: "f5",
    title: "Top Results",
    message: "Arthashastra Students Achieve Top Ranks in Commerce 2025",
    announcementType: AnnouncementType.urgent,
    isActive: true,
    isPinned: false,
    createdAt: BigInt(0),
  },
];

function getItemColor(item: Announcement): string {
  if (item.announcementType === AnnouncementType.urgent)
    return "oklch(0.6 0.25 290)";
  if (item.announcementType === AnnouncementType.warning)
    return "oklch(0.75 0.19 65)";
  return "oklch(0.85 0.03 260 / 0.85)";
}

export default function AnnouncementTicker() {
  const { data: backendItems } = useActiveAnnouncements();
  const items: Announcement[] =
    backendItems && backendItems.length > 0 ? backendItems : FALLBACK_ITEMS;

  // Triple for seamless loop: animate shifts by -33.333% = one copy scrolled off
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
      style={{
        height: "28px",
        background: "oklch(0.08 0.04 260)",
        borderBottom: "1px solid oklch(0.68 0.24 200 / 0.2)",
      }}
      data-ocid="announcement_ticker"
    >
      <style>{`
        @keyframes ac-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ac-ticker-track { animation: ac-ticker 50s linear infinite; }
        .ac-ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div
        className="ac-ticker-track flex items-center h-full"
        style={{ width: "300%", willChange: "transform" }}
      >
        {repeated.map((item, idx) => (
          <span
            key={`${item.id}-${idx}`}
            className="flex items-center gap-2 px-5 h-full whitespace-nowrap shrink-0"
          >
            <span
              style={{
                color: getItemColor(item),
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {item.message || item.title}
            </span>
            <span
              style={{
                color: "oklch(0.68 0.24 200)",
                fontSize: "10px",
                userSelect: "none",
              }}
            >
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
