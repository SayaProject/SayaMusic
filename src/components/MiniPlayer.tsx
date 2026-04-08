import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { useRef, useEffect } from "react";

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayerStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 px-3">
      <div className="glass-navbar rounded-2xl p-3 flex items-center gap-3 max-w-lg mx-auto shadow-lg shadow-black/30">
        <img
          src={currentTrack.thumbnail}
          alt=""
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
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
          <button className="p-1.5" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="w-5 h-5 text-foreground fill-foreground" />
            ) : (
              <Play className="w-5 h-5 text-foreground fill-foreground" />
            )}
          </button>
          <button className="p-1.5" onClick={playNext}>
            <SkipForward className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Hidden YouTube iframe for audio */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1`}
          allow="autoplay"
          className="w-0 h-0 absolute opacity-0 pointer-events-none"
          title="player"
          onLoad={() => {
            // Auto-play next when video ends
            setTimeout(() => {
              playNext();
            }, 300000); // fallback 5min
          }}
        />
      )}
    </div>
  );
}
