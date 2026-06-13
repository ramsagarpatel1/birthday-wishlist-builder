import { bigCelebration } from "./Confetti";
import { LilySprig } from "./LilyIllustration";

export function Footer() {
  return (
    <footer className="relative py-16 px-4 text-center">
      <div className="flex items-center justify-center gap-3">
        <LilySprig size={28} />
        <p className="font-fredoka text-base md:text-lg text-[color:var(--deep-text)]/70">
          Made with 💖 and a little bit of magic, for Simi.
        </p>
        <LilySprig size={28} />
      </div>

      <button
        onClick={() => bigCelebration()}
        className="mt-6 inline-flex items-center gap-2 paint-card paint-card-rose px-6 py-3 font-fredoka text-sm uppercase tracking-widest text-[color:var(--deep-text)] hover:-translate-y-0.5 transition-transform"
      >
        🎉 celebrate again
      </button>
    </footer>
  );
}