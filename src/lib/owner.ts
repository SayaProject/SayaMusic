// Owner identification for the Owner badge on the profile.
// EDIT THIS FILE to set your numeric Telegram ID (most reliable).

import type { TelegramUser } from "./telegram";

// Owner numeric Telegram IDs.
export const OWNER_TELEGRAM_IDS: number[] = [1329546526];

// Fallback: usernames (case-insensitive, no @).
export const OWNER_USERNAMES: string[] = ["shnwaz"];

export function isOwner(user: TelegramUser): boolean {
  if (user.id && OWNER_TELEGRAM_IDS.includes(user.id)) return true;
  if (user.username && OWNER_USERNAMES.includes(user.username.toLowerCase())) return true;
  return false;
}
