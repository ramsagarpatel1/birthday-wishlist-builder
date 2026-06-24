import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Cat = keyof typeof SIMI.photos;

const CATEGORIES: { key: Cat; label: string; emoji: string }[] = [
  { key: "her", label: "Her Photos", emoji: "💙" },
  { key: "paintings", label: "Her Paintings", emoji: "🎨" },
  { key: "flowers", label: "Flowers We Shared", emoji: "🌸" },
  { key: "favorites", label: "Favorite Memories", emoji: "✨" },
];

export function PhotoMemories() {
  const [active, setActive] = useState<Cat | null>(null);
  const [idx, setIdx] = useState(0);

  const items = active ? SIMI.photos[active] : [];
  const item = items[idx];

  const open = (k: Cat) => {
    setActive(k);
    setIdx(0);
  };
  const close = () => setActive(null);
  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);
  const next = () => setIdx((p) => (p + 1) % items.length);

  return (
    <SectionShell eyebrow="memories" title="Photo Vault">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto">
        {CATEGORIES.map((c, i) => (
          <motion.button
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => open(c.key)}
            className="glass-card p-5 sm:p-7 text-center"
          >
            <div className="text-3xl sm:text-4xl mb-2">{c.emoji}</div>
            <div className="font-display text-sm sm:text-lg text-[var(--sky-deep)]">{c.label}</div>
            <div className="text-[10px] sm:text-xs text-[var(--ink)]/55 mt-1">{SIMI.photos[c.key].length} memories</div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-lg p-0 overflow-hidden glass-strong border-0">
          {item && (
            <div className="p-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--sky-glow)] to-[var(--blush)]/40 flex items-center justify-center">
                {item.src ? (
                  <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-hand text-[var(--sky-deep)] text-2xl">photo placeholder</span>
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <p className="mt-4 font-display text-lg text-[var(--sky-deep)]">{item.caption}</p>
                  <p className="mt-1 font-hand text-lg text-[var(--blush)]">— {item.comment}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={prev} className="rounded-full px-4 py-2 bg-white/70 text-sm hover:bg-white">← Prev</button>
                <span className="text-xs text-[var(--ink)]/55">{idx + 1} / {items.length}</span>
                <button onClick={next} className="rounded-full px-4 py-2 bg-[var(--sky-deep)] text-white text-sm">Next →</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
