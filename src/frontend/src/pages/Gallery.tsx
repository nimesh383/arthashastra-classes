import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import { useGalleryImages } from "@/hooks/useBackend";
import { GalleryCategory } from "@/types";
import type { GalleryImage } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Images,
  PlayCircle,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Category config ──────────────────────────────────────────────────────────
type FilterCategory = "all" | GalleryCategory;

const CATEGORIES: Array<{
  label: string;
  value: FilterCategory;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { label: "All", value: "all", icon: Grid3X3 },
  { label: "Classroom", value: GalleryCategory.classroom, icon: Images },
  { label: "Events", value: GalleryCategory.events, icon: PlayCircle },
  { label: "Results", value: GalleryCategory.results, icon: Grid3X3 },
  { label: "Team", value: GalleryCategory.team, icon: Users },
];

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  [GalleryCategory.classroom]: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  [GalleryCategory.events]:
    "text-violet-400 border-violet-400/30 bg-violet-400/5",
  [GalleryCategory.results]:
    "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5",
  [GalleryCategory.team]:
    "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const image = images[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      data-ocid="gallery.lightbox.dialog"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth"
        onClick={onClose}
        data-ocid="gallery.lightbox.close_button"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous image"
        className="absolute left-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth disabled:opacity-30"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        disabled={index === 0}
        data-ocid="gallery.lightbox.prev_button"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next image"
        className="absolute right-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth disabled:opacity-30"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={index === images.length - 1}
        data-ocid="gallery.lightbox.next_button"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={image.id}
        className="relative max-w-5xl max-h-[85vh] mx-16 rounded-2xl overflow-hidden neon-border-cyan"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.imageUrl}
          alt={image.title}
          className="max-h-[80vh] max-w-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 glass-morphism px-6 py-4">
          <p className="font-display font-bold text-foreground text-sm">
            {image.title}
          </p>
          {image.description && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
              {image.description}
            </p>
          )}
          <span className="text-xs text-muted-foreground mt-1 block">
            {index + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────
interface ImageCardProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

function ImageCard({ image, index, onClick }: ImageCardProps) {
  const colorClass =
    CATEGORY_COLORS[image.category] ??
    "text-cyan-400 border-cyan-400/30 bg-cyan-400/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
    >
      <GlowCard
        glowColor="cyan"
        className="overflow-hidden cursor-pointer group"
        data-ocid={`gallery.item.${index + 1}`}
      >
        <button
          type="button"
          className="relative aspect-video overflow-hidden w-full"
          onClick={onClick}
          aria-label={`Open ${image.title}`}
        >
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
            <div className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center">
              <Images className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          {/* Category badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full border ${colorClass}`}
          >
            {image.category}
          </span>
        </button>
        <div className="p-4">
          <h3 className="font-display font-bold text-foreground text-sm truncate">
            {image.title}
          </h3>
          {image.description && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryParam = activeFilter === "all" ? null : activeFilter;
  const { data: images = [], isLoading } = useGalleryImages(categoryParam);

  const visibleImages = images.filter((img) => img.isVisible);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const nextImage = () =>
    setLightboxIndex((i) =>
      i !== null && i < visibleImages.length - 1 ? i + 1 : i,
    );

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-[55vh] flex flex-col justify-center py-20"
        data-ocid="gallery.hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6"
            aria-label="breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-cyan-400 transition-colors"
              data-ocid="gallery.breadcrumb.home_link"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-400">Gallery</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5">
              Visual Archive
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Our <span className="gradient-text-cyan-violet">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              A visual journey through classrooms, achievements, events, and the
              vibrant community of Arthashastra Classes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section
        className="py-8 bg-muted/10 border-y border-white/5 sticky top-16 z-30"
        data-ocid="gallery.filters.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition-smooth ${
                  activeFilter === cat.value
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 border-transparent text-foreground shadow-lg"
                    : "glass-morphism border-white/10 text-muted-foreground hover:border-cyan-400/40 hover:text-cyan-400"
                }`}
                onClick={() => setActiveFilter(cat.value)}
                data-ocid={`gallery.filter.${cat.value}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-16 bg-background" data-ocid="gallery.grid.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="gallery.loading_state"
            >
              {(
                [
                  "sk-1",
                  "sk-2",
                  "sk-3",
                  "sk-4",
                  "sk-5",
                  "sk-6",
                  "sk-7",
                  "sk-8",
                  "sk-9",
                  "sk-10",
                  "sk-11",
                  "sk-12",
                ] as const
              ).map((k) => (
                <div
                  key={k}
                  className="aspect-video rounded-xl glass-morphism animate-pulse"
                />
              ))}
            </div>
          ) : visibleImages.length === 0 ? (
            <AnimatedSection>
              <div
                className="text-center py-24"
                data-ocid="gallery.empty_state"
              >
                <Images className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  No images yet
                </h3>
                <p className="text-muted-foreground">
                  {activeFilter === "all"
                    ? "The gallery is empty — check back soon!"
                    : `No ${activeFilter} photos available yet.`}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleImages.map((image, i) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={visibleImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section
        className="py-20 bg-muted/10 border-t border-white/5"
        data-ocid="gallery.cta.section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-extrabold text-foreground mb-4">
              Want to be in our{" "}
              <span className="gradient-text-cyan-violet">next highlight?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Enroll now and become part of the Arthashastra success story.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth"
              data-ocid="gallery.cta.courses_link"
            >
              Explore Courses <ChevronRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
