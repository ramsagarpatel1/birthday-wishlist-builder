import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

export function Affirmations() {
  const [i, setI] = useState(0);
  return (
    <SectionShell eyebrow="a soft truth" title="For You, Today">
      <div className="max-w-xl mx-auto text-center">
        <div className="relative min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="font-display text-xl sm:text-2xl italic text-[var(--ink)]/90 px-4"
            >
              “{SIMI.affirmations[i]}”
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setI((p) => (p + 1) % SIMI.affirmations.length)}
          className="mt-4 rounded-full px-5 py-2.5 bg-[var(--sky-deep)] text-white text-sm font-fredoka"
        >
          Show Another ✨
        </button>
      </div>
    </SectionShell>
  );
}
