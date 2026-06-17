import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { SectionShell } from "./SectionShell";
import { FloatingLilies } from "./FloatingLilies";
import { SIMI } from "@/content/simi";

/**
 * One Last Thing… — a sealed envelope that opens into a heartfelt letter.
 */
export function FinalSurprise() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#9CC0DE", "#F4B6C2", "#ffffff"],
      });
    }, 700);
  };

  return (
    <SectionShell eyebrow={SIMI.final.teaser} title="One Last Thing…">
      <div className="relative">
        <div className="absolute inset-0 -z-0 opacity-60">
          <FloatingLilies />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Envelope */}
          <motion.button
            onClick={open}
            whileHover={!opened ? { scale: 1.03, y: -2 } : {}}
            whileTap={!opened ? { scale: 0.98 } : {}}
            aria-label="Open the sealed envelope"
            className="relative h-44 w-72 sm:h-52 sm:w-96 [perspective:1200px] focus:outline-none"
          >
            {/* envelope body */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#FDFBF5] to-[#F4B6C2]/40 shadow-2xl border border-[var(--blush)]/40 overflow-hidden">
              {/* back paper hint */}
              <div className="absolute inset-2 rounded-sm bg-white/70" />
              {/* wax seal */}
              <AnimatePresence>
                {!opened && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 14 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 rounded-full grid place-items-center text-white font-display text-xl shadow-lg"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #ffd6e0, #d96b86 60%, #9c3f5a)",
                      boxShadow: "0 6px 16px rgba(156, 63, 90, 0.45), inset 0 2px 6px rgba(255,255,255,0.4)",
                    }}
                  >
                    S
                  </motion.div>
                )}
              </AnimatePresence>

              {/* envelope flap */}
              <motion.div
                animate={{ rotateX: opened ? -180 : 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                className="absolute inset-x-0 top-0 h-1/2"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(135deg, #9CC0DE, #62A0D8)",
                    boxShadow: "inset 0 -8px 18px rgba(0,0,0,0.12)",
                  }}
                />
              </motion.div>
            </div>

            {!opened && (
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-hand text-lg text-[var(--sky-deep)] whitespace-nowrap"
              >
                tap to open ✨
              </motion.span>
            )}
          </motion.button>

          {/* Letter */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.6 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top" }}
                className="mt-10 parchment p-7 sm:p-12 max-w-2xl w-full text-center"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="font-display text-xl sm:text-2xl italic text-[var(--ink)] leading-relaxed"
                >
                  “{SIMI.final.message}”
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 font-hand text-2xl sm:text-3xl text-romance"
                >
                  {SIMI.final.thanks}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9 }}
                  className="mt-4 font-hand text-xl text-[var(--blush)]"
                >
                  happy birthday, simi 🌸
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
