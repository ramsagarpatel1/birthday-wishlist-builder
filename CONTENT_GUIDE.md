# Simi's Birthday — Content Guide

Everything you'll likely want to change lives in **one file**:

> `src/content/simi.ts`

No code knowledge needed — just edit the strings, save, and the site updates live.

---

## 1. Quick edits (text, dates, reasons, timeline, songs)

Open `src/content/simi.ts` and update the values you care about.

| What you want to change          | Field in `simi.ts`              |
| -------------------------------- | ------------------------------- |
| Birthday date / countdown target | `birthday` (format: `YYYY-MM-DDTHH:mm:ss`) |
| Hero title & subtitle            | `hero.title`, `hero.subtitle`   |
| "Who She Is" cards               | `simi[]`                        |
| 10 reasons                       | `reasons[]`                     |
| "The Day I Realized" story       | `realization`                   |
| Timeline of memories             | `timeline[]`                    |
| Songs / playlist                 | `songs[]`                       |
| Birthday letter                  | `letter`                        |
| Sign-off / signature             | `letter.from`                   |

After saving, the preview auto-reloads.

---

## 2. Images & photos

**Where:** `src/assets/`

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.svg`

**Recommended sizes:**

| Use case          | Size (px)        | Format        | Notes                              |
| ----------------- | ---------------- | ------------- | ---------------------------------- |
| Hero / background | 1920 × 1080      | `.jpg` / `.webp` | Keep under ~400 KB              |
| Gallery photos    | 1200 × 1200      | `.jpg` / `.webp` | Square crops look best          |
| Painting scans    | 1600 × 1200      | `.jpg`        | High-quality, < 600 KB             |
| Polaroid / cards  | 800 × 800        | `.jpg`        | Smaller is fine                    |
| Lily / decorative | any              | `.png` / `.svg` | Use PNG with transparency        |

**To add a photo:**

1. Drop the file into `src/assets/` (e.g. `simi-1.jpg`).
2. In `src/content/simi.ts`, find the `photos` / `paintings` arrays and add:
   ```ts
   import simi1 from "@/assets/simi-1.jpg";
   // …
   { src: simi1, caption: "Beach day 💙" }
   ```
3. Save. Done.

> Tip: For very large files (raw camera photos), compress first at
> [squoosh.app](https://squoosh.app). Target ≤ 500 KB per image.

---

## 3. Songs & audio

### Streaming links (Spotify / YouTube / Apple Music)

Edit `songs[]` in `src/content/simi.ts`:

```ts
{
  title: "Our Song",
  artist: "Artist Name",
  note: "The one that always makes me think of you.",
  url: "https://open.spotify.com/track/...",
}
```

### Audio files (voice notes, custom recordings)

**Where:** `src/assets/audio/` (create the folder if missing)

**Supported formats:** `.mp3` (preferred), `.m4a`, `.ogg`, `.wav`

**Recommended:** MP3, 128–192 kbps, mono for voice notes. Keep each file under 5 MB.

```ts
import voiceNote from "@/assets/audio/voice-note.mp3";
// then reference voiceNote in HerVoice config
```

---

## 4. Videos

**Where:** `src/assets/video/` (create the folder if missing)

**Supported formats:** `.mp4` (H.264) recommended; `.webm` for smaller size.

**Recommended:**
- Resolution: 720p or 1080p
- Length: under 30 seconds for inline playback
- Size: under 10 MB (compress with [Handbrake](https://handbrake.fr))

For longer videos, upload to YouTube/Vimeo and embed the URL instead.

---

## 5. Fonts & colors (advanced)

- **Fonts** are loaded via `<link>` in `src/routes/__root.tsx`.
- **Colors** live as CSS variables in `src/styles.css` under `:root` (sky, blush, cream, ink).

Change a single variable to re-theme the whole site.

---

## 6. Comments / messages from friends

Edit `messages[]` in `src/content/simi.ts`. Each message has `from`, `text`, and an optional `color`.

---

## 7. Birthday letter

Edit `letter.title`, `letter.body`, and `letter.from` in `src/content/simi.ts`.
The body supports line breaks — use `\n\n` between paragraphs.

---

## Folder map

```
src/
├── assets/           ← images, audio, video go here
│   ├── audio/
│   └── video/
├── content/
│   └── simi.ts       ← ★ edit this file for 95% of changes
├── components/simi/  ← UI components (only touch if changing layout)
├── routes/
│   ├── __root.tsx    ← <head>, fonts, favicon
│   └── index.tsx     ← page composition
└── styles.css        ← colors, fonts, animations
```