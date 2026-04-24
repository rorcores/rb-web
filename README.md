# rb-web

Minimal [rorybuilds.com](https://rorybuilds.com) landing page. Big red **RB** in Poppins Black over a grid of looping background videos, with `team@rorybuilds.com` in JetBrains Mono underneath.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Google Fonts via `next/font` (Poppins + JetBrains Mono)
- No client JS — fully static, just HTML5 `<video>` tags

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a git repo (or run `vercel` from this directory).
2. In Vercel, import the repo and point the project root at `rb-web/`.
3. Framework preset auto-detects **Next.js** — no env vars or build config needed.
4. Set the custom domain `rorybuilds.com` in Project → Settings → Domains.

## Assets

Background videos live in `public/videos/intro-{1..5}.mp4` (copies of the motion intros from `motion intro/video intros/`). Replace any of them to swap the reel — filenames in `app/page.tsx` match one-to-one.

## Theme

Matches the RORY BUILDS motion/PDF system:

| Token   | Value     |
| ------- | --------- |
| bg      | `#000000` |
| accent  | `#cc1e00` |
| text    | `#ffffff` |
| display | Poppins 900 |
| mono    | JetBrains Mono 500 |
