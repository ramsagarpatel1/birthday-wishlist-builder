import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function GiftShelf() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <SectionShell eyebrow="if I could" title="Things I'd Gift You">
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {SIMI.gifts.map((g, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -6, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPick(i)}
              className="glass-card p-4 text-center"
            >
              <div className="text-4xl mb-2">{g.emoji}</div>
              <div className="text-xs sm:text-sm font-display text-[var(--sky-deep)]">{g.name}</div>
            </motion.button>
          ))}
        </div>
        <div className="mt-3 h-2 bg-gradient-to-r from-[var(--sky-deep)]/30 via-[var(--blush)]/30 to-[var(--sky-deep)]/30 rounded-full" />
      </div>

      <Dialog open={pick !== null} onOpenChange={(o) => !o && setPick(null)}>
        <DialogContent className="glass-strong border-0 max-w-md">
          {pick !== null && (
            <div className="text-center p-4">
              <div className="text-6xl mb-3">{SIMI.gifts[pick].emoji}</div>
              <h3 className="font-display text-2xl text-[var(--sky-deep)]">{SIMI.gifts[pick].name}</h3>
              <p className="mt-3 font-hand text-xl text-[var(--blush)]">{SIMI.gifts[pick].note}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}
