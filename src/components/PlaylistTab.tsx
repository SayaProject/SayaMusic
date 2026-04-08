import { Music, Trash2 } from "lucide-react";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { SongRow } from "./SongRow";

export function PlaylistTab() {
  const playlist = usePlayerStore((s) => s.playlist);
  const removeFromPlaylist = usePlayerStore((s) => s.removeFromPlaylist);

  return (
    <div className="flex flex-col pb-36 px-4">
      <div className="gradient-profile pt-6 pb-4 -mx-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">Your Playlist</h1>
        <p className="text-sm text-muted-foreground">{playlist.length} songs</p>
      </div>

      {playlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 mt-20">
          <Music className="w-16 h-16 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-bold text-foreground">No songs yet</p>
          <p className="text-sm text-muted-foreground">Tap + on any song to add</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 mt-4">
          {playlist.map((song) => (
            <div key={song.id} className="flex items-center">
              <div className="flex-1">
                <SongRow song={song} />
              </div>
              <button
                onClick={() => removeFromPlaylist(song.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
