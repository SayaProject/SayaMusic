import { Download, Plus, Heart } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";
import { usePlayerStore } from "@/hooks/usePlayerStore";

export function SongRow({ song }: { song: YouTubeVideo }) {
  const setTrack = usePlayerStore((s) => s.setTrack);
  const addToPlaylist = usePlayerStore((s) => s.addToPlaylist);
  const toggleLike = usePlayerStore((s) => s.toggleLike);
  const isLiked = usePlayerStore((s) => s.isLiked(song.id));

  return (
    <div
      className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
      onClick={() => setTrack(song)}
    >
      <img
        src={song.thumbnail}
        alt={song.title}
        className="w-12 h-12 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {song.title.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"')}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {song.channelTitle}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToPlaylist(song);
          }}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
