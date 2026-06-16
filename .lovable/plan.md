## Overview

Rebuild the birthday site as a 15-section interactive journey with a sky-blue/cream/pink palette, glassmorphism, Framer Motion animations, and JSON-driven content. Mobile-first, no "everything at once" — each section reveals memories one at a time.

Note on stack: project is TanStack Start (not Next.js) per template constraints — we'll keep TanStack Start, which already gives us React + TS + Tailwind + SEO. All other requirements (Framer Motion, responsive, fast, dark/light) are honored.

## Design system (src/styles.css)

Replace botanical lily palette with sky-blue romantic palette:
- `--sky` primary (soft sky blue), `--sky-deep`, `--sky-glow`
- `--cream` (soft cream background), `--blush` (light pink accent), `--ink` (text)
- Glass tokens: `--glass-bg`, `--glass-border`, `--glass-shadow`
- Gradients: `--gradient-sky`, `--gradient-romance`
- Dark mode variant via `.dark` class with deeper sky/navy surfaces
- Utility classes: `.glass-card`, `.glass-strong`, `.text-romance`

Keep fonts: Playfair Display (headings), Quicksand (body), Caveat (handwritten).

## Content layer (src/content/simi.ts)

Single typed JSON-shaped module exporting all editable content:
```ts
export const content = {
  birthday: "2026-06-26",
  hero: { title, subtitle },
  simi: [{ emoji, title, text }, ...5],
  reasons: string[10],
  realization: { story },
  timeline: [{ date, memory, comment }, ...5],
  photos: { her: [], paintings: [], flowers: [], favorites: [] }, // {src, caption, comment}
  vault: [{ message, date, comment }, ...],
  music: { playlist: [{title, artist, spotify, note}], remindMe: [...] },
  voice: { audioSrc, lyrics, note },
  giftBox: { flowers, art, music, messages, photos }, // each array of items
  gifts: [{ emoji, name, note }, ...5],
  affirmations: string[],
  letter: string,
  finalMessage: string,
}
```
Comments explain every field for easy editing.

## Components (src/components/simi/)

1. `HeroSection.tsx` — title, subtitle, floating animated lily SVGs, live countdown, "Enter Journey" button (smooth-scrolls to next section).
2. `SimiSection.tsx` — 5 glassmorphism cards with motion stagger reveal.
3. `ReasonsStack.tsx` — single card visible, "Next Reason" with heart-burst Framer Motion animation between cards.
4. `RealizationSection.tsx` — single emotional card, animated twinkling stars background.
5. `TimelineSection.tsx` — vertical timeline; each item expands on click to show memory + comment.
6. `PhotoMemories.tsx` — 4 category tiles → opens a one-at-a-time viewer with prev/next, caption, comment. Uses shadcn Dialog.
7. `MessageVault.tsx` — vault interface; one message at a time, typewriter effect, prev/next, "Save to Heart" persists to localStorage; saved list shown in collapsible panel.
8. `MusicRoom.tsx` — playlist cards with cover, Spotify embed link, personal note + "Songs That Remind Me Of You" sub-grid.
9. `HerVoice.tsx` — custom audio player (play/pause, progress, time), lyrics block, personal note.
10. `DigitalMemoryBox.tsx` — animated 3D-ish gift box that opens to reveal 5 category buttons (flowers/art/music/messages/photos), each opens a mini reveal panel.
11. `GiftShelf.tsx` — 5 interactive items; click reveals heartfelt note in popover/dialog.
12. `Affirmations.tsx` — one affirmation visible, "Show Another" cycles with fade.
13. `EasterEggs.tsx` — registers: click-lily-5x (counts on hero lilies), keyboard shortcut (e.g., S-I-M-I), hidden floating heart in corner. Each reveals a Dialog with a hidden message.
14. `BirthdayLetter.tsx` — envelope SVG with open animation, reveals scrollable letter parchment.
15. `FinalSurprise.tsx` — two-step reveal ("Thank you..." then "One last thing..." → final card), confetti + floating lilies.

Shared:
- `FloatingLilies.tsx` — reusable animated SVG lilies layer.
- `SectionShell.tsx` — consistent section padding, heading style, scroll-reveal wrapper.
- `useReveal.ts` — existing hook, reuse.
- `ThemeToggle.tsx` — dark/light toggle in a fixed corner; persists to localStorage.
- `useSavedHearts.ts` — localStorage hook for vault saves.

## Page assembly (src/routes/index.tsx)

Drop existing birthday components. Compose new sections in order 1→15 with smooth scroll between. Keep `GiftBoxGate` as the entry unwrap (repurposed to sky-blue theme) — optional, can remove if user prefers direct entry. We'll keep it as a soft intro.

## Root (src/routes/__root.tsx)

- Update title: "Happy Birthday, Simi 🌸"
- Meta description + OG tags matching new tone
- Keep existing font links

## Dependencies

- Add `framer-motion`
- Keep `canvas-confetti`

## Out of scope (clearly noted to user)

- Next.js migration (template is TanStack Start; equivalent features delivered)
- Real photos/audio — placeholders provided, user swaps file paths in `content/simi.ts`
- Backend admin UI — content is JSON-in-code (one file, no code-touching for text); a true CMS would require Lovable Cloud which user hasn't requested

## Files changed

- src/styles.css (palette + glass utilities + dark mode)
- src/content/simi.ts (new, all editable content)
- src/components/simi/* (15+ new components)
- src/routes/index.tsx (rewritten composition)
- src/routes/__root.tsx (meta)
- package.json (add framer-motion)
- Remove or leave-orphan old `src/components/birthday/*` files (we'll delete to keep clean)
