import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

const STARS = Array.from({ length: 24 }).map((_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  delay: (i % 6) * 0.4,
  size: 6 + (i % 5) * 2,
}));

export function RealizationSection() {
  return (
    <SectionShell eyebrow="a moment" title={SIMI.realization.title}>
      <div className="relative">
        <div className="absolute inset-0 -m-8 pointer-events-none">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute twinkle"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: `${s.delay}s`,
              }}
            >
              <svg width={s.size} height={s.size} viewBox="0 0 10 10">
                <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#9CC0DE" />
              </svg>
            </span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative glass-strong p-8 sm:p-12 text-center max-w-2xl mx-auto"
        >
          <p className="font-display text-xl sm:text-2xl md:text-3xl italic leading-relaxed text-[var(--ink)]/90">
            “{SIMI.realization.story}”
          </p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
