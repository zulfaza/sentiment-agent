# Sentiment Agent

AI-powered social media monitoring app that tracks brand sentiment and public figures across multiple platforms.

## Features

- **Multi-Agent Monitoring** - Create agents to track any brand, company, or public figure
- **Cross-Platform Coverage** - Aggregate mentions from X (Twitter), Instagram, Reddit, and TikTok
- **Real-Time Sentiment Analysis** - Instant classification of mentions as Positive, Neutral, or Negative
- **Trend Visualization** - Interactive charts showing sentiment changes over 7-30 days
- **Recent Mentions Feed** - View latest mentions with platform, user, content, and sentiment
- **Pricing Tiers** - Free, Pro, and Enterprise plans with varying limits

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- TanStack Start (SSR meta-framework)
- TanStack Router (file-based routing)
- TanStack Query (data fetching & caching)
- Tailwind CSS v4
- shadcn/ui + Base UI components
- Recharts (visualization)

**Backend:**
- Nitro (Node.js server)
- Mock API layer with simulated network delays

**Dev Tools:**
- Vite 7
- Vitest
- ESLint + Prettier
- Bun (package manager)

## Getting Started

Install dependencies:
```bash
bun install
```

Start dev server (port 5173):
```bash
bun run dev
```

Build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

Run tests:
```bash
bun run test
```

Format & lint:
```bash
bun run check
```

## Project Structure

```
/src
├── /routes              # File-based routes
│   ├── index.tsx       # Landing page
│   └── /dashboard      # Dashboard routes
├── /components
│   ├── /ui             # shadcn/ui components
│   ├── agent-*.tsx     # Agent-related components
│   └── app-layout.tsx  # Main layout
├── /lib
│   ├── queries.ts      # React Query hooks
│   ├── data.ts         # Mock API & data
│   └── utils.ts        # Utilities
└── styles.css          # Global styles
```

## Data Layer

Currently uses mock data in `/lib/data.ts` simulating:
- 4 pre-populated agents (Apple Inc., Elon Musk, Nike, Taylor Swift)
- Network delays (200-800ms)
- Agent analysis status (analyzing → ready)
- User account management

## Scripts

- `dev` - Start dev server
- `build` - Build for production
- `preview` - Preview production build
- `test` - Run Vitest tests
- `lint` - ESLint
- `check` - Format & fix with Prettier + ESLint
