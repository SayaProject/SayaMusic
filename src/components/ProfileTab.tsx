import { Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { getTelegramUser } from "@/lib/telegram";
import { SongRow } from "./SongRow";

export function ProfileTab() {
  const user = getTelegramUser();
  const { played, liked, downloads, recentlyPlayed, likedSongs } = usePlayerStore();

  return (
    <div className="flex flex-col pb-36">
      <div className="gradient-profile pt-8 pb-6 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {user.photo_url ? (
            <img
              src={user.photo_url}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-primary mb-3"
              draggable={false}
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center text-4xl font-bold text-primary mb-3">
              {user.first_name[0]}
            </div>
          )}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-bold text-foreground"
        >
          {user.first_name} {user.last_name || ""}
        </motion.h2>
        {user.username && (
          <p className="text-sm text-primary">@{user.username}</p>
        )}
        <span className="glass-card mt-2 px-3 py-1 rounded-full text-xs text-muted-foreground">
          ID: {user.id}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-around py-4 px-4"
      >
        {[
          { label: "PLAYED", value: played },
          { label: "LIKED", value: liked },
          { label: "DOWNLOADS", value: downloads },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="px-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Recently Played</h3>
          </div>
          {recentlyPlayed.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent songs</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {recentlyPlayed.slice(0, 5).map((s) => (
                <SongRow key={s.id} song={s} />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Liked Songs</h3>
          </div>
          {likedSongs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No liked songs</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {likedSongs.slice(0, 5).map((s) => (
                <SongRow key={s.id} song={s} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
