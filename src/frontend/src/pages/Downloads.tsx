import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import {
  useDownloadItems,
  useIncrementDownload,
  useMyDownloads,
} from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import { DownloadCategory } from "@/types";
import type { DownloadItem } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  IdCard,
  LogIn,
  Search,
  Ticket,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Category config ──────────────────────────────────────────────────────────
type FilterTab =
  | "All"
  | "Study Notes"
  | "Admit Cards"
  | "Hall Tickets"
  | "Certificates";

const TABS: FilterTab[] = [
  "All",
  "Study Notes",
  "Admit Cards",
  "Hall Tickets",
  "Certificates",
];

const TAB_CATEGORY: Record<Exclude<FilterTab, "All">, DownloadCategory> = {
  "Study Notes": DownloadCategory.study_notes,
  "Admit Cards": DownloadCategory.admit_card,
  "Hall Tickets": DownloadCategory.hall_ticket,
  Certificates: DownloadCategory.certificate,
};

interface CategoryCfg {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  glowColor: "cyan" | "violet" | "magenta";
  badge: string;
}

const CATEGORY_CFG: Record<string, CategoryCfg> = {
  [DownloadCategory.study_notes]: {
    icon: BookOpen,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowColor: "cyan",
    badge: "Study Notes",
  },
  [DownloadCategory.admit_card]: {
    icon: IdCard,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    glowColor: "violet",
    badge: "Admit Card",
  },
  [DownloadCategory.hall_ticket]: {
    icon: Ticket,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    glowColor: "magenta",
    badge: "Hall Ticket",
  },
  [DownloadCategory.certificate]: {
    icon: Award,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    glowColor: "cyan",
    badge: "Certificate",
  },
};

