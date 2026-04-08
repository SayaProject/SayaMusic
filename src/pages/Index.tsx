import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeTab } from "@/components/HomeTab";
import { PlaylistTab } from "@/components/PlaylistTab";
import { ProfileTab } from "@/components/ProfileTab";
import { MiniPlayer } from "@/components/MiniPlayer";
import { BottomNav } from "@/components/BottomNav";
import { initTelegramApp } from "@/lib/telegram";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const Index = () => {
  const [tab, setTab] = useState("home");

  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-lg relative overflow-x-hidden min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-screen"
          >
            {tab === "home" && <HomeTab />}
            {tab === "playlist" && <PlaylistTab />}
            {tab === "profile" && <ProfileTab />}
          </motion.div>
        </AnimatePresence>
        <MiniPlayer />
        <BottomNav active={tab} onNavigate={setTab} />
      </div>
    </div>
  );
};

export default Index;
