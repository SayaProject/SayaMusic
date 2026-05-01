import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HomeTab } from "@/components/HomeTab";
import { PlaylistTab } from "@/components/PlaylistTab";
import { ProfileTab } from "@/components/ProfileTab";
import { MiniPlayer } from "@/components/MiniPlayer";
import { BottomNav } from "@/components/BottomNav";
import { initTelegramApp } from "@/lib/telegram";
import { rotateAndApplyTheme } from "@/lib/theme";

type TabKey = "home" | "playlist" | "profile";

const Index = () => {
  const [tab, setTab] = useState<TabKey>("home");
  const prevTabRef = useRef<TabKey>("home");
  const scrollRef = useRef<Record<TabKey, number>>({
    home: 0,
    playlist: 0,
    profile: 0,
  });

  useEffect(() => {
    initTelegramApp();
    rotateAndApplyTheme();
  }, []);

  // Preserve scroll position per tab across switches
  const handleNavigate = (next: string) => {
    const t = next as TabKey;
    if (t === prevTabRef.current) return;
    // Save current scroll for the tab we're leaving
    scrollRef.current[prevTabRef.current] = window.scrollY;
    prevTabRef.current = t;
    setTab(t);
    // Restore the destination tab's scroll on next paint
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollRef.current[t] || 0, behavior: "auto" });
    });
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-lg relative overflow-x-hidden min-h-screen">
        {/* Keep all tabs mounted: preserves search results, focus, and avoids reloading the player */}
        <motion.div
          animate={{ opacity: tab === "home" ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: tab === "home" ? "block" : "none" }}
          className="min-h-screen"
        >
          <HomeTab />
        </motion.div>
        <motion.div
          animate={{ opacity: tab === "playlist" ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: tab === "playlist" ? "block" : "none" }}
          className="min-h-screen"
        >
          <PlaylistTab />
        </motion.div>
        <motion.div
          animate={{ opacity: tab === "profile" ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: tab === "profile" ? "block" : "none" }}
          className="min-h-screen"
        >
          <ProfileTab />
        </motion.div>

        <MiniPlayer />
        <BottomNav active={tab} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default Index;