function getCfg(item: DownloadItem): CategoryCfg {
  const key = Object.keys(item.category)[0] as string;
  return CATEGORY_CFG[key] ?? CATEGORY_CFG[DownloadCategory.study_notes];
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function DownloadSkeleton() {
  return (
    <div className="glass-morphism rounded-xl border border-white/10 p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="w-16 h-6 rounded-full bg-white/5" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-white/5 rounded w-4/5" />
        <div className="h-3 bg-white/5 rounded w-3/5" />
        <div className="h-3 bg-white/5 rounded w-2/5" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex justify-between items-center">
        <div className="w-20 h-4 bg-white/5 rounded" />
        <div className="w-24 h-8 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

// ─── Download Card ────────────────────────────────────────────────────────────
interface DownloadCardProps {
  item: DownloadItem;
  isEnrolled: boolean;
  index: number;
}

function DownloadCard({ item, isEnrolled, index }: DownloadCardProps) {
  const cfg = getCfg(item);
  const Icon = cfg.icon;
  const { mutate: increment } = useIncrementDownload();
  const canDownload = item.isPublic || isEnrolled;

  const handleDownload = () => {
    if (!canDownload) {
      toast.error("Login & enroll to download this file.", {
        description: "Enroll in a course to unlock premium downloads.",
      });
      return;
    }
    increment(item.id);
    window.open(item.fileUrl, "_blank", "noopener");
    toast.success("Download started!", {
      description: item.title,
      duration: 3000,
    });
  };

  return (
    <AnimatedSection delay={index * 0.06}>
      <GlowCard
        glowColor={cfg.glowColor}
        className="p-5 flex flex-col gap-4 group relative h-full"
        data-ocid={`downloads.item.${index + 1}`}
      >
        {/* Lock overlay for non-enrolled */}
        {!canDownload && (
          <div className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/60 flex flex-col items-center justify-center gap-2 z-10">
            <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-xs font-semibold text-foreground text-center px-4">
              Login & Enroll to Download
            </p>
            <Link
              to="/courses"
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Browse Courses →
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color} ${!canDownload ? "opacity-40" : ""}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${!canDownload ? "opacity-40" : ""}`}
          >
            {cfg.badge}
          </span>
        </div>

        {/* Title + meta */}
        <div className="flex-1">
          <h3
            className={`font-semibold text-sm leading-snug mb-2 line-clamp-2 ${!canDownload ? "text-muted-foreground" : "text-foreground"}`}
          >
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {item.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {item.subject && (
              <span className="px-2 py-0.5 rounded glass-morphism border border-white/10">
                {item.subject}
              </span>
            )}
            {item.batchYear && (
              <span className="px-2 py-0.5 rounded glass-morphism border border-white/10">
                {item.batchYear}
              </span>
            )}
            <span>{formatDate(item.createdAt)}</span>
            {item.fileSize && (
              <>
                <span>·</span>
                <span>{item.fileSize}</span>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Download className="w-3.5 h-3.5" />
            <span>{item.downloadCount.toString()} downloads</span>
          </div>
          <RippleButton
            onClick={handleDownload}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              canDownload
                ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-cyan-300 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-violet-600/30"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed border border-white/5"
            }`}
            data-ocid={`downloads.download_button.${index + 1}`}
          >
            <Download className="w-3.5 h-3.5" />
            {canDownload ? "Download" : "Locked"}
          </RippleButton>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DownloadsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");

  const category = activeTab === "All" ? null : TAB_CATEGORY[activeTab];
  const { data: allItems = [], isLoading } = useDownloadItems(category);
  const { data: myDownloads = [] } = useMyDownloads();

  const myDownloadIds = useMemo(
    () => new Set(myDownloads.map((d) => d.id.toString())),
    [myDownloads],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q),
    );
  }, [allItems, search]);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="downloads.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {(["p0", "p1", "p2", "p3", "p4"] as const).map((k, i) => (
            <motion.div
              key={k}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
              style={{ left: `${8 + i * 20}%`, top: `${10 + (i % 3) * 30}%` }}
              animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 3.5 + i * 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-cyan-500/20">
              <Download className="w-3.5 h-3.5" />
              Resources
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Download <span className="gradient-text-cyan-violet">Center</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Notes, admit cards, hall tickets, and certificates — all your
              essential documents in one secure place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Gate */}
      {!isAuthenticated && (
        <section
          className="pb-4 bg-background"
          data-ocid="downloads.login_gate"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.05}>
              <div className="glass-morphism border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground text-sm">
                      Login to unlock your enrolled downloads
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Premium files are locked. Enroll in a course to access all
                      resources.
                    </p>
                  </div>
                </div>
                <Link to="/login" data-ocid="downloads.login_gate.login_button">
                  <RippleButton className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 shadow-[0_0_16px_oklch(0.68_0.24_200/0.35)]">
                    <LogIn className="w-4 h-4" />
                    Login / Sign up
                  </RippleButton>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Filters */}
      <section
        className="py-6 bg-background"
        data-ocid="downloads.filters.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search */}
          <AnimatedSection delay={0.08}>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search by title or subject…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-morphism border border-white/10 text-sm text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-cyan-500/40 transition-all"
                data-ocid="downloads.search_input"
              />
            </div>
          </AnimatedSection>

          {/* Category tabs */}
          <AnimatedSection delay={0.12}>
            <div className="flex flex-wrap gap-1.5 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all z-10 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`downloads.tab.${tab.toLowerCase().replace(/\s/g, "_")}`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="download-tab-bg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_12px_oklch(0.68_0.24_200/0.35)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Grid */}
      <section
        className="py-4 pb-28 bg-background"
        data-ocid="downloads.list.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map(
                (sk) => (
                  <DownloadSkeleton key={sk} />
                ),
              )}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-28"
              data-ocid="downloads.empty_state"
            >
              <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                No downloads available yet
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Check back soon or try a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("All");
                  setSearch("");
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90"
                data-ocid="downloads.empty_state.reset_button"
              >
                Show All
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <DownloadCard
                  key={item.id.toString()}
                  item={item}
                  isEnrolled={
                    isAuthenticated && myDownloadIds.has(item.id.toString())
                  }
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
