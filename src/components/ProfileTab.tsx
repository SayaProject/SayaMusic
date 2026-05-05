import { Clock, Heart, Crown, Shield, Sparkles, Gem, Heart as HeartIcon, LogIn, LogOut } from "lucide-react";
import { motion, type Transition } from "framer-motion";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { getOwnerRole } from "@/lib/owner";
import { useAuthProfile } from "@/hooks/useAuthProfile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SongRow } from "./SongRow";

export function ProfileTab() {
  const { profile: user, session, inTelegram, signInWithGoogle, signOut } = useAuthProfile();
  const role = getOwnerRole(user as any);
  const isOwner = role === "owner";
  const isCoOwner = role === "coowner";
  const isQueen = role === "queen";
  const isCutie = role === "cutie";
  const badgeClass = isOwner
    ? "owner-badge"
    : isQueen
      ? "queen-badge"
      : isCutie
        ? "cutie-badge"
        : "coowner-badge";
  const RoleIcon = isOwner ? Crown : isQueen ? Gem : isCutie ? HeartIcon : Shield;
  const roleLabel = isOwner ? "OWNER" : isQueen ? "QUEEN" : isCutie ? "CUTIE" : "CO-OWNER";
  const roleTip = isOwner
    ? "Verified account owner of this app"
    : isQueen
      ? "Royal Queen — honored member of this app"
      : isCutie
        ? "Cutie 🌸 — adorable member of this app"
        : "Trusted co-owner — helps manage this app";
  const { played, liked, downloads, recentlyPlayed, likedSongs, reduceMotion, setReduceMotion } = usePlayerStore();
  // When reduceMotion is on, neutralize repeating animations
  const badgePulse = reduceMotion ? { scale: 1, rotate: 0 } : { scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] };
  const badgePulseTransition: Transition = reduceMotion
    ? { delay: 0.4 }
    : {
        delay: 0.4,
        scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      };
  const wiggleAnim = reduceMotion ? { rotate: 0 } : { rotate: [0, -10, 10, 0] };
  const wiggleTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" };

  return (
    <div className="flex flex-col pb-36 no-capture">
      <div className="gradient-profile pt-8 pb-6 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {user.photo_url ? (
            <div className="relative">
              <img
                src={user.photo_url}
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 border-primary mb-3"
                draggable={false}
              />
              {role && (
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        type="button"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={badgePulse}
                        transition={badgePulseTransition}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`absolute -top-1 -right-1 ${badgeClass} rounded-full p-1.5 cursor-help`}
                        aria-label={roleLabel}
                      >
                        <RoleIcon className="w-4 h-4" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs font-medium">
                      {roleTip}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ) : (
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center text-4xl font-bold text-primary mb-3">
                {user.first_name[0]}
              </div>
              {role && (
                <div className={`absolute -top-1 -right-1 ${badgeClass} rounded-full p-1.5`}>
                  <RoleIcon className="w-4 h-4" />
                </div>
              )}
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
        {role && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className={`${badgeClass} mt-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider flex items-center gap-1 cursor-help`}
                >
                  <motion.span
                  animate={wiggleAnim}
                  transition={wiggleTransition}
                  className="inline-flex"
                  >
                    <RoleIcon className="w-3 h-3" />
                  </motion.span>
                  {roleLabel}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs font-medium">
                {roleTip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {user.username && (
          <p className="text-sm text-primary mt-1">@{user.username}</p>
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
