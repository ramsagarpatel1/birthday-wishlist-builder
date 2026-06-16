import { useState } from "react";
import { bigCelebration } from "./Confetti";
import { useReveal } from "./useReveal";

function Candle({ lit, onBlow, idx }: { lit: boolean; onBlow: () => void; idx: number }) {
  const colors = ["var(--lily-pink)", "var(--soft-gold)", "var(--dusty-rose)", "var(--sage)", "var(--lily-pink)"];
  return (
    <button
      onClick={onBlow}
      aria-label={lit ? "Blow out candle" : "Candle is out"}
      className="relative flex flex-col items-center group focus:outline-none"
    >
      {/* Flame / smoke */}
      <div className="relative h-20 w-10 mb-1">
        {lit ? (
          <div
            className="flame absolute left-1/2 bottom-0"
            style={{
              width: 18,
              height: 30,
              background:
                "radial-gradient(ellipse at 50% 70%, #FFD27F 0%, #F4A7B9 55%, transparent 75%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              filter: "drop-shadow(0 0 12px rgba(244,167,185,0.7))",
            }}
          />
        ) : (
          <span className="absolute left-1/2 -translate-x-1/2 bottom-4 text-xl opacity-70 animate-[fade-out_1.4s_ease-out_forwards]">
            💨
          </span>
        )}
      </div>
      {/* Candle */}
      <div
        className="w-7 h-32 rounded-md transition-transform group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(180deg, ${colors[idx % colors.length]} 0%, color-mix(in oklab, ${colors[idx % colors.length]} 60%, #fff) 100%)`,
          boxShadow: "inset -3px 0 0 rgba(0,0,0,0.08), 0 8px 16px -8px rgba(0,0,0,0.2)",
        }}
      />
      {/* Holder */}
      <div
        className="w-10 h-2 rounded-sm"
        style={{ background: "color-mix(in oklab, var(--deep-text) 40%, var(--accent-white))" }}
      />
    </button>
  );
}

export function CandleSection() {
  const ref = useReveal();
  const [lit, setLit] = useState([true, true, true, true, true]);
  const allOut = lit.every((l) => !l);

  function blow(i: number) {
    setLit((prev) => {
      if (!prev[i]) return prev;
      const next = [...prev];
      next[i] = false;
      if (next.every((x) => !x)) {
        setTimeout(() => bigCelebration(), 350);
      }
      return next;
    });
  }

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="font-hand text-2xl sm:text-3xl text-[color:var(--sage)]">close your eyes</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-2">Make a wish, Simi</h2>
        <p className="font-fredoka text-sm sm:text-base md:text-lg text-[color:var(--deep-text)]/70 mt-3">
          tap each candle to blow it out
        </p>
      </div>

      <div className="reveal-on-scroll paint-card paint-card-gold max-w-2xl mx-auto p-5 sm:p-8 md:p-10 flex justify-center items-end gap-3 sm:gap-5 md:gap-8">
        {lit.map((l, i) => (
          <Candle key={i} idx={i} lit={l} onBlow={() => blow(i)} />
        ))}
      </div>

      {allOut && (
        <p className="text-center font-display italic text-3xl md:text-4xl text-[color:var(--lily-pink)] mt-10 animate-[fade-in_0.6s_ease-out]">
          Your wish is on its way ✨
        </p>
      )}
    </section>
  );
}