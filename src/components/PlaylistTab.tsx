import { Music, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { SongRow } from "./SongRow";

export function PlaylistTab() {
  const playlist = usePlayerStore((s) => s.playlist);
  const removeFromPlaylist = usePlayerStore((s) => s.removeFromPlaylist);

  return (
    <div className="flex flex-col pb-36 px-4">
      <div className="gradient-profile pt-6 pb-4 -mx-4 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-foreground"
        >
          Your Playlist
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground"
        >
          {playlist.length} songs
        </motion.p>
      </div>

      {playlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center flex-1 mt-20"
        >
          <Music className="w-16 h-16 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-bold text-foreground">No songs yet</p>
          <p className="text-sm text-muted-foreground">Tap + on any song to add</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-1 mt-4">
          <AnimatePresence>
            {playlist.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.2) }}
                className="flex items-center"
              >
                <div className="flex-1">
                  <SongRow song={song} />
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => removeFromPlaylist(song.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
