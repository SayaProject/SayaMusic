import { SkipForward, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/hooks/usePlayerStore";

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayerStore();

  if (!currentTrack) return null;

  return (
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

      {isPlaying && (
        <iframe
          src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1`}
          allow="autoplay"
          className="w-0 h-0 absolute opacity-0 pointer-events-none"
          title="player"
        />
      )}
    </div>
  );
}
