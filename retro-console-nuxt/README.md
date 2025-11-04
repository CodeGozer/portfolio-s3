Retro Console — Nuxt 3 starter

This is a small, original Nuxt 3 skeleton inspired by retro CRT-style UI. It intentionally avoids copying any specific game's artwork and uses a placeholder logo. Use this as the starting point for your portfolio.

Quick start (macOS / zsh):

1. Install dependencies

```bash
cd retro-console-nuxt
npm install
```

2. Run dev server

```bash
npm run dev
```

Files created:
- `pages/index.vue` — Condition page (home)
- `pages/skills.vue`, `pages/quests.vue`, `pages/profile.vue`
- `components/ConditionPanel.vue`, `components/CRTLayout.vue`
- `assets/logo-placeholder.svg`, `assets/styles.css`

Next steps:
- Replace `assets/logo-placeholder.svg` with your logo when ready.
- Tweak colors/typography to match New Vegas-inspired theme if desired.
- If you want, I can now port the existing Preact components into this Nuxt application (map code, recreate behavior, move assets) — say the word.
