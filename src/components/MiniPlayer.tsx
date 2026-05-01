import { SkipForward, SkipBack, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { usePlayerStore } from "@/hooks/usePlayerStore";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrev } = usePlayerStore();
  const playerRef = useRef<any>(null);
  const currentIdRef = useRef<string | null>(null);
  const readyRef = useRef(false);

  // Stable handlers — stop propagation so taps on icons don't bubble to the card
  const handlePlayPause = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const p = playerRef.current;
    try {
      if (p && readyRef.current) {
        const state = p.getPlayerState?.();
        // 1 = playing
        if (state === 1) p.pauseVideo?.();
        else p.playVideo?.();
      }
    } catch {}
    togglePlay();
  }, [togglePlay]);

  const handleNext = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playNext();
  }, [playNext]);

  const handlePrev = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playPrev();
  }, [playPrev]);

  const playerRef = useRef<any>(null);
  const currentIdRef = useRef<string | null>(null);
  const readyRef = useRef(false);

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
    if (!currentTrack) return;

    const buildOrLoad = () => {
      if (!window.YT || !window.YT.Player) return;

      // If player exists, just swap the video
      if (playerRef.current && readyRef.current && playerRef.current.loadVideoById) {
        if (currentIdRef.current !== currentTrack.id) {
          playerRef.current.loadVideoById(currentTrack.id);
          currentIdRef.current = currentTrack.id;
        }
        return;
      }

      // Build once — target the stable DOM id
      if (!playerRef.current && document.getElementById("yt-bg-player")) {
        playerRef.current = new window.YT.Player("yt-bg-player", {
          height: "1",
          width: "1",
          videoId: currentTrack.id,
          playerVars: { autoplay: 1, controls: 0, playsinline: 1 },
          events: {
            onReady: (e: any) => {
              readyRef.current = true;
              try { e.target.playVideo(); } catch {}
            },
            onStateChange: (e: any) => {
              if (e.data === 0) playNext(); // ended -> next
            },
          },
        });
        currentIdRef.current = currentTrack.id;
      }
    };

    if (window.YT && window.YT.Player) {
      buildOrLoad();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        buildOrLoad();
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

  // Hidden YT host element — always mounted (rendered via portal-like fixed div below)
  const hiddenHost = (
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
      <div id="yt-bg-player" />
    </div>
  );

  if (!currentTrack) return hiddenHost;

  return (
    <>
      {hiddenHost}

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
