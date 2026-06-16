import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  Volume2,
  VolumeX,
  X,
  Minus,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { useSiteSettings, type FloatingVideoClip } from "@/hooks/useSiteSettings";

const DEFAULT_PLAYLIST: FloatingVideoClip[] = [
  {
    title: "Why STEM matters",
    subtitle: "AI Insights · 30s",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    title: "Building first robot",
    subtitle: "Maker Lab · 45s",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
];

export function FloatingVideoWidget() {
  const { floatingVideo } = useSiteSettings();
  const enabled = floatingVideo.enabled !== false;
  const PLAYLIST: FloatingVideoClip[] =
    floatingVideo.playlist && floatingVideo.playlist.length > 0
      ? floatingVideo.playlist
      : DEFAULT_PLAYLIST;
  const headerTitle = floatingVideo.title ?? "Vyom AI Insights";
  const delayMs = Math.max(0, (floatingVideo.delay_seconds ?? 8) * 1000);

  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [enabled, delayMs]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [muted, playing, index]);

  const safeIndex = Math.min(index, PLAYLIST.length - 1);
  const clip = PLAYLIST[safeIndex];

  const next = () => {
    setIndex((i) => (i + 1) % PLAYLIST.length);
    setProgress(0);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  if (!enabled || closed || !clip) return null;

  return (
    <>
      {/* Drag constraints area - full viewport */}
      <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-[60]" />

      <AnimatePresence>
        {visible && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.08}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-4 right-4 z-[70] w-[92vw] max-w-[360px] touch-none sm:bottom-6 sm:right-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-background/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              {/* gradient ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

              {/* Drag handle / header */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="relative flex cursor-grab items-center justify-between gap-2 border-b border-white/10 px-3 py-2 active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold text-foreground">{headerTitle}</div>
                    <div className="text-[10px] text-muted-foreground">
                      Live · {safeIndex + 1}/{PLAYLIST.length}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMinimized((m) => !m)}
                    className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    aria-label="Minimize"
                  >
                    {minimized ? (
                      <Maximize2 className="h-3.5 w-3.5" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setClosed(true)}
                    className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {!minimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Video */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        key={clip.src}
                        src={clip.src}
                        autoPlay
                        muted={muted}
                        loop={false}
                        playsInline
                        onTimeUpdate={(e) => {
                          const v = e.currentTarget;
                          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                        }}
                        onEnded={next}
                        className="h-full w-full object-cover"
                      />
                      {/* progress bar */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-[width]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Info + controls */}
                    <div className="px-3 pb-3 pt-2">
                      <div className="mb-2">
                        <div className="truncate text-sm font-semibold text-foreground">
                          {clip.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{clip.subtitle}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={prev}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-foreground hover:bg-white/10"
                            aria-label="Previous"
                          >
                            <SkipBack className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setPlaying((p) => !p)}
                            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg"
                            aria-label="Play/Pause"
                          >
                            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={next}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-foreground hover:bg-white/10"
                            aria-label="Next"
                          >
                            <SkipForward className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => setMuted((m) => !m)}
                          className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-foreground hover:bg-white/10"
                          aria-label="Toggle sound"
                        >
                          {muted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Playlist dots */}
                      <div className="mt-3 flex items-center justify-center gap-1.5">
                        {PLAYLIST.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setIndex(i);
                              setProgress(0);
                            }}
                            className={`h-1.5 rounded-full transition-all ${i === safeIndex ? "w-6 bg-gradient-to-r from-primary to-accent" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                            aria-label={`Play clip ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
