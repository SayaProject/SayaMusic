import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTelegramUser, type TelegramUser } from "@/lib/telegram";
import type { Session } from "@supabase/supabase-js";

export interface AppProfile {
  id: number | string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  email?: string;
  source: "telegram" | "google" | "guest";
}

const AUTO_PROMPT_KEY = "google_auto_prompt_done";

export function isInTelegram(): boolean {
  try {
    const tg = (window as any).Telegram?.WebApp;
    return !!tg?.initDataUnsafe?.user;
  } catch {
    return false;
  }
}

export function useAuthProfile() {
  const [session, setSession] = useState<Session | null>(null);
  const [dbProfile, setDbProfile] = useState<{
    display_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setDbProfile(null);
      return;
    }
    supabase
      .from("profiles")
      .select("display_name, email, avatar_url")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setDbProfile(data));
  }, [session?.user?.id]);

  // Auto-prompt Google sign-in once for non-Telegram visitors
  useEffect(() => {
    if (loading) return;
    if (session) return;
    if (isInTelegram()) return;
    if (localStorage.getItem(AUTO_PROMPT_KEY)) return;
    localStorage.setItem(AUTO_PROMPT_KEY, "1");
    // small delay so the UI mounts first
    const t = setTimeout(() => {
      void signInWithGoogle();
    }, 800);
    return () => clearTimeout(t);
  }, [loading, session]);

  const tgUser: TelegramUser = getTelegramUser();
  const inTg = isInTelegram();

  let profile: AppProfile;
  if (session?.user) {
    const meta = (session.user.user_metadata || {}) as Record<string, any>;
    const fullName: string =
      dbProfile?.display_name || meta.full_name || meta.name || session.user.email || "User";
    const [first, ...rest] = fullName.split(" ");
    profile = {
      id: session.user.id,
      first_name: first || "User",
      last_name: rest.join(" ") || undefined,
      username: meta.preferred_username || (session.user.email?.split("@")[0]),
      photo_url: dbProfile?.avatar_url || meta.avatar_url || meta.picture,
      email: dbProfile?.email || session.user.email || undefined,
      source: "google",
    };
  } else if (inTg) {
    profile = { ...tgUser, source: "telegram" };
  } else {
    profile = { ...tgUser, source: "guest" };
  }

  return {
    profile,
    session,
    loading,
    inTelegram: inTg,
    signInWithGoogle,
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
      queryParams: { prompt: "select_account" },
    },
  });
  return { data, error };
}
