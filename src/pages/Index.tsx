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

const TAB_ORDER: TabKey[] = ["home", "playlist", "profile"];

const Index = () => {
  const [tab, setTab] = useState<TabKey>("home");
  const [direction, setDirection] = useState<1 | -1>(1);
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

  const handleNavigate = (next: string) => {
    const t = next as TabKey;
    if (t === prevTabRef.current) return;
    const dir = TAB_ORDER.indexOf(t) > TAB_ORDER.indexOf(prevTabRef.current) ? 1 : -1;
    setDirection(dir);
    scrollRef.current[prevTabRef.current] = window.scrollY;
    prevTabRef.current = t;
    setTab(t);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollRef.current[t] || 0, behavior: "auto" });
    });
  };

  // Smooth fade transition for the active tab; inactive tabs stay mounted (display: none).
  const renderTab = (key: TabKey, node: React.ReactNode) => {
    const isActive = tab === key;
    return (
      <motion.div
        key={key}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ display: isActive ? "block" : "none" }}
        className="min-h-screen"
      >
        {node}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-lg relative overflow-x-hidden min-h-screen">
        {renderTab("home", <HomeTab />)}
        {renderTab("playlist", <PlaylistTab />)}
        {renderTab("profile", <ProfileTab />)}

        <MiniPlayer />
        <BottomNav active={tab} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default Index;
