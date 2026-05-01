import { Music, Trash2, Flame, Repeat, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { SongRow } from "./SongRow";
import { Loader } from "./Loader";
import { getIndianTrending, type YouTubeVideo } from "@/lib/youtube";

export function PlaylistTab() {
  const playlist = usePlayerStore((s) => s.playlist);
  const removeFromPlaylist = usePlayerStore((s) => s.removeFromPlaylist);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const setTrack = usePlayerStore((s) => s.setTrack);

  const [indianSongs, setIndianSongs] = useState<YouTubeVideo[]>([]);
  const [loadingIndian, setLoadingIndian] = useState(true);

  useEffect(() => {
    let mounted = true;
    getIndianTrending()
      .then((res) => {
        if (mounted) setIndianSongs(res.videos);
      })
      .catch(() => {})
      .finally(() => mounted && setLoadingIndian(false));
    return () => {
      mounted = false;
    };
  }, []);

  const playAllInfinite = (songs: YouTubeVideo[]) => {
    if (songs.length === 0) return;
    setQueue(songs);
    setTrack(songs[0]);
  };

  return (
    <div className="flex flex-col pb-36 px-4">
      {/* Header */}
      <div className="gradient-profile pt-6 pb-5 -mx-4 px-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            Your Library
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {playlist.length} saved · infinite playback enabled
          </p>
        </motion.div>
      </div>

      {/* Your Playlist */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mt-5 glass-card rounded-2xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Your Playlist
          </h2>
          {playlist.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => playAllInfinite(playlist)}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground bg-primary/90 hover:bg-primary px-3 py-1.5 rounded-full"
            >
              <Repeat className="w-3.5 h-3.5" />
              Play ∞
            </motion.button>
          )}
        </div>

        {playlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Music className="w-12 h-12 text-muted-foreground/40 mb-2" />
            <p className="text-sm font-semibold text-foreground">No songs yet</p>
            <p className="text-xs text-muted-foreground">Tap + on any song to add</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <AnimatePresence>
              {playlist.map((song, i) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.2) }}
                  className="flex items-center gap-1"
                >
                  <div className="flex-1 min-w-0">
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
      </motion.section>

      {/* Indian Playlist */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="mt-5 glass-card rounded-2xl p-4 relative overflow-hidden"
      >
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-3 relative">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Indian Hits 🇮🇳
          </h2>
          {indianSongs.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => playAllInfinite(indianSongs)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20"
            >
              <Repeat className="w-3.5 h-3.5" />
              Play ∞
            </motion.button>
          )}
        </div>

        {loadingIndian ? (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        ) : indianSongs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Could not load right now
          </p>
        ) : (
          <div className="flex flex-col gap-1.5 relative">
            {indianSongs.slice(0, 12).map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.4) }}
              >
                <SongRow song={song} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
