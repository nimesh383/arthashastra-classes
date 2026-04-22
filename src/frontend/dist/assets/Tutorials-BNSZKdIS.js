import { g as useAuth, r as reactExports, n as useMyEnrollments, j as jsxRuntimeExports, A as AnimatePresence, m as motion, a5 as CirclePlay, L as Link, B as BookOpen, C as ChevronRight, o as useActor, a6 as useQuery, X, p as useMyVideosForCourse, x as createActor } from "./index-lv5lHg54.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-DyOrzrAz.js";
import { V as VideoPlayer } from "./VideoPlayer-BOunHFCp.js";
import { S as Skeleton } from "./skeleton-BH48xlqF.js";
import { S as Sparkles } from "./sparkles-BZQwG-Q7.js";
import { L as LogIn } from "./log-in-C6bE2VCu.js";
import { L as Lock } from "./lock-m_s4PAAn.js";
function usePreviewVideos() {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching;
  return useQuery({
    queryKey: ["videos", "preview"],
    queryFn: () => actor.getPreviewVideos(),
    enabled
  });
}
function getGlowForIndex(i) {
  const colors = ["cyan", "violet", "magenta"];
  return colors[i % 3];
}
function VideoCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5 rounded" })
    ] })
  ] });
}
function LockedVideoCard({ index }) {
  const glowColor = getGlowForIndex(index);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor,
      className: "overflow-hidden flex flex-col group",
      "data-ocid": `tutorials.locked_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-[oklch(0.10_0.05_260)] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-violet-600/15 to-cyan-500/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_oklch(0.55_0.20_270/0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-violet-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/80", children: "Enroll to Watch" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground opacity-60 line-clamp-2", children: "Full Course Lecture Series" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground opacity-50 line-clamp-2", children: "Enroll in this course to access the complete video library with detailed lectures, solved examples and revision sessions." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/courses",
              className: "mt-1 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-smooth",
              "data-ocid": `tutorials.enroll_link.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                "Browse Courses"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function VideoCard({ video, index, onPlay }) {
  const glowColor = getGlowForIndex(index);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: index * 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor,
      className: "overflow-hidden flex flex-col group",
      "data-ocid": `tutorials.video_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onPlay(video),
            className: "relative aspect-video overflow-hidden w-full cursor-pointer",
            "aria-label": `Play ${video.title}`,
            children: [
              video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: video.thumbnailUrl,
                  alt: video.title,
                  className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none",
                  draggable: false
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-fuchsia-500/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-[0_0_24px_oklch(0.68_0.24_200/0.5)] group-hover:shadow-[0_0_36px_oklch(0.68_0.24_200/0.8)] group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6 text-white" }) }) }),
              video.isPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_10px_oklch(0.68_0.24_200/0.5)]", children: "Free Preview" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground line-clamp-2 leading-snug", children: video.title }),
          video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: video.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPlay(video),
              className: "mt-auto pt-2 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-smooth",
              "data-ocid": `tutorials.play_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                "Watch Now"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function VideoModal({
  video,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      "data-ocid": "tutorials.video_modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-3xl",
            initial: { opacity: 0, scale: 0.94, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.94, y: 20 },
            transition: { type: "spring", stiffness: 300, damping: 30 },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute -top-4 -right-2 z-20 w-9 h-9 rounded-full bg-card border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-smooth shadow-lg",
                  "aria-label": "Close video",
                  "data-ocid": "tutorials.video_modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoPlayer,
                {
                  videoUrl: video.videoUrl,
                  title: video.title,
                  thumbnailUrl: video.thumbnailUrl || void 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: video.title }),
                video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: video.description })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function EnrolledCourseSection({
  courseId,
  onPlay
}) {
  const { data: videos = [], isLoading } = useMyVideosForCourse(courseId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCardSkeleton, {}, k)) });
  }
  if (videos.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-px bg-cyan-400/50" }),
      "Course ",
      courseId.slice(-6)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: videos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video: v, index: i, onPlay }, v.id)) })
  ] });
}
function TutorialsPage() {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  const { data: previewVideos = [], isLoading: previewLoading } = usePreviewVideos();
  const { data: enrollments = [] } = useMyEnrollments();
  const courseIds = reactExports.useMemo(
    () => Array.from(new Set(previewVideos.map((v) => v.courseId))),
    [previewVideos]
  );
  const enrolledCourseIds = reactExports.useMemo(
    () => enrollments.map((e) => e.courseId.toString()),
    [enrollments]
  );
  const filteredPreviews = reactExports.useMemo(() => {
    if (activeFilter === "All") return previewVideos;
    return previewVideos.filter((v) => v.courseId === activeFilter);
  }, [previewVideos, activeFilter]);
  const lockedCourseIds = reactExports.useMemo(
    () => courseIds.filter((id) => !enrolledCourseIds.includes(id)),
    [courseIds, enrolledCourseIds]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VideoModal,
      {
        video: activeVideo,
        onClose: () => setActiveVideo(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative", "data-ocid": "tutorials.hero.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-500/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: ["v0", "v1", "v2", "v3", "v4", "v5"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute w-1 h-1 rounded-full bg-fuchsia-400/40",
          style: { left: `${12 + i * 15}%`, top: `${18 + i % 3 * 26}%` },
          animate: { y: [-10, 10, -10], opacity: [0.2, 0.7, 0.2] },
          transition: {
            duration: 3.2 + i * 0.55,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.45
          }
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full glass-morphism border border-fuchsia-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
              "Video Tutorials"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-tight", children: [
              "Video ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: "Tutorials" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "Watch free preview lessons from our top-ranked teachers. Enroll in a course to unlock the complete video library for your batch." })
          ]
        }
      ) })
    ] }),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pb-4 bg-background",
        "data-ocid": "tutorials.login_gate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-cyan-500/5 to-violet-600/5 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-cyan-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Login to access your enrolled course videos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Free previews are available below. Full course videos unlock after enrollment." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "data-ocid": "tutorials.login_gate.login_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_16px_oklch(0.68_0.24_200/0.35)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                "Login / Sign up"
              ]
            }
          ) })
        ] }) }) })
      }
    ),
    courseIds.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-6 bg-background",
        "data-ocid": "tutorials.filters.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex gap-1 glass-morphism border border-white/10 rounded-2xl p-1.5 w-fit flex-wrap", children: ["All", ...courseIds].map((id) => {
          const label = id === "All" ? "All Courses" : `Course ${id.slice(-6)}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveFilter(id),
              className: `relative px-5 py-2 rounded-xl text-sm font-medium transition-smooth z-10 ${activeFilter === id ? "text-white" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `tutorials.filter_tab.${id === "All" ? "all" : id.slice(-6)}`,
              children: [
                activeFilter === id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    layoutId: "tutorial-tab-bg",
                    className: "absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_14px_oklch(0.68_0.24_200/0.4)]",
                    transition: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: label })
              ]
            },
            id
          );
        }) }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-6 pb-10 bg-background",
        "data-ocid": "tutorials.preview.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-cyan-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Free Previews" }),
            !previewLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400", children: [
              filteredPreviews.length,
              " video",
              filteredPreviews.length !== 1 ? "s" : ""
            ] })
          ] }) }),
          previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
              "data-ocid": "tutorials.loading_state",
              children: [1, 2, 3, 4, 5, 6].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCardSkeleton, {}, k))
            }
          ) : filteredPreviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "text-center py-20",
              "data-ocid": "tutorials.preview.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full glass-morphism border border-white/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-9 h-9 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No preview videos yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Check back soon — our teachers are uploading lessons regularly." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredPreviews.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            VideoCard,
            {
              video: v,
              index: i,
              onPlay: setActiveVideo
            },
            v.id
          )) })
        ] })
      }
    ),
    isAuthenticated && enrolledCourseIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-16 bg-background",
        "data-ocid": "tutorials.enrolled.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-violet-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Your Course Videos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400", children: "Enrolled" })
          ] }) }),
          enrolledCourseIds.map((courseId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnrolledCourseSection,
            {
              courseId,
              onPlay: setActiveVideo
            },
            courseId
          ))
        ] })
      }
    ),
    !isAuthenticated && lockedCourseIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-24 bg-background",
        "data-ocid": "tutorials.locked.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-violet-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Full Course Videos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400", children: "Enroll to Unlock" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: lockedCourseIds.slice(0, 3).map((courseId, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LockedVideoCard, { courseId, index: i }, courseId)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", "data-ocid": "tutorials.browse_courses_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold transition-smooth hover:opacity-90 shadow-[0_0_20px_oklch(0.55_0.20_270/0.35)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                "Browse Courses to Unlock Videos",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          ) }) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-24" })
  ] });
}
export {
  TutorialsPage as default
};
