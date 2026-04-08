import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-background max-w-lg mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {tab === "home" && <HomeTab />}
        {tab === "playlist" && <PlaylistTab />}
        {tab === "profile" && <ProfileTab />}
      </div>
      <MiniPlayer />
      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
};

export default Index;
