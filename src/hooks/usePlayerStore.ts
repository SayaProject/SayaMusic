import { create } from "zustand";
import type { YouTubeVideo } from "@/lib/youtube";

export type RepeatMode = "off" | "all" | "one";

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
  repeatMode: RepeatMode;
  reduceMotion: boolean;
  setTrack: (track: YouTubeVideo) => void;
  setQueue: (q: YouTubeVideo[]) => void;
  playNext: () => void;
  playPrev: () => void;
  togglePlay: () => void;
  addToPlaylist: (v: YouTubeVideo) => void;
  removeFromPlaylist: (id: string) => void;
  toggleLike: (v: YouTubeVideo) => void;
  isLiked: (id: string) => boolean;
  cycleRepeat: () => void;
  setReduceMotion: (v: boolean) => void;
}

const RM_KEY = "pref_reduce_motion";
const RP_KEY = "pref_repeat_mode";

const initialReduceMotion = (() => {
  try {
    const v = localStorage.getItem(RM_KEY);
    if (v != null) return v === "1";
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
})();

const initialRepeat: RepeatMode = (() => {
  try {
    const v = localStorage.getItem(RP_KEY);
    if (v === "all" || v === "one" || v === "off") return v;
  } catch {}
  return "off";
})();

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
  repeatMode: initialRepeat,
  reduceMotion: initialReduceMotion,

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
    const { queue, currentTrack, repeatMode } = get();
    if (queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack?.id);

    // Repeat one: replay current track
    if (repeatMode === "one" && currentTrack) {
      set({ currentTrack: { ...currentTrack }, isPlaying: true });
      return;
    }

    const atEnd = idx === queue.length - 1;
    if (atEnd && repeatMode === "off") {
      // stop at end when repeat is off
      return;
    }
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

  playPrev: () => {
    const { queue, currentTrack } = get();
    if (queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack?.id);
    const prevIdx = idx > 0 ? idx - 1 : queue.length - 1;
    const prev = queue[prevIdx];
    if (!prev || prev.id === currentTrack?.id) return;
    set({ currentTrack: prev, isPlaying: true, played: get().played + 1 });
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

  cycleRepeat: () => {
    const order: RepeatMode[] = ["off", "all", "one"];
    const next = order[(order.indexOf(get().repeatMode) + 1) % order.length];
    try { localStorage.setItem(RP_KEY, next); } catch {}
    set({ repeatMode: next });
  },

  setReduceMotion: (v) => {
    try { localStorage.setItem(RM_KEY, v ? "1" : "0"); } catch {}
    set({ reduceMotion: v });
  },
}));
