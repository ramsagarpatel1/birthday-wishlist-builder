import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { SectionShell } from "./SectionShell";
import { FloatingLilies } from "./FloatingLilies";
import { SIMI } from "@/content/simi";

export function FinalSurprise() {
  const [step, setStep] = useState(0);
  const reveal = () => {
    setStep((s) => Math.min(s + 1, 2));
    if (step === 1) {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#9CC0DE", "#F4B6C2", "#ffffff", "#62A0D8"],
      });
    }
  };
  return (
    <SectionShell eyebrow="the end (of this page)" title="One Last Thing">
      <div className="relative">
        <div className="absolute inset-0 -z-0">
          <FloatingLilies />
        </div>
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-display text-2xl sm:text-3xl text-[var(--ink)]">{SIMI.final.thanks}</p>
                <button onClick={reveal} className="mt-6 rounded-full px-6 py-3 bg-[var(--sky-deep)] text-white font-fredoka">
                  Continue →
                </button>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="font-hand text-3xl sm:text-4xl text-[var(--blush)]">{SIMI.final.teaser}</p>
                <button onClick={reveal} className="mt-6 rounded-full px-6 py-3 bg-gradient-to-r from-[var(--sky-deep)] to-[var(--blush)] text-white font-fredoka">
                  Reveal it 💙
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong p-8 sm:p-12"
              >
                <p className="font-display text-xl sm:text-2xl italic text-[var(--ink)]">
                  “{SIMI.final.message}”
                </p>
                <p className="mt-6 font-hand text-2xl text-romance">happy birthday, simi 🌸</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
