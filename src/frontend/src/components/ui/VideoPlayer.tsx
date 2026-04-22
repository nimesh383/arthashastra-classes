import { Play, X } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  /** YouTube URL (watch, short, or embed) or any iframe-compatible URL */
  videoUrl: string;
  title?: string;
  thumbnailUrl?: string;
  /** When provided, renders a close button in the top-right corner */
  onClose?: () => void;
  className?: string;
}

function toEmbedUrl(url: string): string {
  if (!url) return url;
  if (url.includes("youtube.com/embed/")) {
    // Already embed — ensure autoplay
    return url.includes("autoplay")
      ? url
      : `${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`;
  }
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch)
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch)
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

/**
 * Responsive iframe video player with thumbnail + lazy-load play pattern.
 * Clicking the thumbnail overlay loads the iframe and starts playback.
 */
export default function VideoPlayer({
  videoUrl,
  title = "Video",
  thumbnailUrl,
  onClose,
  className = "",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-[oklch(0.10_0.05_260)] border border-white/10 shadow-[0_0_30px_oklch(0.68_0.24_200/0.18)] ${className}`}
      data-ocid="video_player.container"
    >
      {/* Close button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/40 transition-smooth shadow-lg"
          aria-label="Close video"
          data-ocid="video_player.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group flex items-center justify-center cursor-pointer"
          aria-label={`Play ${title}`}
          data-ocid="video_player.play_button"
        >
          {/* Thumbnail */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-fuchsia-500/10" />
          )}

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Play button with glow */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_0_32px_oklch(0.68_0.24_200/0.55)] group-hover:shadow-[0_0_52px_oklch(0.68_0.24_200/0.80)] transition-all duration-300 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full bg-cyan-400/15 animate-ping" />
            <Play className="w-6 h-6 text-white fill-white relative z-10 translate-x-0.5" />
          </div>

          {/* Title bar */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 z-10">
            <p className="text-white text-sm font-semibold line-clamp-2 drop-shadow-lg text-left">
              {title}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
