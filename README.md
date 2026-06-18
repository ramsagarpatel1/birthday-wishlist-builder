# 💙 Happy Birthday, Simi

A deeply personal, single-page birthday website — sky-blue, lily-themed,
full of glassmorphism, framer-motion transitions, an interactive countdown,
a blow-out-the-candles cake, and a sealed letter at the end.

Built with **TanStack Start + React 19 + Tailwind v4 + Framer Motion**.

---

## ✨ Features

- Live countdown to Simi's birthday
- Interactive birthday cake — blow candles via microphone or button
- Confetti + petal showers when candles go out
- Photo memories, painting gallery, music room
- Reasons stack, message vault, timeline, gift shelf
- 3D sealed envelope letter reveal
- Easter eggs (type `simi`, tap a lily 5×, etc.)
- Fully mobile-first responsive
- Glassmorphism + subtle blue-gradient headings

---

## 🚀 Quick start

```bash
# Install dependencies
bun install        # or: npm install

# Run dev server
bun run dev        # http://localhost:5173

# Production build
bun run build
```

Requires **Node 20+** (or Bun 1.1+).

---

## 🎨 Customizing

Almost everything is data-driven. See **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)**
for the full editing reference.

TL;DR:
- **Text / dates / songs / reasons** → `src/content/simi.ts`
- **Photos** → drop into `src/assets/`, then reference in `simi.ts`
- **Colors / fonts** → `src/styles.css`
- **Page composition** → `src/routes/index.tsx`

---

## 📁 Project structure

```
.
├── src/
│   ├── assets/                 # images, audio, video
│   ├── components/simi/        # all birthday-site components
│   ├── content/simi.ts         # ★ central content config
│   ├── routes/
│   │   ├── __root.tsx          # <head>, fonts, layout shell
│   │   └── index.tsx           # composes all sections
│   ├── styles.css              # design tokens, glassmorphism, animations
│   ├── router.tsx              # router config
│   └── start.ts                # TanStack Start entry
├── CONTENT_GUIDE.md            # how to add photos / songs / text
├── README.md                   # you are here
├── package.json
└── vite.config.ts
```

---

## 🌍 Deployment

**Recommended platform: Lovable's built-in publish (Cloudflare Workers under the hood).**

Why: this project is a TanStack Start app with an edge SSR runtime — Lovable's
publish flow is preconfigured for exactly this stack. Zero config, instant
global CDN, automatic HTTPS (required for the microphone/blow-candles feature).

### Publishing on Lovable

1. Click **Publish** (top-right in the editor).
2. Your site goes live at `your-project.lovable.app`.
3. For a custom domain, go to **Project Settings → Domains**.

### Re-deploying after changes

- **Frontend changes** (text, images, components): click **Update** in the publish dialog.
- **Backend changes** (none in this project): would deploy automatically.

### Alternative platforms

| Platform     | Works? | Notes                                                    |
| ------------ | ------ | -------------------------------------------------------- |
| **Lovable**  | ✅ Best | Preconfigured. Use this.                                 |
| Cloudflare Workers | ✅ | Same runtime; run `bun run build` and deploy `dist/`.    |
| Vercel       | ⚠️     | Works but needs `@tanstack/react-start` Vercel preset. |
| Netlify      | ⚠️     | Works but needs Netlify Edge adapter.                    |
| Static host  | ❌     | This app uses SSR — needs a JS runtime.                  |

### HTTPS requirement

The "blow out the candles" feature uses the **Web Audio API microphone**, which
browsers only permit on `https://` origins (or `localhost`). Any published
`.lovable.app` URL and any custom domain on Lovable already serves HTTPS, so
this works out of the box.

---

## ✅ Pre-deploy checklist

- [ ] Updated `birthday` date in `src/content/simi.ts`
- [ ] Replaced placeholder reasons / timeline / messages
- [ ] Added real photos to `src/assets/` (compressed < 500 KB each)
- [ ] Verified the letter text and sign-off
- [ ] Tested on mobile (DevTools → 375 px width)
- [ ] Tested countdown ending (temporarily set `birthday` to 30 s in the future)
- [ ] Tested "Blow Candles" button + microphone on HTTPS
- [ ] `bun run build` completes with no errors
- [ ] Browser console is clean (no red errors)
- [ ] Page title in `src/routes/__root.tsx` matches what should appear in the browser tab and link previews

---

## 🛠 Troubleshooting

**Microphone doesn't trigger candles**
→ Make sure the site is on HTTPS (or localhost) and you allowed mic permission in the browser.

**Image doesn't show**
→ Confirm the import path matches the filename exactly (case-sensitive) and the file is inside `src/assets/`.

**Fonts look wrong**
→ Web fonts are loaded via `<link>` in `src/routes/__root.tsx`. Don't `@import` font URLs in `styles.css` — Tailwind v4's Lightning CSS won't fetch them.

**Countdown shows wrong time**
→ The `birthday` value in `simi.ts` is interpreted in the visitor's local timezone. Set it to the local time you want it to fire.

**Build fails with "Cannot resolve @/assets/..."**
→ The image file is missing or misnamed. Add the file to `src/assets/` before importing it.

**Site looks unstyled in production**
→ Make sure you ran `bun run build` (not just `bun run dev`) and deployed the resulting build output.

---

Made with 💙 for Simi.