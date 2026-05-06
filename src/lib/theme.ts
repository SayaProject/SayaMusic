// Auto-rotating theme system. Each visit advances to the next theme.
// Themes change the WHOLE site: HSL tokens + glass + gradients + page background.

export type ThemeName =
  | "emerald"
  | "sunset"
  | "violet"
  | "ocean"
  | "rose"
  | "mono"
  | "aurora"
  | "midnight"
  | "cottoncandy"
  | "neonmint"
  | "crimson"
  | "lavender";

interface Theme {
  name: ThemeName;
  label: string;
  vars: Record<string, string>;
}

// Each theme defines: core HSL tokens + glass tints + header/profile gradients
// + a full-page background gradient (--page-bg).
export const themes: Theme[] = [
  {
    name: "emerald",
    label: "Emerald Night",
    vars: {
      "--background": "220 20% 10%",
      "--foreground": "0 0% 95%",
      "--card": "220 15% 15%",
      "--popover": "220 15% 15%",
      "--primary": "152 69% 45%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "220 15% 20%",
      "--accent": "152 69% 45%",
      "--accent-foreground": "0 0% 100%",
      "--ring": "152 69% 45%",
      "--muted": "220 10% 25%",
      "--muted-foreground": "220 10% 60%",
      "--border": "220 10% 22%",
      "--input": "220 10% 22%",
      "--glass-card-bg": "220 15% 14% / 0.7",
      "--glass-navbar-bg": "220 18% 11% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(152 69% 25% / 0.45) 0%, hsl(220 20% 10%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(152 60% 28% / 0.5) 0%, hsl(220 20% 10%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 10% -10%, hsl(152 70% 20% / 0.55), transparent 60%), radial-gradient(900px 500px at 100% 0%, hsl(180 60% 18% / 0.35), transparent 60%), hsl(220 20% 10%)",
    },
  },
  {
    name: "sunset",
    label: "Sunset Glow",
    vars: {
      "--background": "20 25% 8%",
      "--foreground": "30 30% 96%",
      "--card": "18 20% 14%",
      "--popover": "18 20% 14%",
      "--primary": "16 90% 58%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "18 18% 18%",
      "--accent": "340 82% 60%",
      "--accent-foreground": "0 0% 100%",
      "--ring": "16 90% 58%",
      "--muted": "18 15% 22%",
      "--muted-foreground": "20 15% 65%",
      "--border": "18 15% 22%",
      "--input": "18 15% 22%",
      "--glass-card-bg": "18 22% 12% / 0.7",
      "--glass-navbar-bg": "18 25% 9% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(16 80% 35% / 0.5) 0%, hsl(20 25% 8%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(340 70% 35% / 0.5) 0%, hsl(20 25% 8%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 0% 0%, hsl(16 90% 28% / 0.55), transparent 60%), radial-gradient(900px 500px at 100% 10%, hsl(340 80% 28% / 0.45), transparent 60%), hsl(20 25% 8%)",
    },
  },
  {
    name: "violet",
    label: "Cosmic Violet",
    vars: {
      "--background": "260 25% 9%",
      "--foreground": "270 20% 96%",
      "--card": "260 20% 14%",
      "--popover": "260 20% 14%",
      "--primary": "270 80% 65%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "260 18% 18%",
      "--accent": "290 75% 65%",
      "--accent-foreground": "0 0% 100%",
      "--ring": "270 80% 65%",
      "--muted": "260 15% 22%",
      "--muted-foreground": "260 10% 65%",
      "--border": "260 15% 22%",
      "--input": "260 15% 22%",
      "--glass-card-bg": "260 22% 13% / 0.7",
      "--glass-navbar-bg": "260 25% 10% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(270 70% 35% / 0.5) 0%, hsl(260 25% 9%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(290 70% 35% / 0.5) 0%, hsl(260 25% 9%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 100% -10%, hsl(270 80% 30% / 0.55), transparent 60%), radial-gradient(900px 500px at 0% 20%, hsl(290 75% 28% / 0.45), transparent 60%), hsl(260 25% 9%)",
    },
  },
  {
    name: "ocean",
    label: "Deep Ocean",
    vars: {
      "--background": "210 35% 8%",
      "--foreground": "200 25% 96%",
      "--card": "210 28% 13%",
      "--popover": "210 28% 13%",
      "--primary": "195 90% 55%",
      "--primary-foreground": "210 40% 8%",
      "--secondary": "210 25% 18%",
      "--accent": "180 75% 50%",
      "--accent-foreground": "210 40% 8%",
      "--ring": "195 90% 55%",
      "--muted": "210 20% 22%",
      "--muted-foreground": "200 15% 65%",
      "--border": "210 20% 22%",
      "--input": "210 20% 22%",
      "--glass-card-bg": "210 30% 12% / 0.7",
      "--glass-navbar-bg": "210 35% 9% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(195 80% 28% / 0.55) 0%, hsl(210 35% 8%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(180 70% 25% / 0.5) 0%, hsl(210 35% 8%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 50% -20%, hsl(195 90% 25% / 0.55), transparent 60%), radial-gradient(900px 500px at 0% 100%, hsl(180 75% 22% / 0.45), transparent 60%), hsl(210 35% 8%)",
    },
  },
  {
    name: "rose",
    label: "Rose Noir",
    vars: {
      "--background": "340 18% 9%",
      "--foreground": "350 25% 96%",
      "--card": "340 15% 14%",
      "--popover": "340 15% 14%",
      "--primary": "340 85% 62%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "340 14% 18%",
      "--accent": "10 85% 65%",
      "--accent-foreground": "0 0% 100%",
      "--ring": "340 85% 62%",
      "--muted": "340 12% 22%",
      "--muted-foreground": "340 10% 65%",
      "--border": "340 12% 22%",
      "--input": "340 12% 22%",
      "--glass-card-bg": "340 16% 13% / 0.7",
      "--glass-navbar-bg": "340 18% 10% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(340 80% 32% / 0.5) 0%, hsl(340 18% 9%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(10 80% 32% / 0.5) 0%, hsl(340 18% 9%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 0% 0%, hsl(340 80% 28% / 0.55), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(10 80% 25% / 0.45), transparent 60%), hsl(340 18% 9%)",
    },
  },
  {
    name: "mono",
    label: "Monochrome",
    vars: {
      "--background": "0 0% 6%",
      "--foreground": "0 0% 96%",
      "--card": "0 0% 11%",
      "--popover": "0 0% 11%",
      "--primary": "0 0% 92%",
      "--primary-foreground": "0 0% 8%",
      "--secondary": "0 0% 14%",
      "--accent": "0 0% 80%",
      "--accent-foreground": "0 0% 8%",
      "--ring": "0 0% 80%",
      "--muted": "0 0% 18%",
      "--muted-foreground": "0 0% 62%",
      "--border": "0 0% 18%",
      "--input": "0 0% 18%",
      "--glass-card-bg": "0 0% 10% / 0.72",
      "--glass-navbar-bg": "0 0% 7% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(0 0% 25% / 0.4) 0%, hsl(0 0% 6%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(0 0% 30% / 0.4) 0%, hsl(0 0% 6%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 50% -20%, hsl(0 0% 18% / 0.6), transparent 60%), hsl(0 0% 6%)",
    },
  },
  {
    name: "aurora",
    label: "Aurora",
    vars: {
      "--background": "190 40% 8%",
      "--foreground": "160 25% 96%",
      "--card": "190 30% 13%",
      "--popover": "190 30% 13%",
      "--primary": "160 85% 55%",
      "--primary-foreground": "190 50% 8%",
      "--secondary": "190 25% 18%",
      "--accent": "280 80% 65%",
      "--accent-foreground": "0 0% 100%",
      "--ring": "160 85% 55%",
      "--muted": "190 22% 22%",
      "--muted-foreground": "180 15% 65%",
      "--border": "190 22% 22%",
      "--input": "190 22% 22%",
      "--glass-card-bg": "190 32% 11% / 0.7",
      "--glass-navbar-bg": "190 40% 8% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(160 80% 28% / 0.5) 0%, hsl(190 40% 8%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(280 70% 32% / 0.5) 0%, hsl(190 40% 8%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 0% 0%, hsl(160 85% 25% / 0.5), transparent 60%), radial-gradient(900px 500px at 100% 0%, hsl(280 80% 30% / 0.5), transparent 60%), radial-gradient(700px 400px at 50% 100%, hsl(200 90% 30% / 0.4), transparent 60%), hsl(190 40% 8%)",
    },
  },
  {
    name: "midnight",
    label: "Midnight Gold",
    vars: {
      "--background": "230 30% 7%",
      "--foreground": "45 30% 95%",
      "--card": "230 25% 12%",
      "--popover": "230 25% 12%",
      "--primary": "45 90% 60%",
      "--primary-foreground": "230 40% 8%",
      "--secondary": "230 20% 17%",
      "--accent": "30 85% 60%",
      "--accent-foreground": "230 40% 8%",
      "--ring": "45 90% 60%",
      "--muted": "230 18% 22%",
      "--muted-foreground": "230 12% 65%",
      "--border": "230 18% 22%",
      "--input": "230 18% 22%",
      "--glass-card-bg": "230 28% 11% / 0.7",
      "--glass-navbar-bg": "230 32% 8% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(45 80% 30% / 0.4) 0%, hsl(230 30% 7%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(30 80% 32% / 0.45) 0%, hsl(230 30% 7%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 100% 100%, hsl(45 90% 22% / 0.45), transparent 60%), radial-gradient(900px 500px at 0% 0%, hsl(230 60% 18% / 0.6), transparent 60%), hsl(230 30% 7%)",
    },
  {
    name: "cottoncandy",
    label: "Cotton Candy",
    vars: {
      "--background": "320 25% 10%",
      "--foreground": "320 25% 96%",
      "--card": "320 22% 15%",
      "--popover": "320 22% 15%",
      "--primary": "320 90% 72%",
      "--primary-foreground": "320 40% 10%",
      "--secondary": "320 20% 20%",
      "--accent": "200 90% 70%",
      "--accent-foreground": "200 50% 10%",
      "--ring": "320 90% 72%",
      "--muted": "320 18% 25%",
      "--muted-foreground": "320 15% 70%",
      "--border": "320 18% 25%",
      "--input": "320 18% 25%",
      "--glass-card-bg": "320 24% 14% / 0.7",
      "--glass-navbar-bg": "320 26% 11% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(320 80% 38% / 0.5) 0%, hsl(320 25% 10%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(200 80% 35% / 0.5) 0%, hsl(320 25% 10%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 0% 0%, hsl(320 90% 32% / 0.55), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(200 90% 28% / 0.5), transparent 60%), hsl(320 25% 10%)",
    },
  },
  {
    name: "neonmint",
    label: "Neon Mint",
    vars: {
      "--background": "170 30% 7%",
      "--foreground": "150 25% 96%",
      "--card": "170 25% 12%",
      "--popover": "170 25% 12%",
      "--primary": "150 95% 55%",
      "--primary-foreground": "170 50% 8%",
      "--secondary": "170 22% 17%",
      "--accent": "180 95% 60%",
      "--accent-foreground": "170 50% 8%",
      "--ring": "150 95% 55%",
      "--muted": "170 18% 22%",
      "--muted-foreground": "160 15% 65%",
      "--border": "170 18% 22%",
      "--input": "170 18% 22%",
      "--glass-card-bg": "170 28% 11% / 0.7",
      "--glass-navbar-bg": "170 32% 8% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(150 90% 25% / 0.55) 0%, hsl(170 30% 7%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(180 90% 25% / 0.5) 0%, hsl(170 30% 7%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 50% -10%, hsl(150 95% 22% / 0.6), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(180 95% 22% / 0.45), transparent 60%), hsl(170 30% 7%)",
    },
  },
  {
    name: "crimson",
    label: "Crimson Ember",
    vars: {
      "--background": "0 25% 8%",
      "--foreground": "20 30% 96%",
      "--card": "0 22% 13%",
      "--popover": "0 22% 13%",
      "--primary": "0 85% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "0 20% 18%",
      "--accent": "30 90% 60%",
      "--accent-foreground": "0 50% 10%",
      "--ring": "0 85% 60%",
      "--muted": "0 18% 22%",
      "--muted-foreground": "10 15% 65%",
      "--border": "0 18% 22%",
      "--input": "0 18% 22%",
      "--glass-card-bg": "0 24% 12% / 0.7",
      "--glass-navbar-bg": "0 28% 9% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(0 80% 30% / 0.55) 0%, hsl(0 25% 8%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(30 80% 32% / 0.5) 0%, hsl(0 25% 8%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 0% 0%, hsl(0 85% 25% / 0.6), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(30 90% 25% / 0.45), transparent 60%), hsl(0 25% 8%)",
    },
  },
  {
    name: "lavender",
    label: "Lavender Dream",
    vars: {
      "--background": "250 28% 9%",
      "--foreground": "260 25% 96%",
      "--card": "250 24% 14%",
      "--popover": "250 24% 14%",
      "--primary": "260 80% 72%",
      "--primary-foreground": "250 40% 10%",
      "--secondary": "250 22% 19%",
      "--accent": "200 75% 70%",
      "--accent-foreground": "200 50% 10%",
      "--ring": "260 80% 72%",
      "--muted": "250 18% 23%",
      "--muted-foreground": "250 12% 68%",
      "--border": "250 18% 23%",
      "--input": "250 18% 23%",
      "--glass-card-bg": "250 26% 12% / 0.7",
      "--glass-navbar-bg": "250 30% 9% / 0.92",
      "--header-grad": "linear-gradient(180deg, hsl(260 70% 35% / 0.5) 0%, hsl(250 28% 9%) 100%)",
      "--profile-grad": "linear-gradient(180deg, hsl(200 70% 32% / 0.5) 0%, hsl(250 28% 9%) 100%)",
      "--page-bg": "radial-gradient(1200px 600px at 100% 0%, hsl(260 80% 28% / 0.55), transparent 60%), radial-gradient(900px 500px at 0% 100%, hsl(200 75% 25% / 0.45), transparent 60%), hsl(250 28% 9%)",
    },
  },
];

const STORAGE_KEY = "tg-music-theme-idx";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.theme = theme.name;
}

/** Advance to next theme on each visit. */
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
