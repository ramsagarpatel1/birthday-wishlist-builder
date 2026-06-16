import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LilyIllustration } from "./LilyIllustration";
import { useReveal } from "./useReveal";

/**
 * Each "photo" is a painted gradient placeholder until real photos are dropped in.
 * Swap the `src` field with imports from src/assets/ to use real images.
 */
const MEMORIES = [
  { caption: "the day at the lake", h: 360, src: null, hue: 0 },
  { caption: "your studio mess (i love it)", h: 280, src: null, hue: 1 },
  { caption: "that ridiculous café", h: 420, src: null, hue: 2 },
  { caption: "golden hour, you laughing", h: 320, src: null, hue: 3 },
  { caption: "kitchen dance party", h: 260, src: null, hue: 0 },
  { caption: "first lily i ever bought you", h: 380, src: null, hue: 1 },
  { caption: "sleepy sunday morning", h: 300, src: null, hue: 2 },
  { caption: "after the rain", h: 340, src: null, hue: 3 },
];

const PALETTES = [
  "linear-gradient(135deg, #F4A7B9 0%, #FDF8F2 60%, #F2C45A 100%)",
  "linear-gradient(135deg, #87A878 0%, #FDF8F2 60%, #F4A7B9 100%)",
  "linear-gradient(135deg, #E8A0A0 0%, #FDF8F2 60%, #87A878 100%)",
  "linear-gradient(135deg, #F2C45A 0%, #FDF8F2 60%, #E8A0A0 100%)",
];

export function MemoryGallery() {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 px-4">
      <LilyIllustration size={130} rotate={-20} className="absolute top-8 left-2 md:left-10 opacity-50" />
      <LilyIllustration size={120} rotate={25} className="absolute bottom-10 right-2 md:right-10 opacity-50" />

      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="font-hand text-2xl sm:text-3xl text-[color:var(--sage)]">a little album</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-2">Moments with you 📸</h2>
      </div>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6">
        {MEMORIES.map((m, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="reveal-on-scroll watercolor-frame mb-6 block w-full text-left break-inside-avoid"
            style={{ ["--tilt" as any]: `${i % 2 === 0 ? -1.2 : 1.2}deg` } as any}
          >
            <div
              style={{ height: m.h, background: PALETTES[m.hue] }}
              className="w-full"
            />
            <p className="font-hand text-xl text-[color:var(--deep-text)] mt-2 px-1">
              {m.caption}
            </p>
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl bg-[color:var(--accent-white)]">
          <DialogTitle className="font-hand text-3xl text-[color:var(--deep-text)]">
            {open !== null ? MEMORIES[open].caption : ""}
          </DialogTitle>
          <DialogDescription className="sr-only">Memory preview</DialogDescription>
          {open !== null && (
            <div
              className="w-full h-[60vh] rounded-2xl"
              style={{ background: PALETTES[MEMORIES[open].hue] }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}