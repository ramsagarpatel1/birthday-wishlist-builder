import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

export function BirthdayLetter() {
  const [open, setOpen] = useState(false);
  return (
    <SectionShell eyebrow="for you" title="A Letter">
      <div className="flex flex-col items-center">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative h-40 w-64 sm:h-48 sm:w-80"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--sky-glow)] to-white shadow-xl border border-[var(--sky)]/40 overflow-hidden">
            <motion.div
              animate={{ rotateX: open ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-[var(--sky-deep)] to-[var(--blush)]"
            />
            <div
              className="absolute inset-x-0 top-0 h-1/2"
              style={{
                clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            {!open && (
              <span className="absolute inset-0 grid place-items-center text-white font-display text-lg z-10">
                tap to open
              </span>
            )}
          </div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 parchment p-8 sm:p-12 max-w-2xl w-full"
            >
              <pre className="whitespace-pre-wrap font-hand text-xl sm:text-2xl text-[var(--ink)] leading-relaxed">
                {SIMI.letter}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
