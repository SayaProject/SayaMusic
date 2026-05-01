import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Loader } from "./Loader";
import { searchYouTube, getTrendingMusic, type YouTubeVideo } from "@/lib/youtube";
import { SongRow } from "./SongRow";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { getTelegramUser } from "@/lib/telegram";

function dedupeVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
  const seen = new Set<string>();
  return videos.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
}

export function HomeTab() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<YouTubeVideo[]>([]);
  const [nextToken, setNextToken] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const mountedRef = useRef(false);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const user = getTelegramUser();

  // Live-updating greeting based on time of day
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const greeting = () => {
    const h = now.getHours();
    if (h >= 5 && h < 12) return "Good morning";
    if (h >= 12 && h < 17) return "Good afternoon";
    if (h >= 17 && h < 21) return "Good evening";
    return "Good night";
  };

  const timeLabel = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


  const loadTrending = useCallback(async (token?: string) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    if (!token) setInitialLoading(true);
    setLoading(true);
    try {
      const res = await getTrendingMusic(token);
      setSongs((prev) => {
        const merged = token ? dedupeVideos([...prev, ...res.videos]) : res.videos;
        setQueue(merged);
        return merged;
      });
      setNextToken(res.nextPageToken);
    } catch {}
    setLoading(false);
    setInitialLoading(false);
    loadingRef.current = false;
  }, [setQueue]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    if (loadingRef.current) return;
    loadingRef.current = true;
    setInitialLoading(true);
    setLoading(true);
    try {
      const res = await searchYouTube(query);
      const unique = dedupeVideos(res.videos);
      setSongs(unique);
      setNextToken(res.nextPageToken);
      setQueue(unique);
    } catch {}
    setLoading(false);
    setInitialLoading(false);
    loadingRef.current = false;
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    loadTrending();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          const currentToken = nextToken;
          const currentQuery = query;
          if (!currentToken) return;

          loadingRef.current = true;
          setLoading(true);

          const fetchFn = currentQuery
            ? searchYouTube(currentQuery, currentToken)
            : getTrendingMusic(currentToken);

          fetchFn.then((res) => {
            setSongs((prev) => {
              const merged = dedupeVideos([...prev, ...res.videos]);
              setQueue(merged);
              return merged;
            });
            setNextToken(res.nextPageToken);
          }).finally(() => {
            setLoading(false);
            loadingRef.current = false;
          });
        }
      },
      { threshold: 0.5 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextToken, query, setQueue]);

  return (
    <div className="flex flex-col pb-36">
      <div className="gradient-header px-4 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">{greeting()}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{timeLabel}</p>
          </div>

          {user.photo_url ? (
            <img
              src={user.photo_url}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {user.first_name[0]}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-input flex items-center gap-2 rounded-full px-4 py-2.5"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </motion.div>
      </div>

      <div className="px-4 mt-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold text-foreground mb-3"
        >
          {query ? "Search Results" : "Popular Now"}
        </motion.h2>

        {initialLoading && songs.length === 0 ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : songs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            No results found
          </motion.p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {songs.map((song, i) => (
              <motion.div
                key={`${song.id}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
              >
                <SongRow song={song} />
              </motion.div>
            ))}
          </div>
        )}

        <div ref={loaderRef} className="py-4 text-center">
          {loading && songs.length > 0 && (
            <div className="flex justify-center"><Loader /></div>
          )}
        </div>
      </div>
    </div>
  );
}
