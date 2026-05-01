import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HomeTab } from "@/components/HomeTab";
import { PlaylistTab } from "@/components/PlaylistTab";
import { ProfileTab } from "@/components/ProfileTab";
import { MiniPlayer } from "@/components/MiniPlayer";
import { BottomNav } from "@/components/BottomNav";
import { initTelegramApp } from "@/lib/telegram";

const Index = () => {
  const [tab, setTab] = useState("home");

  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-lg relative overflow-x-hidden min-h-screen">
        {/* Keep all tabs mounted so songs/search/state persist across nav */}
        <motion.div
          key="home"
          animate={{ opacity: tab === "home" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: tab === "home" ? "block" : "none" }}
          className="min-h-screen"
        >
          <HomeTab />
        </motion.div>
        <motion.div
          key="playlist"
          animate={{ opacity: tab === "playlist" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: tab === "playlist" ? "block" : "none" }}
          className="min-h-screen"
        >
          <PlaylistTab />
        </motion.div>
        <motion.div
          key="profile"
          animate={{ opacity: tab === "profile" ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: tab === "profile" ? "block" : "none" }}
          className="min-h-screen"
        >
          <ProfileTab />
        </motion.div>

        <MiniPlayer />
        <BottomNav active={tab} onNavigate={setTab} />
      </div>
    </div>
  );
};

export default Index;
