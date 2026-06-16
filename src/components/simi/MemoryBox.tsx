import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

type K = keyof typeof SIMI.memoryBox;

const CATS: { k: K; emoji: string; label: string }[] = [
  { k: "flowers", emoji: "🌸", label: "Flowers" },
  { k: "art", emoji: "🎨", label: "Art" },
  { k: "music", emoji: "🎵", label: "Music" },
  { k: "messages", emoji: "💌", label: "Messages" },
  { k: "photos", emoji: "📸", label: "Photos" },
];

export function MemoryBox() {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<K | null>(null);

  return (
    <SectionShell eyebrow="open me" title="Digital Memory Box">
      <div className="flex flex-col items-center">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileTap={{ scale: 0.95 }}
          className="relative h-44 w-44 sm:h-56 sm:w-56"
        >
          <motion.div
            animate={{ rotateX: open ? -110 : 0 }}
            transition={{ duration: 0.7 }}
            style={{ transformOrigin: "bottom" }}
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-br from-[var(--sky-deep)] to-[var(--ink)] shadow-xl"
          >
            <div className="absolute left-1/2 top-2 -translate-x-1/2 h-6 w-1/3 bg-[var(--blush)] rounded" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl bg-gradient-to-br from-[var(--sky)] to-[var(--sky-deep)] shadow-2xl grid place-items-center">
            <span className="text-white font-hand text-xl">{open ? "memories ✨" : "tap to open"}</span>
          </div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 w-full max-w-2xl"
            >
              {CATS.map((c) => (
                <button
                  key={c.k}
                  onClick={() => setPick(c.k)}
                  className={`glass-card p-4 text-center transition ${pick === c.k ? "ring-2 ring-[var(--sky-deep)]" : ""}`}
                >
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="text-xs font-display text-[var(--sky-deep)] mt-1">{c.label}</div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {pick && (
            <motion.div
              key={pick}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 glass-strong p-6 max-w-xl w-full"
            >
              <ul className="space-y-2 font-hand text-lg text-[var(--ink)]/85">
                {SIMI.memoryBox[pick].map((m, i) => (
                  <li key={i}>• {m}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
