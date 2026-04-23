import { c as createLucideIcon, r as reactExports, ab as useGalleryImages, j as jsxRuntimeExports, m as motion, L as Link, C as ChevronRight, ac as GalleryCategory, a9 as CirclePlay, U as Users, A as AnimatePresence, X } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const Grid3x3 = createLucideIcon("grid-3x3", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }],
  ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18", key: "nf6bnh" }],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2", key: "12espp" }]
];
const Images = createLucideIcon("images", __iconNode);
const CATEGORIES = [
  { label: "All", value: "all", icon: Grid3x3 },
  { label: "Classroom", value: GalleryCategory.classroom, icon: Images },
  { label: "Events", value: GalleryCategory.events, icon: CirclePlay },
  { label: "Results", value: GalleryCategory.results, icon: Grid3x3 },
  { label: "Team", value: GalleryCategory.team, icon: Users }
];
const CATEGORY_COLORS = {
  [GalleryCategory.classroom]: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  [GalleryCategory.events]: "text-violet-400 border-violet-400/30 bg-violet-400/5",
  [GalleryCategory.results]: "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5",
  [GalleryCategory.team]: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
};
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const image = images[index];
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);
  if (!image) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      "data-ocid": "gallery.lightbox.dialog",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close lightbox",
            className: "absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth",
            onClick: onClose,
            "data-ocid": "gallery.lightbox.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: "absolute left-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth disabled:opacity-30",
            onClick: (e) => {
              e.stopPropagation();
              onPrev();
            },
            disabled: index === 0,
            "data-ocid": "gallery.lightbox.prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: "absolute right-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-foreground hover:text-cyan-400 transition-smooth disabled:opacity-30",
            onClick: (e) => {
              e.stopPropagation();
              onNext();
            },
            disabled: index === images.length - 1,
            "data-ocid": "gallery.lightbox.next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative max-w-5xl max-h-[85vh] mx-16 rounded-2xl overflow-hidden neon-border-cyan",
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { duration: 0.3 },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: image.imageUrl,
                  alt: image.title,
                  className: "max-h-[80vh] max-w-full object-contain"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 glass-morphism px-6 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: image.title }),
                image.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 line-clamp-2", children: image.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-1 block", children: [
                  index + 1,
                  " / ",
                  images.length
                ] })
              ] })
            ]
          },
          image.id
        )
      ]
    }
  );
}
function ImageCard({ image, index, onClick }) {
  const colorClass = CATEGORY_COLORS[image.category] ?? "text-cyan-400 border-cyan-400/30 bg-cyan-400/5";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index % 6 * 0.07 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlowCard,
        {
          glowColor: "cyan",
          className: "overflow-hidden cursor-pointer group",
          "data-ocid": `gallery.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "relative aspect-video overflow-hidden w-full",
                onClick,
                "aria-label": `Open ${image.title}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: image.imageUrl,
                      alt: image.title,
                      className: "w-full h-full object-cover transition-smooth group-hover:scale-110",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full glass-morphism flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "w-5 h-5 text-cyan-400" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full border ${colorClass}`,
                      children: image.category
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm truncate", children: image.title }),
              image.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 line-clamp-2", children: image.description })
            ] })
          ]
        }
      )
    }
  );
}
function GalleryPage() {
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const categoryParam = activeFilter === "all" ? null : activeFilter;
  const { data: images = [], isLoading } = useGalleryImages(categoryParam);
  const visibleImages = images.filter((img) => img.isVisible);
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => i !== null && i > 0 ? i - 1 : i);
  const nextImage = () => setLightboxIndex(
    (i) => i !== null && i < visibleImages.length - 1 ? i + 1 : i
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[55vh] flex flex-col justify-center py-20",
        "data-ocid": "gallery.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-violet-600/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.68_0.24_200/0.07),transparent)] pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.nav,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6",
                "aria-label": "breadcrumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:text-cyan-400 transition-colors",
                      "data-ocid": "gallery.breadcrumb.home_link",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400", children: "Gallery" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5", children: "Visual Archive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6", children: [
                    "Our ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Gallery" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto", children: "A visual journey through classrooms, achievements, events, and the vibrant community of Arthashastra Classes." })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 bg-muted/10 border-y border-white/5 sticky top-16 z-30",
        "data-ocid": "gallery.filters.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-3", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition-smooth ${activeFilter === cat.value ? "bg-gradient-to-r from-cyan-500 to-violet-600 border-transparent text-foreground shadow-lg" : "glass-morphism border-white/10 text-muted-foreground hover:border-cyan-400/40 hover:text-cyan-400"}`,
            onClick: () => setActiveFilter(cat.value),
            "data-ocid": `gallery.filter.${cat.value}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: "w-4 h-4" }),
              cat.label
            ]
          },
          cat.value
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background", "data-ocid": "gallery.grid.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        "data-ocid": "gallery.loading_state",
        children: [
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
          "sk-12"
        ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-video rounded-xl glass-morphism animate-pulse"
          },
          k
        ))
      }
    ) : visibleImages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24",
        "data-ocid": "gallery.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "No images yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: activeFilter === "all" ? "The gallery is empty — check back soon!" : `No ${activeFilter} photos available yet.` })
        ]
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: visibleImages.map((image, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageCard,
      {
        image,
        index: i,
        onClick: () => openLightbox(i)
      },
      image.id
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        images: visibleImages,
        index: lightboxIndex,
        onClose: closeLightbox,
        onPrev: prevImage,
        onNext: nextImage
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-muted/10 border-t border-white/5",
        "data-ocid": "gallery.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl font-extrabold text-foreground mb-4", children: [
            "Want to be in our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "next highlight?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-xl mx-auto", children: "Enroll now and become part of the Arthashastra success story." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/courses",
              className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-smooth",
              "data-ocid": "gallery.cta.courses_link",
              children: [
                "Explore Courses ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
              ]
            }
          )
        ] }) })
      }
    )
  ] });
}
export {
  GalleryPage as default
};
