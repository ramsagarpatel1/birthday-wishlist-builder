import { useMemo } from "react";

interface Petal {
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
}

export function PetalShower({ count = 22, durationSec = 8 }: { count?: number; durationSec?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 5 + Math.random() * (durationSec - 3),
        size: 14 + Math.random() * 18,
        hue: i % 3,
      })),
    [count, durationSec],
  );

  const palette = ["var(--lily-pink)", "var(--dusty-rose)", "var(--accent-white)"];

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-10vh",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            background: palette[p.hue],
            borderRadius: "60% 40% 60% 40% / 60% 70% 30% 40%",
            opacity: 0.85,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}