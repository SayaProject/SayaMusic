import { Home, Music, User } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "playlist", label: "Playlist", icon: Music },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-3">
      <div className="glass-navbar rounded-full flex items-center justify-around py-1.5 px-2 w-72">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-5 py-2 rounded-full transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "hsl(220 15% 18% / 0.8)",
                    boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.06), 0 2px 8px hsl(0 0% 0% / 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative z-10"
              >
                <tab.icon
                  className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium relative z-10 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
