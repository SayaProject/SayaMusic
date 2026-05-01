import { SkipForward, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/hooks/usePlayerStore";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayerStore();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIdRef = useRef<string | null>(null);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT && window.YT.Player) return;
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // Create / update player when track changes
  useEffect(() => {
    if (!currentTrack || !containerRef.current) return;

    const buildPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current && currentIdRef.current === currentTrack.id) return;

      if (playerRef.current && playerRef.current.loadVideoById) {
        playerRef.current.loadVideoById(currentTrack.id);
        currentIdRef.current = currentTrack.id;
        return;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: currentTrack.id,
        playerVars: { autoplay: 1, controls: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => {
            try {
              e.target.playVideo();
            } catch {}
          },
          onStateChange: (e: any) => {
            // 0 = ended -> auto-advance (infinite)
            if (e.data === 0) playNext();
          },
        },
      });
      currentIdRef.current = currentTrack.id;
    };

    if (window.YT && window.YT.Player) {
      buildPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        buildPlayer();
      };
    }
  }, [currentTrack, playNext]);

  // Sync play/pause toggle
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isPlaying) p.playVideo?.();
      else p.pauseVideo?.();
    } catch {}
  }, [isPlaying]);

  // Resume on visibility return (best-effort background continuation)
  useEffect(() => {
    const onVis = () => {
      if (!document.hidden && isPlaying && playerRef.current?.playVideo) {
        try {
          playerRef.current.playVideo();
        } catch {}
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isPlaying]);

  // Media Session API for background controls (lock screen / notification)
  useEffect(() => {
    if (!currentTrack || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.channelTitle,
      artwork: [{ src: currentTrack.thumbnail, sizes: "320x180", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("play", () => togglePlay());
    navigator.mediaSession.setActionHandler("pause", () => togglePlay());
    navigator.mediaSession.setActionHandler("nexttrack", () => playNext());
  }, [currentTrack, togglePlay, playNext]);

  if (!currentTrack) return null;

  return (
    <>
      {/* Hidden YT player container — kept mounted for background playback */}
      <div
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          left: -9999,
          top: -9999,
        }}
      >
        <div ref={containerRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-3">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="glass-navbar rounded-2xl p-3 flex items-center gap-3 w-full max-w-sm"
        >
          <motion.img
            src={currentTrack.thumbnail}
            alt=""
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            draggable={false}
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={isPlaying ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
            style={{ borderRadius: "8px" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {currentTrack.title.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {currentTrack.channelTitle}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <motion.button whileTap={{ scale: 0.85 }} className="p-1.5" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-5 h-5 text-foreground fill-foreground" />
              ) : (
                <Play className="w-5 h-5 text-foreground fill-foreground" />
              )}
            </motion.button>
            <motion.button whileTap={{ scale: 0.85 }} className="p-1.5" onClick={playNext}>
              <SkipForward className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
