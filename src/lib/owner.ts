// Owner & Co-owner identification for the profile badges.

import type { TelegramUser } from "./telegram";

// Primary owner numeric Telegram IDs.
export const OWNER_TELEGRAM_IDS: number[] = [1329546526];
// Co-owner numeric Telegram IDs.
export const COOWNER_TELEGRAM_IDS: number[] = [5669044543];

// Username fallbacks (case-insensitive, no @).
export const OWNER_USERNAMES: string[] = ["shnwaz"];
export const COOWNER_USERNAMES: string[] = [];

export type OwnerRole = "owner" | "coowner" | null;

export function getOwnerRole(user: TelegramUser): OwnerRole {
  if (user.id && OWNER_TELEGRAM_IDS.includes(user.id)) return "owner";
  if (user.username && OWNER_USERNAMES.includes(user.username.toLowerCase())) return "owner";
  if (user.id && COOWNER_TELEGRAM_IDS.includes(user.id)) return "coowner";
  if (user.username && COOWNER_USERNAMES.includes(user.username.toLowerCase())) return "coowner";
  return null;
}

export function isOwner(user: TelegramUser): boolean {
  return getOwnerRole(user) === "owner";
}
