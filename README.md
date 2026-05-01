# ftwb-web

Minimal [forthosewho.build](https://forthosewho.build) landing page for **FOR THOSE WHO BUILD** — Rory Garton-Smith's interview show. Iridescent prism + Lastica wordmark over a grid of looping background videos, with `team@forthosewho.build` underneath.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Lastica (local) for the wordmark, Poppins + JetBrains Mono via `next/font/google`
- Mostly static — just HTML5 `<video>` tags with a tiny client-side ping-pong loop

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a git repo (or run `vercel` from this directory).
2. In Vercel, import the repo and point the project root at `ftwb-web/`.
3. Framework preset auto-detects **Next.js** — no env vars or build config needed.
4. Set the custom domain `forthosewho.build` in Project → Settings → Domains.

## Assets

- Background videos: `public/videos/intro-{1..5}.mp4` (copies of the motion intros from `motion intro/video intros/`). Replace any of them to swap the reel — filenames in `app/page.tsx` match one-to-one.
- Logo: `public/brand/prism.png` (iridescent cube from the FTWB brand kit).
- Display font: `public/fonts/Lastica.ttf` (loaded via `next/font/local`).

## Theme

Matches the FOR THOSE WHO BUILD brand system:

| Token   | Value     |
| ------- | --------- |
| bg      | `#000000` |
| accent  | `#cc1e00` |
| text    | `#ffffff` |
| display | Lastica   |
| body    | Poppins 700/900 |
| mono    | JetBrains Mono 500 |
