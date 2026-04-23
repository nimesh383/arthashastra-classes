import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X } from "./index-UQyTW7IZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function toEmbedUrl(url) {
  if (!url) return url;
  if (url.includes("youtube.com/embed/")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`;
  }
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch)
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch)
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}
function VideoPlayer({
  videoUrl,
  title = "Video",
  thumbnailUrl,
  onClose,
  className = ""
}) {
  const [playing, setPlaying] = reactExports.useState(false);
  const embedUrl = toEmbedUrl(videoUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative w-full aspect-video rounded-2xl overflow-hidden bg-[oklch(0.10_0.05_260)] border border-white/10 shadow-[0_0_30px_oklch(0.68_0.24_200/0.18)] ${className}`,
      "data-ocid": "video_player.container",
      children: [
        onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-smooth shadow-lg",
            "aria-label": "Close video",
            "data-ocid": "video_player.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: embedUrl,
            title,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            loading: "lazy",
            className: "absolute inset-0 w-full h-full border-0"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPlaying(true),
            className: "absolute inset-0 w-full h-full group flex items-center justify-center cursor-pointer",
            "aria-label": `Play ${title}`,
            "data-ocid": "video_player.play_button",
            children: [
              thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: thumbnailUrl,
                  alt: title,
                  className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                  draggable: false
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-fuchsia-500/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_0_32px_oklch(0.68_0.24_200/0.55)] group-hover:shadow-[0_0_52px_oklch(0.68_0.24_200/0.80)] transition-all duration-300 group-hover:scale-110", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-cyan-400/15 animate-ping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white fill-white relative z-10 translate-x-0.5" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 px-4 pb-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold line-clamp-2 drop-shadow-lg text-left", children: title }) })
            ]
          }
        )
      ]
    }
  );
}
export {
  Play as P,
  VideoPlayer as V
};
