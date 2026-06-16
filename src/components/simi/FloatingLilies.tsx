import { motion } from "framer-motion";
import { Lily } from "./Lily";

const LILIES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: `${(i * 11 + 7) % 95}%`,
  delay: i * 0.7,
  duration: 9 + (i % 4) * 2,
  size: 28 + (i % 4) * 14,
  drift: i % 2 === 0 ? 30 : -30,
}));

export function FloatingLilies({ onLilyTap }: { onLilyTap?: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {LILIES.map((l) => (
        <motion.div
          key={l.id}
          className="absolute pointer-events-auto"
          style={{ left: l.left, top: "-10%" }}
          initial={{ y: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, l.drift, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Lily size={l.size} className="cursor-pointer drop-shadow" onClick={onLilyTap} />
        </motion.div>
      ))}
    </div>
  );
}
