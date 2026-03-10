# ViraLoop — Media Operations Platform

A professional SaaS dashboard for digital media companies. Manage video submissions, generate AI videos, schedule social media posts, and track performance analytics — all in one place.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | TailwindCSS v3 |
| State | Zustand (with persist) |
| Charts | Recharts |
| Animation | Framer Motion ready |
| HTTP | Axios (mock layer included) |
| Routing | React Router v6 |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

**Demo credentials:** `admin@viraloop.io` / `password`

## Project Structure

```
src/
├── assets/          # Static assets
├── components/
│   └── ui/          # Reusable UI primitives (Badge, Button, Card, Icon, …)
├── hooks/           # Custom React hooks (useAnalytics, useVideos, useScheduler)
├── layouts/         # AppLayout, Sidebar, Topbar
├── pages/           # One file per page/route
│   ├── AuthPage.tsx
│   ├── DashboardPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── MarketplacePage.tsx
│   ├── StudioPage.tsx
│   ├── SchedulerPage.tsx
│   ├── NotificationsPage.tsx
│   └── SettingsPage.tsx
├── services/
│   ├── api.ts       # Mock API layer (swap for real endpoints)
│   └── mockData.ts  # Realistic mock data
├── store/
│   └── useAppStore.ts   # Zustand global store
├── types/
│   └── index.ts     # TypeScript type definitions
└── utils/
    ├── format.ts    # Number formatting helpers
    └── tokens.ts    # Design tokens (colors)
```

## Pages

| Page | Route Key | Description |
|------|-----------|-------------|
| Login | — | Glassmorphism auth page |
| Dashboard | `dashboard` | KPI cards + charts overview |
| Analytics | `analytics` | Per-platform metrics & radar chart |
| Marketplace | `marketplace` | Video review & approval workflow |
| AI Studio | `studio` | Prompt-to-video generation |
| Scheduler | `scheduler` | Calendar + list post scheduling |
| Notifications | `notifications` | Filterable notification center |
| Settings | `settings` | Profile, platforms, API keys, team |

## Connecting to Late API

The `src/services/api.ts` file contains the mock API layer. To connect to the real Late API:

1. Add your `VITE_API_URL` and `VITE_LATE_API_KEY` to a `.env` file.
2. Replace the mock functions in `api.ts` with real `axios` calls.
3. Late API docs: https://docs.getlate.dev/

```env
VITE_API_URL=https://api.getlate.dev/v1
VITE_LATE_API_KEY=your_key_here
```

## Design System

Design tokens live in `src/utils/tokens.ts`. The platform uses a dark-first editorial aesthetic:

- **Fonts:** Syne (display) + DM Sans (body) + JetBrains Mono (data)
- **Accent:** Amber `#f59e0b`
- **Background:** Deep charcoal `#0a0a0f`

## Build for Production

```bash
npm run build
# Output in /dist
```
