import { Plus, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { YouTubeVideo } from "@/lib/youtube";
import { usePlayerStore } from "@/hooks/usePlayerStore";

export function SongRow({ song }: { song: YouTubeVideo }) {
  const setTrack = usePlayerStore((s) => s.setTrack);
  const addToPlaylist = usePlayerStore((s) => s.addToPlaylist);
  const toggleLike = usePlayerStore((s) => s.toggleLike);
  const isLiked = usePlayerStore((s) => s.isLiked(song.id));

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 p-3 rounded-xl glass-card cursor-pointer group"
      onClick={() => setTrack(song)}
    >
      <img
        src={song.thumbnail}
        alt={song.title}
        className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
        draggable={false}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {song.title.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {song.channelTitle}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            addToPlaylist(song);
          }}
          className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}
