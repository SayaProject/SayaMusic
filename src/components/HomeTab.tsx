import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchYouTube, getTrendingMusic, type YouTubeVideo } from "@/lib/youtube";
import { SongRow } from "./SongRow";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { getTelegramUser } from "@/lib/telegram";

export function HomeTab() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<YouTubeVideo[]>([]);
  const [nextToken, setNextToken] = useState<string>();
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const user = getTelegramUser();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const loadTrending = useCallback(async (token?: string) => {
    setLoading(true);
    try {
      const res = await getTrendingMusic(token);
      setSongs((prev) => (token ? [...prev, ...res.videos] : res.videos));
      setNextToken(res.nextPageToken);
      setQueue(token ? [...songs, ...res.videos] : res.videos);
    } catch {}
    setLoading(false);
  }, [songs, setQueue]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchYouTube(query);
      setSongs(res.videos);
      setNextToken(res.nextPageToken);
      setQueue(res.videos);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadTrending();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextToken && !loading) {
          if (query) {
            searchYouTube(query, nextToken).then((res) => {
              setSongs((p) => [...p, ...res.videos]);
              setNextToken(res.nextPageToken);
              setQueue([...songs, ...res.videos]);
            });
          } else {
            loadTrending(nextToken);
          }
        }
      },
      { threshold: 0.5 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextToken, loading, query, songs, setQueue, loadTrending]);

  return (
    <div className="flex flex-col pb-36">
      <div className="gradient-header px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">{greeting()}</h1>
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
        </div>
        <div className="glass-input flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold text-foreground mb-3">
          {query ? "Search Results" : "Popular Now"}
        </h2>
        <div className="flex flex-col gap-1">
          {songs.map((song) => (
            <SongRow key={song.id} song={song} />
          ))}
        </div>
        <div ref={loaderRef} className="py-4 text-center">
          {loading && (
            <div className="text-muted-foreground text-sm">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
