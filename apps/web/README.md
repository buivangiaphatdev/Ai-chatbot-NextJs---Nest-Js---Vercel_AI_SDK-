<!-- Apps/web README — formatted for GitHub -->

# Web — Next.js App

Lightweight Next.js (App Router) frontend for the Ai-chatbot project.

## Table of contents

- [Tech Stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS + PostCSS
- AI SDKs: `ai`, `@ai-sdk/react`
- Internal UI: `@repo/ui`

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run in development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

3. Build & start (production)

```bash
npm run build
npm run start
```

---

## Scripts

- `npm run dev` — Start dev server (Next.js) on port 3000
- `npm run build` — Build production bundle
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run check-types` — Generate types and run `tsc --noEmit`

## Deployment

Deploy like any Next.js app (Vercel, Netlify, container, etc.). See Next.js docs for platform-specific guidance: https://nextjs.org/docs/deployment

---

If you want, I can also:

- Add badges (build, license, npm)
- Insert exact package versions from `package.json` into the Tech Stack
- Translate file fully to Vietnamese or English
