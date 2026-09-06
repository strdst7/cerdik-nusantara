# 🪁 Cerdik Nusantara

**A gamified English & Bahasa Melayu edu-quiz arcade** — learn both languages side by side through bite-sized, culturally-flavoured quiz rounds.

> Belajar Bahasa Inggeris & Bahasa Melayu Dengan Seronok! · Learn English & Bahasa Melayu Joyfully Together!

## What it is

Cerdik Nusantara is a small arcade-style quiz game built to make bilingual vocabulary practice feel like play instead of homework. Players pick a category and difficulty, answer a shuffled round of six questions, and earn XP, streaks, and Nusantara-themed cultural badges (Wau Bulan, Bunga Raya, Hornbill, and more) as they progress.

## Features

- **Dual-language quiz engine** — every question, option, and explanation is available in English, Bahasa Melayu, or both at once (`dual` mode)
- **Arcade progression** — XP, streaks, and unlockable cultural badges tied to XP milestones, persisted in the browser via `localStorage`
- **Category & difficulty select** (Lobby) with shuffled, replayable question pools
- **Cultural vocab spotlight & glossary** — bilingual vocab pairs and cultural facts woven into each question
- **Light/dark mode**, sound toggle, and a playful hornbill mascot
- Fully client-side — no backend, no accounts, just open and play

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) for dev/build tooling
- [Tailwind CSS 4](https://tailwindcss.com/)
- [`vite-plugin-singlefile`](https://github.com/richardtallent/vite-plugin-singlefile) — the production build inlines all JS/CSS into a single `dist/index.html`, so the game runs anywhere with zero asset-path issues
- `canvas-confetti`, `lucide-react`, `clsx` / `tailwind-merge`

## Project structure

```
lazy-learner-github-101/
├── src/
│   ├── App.tsx                 # top-level state, routing between views
│   ├── components/
│   │   ├── ArcadeHeader.tsx    # language/sound/dark-mode toggles, XP + streak
│   │   ├── LobbyView.tsx       # category & difficulty picker
│   │   ├── QuizArena.tsx       # active quiz round
│   │   ├── VictoryModal.tsx    # round results screen
│   │   ├── GlossaryModal.tsx   # bilingual vocab & badge glossary
│   │   └── MascotHornbill.tsx  # mascot illustration
│   ├── data/quizData.ts        # questions, categories, cultural badges
│   └── utils/                  # sound effects, class-name helper
└── index.html
```

## Getting started

```bash
cd lazy-learner-github-101
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Deployment

This repo deploys automatically to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`): every push to `main` builds the app in `lazy-learner-github-101/` and publishes `dist/`.

- Live site: `https://strdst7.github.io/cerdik-nusantara/`
- Make sure **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.

It can also be deployed on [Vercel](https://vercel.com/new) — import the repo and set **Root Directory** to `lazy-learner-github-101`; Vercel auto-detects the Vite build.

## License

MIT — see [LICENSE](./LICENSE).
