# 🎵 SayaMusic

A music player **Telegram Mini App** — stream trending YouTube music without leaving Telegram.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Telegram](https://img.shields.io/badge/Telegram_Mini_App-26A5E4?logo=telegram&logoColor=white)](https://t.me/SayaProject)

---

## Features

- 🏠 **Home** — trending YouTube feed with infinite scroll and live search
- 🎵 **Player** — persistent mini player with full queue management
- 📋 **Playlists** — create and sync playlists via Supabase
- 👤 **Profile** — Telegram identity + Google OAuth login
- 🌀 **Animations** — smooth tab transitions with Framer Motion

---

## Tech Stack

- **Frontend** — React 18, TypeScript, Vite + SWC
- **Styling** — Tailwind CSS, shadcn/ui (Radix UI)
- **State** — Zustand, TanStack Query v5
- **Backend** — Supabase (Postgres + Auth + RLS)
- **API** — YouTube Data API v3
- **Platform** — Telegram WebApp SDK
- **Tests** — Vitest, Playwright

---

## Quick Start

```bash
git clone https://github.com/SexyDark/SayaMusic.git
cd SayaMusic
npm install
npm run dev
```

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Project Structure

```
src/
├── components/     HomeTab, PlaylistTab, ProfileTab, MiniPlayer, BottomNav
├── hooks/          usePlayerStore (Zustand)
├── lib/            youtube.ts, telegram.ts, theme.ts
├── pages/          Index.tsx, NotFound.tsx
└── integrations/   supabase client + types
```

---

## Telegram Setup

1. Create a bot via [@BotFather](https://t.me/BotFather)
2. Run `/newapp` and set your deployed URL
3. The app calls `WebApp.ready()` and `expand()` on mount
4. User info is read from `initDataUnsafe.user`

---

## Community

[![Join on Telegram](https://img.shields.io/badge/Join-SayaProject-26A5E4?logo=telegram&logoColor=white)](https://t.me/SayaProject)

## Developer

[![GitHub](https://img.shields.io/badge/shnwazdeveloper-181717?logo=github&logoColor=white)](https://github.com/shnwazdeveloper)
