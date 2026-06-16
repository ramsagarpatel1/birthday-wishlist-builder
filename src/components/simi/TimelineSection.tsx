import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

export function TimelineSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionShell eyebrow="our story" title="Timeline">
      <div className="relative pl-6 sm:pl-10 max-w-2xl mx-auto">
        <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--sky-deep)] via-[var(--sky)] to-[var(--blush)]" />
        <ul className="space-y-4">
          {SIMI.timeline.map((t, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[18px] sm:-left-[26px] top-4 h-4 w-4 rounded-full bg-white border-2 border-[var(--sky-deep)] shadow" />
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left glass-card p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-display text-lg text-[var(--sky-deep)]">{t.date}</div>
                    <span className="text-[var(--sky-deep)]">{isOpen ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm sm:text-base text-[var(--ink)]/85">{t.memory}</p>
                        <p className="mt-2 font-hand text-lg text-[var(--blush)]">— {t.comment}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
