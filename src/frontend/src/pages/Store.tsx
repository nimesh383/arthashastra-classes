import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useBackend";
import { useAuth } from "@/store/authStore";
import { Category } from "@/types";
import type { Product } from "@/types";
import {
  AlertCircle,
  BookOpen,
  LogIn,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import type { ComponentType } from "react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Filter types ──────────────────────────────────────────────────────────────
type CategoryFilter = "All" | "Books" | "Merchandise";

const CATEGORY_FILTERS: {
  label: CategoryFilter;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { label: "All", icon: ShoppingBag },
  { label: "Books", icon: BookOpen },
  { label: "Merchandise", icon: Package },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function matchesFilter(product: Product, filter: CategoryFilter): boolean {
  if (filter === "All") return true;
  if (filter === "Books")
    return (
      product.category === Category.Book || product.category === Category.Notes
    );
  return (
    product.category === Category.Merchandise ||
    product.category === Category.DigitalResource
  );
}

function getCategoryGlow(category: Category): "cyan" | "violet" | "magenta" {
  if (category === Category.Book || category === Category.Notes) return "cyan";
  if (category === Category.Merchandise) return "violet";
  return "magenta";
}

function getCategoryBadge(category: Category) {
  switch (category) {
    case Category.Book:
      return {
        label: "Book",
        cls: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      };
    case Category.Notes:
      return {
        label: "Notes",
        cls: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
      };
    case Category.Merchandise:
      return {
        label: "Merchandise",
        cls: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      };
    case Category.DigitalResource:
      return {
        label: "Digital",
        cls: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
      };
  }
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function ProductCardSkeleton() {
  return (
    <div className="glass-morphism rounded-xl overflow-hidden flex flex-col">
      <Skeleton className="w-full h-48" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <Skeleton className="w-20 h-5 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <div className="flex items-center justify-between pt-3 mt-auto">
          <Skeleton className="h-7 w-24 rounded" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Product image with fallback ──────────────────────────────────────────────
function ProductImage({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: Category;
}) {
  const [errored, setErrored] = useState(false);
  const glow = getCategoryGlow(category);

  if (!src || errored) {
    return (
      <div
        className={`w-full h-48 flex items-center justify-center ${
          glow === "cyan"
            ? "bg-cyan-500/5"
            : glow === "violet"
              ? "bg-violet-500/5"
              : "bg-fuchsia-500/5"
        }`}
      >
        {glow === "cyan" ? (
          <BookOpen className="w-14 h-14 text-cyan-400/30" />
        ) : (
          <Package className="w-14 h-14 text-violet-400/30" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
      onError={() => setErrored(true)}
    />
  );
}

// ─── Buy Now button ───────────────────────────────────────────────────────────
function BuyNowButton({ product }: { product: Product }) {
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login?returnTo=/store";
      return;
    }

    setIsProcessing(true);
    try {
      // Stripe-style checkout simulation:
      // Generate a unique checkout session reference
      const sessionRef = `cs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      // In production this would redirect to a Stripe hosted checkout page:
      // const res = await fetch('/api/stripe/checkout', {
      //   method: 'POST',
      //   body: JSON.stringify({ productId: product.id, amount: product.price, sessionRef })
      // });
      // window.location.href = res.checkoutUrl;

      // For now: simulate processing and show confirmation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success(`Order placed for "${product.title}"!`, {
        description: `Reference: ${sessionRef.slice(0, 20)}… — You'll receive a confirmation shortly.`,
        duration: 6000,
      });
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <RippleButton
        onClick={handleBuy}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)]"
        data-ocid="store.login_to_purchase_button"
      >
        <LogIn className="w-4 h-4" />
        Login to Purchase
      </RippleButton>
    );
  }

  return (
    <RippleButton
      onClick={handleBuy}
      disabled={isProcessing}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
      data-ocid="store.buy_button"
    >
      {isProcessing ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Buy Now
        </>
      )}
    </RippleButton>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const glowColor = getCategoryGlow(product.category);
  const badge = getCategoryBadge(product.category);

  return (
    <AnimatedSection delay={index * 0.08}>
      <GlowCard
        glowColor={glowColor}
        className="h-full flex flex-col group overflow-hidden"
        data-ocid={`store.product.item.${index + 1}`}
      >
        {/* Product image */}
        <div className="relative overflow-hidden">
          <ProductImage
            src={product.imageUrl}
            alt={product.title}
            category={product.category}
          />
          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${badge.cls}`}
            >
              {badge.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-display font-bold text-base text-foreground mb-2 leading-snug">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Footer: price + buy button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Price</p>
              <span className="font-display font-bold text-foreground text-xl">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>
            <BuyNowButton product={product} />
          </div>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ filter }: { filter: CategoryFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-28"
      data-ocid="store.empty_state"
    >
      <div className="w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-9 h-9 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        {filter === "All"
          ? "No products available yet"
          : `No ${filter} available yet`}
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs mx-auto">
        Check back soon — new materials and merchandise are added regularly.
      </p>
    </motion.div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-28"
      data-ocid="store.error_state"
    >
      <div className="w-20 h-20 rounded-full glass-morphism border border-red-500/20 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-9 h-9 text-red-400" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        Failed to load products
      </h3>
      <p className="text-muted-foreground text-sm">
        Please refresh the page or try again later.
      </p>
    </motion.div>
  );
}

// ─── Trust badges ─────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: Tag, label: "Best Price" },
  { icon: Sparkles, label: "Quality Assured" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StorePage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const { data: products, isLoading, isError } = useProducts();

  const filtered = (products ?? []).filter(
    (p) => p.isAvailable && matchesFilter(p, activeFilter),
  );

  return (
    <div className="pt-16 overflow-hidden" data-ocid="store.page">
      {/* ── Hero ── */}
      <section className="py-24 relative" data-ocid="store.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-600/5 pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {(["a", "b", "c", "d", "e", "f"] as const).map((key, i) => (
            <motion.div
              key={key}
              className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-cyan-400/40" : "bg-violet-400/40"}`}
              style={{
                left: `${12 + i * 15}%`,
                top: `${25 + (i % 3) * 20}%`,
              }}
              animate={{ y: [-12, 12, -12], opacity: [0.3, 0.9, 0.3] }}
              transition={{
                duration: 3 + i * 0.6,
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
            <span className="inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20">
              <ShoppingBag className="w-3.5 h-3.5" />
              Official Store
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Shop for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Success
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Curated books, study materials, and exclusive Arthashastra
              merchandise — everything you need to excel in commerce.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
            data-ocid="store.trust_badges"
          >
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground glass-morphism border border-white/10 rounded-full px-3 py-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="pb-8 bg-background" data-ocid="store.filters.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="glass-morphism border border-white/10 rounded-2xl p-4 inline-flex gap-2 flex-wrap">
              {CATEGORY_FILTERS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveFilter(label)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth border ${
                    activeFilter === label
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-transparent shadow-[0_0_14px_oklch(0.55_0.20_270/0.4)]"
                      : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-violet-500/30"
                  }`}
                  data-ocid={`store.filter.${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section
        className="py-8 pb-28 bg-background"
        data-ocid="store.products.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="store.loading_state"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is stable
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState />
          ) : filtered.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
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
