// Auto-rotating theme system. Each visit advances to the next theme.
// Themes are pure HSL token swaps applied to :root.

export type ThemeName = "emerald" | "sunset" | "violet" | "ocean" | "rose" | "mono";

interface Theme {
  name: ThemeName;
  label: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [
  {
    name: "emerald",
    label: "Emerald Night",
    vars: {
      "--background": "220 20% 10%",
      "--foreground": "0 0% 95%",
      "--card": "220 15% 15%",
      "--primary": "152 69% 45%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "152 69% 45%",
      "--ring": "152 69% 45%",
      "--muted": "220 10% 25%",
      "--muted-foreground": "220 10% 55%",
      "--border": "220 10% 22%",
    },
  },
  {
    name: "sunset",
    label: "Sunset Glow",
    vars: {
      "--background": "20 25% 8%",
      "--foreground": "30 30% 96%",
      "--card": "18 20% 14%",
      "--primary": "16 90% 58%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "340 82% 60%",
      "--ring": "16 90% 58%",
      "--muted": "18 15% 22%",
      "--muted-foreground": "20 15% 60%",
      "--border": "18 15% 22%",
    },
  },
  {
    name: "violet",
    label: "Cosmic Violet",
    vars: {
      "--background": "260 25% 9%",
      "--foreground": "270 20% 96%",
      "--card": "260 20% 14%",
      "--primary": "270 80% 65%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "290 75% 65%",
      "--ring": "270 80% 65%",
      "--muted": "260 15% 22%",
      "--muted-foreground": "260 10% 60%",
      "--border": "260 15% 22%",
    },
  },
  {
    name: "ocean",
    label: "Deep Ocean",
    vars: {
      "--background": "210 35% 8%",
      "--foreground": "200 25% 96%",
      "--card": "210 28% 13%",
      "--primary": "195 90% 55%",
      "--primary-foreground": "210 40% 8%",
      "--accent": "180 75% 50%",
      "--ring": "195 90% 55%",
      "--muted": "210 20% 22%",
      "--muted-foreground": "200 15% 60%",
      "--border": "210 20% 22%",
    },
  },
  {
    name: "rose",
    label: "Rose Noir",
    vars: {
      "--background": "340 18% 9%",
      "--foreground": "350 25% 96%",
      "--card": "340 15% 14%",
      "--primary": "340 85% 62%",
      "--primary-foreground": "0 0% 100%",
      "--accent": "10 85% 65%",
      "--ring": "340 85% 62%",
      "--muted": "340 12% 22%",
      "--muted-foreground": "340 10% 60%",
      "--border": "340 12% 22%",
    },
  },
  {
    name: "mono",
    label: "Monochrome",
    vars: {
      "--background": "0 0% 6%",
      "--foreground": "0 0% 96%",
      "--card": "0 0% 11%",
      "--primary": "0 0% 92%",
      "--primary-foreground": "0 0% 8%",
      "--accent": "0 0% 80%",
      "--ring": "0 0% 80%",
      "--muted": "0 0% 18%",
      "--muted-foreground": "0 0% 58%",
      "--border": "0 0% 18%",
    },
  },
];

const STORAGE_KEY = "tg-music-theme-idx";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.theme = theme.name;
}

/**
 * Advance to next theme on each visit. Returns the active theme.
 */
export function rotateAndApplyTheme(): Theme {
  let idx = 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prev = stored ? parseInt(stored, 10) : -1;
    idx = (Number.isFinite(prev) ? prev + 1 : 0) % themes.length;
    localStorage.setItem(STORAGE_KEY, String(idx));
  } catch {
    idx = Math.floor(Math.random() * themes.length);
  }
  const theme = themes[idx];
  applyTheme(theme);
  return theme;
}

export function setThemeByName(name: ThemeName) {
  const t = themes.find((x) => x.name === name);
  if (!t) return;
  applyTheme(t);
  try {
    localStorage.setItem(STORAGE_KEY, String(themes.indexOf(t)));
  } catch {}
}
