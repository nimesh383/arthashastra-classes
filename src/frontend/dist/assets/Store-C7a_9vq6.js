import { c as createLucideIcon, r as reactExports, a7 as useProducts, j as jsxRuntimeExports, m as motion, T as Tag, B as BookOpen, a8 as Category, g as useAuth, R as RippleButton, i as LogIn, x as ue } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { S as Skeleton } from "./skeleton-BPyatiJD.js";
import { S as ShieldCheck } from "./shield-check-CgJmQh30.js";
import { S as Sparkles } from "./sparkles-x-C5279q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const CATEGORY_FILTERS = [
  { label: "All", icon: ShoppingBag },
  { label: "Books", icon: BookOpen },
  { label: "Merchandise", icon: Package }
];
function matchesFilter(product, filter) {
  if (filter === "All") return true;
  if (filter === "Books")
    return product.category === Category.Book || product.category === Category.Notes;
  return product.category === Category.Merchandise || product.category === Category.DigitalResource;
}
function getCategoryGlow(category) {
  if (category === Category.Book || category === Category.Notes) return "cyan";
  if (category === Category.Merchandise) return "violet";
  return "magenta";
}
function getCategoryBadge(category) {
  switch (category) {
    case Category.Book:
      return {
        label: "Book",
        cls: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
      };
    case Category.Notes:
      return {
        label: "Notes",
        cls: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20"
      };
    case Category.Merchandise:
      return {
        label: "Merchandise",
        cls: "text-violet-400 bg-violet-500/10 border-violet-500/20"
      };
    case Category.DigitalResource:
      return {
        label: "Digital",
        cls: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20"
      };
  }
}
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 mt-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 rounded-xl" })
      ] })
    ] })
  ] });
}
function ProductImage({
  src,
  alt,
  category
}) {
  const [errored, setErrored] = reactExports.useState(false);
  const glow = getCategoryGlow(category);
  if (!src || errored) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-full h-48 flex items-center justify-center ${glow === "cyan" ? "bg-cyan-500/5" : glow === "violet" ? "bg-violet-500/5" : "bg-fuchsia-500/5"}`,
        children: glow === "cyan" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-cyan-400/30" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-14 h-14 text-violet-400/30" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt,
      className: "w-full h-48 object-cover transition-smooth group-hover:scale-105",
      onError: () => setErrored(true)
    }
  );
}
function BuyNowButton({ product }) {
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleBuy = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login?returnTo=/store";
      return;
    }
    setIsProcessing(true);
    try {
      const sessionRef = `cs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      await new Promise((resolve) => setTimeout(resolve, 1200));
      ue.success(`Order placed for "${product.title}"!`, {
        description: `Reference: ${sessionRef.slice(0, 20)}… — You'll receive a confirmation shortly.`,
        duration: 6e3
      });
    } catch {
      ue.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      RippleButton,
      {
        onClick: handleBuy,
        className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)]",
        "data-ocid": "store.login_to_purchase_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
          "Login to Purchase"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RippleButton,
    {
      onClick: handleBuy,
      disabled: isProcessing,
      className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold transition-smooth hover:opacity-90 shadow-[0_0_14px_oklch(0.68_0.24_200/0.3)] disabled:opacity-60 disabled:cursor-not-allowed",
      "data-ocid": "store.buy_button",
      children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" }),
        "Processing…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
        "Buy Now"
      ] })
    }
  );
}
function ProductCard({ product, index }) {
  const glowColor = getCategoryGlow(product.category);
  const badge = getCategoryBadge(product.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor,
      className: "h-full flex flex-col group overflow-hidden",
      "data-ocid": `store.product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductImage,
            {
              src: product.imageUrl,
              alt: product.title,
              category: product.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${badge.cls}`,
              children: badge.label
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground mb-2 leading-snug", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2 mb-4", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-xl", children: [
                "₹",
                product.price.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BuyNowButton, { product })
          ] })
        ] })
      ]
    }
  ) });
}
function EmptyState({ filter }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "text-center py-28",
      "data-ocid": "store.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-9 h-9 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: filter === "All" ? "No products available yet" : `No ${filter} available yet` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Check back soon — new materials and merchandise are added regularly." })
      ]
    }
  );
}
function ErrorState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "text-center py-28",
      "data-ocid": "store.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-red-500/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-9 h-9 text-red-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Failed to load products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Please refresh the page or try again later." })
      ]
    }
  );
}
const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: Tag, label: "Best Price" },
  { icon: Sparkles, label: "Quality Assured" }
];
function StorePage() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const { data: products, isLoading, isError } = useProducts();
  const filtered = (products ?? []).filter(
    (p) => p.isAvailable && matchesFilter(p, activeFilter)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", "data-ocid": "store.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "store.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-600/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: ["a", "b", "c", "d", "e", "f"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: `absolute w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-cyan-400/40" : "bg-violet-400/40"}`,
          style: {
            left: `${12 + i * 15}%`,
            top: `${25 + i % 3 * 20}%`
          },
          animate: { y: [-12, 12, -12], opacity: [0.3, 0.9, 0.3] },
          transition: {
            duration: 3 + i * 0.6,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5
          }
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-violet-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
                "Official Store"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
                "Shop for",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent", children: "Success" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "Curated books, study materials, and exclusive Arthashastra merchandise — everything you need to excel in commerce." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.25 },
            className: "flex flex-wrap items-center justify-center gap-4 mt-8",
            "data-ocid": "store.trust_badges",
            children: TRUST_ITEMS.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground glass-morphism border border-white/10 rounded-full px-3 py-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-cyan-400" }),
                  label
                ]
              },
              label
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-8 bg-background", "data-ocid": "store.filters.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism border border-white/10 rounded-2xl p-4 inline-flex gap-2 flex-wrap", children: CATEGORY_FILTERS.map(({ label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveFilter(label),
        className: `inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth border ${activeFilter === label ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-transparent shadow-[0_0_14px_oklch(0.55_0.20_270/0.4)]" : "glass-morphism border-white/10 text-muted-foreground hover:text-foreground hover:border-violet-500/30"}`,
        "data-ocid": `store.filter.${label.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
          label
        ]
      },
      label
    )) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-28 bg-background",
        "data-ocid": "store.products.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            "data-ocid": "store.loading_state",
            children: Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton index is stable
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, i)
            ))
          }
        ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filter: activeFilter }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product,
            index: i
          },
          String(product.id)
        )) }) })
      }
    )
  ] });
}
export {
  StorePage as default
};
