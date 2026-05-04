// Owner / Co-owner / Queen / Cutie identification for the profile badges.

import type { TelegramUser } from "./telegram";

// Primary owner numeric Telegram IDs.
export const OWNER_TELEGRAM_IDS: number[] = [1329546526];
// Co-owner numeric Telegram IDs.
export const COOWNER_TELEGRAM_IDS: number[] = [5669044543];
// Queen numeric Telegram IDs.
export const QUEEN_TELEGRAM_IDS: number[] = [8272973918];
// Cutie numeric Telegram IDs.
export const CUTIE_TELEGRAM_IDS: number[] = [8547300849, 8438494083];

// Username fallbacks (case-insensitive, no @).
export const OWNER_USERNAMES: string[] = ["shnwaz"];
export const COOWNER_USERNAMES: string[] = [];
export const QUEEN_USERNAMES: string[] = [];
export const CUTIE_USERNAMES: string[] = [];

export type OwnerRole = "owner" | "coowner" | "queen" | "cutie" | null;

export function getOwnerRole(user: TelegramUser): OwnerRole {
  if (user.id && OWNER_TELEGRAM_IDS.includes(user.id)) return "owner";
  if (user.username && OWNER_USERNAMES.includes(user.username.toLowerCase())) return "owner";
  if (user.id && COOWNER_TELEGRAM_IDS.includes(user.id)) return "coowner";
  if (user.username && COOWNER_USERNAMES.includes(user.username.toLowerCase())) return "coowner";
  if (user.id && QUEEN_TELEGRAM_IDS.includes(user.id)) return "queen";
  if (user.username && QUEEN_USERNAMES.includes(user.username.toLowerCase())) return "queen";
  if (user.id && CUTIE_TELEGRAM_IDS.includes(user.id)) return "cutie";
  if (user.username && CUTIE_USERNAMES.includes(user.username.toLowerCase())) return "cutie";
  return null;
}

export function isOwner(user: TelegramUser): boolean {
  return getOwnerRole(user) === "owner";
}
