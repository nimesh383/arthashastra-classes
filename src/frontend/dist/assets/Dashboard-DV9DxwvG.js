import { c as createLucideIcon, j as jsxRuntimeExports, N as ProtectedRoute, g as useAuth, h as useNavigate, r as reactExports, o as useMyEnrollments, O as useMyMaterials, f as useAvailableCourses, Q as useStudentProfile, V as useMyNotifications, W as useMyResults, Y as useMarkNotificationRead, Z as useMarkAllNotificationsRead, $ as EnrollmentStatus, x as ue, m as motion, L as Link, B as BookOpen, a0 as LogOut, F as FileText, C as ChevronRight, X, q as useMyVideosForCourse, I as FileType, a1 as Image, a2 as Bell, a3 as CreditCard, p as useActor, a4 as useQueryClient, a5 as NotificationType, a as CircleCheckBig, y as createActor } from "./index-UQyTW7IZ.js";
import { A as AnimatedSection, G as GlowCard } from "./GlowCard-D30Lpwpe.js";
import { C as CounterAnimation } from "./CounterAnimation-DPWb01v-.js";
import { V as VideoPlayer, P as Play } from "./VideoPlayer-B4CMSxn4.js";
import { A as Award } from "./award-DRL66g0V.js";
import { U as User } from "./user-BkDQZZ4n.js";
import { V as Video } from "./video-B8eN7M2n.js";
import { C as Copy } from "./copy-DYsgexv4.js";
import { P as Pencil } from "./pencil-Bb0ZivwZ.js";
import { B as Briefcase } from "./briefcase-DbI7Lu1k.js";
import { D as Download } from "./download-CZc12mda.js";
import { T as Trophy } from "./trophy-4-Wkjeq5.js";
import { L as Lightbulb } from "./lightbulb-DLGI_n_b.js";
import { M as Megaphone } from "./megaphone-BYa0HmR5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30"
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/30"
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-400",
    border: "border-fuchsia-500/30"
  }
};
function ProfileEditForm({
  initialName,
  initialEmail,
  initialPhone,
  onClose
}) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState(initialName);
  const [email, setEmail] = reactExports.useState(initialEmail);
  const [phone, setPhone] = reactExports.useState(initialPhone);
  const [saving, setSaving] = reactExports.useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      await actor.updateStudentProfile({ name, email, phone });
      qc.invalidateQueries({ queryKey: ["profile"] });
      ue.success("Profile updated!");
      onClose();
    } catch {
      ue.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSave,
      className: "mt-4 flex flex-col gap-3",
      "data-ocid": "dashboard.profile_edit.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "profile-name",
              className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "profile-name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth",
              "data-ocid": "dashboard.profile_name.input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "profile-email",
              className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "profile-email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth",
              "data-ocid": "dashboard.profile_email.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "profile-phone",
              className: "text-[10px] text-muted-foreground uppercase tracking-wide mb-1 block",
              children: "Phone"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "profile-phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground text-xs focus:outline-none focus:border-cyan-500/50 transition-smooth",
              "data-ocid": "dashboard.profile_phone.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-xs hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth disabled:opacity-60",
              "data-ocid": "dashboard.profile_edit.save_button",
              children: saving ? "Saving…" : "Save Changes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "flex-1 py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground text-xs font-medium hover:text-foreground transition-smooth",
              "data-ocid": "dashboard.profile_edit.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  );
}
function MaterialItem({ material, index }) {
  const isPDF = material.fileType === FileType.PDF;
  const isImage = material.fileType === FileType.Image;
  const handleDownload = () => {
    if (isPDF) {
      window.open(material.fileUrl, "_blank", "noopener");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-morphism rounded-xl border border-white/10 p-4 flex items-start gap-3 group",
      onContextMenu: (e) => e.preventDefault(),
      "data-ocid": `dashboard.material.item.${index + 1}`,
      children: [
        isImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-12 h-12 rounded-lg overflow-hidden shrink-0 select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: material.fileUrl,
              alt: material.title,
              className: "w-full h-full object-cover pointer-events-none select-none",
              draggable: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[5px] font-black text-foreground rotate-[-30deg] tracking-widest uppercase",
              style: { opacity: 0.2, userSelect: "none", whiteSpace: "nowrap" },
              children: "ARTHASHASTRA CLASSES"
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-cyan-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", style: { userSelect: "none" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: material.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isImage ? "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"}`,
                children: isImage ? "Image" : "PDF"
              }
            ),
            material.fileSize && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: material.fileSize })
          ] })
        ] }),
        isPDF && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleDownload,
            className: "shrink-0 flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-smooth",
            "aria-label": `Download ${material.title}`,
            "data-ocid": `dashboard.material.download.button.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Download"
            ]
          }
        ),
        isImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-muted-foreground" }) })
      ]
    }
  );
}
function CourseCard({ enrollment, course, index }) {
  if (!course) return null;
  const isCompleted = enrollment.status === EnrollmentStatus.Completed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { className: "p-5", "data-ocid": `dashboard.courses.item.${index + 1}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pr-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cyan-400 font-semibold uppercase tracking-wide mb-1", children: course.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: course.title }),
        course.instructor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "by ",
          course.instructor
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${isCompleted ? "text-teal-400 bg-teal-500/10 border border-teal-500/30" : "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"}`,
          children: isCompleted ? "Completed" : "Enrolled"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 line-clamp-2", children: course.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-cyan-400", children: isCompleted ? "100%" : "68%" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500",
          initial: { width: "0%" },
          animate: { width: isCompleted ? "100%" : "68%" },
          transition: { duration: 1.2, ease: "easeOut", delay: index * 0.1 }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 border-t border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/study-materials",
          className: "flex-1 text-center py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-xs hover:bg-cyan-500/20 transition-smooth",
          "data-ocid": `dashboard.courses.view_materials.button.${index + 1}`,
          children: "View Materials"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/courses/$id",
          params: { id: course.id.toString() },
          className: "flex-1 text-center py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground font-medium text-xs hover:text-foreground hover:border-white/20 transition-smooth",
          "data-ocid": `dashboard.courses.detail.link.${index + 1}`,
          children: [
            "Course Details ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 inline ml-0.5" })
          ]
        }
      )
    ] })
  ] });
}
function TutorialVideoCard({ video, index, onPlay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onPlay(video),
      className: "group text-left glass-morphism rounded-xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-smooth",
      "data-ocid": `dashboard.tutorials.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video bg-black overflow-hidden", children: [
          video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: video.thumbnailUrl,
              alt: video.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500",
              draggable: false
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-cyan-500/10 to-violet-600/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-8 h-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-cyan-500/80 group-hover:bg-cyan-500 flex items-center justify-center shadow-glow transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-white fill-white ml-0.5" }) }) }),
          video.isPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/80 text-white uppercase tracking-wide", children: "Free Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground line-clamp-2 leading-snug", children: video.title }),
          video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-1", children: video.description })
        ] })
      ]
    }
  );
}
function CourseTutorialRow({ courseId, courseTitle }) {
  const { data: videos = [], isLoading } = useMyVideosForCourse(courseId);
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold", children: courseTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "glass-morphism rounded-xl border border-white/10 aspect-video animate-pulse"
        },
        n
      )) })
    ] });
  }
  if (videos.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold", children: courseTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-morphism rounded-xl border border-white/10 p-6 text-center",
          "data-ocid": "dashboard.tutorials.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-7 h-7 text-muted-foreground mx-auto mb-2 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No tutorials available yet" })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold", children: courseTitle }),
    activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        className: "mb-4",
        "data-ocid": "dashboard.tutorials.player",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            VideoPlayer,
            {
              videoUrl: activeVideo.videoUrl,
              title: activeVideo.title,
              onClose: () => setActiveVideo(null)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: activeVideo.title }),
            activeVideo.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: activeVideo.description })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: videos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TutorialVideoCard,
      {
        video: v,
        index: i,
        onPlay: setActiveVideo
      },
      v.id
    )) })
  ] });
}
function AttendanceRing({ percentage = 78 }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = percentage / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "cyan",
      className: "p-5",
      "data-ocid": "dashboard.attendance.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold", children: "Attendance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "128",
                height: "128",
                viewBox: "0 0 128 128",
                className: "-rotate-90",
                role: "img",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "64",
                      cy: "64",
                      r: radius,
                      strokeWidth: "10",
                      stroke: "oklch(0.68 0.24 200 / 0.12)",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.circle,
                    {
                      cx: "64",
                      cy: "64",
                      r: radius,
                      strokeWidth: "10",
                      fill: "none",
                      stroke: "url(#attendanceGrad)",
                      strokeLinecap: "round",
                      strokeDasharray: circumference,
                      initial: { strokeDashoffset: circumference },
                      animate: { strokeDashoffset: circumference - progress },
                      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "linearGradient",
                    {
                      id: "attendanceGrad",
                      x1: "0%",
                      y1: "0%",
                      x2: "100%",
                      y2: "0%",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.24 200)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.55 0.2 270)" })
                      ]
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl font-extrabold gradient-text-cyan-violet", children: [
                percentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Present" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-1", children: [
            [
              { label: "Classes Attended", value: "47", color: "text-cyan-400" },
              {
                label: "Total Classes",
                value: "60",
                color: "text-muted-foreground"
              },
              { label: "This Month", value: "12/15", color: "text-violet-400" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${item.color}`, children: item.value })
            ] }, item.label)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 pt-2 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${percentage >= 75 ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`,
                children: percentage >= 75 ? "✓ Eligible" : "⚠ Low Attendance"
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
const STUDY_DAYS = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 1 }
];
const MAX_HOURS = 4;
function DailyStudyTracker() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "violet",
      className: "p-5",
      "data-ocid": "dashboard.study_tracker.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold", children: "Daily Study Tracker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Track your daily progress" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold", children: "Coming Soon" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-24", children: STUDY_DAYS.map((d, i) => {
          const heightPct = d.hours / MAX_HOURS * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full rounded-t-lg overflow-hidden bg-white/5 flex items-end",
                    style: { height: "80px" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-full rounded-t-lg",
                        style: {
                          background: "linear-gradient(to top, oklch(0.68 0.24 200), oklch(0.55 0.2 270))"
                        },
                        initial: { height: "0%" },
                        animate: { height: `${heightPct}%` },
                        transition: {
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-medium", children: d.day })
              ]
            },
            d.day
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "Avg: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 font-semibold", children: "2.5h/day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "Goal: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-violet-400 font-semibold", children: "4h/day" })
          ] })
        ] })
      ]
    }
  );
}
const AI_RECS = [
  {
    topic: "Financial Statement Analysis",
    subject: "Accountancy",
    reason: "Based on enrolled course"
  },
  {
    topic: "Demand & Supply Elasticity",
    subject: "Economics",
    reason: "Trending in your batch"
  },
  {
    topic: "Partnership Accounts",
    subject: "Accountancy",
    reason: "Upcoming in curriculum"
  },
  {
    topic: "Business Environment",
    subject: "BST",
    reason: "Recommended by faculty"
  }
];
function AIRecommendations() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "magenta",
      className: "p-5",
      "data-ocid": "dashboard.ai_recommendations.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-fuchsia-500/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-fuchsia-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "AI Study Recommendations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Personalised for you" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-3", children: AI_RECS.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.08 },
            className: "flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-fuchsia-500/20 transition-smooth",
            "data-ocid": `dashboard.ai_rec.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 mt-1.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: rec.topic }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  rec.subject,
                  " · ",
                  rec.reason
                ] })
              ] })
            ]
          },
          rec.topic
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/study-materials",
            className: "flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-semibold text-xs hover:bg-fuchsia-500/20 transition-smooth",
            "data-ocid": "dashboard.ai_rec.view_all.link",
            children: [
              "View All Recommendations ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
            ]
          }
        )
      ]
    }
  );
}
const MOCK_LEADERS = [
  { rank: 1, name: "Priya Sharma", score: 94, color: "text-amber-400" },
  { rank: 2, name: "Rohit Verma", score: 91, color: "text-slate-300" },
  { rank: 3, name: "Ananya Singh", score: 88, color: "text-amber-600" },
  { rank: 4, name: "Karan Patel", score: 85, color: "text-muted-foreground" },
  { rank: 5, name: "Shreya Joshi", score: 82, color: "text-muted-foreground" }
];
function LeaderboardWidget() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "cyan",
      className: "p-5",
      "data-ocid": "dashboard.leaderboard.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "Class Leaderboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: MOCK_LEADERS.map((leader, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.07 },
            className: "flex items-center gap-3 py-2 px-2.5 rounded-lg bg-white/5 border border-white/5",
            "data-ocid": `dashboard.leaderboard.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-extrabold w-5 text-center ${leader.color}`,
                  children: leader.rank
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: leader.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-16 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500",
                    initial: { width: "0%" },
                    animate: { width: `${leader.score}%` },
                    transition: { duration: 1, delay: i * 0.1 + 0.3 }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-cyan-400 w-8 text-right", children: [
                  leader.score,
                  "%"
                ] })
              ] })
            ]
          },
          leader.name
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center mt-3", children: "Based on recent test performance" })
      ]
    }
  );
}
function getGradeColor(grade) {
  if (grade.startsWith("A"))
    return "text-teal-400 bg-teal-500/10 border-teal-500/20";
  if (grade.startsWith("B"))
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  if (grade.startsWith("C"))
    return "text-violet-400 bg-violet-500/10 border-violet-500/20";
  return "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20";
}
function TestResultsSummary({ results }) {
  const recent = results.slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "violet",
      className: "p-5",
      "data-ocid": "dashboard.test_results.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-violet-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "Recent Test Results" })
        ] }),
        recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-4",
            "data-ocid": "dashboard.test_results.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No tests taken yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/tests",
                  className: "text-xs text-cyan-400 hover:text-cyan-300 transition-smooth mt-1 inline-block",
                  "data-ocid": "dashboard.test_results.browse.link",
                  children: "Browse Tests →"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: recent.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5",
            "data-ocid": `dashboard.test_results.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground truncate", children: [
                  "Test #",
                  r.testId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: formatDate(r.createdAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-cyan-400", children: [
                  r.percentage.toFixed(0),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${getGradeColor(r.grade)}`,
                    children: r.grade
                  }
                )
              ] })
            ]
          },
          r.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/tests",
            className: "flex items-center justify-center gap-1.5 w-full py-2 rounded-lg mt-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold text-xs hover:bg-violet-500/20 transition-smooth",
            "data-ocid": "dashboard.test_results.view_all.link",
            children: [
              "View All Tests ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
            ]
          }
        )
      ]
    }
  );
}
function PaymentHistoryPanel({ enrollments }) {
  const paid = enrollments.filter(
    (e) => e.status !== EnrollmentStatus.Pending && e.status !== EnrollmentStatus.Refunded
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlowCard,
    {
      glowColor: "cyan",
      className: "p-5",
      "data-ocid": "dashboard.payment_history.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "Payment History" })
        ] }),
        paid.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-4",
            "data-ocid": "dashboard.payment_history.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No payments yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: paid.slice(0, 4).map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5",
            "data-ocid": `dashboard.payment_history.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
                  "Course #",
                  e.courseId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  formatDate(e.purchasedAt),
                  " ·",
                  " ",
                  e.paymentId ? `ID: ${e.paymentId.slice(0, 8)}…` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-teal-400", children: [
                  (Number(e.amountPaid) / 1e8).toFixed(2),
                  " ICP"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold", children: "Paid" })
              ] })
            ]
          },
          e.id.toString()
        )) })
      ]
    }
  );
}
function NotificationIcon({ type }) {
  switch (type) {
    case NotificationType.enrollment:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-cyan-400" });
    case NotificationType.payment:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-violet-400" });
    case NotificationType.announcement:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4 text-fuchsia-400" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground" });
  }
}
function getNotificationBadge(type) {
  switch (type) {
    case NotificationType.enrollment:
      return {
        label: "Enrollment",
        cls: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      };
    case NotificationType.payment:
      return {
        label: "Payment",
        cls: "bg-violet-500/10 text-violet-400 border-violet-500/20"
      };
    case NotificationType.announcement:
      return {
        label: "Announcement",
        cls: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"
      };
    default:
      return {
        label: "General",
        cls: "bg-white/5 text-muted-foreground border-white/10"
      };
  }
}
function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  isMarkingAll
}) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const grouped = notifications.slice(0, 8).reduce((acc, n) => {
    const key = n.notificationType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.08, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-cyan-400" }),
        "Notifications",
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-white min-w-[20px] text-center",
            "data-ocid": "dashboard.notifications.badge",
            children: unreadCount
          }
        )
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onMarkAllRead,
          disabled: isMarkingAll,
          className: "text-xs text-cyan-400 hover:text-cyan-300 transition-smooth disabled:opacity-50 font-medium",
          "data-ocid": "dashboard.notifications.mark_all_read_button",
          children: "Mark all read"
        }
      )
    ] }),
    notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-8 text-center",
        "data-ocid": "dashboard.notifications.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No notifications yet" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col gap-3",
        "data-ocid": "dashboard.notifications.list",
        children: Object.entries(grouped).map(([type, items]) => {
          const badge = getNotificationBadge(type);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.cls}`,
                  children: badge.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/5" })
            ] }),
            items.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => !n.isRead && onMarkRead(n.id),
                className: `w-full text-left glass-morphism rounded-xl border p-3 transition-smooth flex items-start gap-3 mb-1.5 group ${n.isRead ? "border-white/5 opacity-70" : "border-cyan-500/20 hover:border-cyan-500/40 cursor-pointer"}`,
                "data-ocid": `dashboard.notifications.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationIcon, { type: n.notificationType }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-xs font-semibold truncate ${n.isRead ? "text-muted-foreground" : "text-foreground"}`,
                        children: n.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 line-clamp-2", children: n.message })
                  ] }),
                  !n.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-1.5" })
                ]
              },
              n.id
            ))
          ] }, type);
        })
      }
    )
  ] });
}
function DashboardContent() {
  const { principalId, logout } = useAuth();
  const navigate = useNavigate();
  const [copiedPrincipal, setCopiedPrincipal] = reactExports.useState(false);
  const [editingProfile, setEditingProfile] = reactExports.useState(false);
  const { data: enrollments = [], isLoading: loadingEnrollments } = useMyEnrollments();
  const { data: materials = [], isLoading: loadingMaterials } = useMyMaterials();
  const { data: allCourses = [] } = useAvailableCourses();
  const { data: profileOpt } = useStudentProfile();
  const { data: notifications = [] } = useMyNotifications();
  const { data: testResults = [] } = useMyResults();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();
  const profile = profileOpt ?? null;
  const courseMap = new Map(
    allCourses.map((c) => [c.id.toString(), c])
  );
  const materialsByCourse = materials.reduce(
    (acc, m) => {
      const key = m.courseId.toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(m);
      return acc;
    },
    {}
  );
  const activeEnrollments = enrollments.filter(
    (e) => e.status !== EnrollmentStatus.Refunded
  );
  const handleLogout = reactExports.useCallback(() => {
    logout();
    ue.success("You have been logged out.");
    navigate({ to: "/" });
  }, [logout, navigate]);
  const copyPrincipal = () => {
    if (!principalId) return;
    navigator.clipboard.writeText(principalId).catch(() => {
    });
    setCopiedPrincipal(true);
    ue.success("Principal ID copied!");
    setTimeout(() => setCopiedPrincipal(false), 2e3);
  };
  const quickActions = [
    {
      icon: BookOpen,
      label: "Browse Courses",
      to: "/courses",
      color: "cyan",
      desc: "Explore all subjects"
    },
    {
      icon: FileText,
      label: "Study Materials",
      to: "/study-materials",
      color: "magenta",
      desc: "PDFs & PYQs"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-10 relative bg-muted/10 border-b border-white/5",
        "data-ocid": "dashboard.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Student Dashboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-extrabold text-foreground", children: [
                    "Welcome back,",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-cyan-violet", children: (profile == null ? void 0 : profile.name) ?? "Student" }),
                    " ",
                    "👋"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Here's your learning summary for today." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                className: "flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/courses",
                      className: "flex items-center gap-1.5 px-4 py-2 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30 transition-smooth text-sm",
                      "data-ocid": "dashboard.browse_courses.link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                        " Browse Courses"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleLogout,
                      className: "flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-red-400 hover:border-red-500/30 transition-smooth text-sm",
                      "data-ocid": "dashboard.logout.button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                        " Log Out"
                      ]
                    }
                  )
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
        className: "py-8 bg-background",
        "data-ocid": "dashboard.stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          {
            icon: BookOpen,
            label: "Courses Enrolled",
            value: activeEnrollments.length,
            color: "cyan"
          },
          {
            icon: FileText,
            label: "Study Materials",
            value: materials.length,
            color: "violet"
          },
          {
            icon: Award,
            label: "Tests Taken",
            value: testResults.length,
            color: "magenta",
            text: void 0
          },
          {
            icon: User,
            label: "Profile Status",
            value: null,
            color: "cyan",
            text: profile ? "Active" : "Incomplete"
          }
        ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlowCard,
          {
            glowColor: s.color,
            className: "p-5",
            "data-ocid": `dashboard.stats.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${colorMap[s.color].bg} ${colorMap[s.color].text}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-extrabold gradient-text-cyan-violet", children: s.value !== null && s.value !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CounterAnimation, { target: s.value, suffix: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: s.text }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: s.label })
            ]
          }
        ) }, s.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pb-6 bg-background",
        "data-ocid": "dashboard.analytics.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Learning Analytics" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceRing, { percentage: 78 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyStudyTracker, {}) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 pb-6 bg-background",
        "data-ocid": "dashboard.main.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "My Courses" }),
              loadingEnrollments ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 h-32 animate-pulse"
                },
                n
              )) }) : activeEnrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 p-10 text-center",
                  "data-ocid": "dashboard.courses.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "No courses enrolled yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Start learning by enrolling in a course." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/courses",
                        className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white transition-smooth",
                        "data-ocid": "dashboard.browse_courses_cta.link",
                        children: [
                          "Browse Courses ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: activeEnrollments.map((enrollment, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CourseCard,
                {
                  enrollment,
                  course: courseMap.get(enrollment.courseId.toString()),
                  index: i
                },
                enrollment.id.toString()
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.15, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "My Tutorials" }),
              activeEnrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 p-8 text-center",
                  "data-ocid": "dashboard.tutorials.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "No tutorials yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Enroll in a course to access its video tutorials." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-6", children: activeEnrollments.map((enrollment) => {
                const course = courseMap.get(
                  enrollment.courseId.toString()
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CourseTutorialRow,
                  {
                    courseId: enrollment.courseId.toString(),
                    courseTitle: (course == null ? void 0 : course.title) ?? "Course Tutorials"
                  },
                  enrollment.id.toString()
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.2, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "My Study Materials" }),
              loadingMaterials ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 h-16 animate-pulse"
                },
                n
              )) }) : materials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-morphism rounded-xl border border-white/10 p-8 text-center",
                  "data-ocid": "dashboard.materials.empty_state",
                  onContextMenu: (e) => e.preventDefault(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: "No materials yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Enroll in a course to unlock its study materials." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/study-materials",
                        className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-violet-400 font-semibold text-sm hover:from-violet-600 hover:to-cyan-500 hover:text-white transition-smooth",
                        "data-ocid": "dashboard.browse_materials_cta.link",
                        children: [
                          "Browse Materials ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-6",
                  onContextMenu: (e) => e.preventDefault(),
                  children: Object.entries(materialsByCourse).map(
                    ([courseId, mats]) => {
                      const course = courseMap.get(courseId);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold", children: (course == null ? void 0 : course.title) ?? "Course Materials" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: mats.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MaterialItem,
                          {
                            material: m,
                            index: idx
                          },
                          m.id.toString()
                        )) })
                      ] }, courseId);
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.05, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Quick Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: quickActions.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: a.to,
                  "data-ocid": `dashboard.quick_action.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowCard,
                    {
                      glowColor: a.color,
                      className: "p-4 cursor-pointer hover:border-white/20 transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[a.color].bg} ${colorMap[a.color].text}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: a.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: a.desc })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
                      ] })
                    }
                  )
                },
                a.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestResultsSummary, { results: testResults }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.09, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardWidget, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationCenter,
              {
                notifications,
                onMarkRead: (id) => markReadMutation.mutate(id),
                onMarkAllRead: () => markAllReadMutation.mutate(),
                isMarkingAll: markAllReadMutation.isPending
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AIRecommendations, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentHistoryPanel, { enrollments: activeEnrollments }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { delay: 0.15, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-violet-400" }),
                " My Profile"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowCard,
                {
                  glowColor: "violet",
                  className: "p-5",
                  "data-ocid": "dashboard.profile.card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0", children: ((profile == null ? void 0 : profile.name) ?? "S")[0].toUpperCase() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: (profile == null ? void 0 : profile.name) ?? "Student" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: (profile == null ? void 0 : profile.email) ?? "" }),
                        (profile == null ? void 0 : profile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: profile.phone })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-white/5 border border-white/10 p-2.5 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Enrolled Courses" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-cyan-400", children: activeEnrollments.length })
                    ] }) }),
                    principalId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white/5 border border-white/10 p-2.5 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1 uppercase tracking-wide", children: "Principal ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-mono truncate", children: principalId }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: copyPrincipal,
                            className: "shrink-0 text-muted-foreground hover:text-cyan-400 transition-smooth",
                            "aria-label": "Copy principal ID",
                            "data-ocid": "dashboard.copy_principal.button",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }),
                      copiedPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cyan-400 mt-1", children: "Copied!" })
                    ] }),
                    !editingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setEditingProfile(true),
                          className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-xs hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth",
                          "data-ocid": "dashboard.edit_profile.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
                            "Edit Profile"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleLogout,
                          className: "flex-1 py-2 rounded-lg glass-morphism border border-white/10 text-muted-foreground text-xs font-medium hover:text-red-400 hover:border-red-500/30 transition-smooth flex items-center justify-center gap-1.5",
                          "data-ocid": "dashboard.profile_logout.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" }),
                            "Sign Out"
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Edit Profile" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setEditingProfile(false),
                            className: "text-muted-foreground hover:text-foreground transition-smooth",
                            "aria-label": "Close edit form",
                            "data-ocid": "dashboard.profile_edit.close_button",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ProfileEditForm,
                        {
                          initialName: (profile == null ? void 0 : profile.name) ?? "",
                          initialEmail: (profile == null ? void 0 : profile.email) ?? "",
                          initialPhone: (profile == null ? void 0 : profile.phone) ?? "",
                          onClose: () => setEditingProfile(false)
                        }
                      )
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowCard, { glowColor: "cyan", className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground uppercase tracking-wide", children: "Quick Links" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: [
                {
                  label: "My Enrolled Courses",
                  to: "/courses",
                  icon: BookOpen
                },
                {
                  label: "Browse All Materials",
                  to: "/study-materials",
                  icon: FileText
                },
                {
                  label: "About the Institute",
                  to: "/about",
                  icon: Briefcase
                }
              ].map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: link.to,
                  className: "flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-smooth",
                  "data-ocid": `dashboard.quick_link.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
                    link.label
                  ]
                },
                link.label
              )) })
            ] }) })
          ] })
        ] }) })
      }
    )
  ] });
}
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requiredRole: "student", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) });
}
export {
  DashboardPage as default
};
