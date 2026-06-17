import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FloatingLilies } from "./FloatingLilies";
import { SIMI } from "@/content/simi";
import { BirthdayCake } from "./BirthdayCake";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, done: diff === 0 };
}

export function HeroSection({ onEnter, onLilyTap }: { onEnter: () => void; onLilyTap?: () => void }) {
  const target = new Date(SIMI.birthday);
  const { d, h, m, s, done } = useCountdown(target);
  const cells = [
    { v: d, l: "days" },
    { v: h, l: "hrs" },
    { v: m, l: "min" },
    { v: s, l: "sec" },
  ];
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <FloatingLilies onLilyTap={onLilyTap} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--sky-glow)]/60 via-transparent to-[var(--cream)] pointer-events-none" />
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-hand text-2xl sm:text-3xl text-[var(--sky-deep)] mb-3"
        >
          for the one and only
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl leading-tight text-romance"
        >
          {SIMI.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-5 text-base sm:text-lg text-[var(--ink)]/75 font-body max-w-xl mx-auto"
        >
          {SIMI.hero.subtitle}
        </motion.p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <BirthdayCake />
          </motion.div>
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 grid grid-cols-4 gap-2 sm:gap-3"
        >
          {cells.map((c) => (
            <div key={c.l} className="glass-card p-3 sm:p-4">
              <div className="font-display text-2xl sm:text-4xl text-[var(--sky-deep)]">
                {String(c.v).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--ink)]/60">
                {c.l}
              </div>
            </div>
          ))}
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 sm:px-9 sm:py-4 bg-gradient-to-r from-[var(--sky-deep)] to-[var(--blush)] text-white font-fredoka text-base sm:text-lg shadow-xl shadow-[var(--sky-deep)]/30"
        >
          {done ? "Continue the journey →" : "Enter Journey →"}
        </motion.button>
      </div>
    </section>
  );
}
