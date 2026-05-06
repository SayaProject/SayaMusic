import { getTelegramUser, type TelegramUser } from "@/lib/telegram";

export interface AppProfile {
  id: number | string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  email?: string;
  source: "telegram" | "guest";
}

export function isInTelegram(): boolean {
  try {
    const tg = (window as any).Telegram?.WebApp;
    return !!tg?.initDataUnsafe?.user;
  } catch {
    return false;
  }
}

export function useAuthProfile() {
  const tgUser: TelegramUser = getTelegramUser();
  const inTg = isInTelegram();
  const profile: AppProfile = { ...tgUser, source: inTg ? "telegram" : "guest" };

  return {
    profile,
    inTelegram: inTg,
  };
}
