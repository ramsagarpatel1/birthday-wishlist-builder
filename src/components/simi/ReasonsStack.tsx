import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
import { Heart } from "lucide-react";

export function ReasonsStack() {
  const [i, setI] = useState(0);
  const [burst, setBurst] = useState(0);
  const next = () => {
    setBurst((b) => b + 1);
    setI((p) => (p + 1) % SIMI.reasons.length);
  };
  return (
    <SectionShell eyebrow="10 reasons" title="Why I like you">
      <div className="relative mx-auto max-w-xl">
        <div className="relative h-56 sm:h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -30, rotate: 3 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 glass-strong p-7 sm:p-10 flex flex-col items-center justify-center text-center"
            >
              <div className="font-hand text-lg text-[var(--sky-deep)] mb-2">
                Reason {i + 1} of {SIMI.reasons.length}
              </div>
              <p className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                {SIMI.reasons[i]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* heart burst */}
          <AnimatePresence>
            {[...Array(6)].map((_, k) => (
              <motion.div
                key={`${burst}-${k}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.6], x: (k - 2.5) * 40, y: -80 - k * 10 }}
                transition={{ duration: 1 }}
                className="absolute left-1/2 top-1/2 pointer-events-none"
              >
                <Heart className="fill-[var(--blush)] text-[var(--blush)]" size={20} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={next}
            className="rounded-full px-6 py-2.5 bg-[var(--sky-deep)] text-white font-fredoka text-sm shadow-lg shadow-[var(--sky-deep)]/30 hover:bg-[var(--ink)] transition-colors"
          >
            Next Reason ❤
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {SIMI.reasons.map((_, k) => (
            <span
              key={k}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-[var(--sky-deep)]" : "w-1.5 bg-[var(--sky)]/60"}`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
