import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

/**
 * Cinematic video hero. Autoplays muted (browser policy), with a toggle
 * to unmute and hear the audio.
 */
export function VideoHero({
  src,
  poster,
  className = "",
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      // Ensure playback continues after user gesture
      v.play().catch(() => {});
    }
    setMuted(next);
  }

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-3xl ${className}`}>
      {src ? (
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          poster={poster}
          onLoadedData={() => setLoaded(true)}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="grid h-full w-full place-items-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.25 0.18 295 / 0.7), oklch(0.25 0.15 200 / 0.6)), radial-gradient(circle at 30% 30%, oklch(0.7 0.24 295 / 0.4), transparent 60%)",
          }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30">
              <Play className="h-7 w-7 fill-white text-white" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Video placeholder</p>
          </div>
        </div>
      )}

      {/* Cinematic overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.13 0.025 270 / 0.35) 60%, oklch(0.13 0.025 270 / 0.75) 100%)",
        }}
      />
      {src && !loaded && <div className="absolute inset-0 animate-pulse bg-muted/30" />}

      {/* Sound toggle */}
      {src && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/30 backdrop-blur-md transition hover:bg-black/80 hover:scale-105"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}
