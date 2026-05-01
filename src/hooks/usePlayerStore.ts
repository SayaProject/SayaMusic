import { create } from "zustand";
import type { YouTubeVideo } from "@/lib/youtube";

interface PlayerState {
  currentTrack: YouTubeVideo | null;
  queue: YouTubeVideo[];
  isPlaying: boolean;
  playlist: YouTubeVideo[];
  played: number;
  liked: number;
  downloads: number;
  likedSongs: YouTubeVideo[];
  recentlyPlayed: YouTubeVideo[];
  setTrack: (track: YouTubeVideo) => void;
  setQueue: (q: YouTubeVideo[]) => void;
  playNext: () => void;
  togglePlay: () => void;
  addToPlaylist: (v: YouTubeVideo) => void;
  removeFromPlaylist: (id: string) => void;
  toggleLike: (v: YouTubeVideo) => void;
  isLiked: (id: string) => boolean;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  playlist: [],
  played: 0,
  liked: 0,
  downloads: 0,
  likedSongs: [],
  recentlyPlayed: [],

  setTrack: (track) => {
    const recent = get().recentlyPlayed.filter((t) => t.id !== track.id);
    set({
      currentTrack: track,
      isPlaying: true,
      played: get().played + 1,
      recentlyPlayed: [track, ...recent].slice(0, 20),
    });
  },

  setQueue: (q) => set({ queue: q }),

  playNext: () => {
    const { queue, currentTrack } = get();
    if (queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack?.id);
    // Loop back to start for infinite playlist
    const nextIdx = idx >= 0 && idx < queue.length - 1 ? idx + 1 : 0;
    const next = queue[nextIdx];
    if (!next || next.id === currentTrack?.id) return;
    const recent = get().recentlyPlayed.filter((t) => t.id !== next.id);
    set({
      currentTrack: next,
      isPlaying: true,
      played: get().played + 1,
      recentlyPlayed: [next, ...recent].slice(0, 20),
    });
  },

  togglePlay: () => set({ isPlaying: !get().isPlaying }),

  addToPlaylist: (v) => {
    if (!get().playlist.find((p) => p.id === v.id)) {
      set({ playlist: [...get().playlist, v] });
    }
  },

  removeFromPlaylist: (id) => {
    set({ playlist: get().playlist.filter((p) => p.id !== id) });
  },

  toggleLike: (v) => {
    const exists = get().likedSongs.find((s) => s.id === v.id);
    if (exists) {
      set({
        likedSongs: get().likedSongs.filter((s) => s.id !== v.id),
        liked: Math.max(0, get().liked - 1),
      });
    } else {
      set({
        likedSongs: [...get().likedSongs, v],
        liked: get().liked + 1,
      });
    }
  },

  isLiked: (id) => !!get().likedSongs.find((s) => s.id === id),
}));
