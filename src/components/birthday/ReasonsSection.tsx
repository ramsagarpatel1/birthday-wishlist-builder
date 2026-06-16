import { LilySprig, VineDivider } from "./LilyIllustration";
import { useReveal } from "./useReveal";

const REASONS = [
  "The way you laugh before finishing your own jokes.",
  "How you talk to your plants like they understand you (they do).",
  "The focus on your face when you're painting — like the world disappears.",
  "Your taste in music. Every single playlist.",
  "How you remember the smallest things people tell you.",
  "The way you make ordinary days feel like a soft Sunday.",
  "Your handwriting on grocery lists, of all things.",
  "How fiercely you love the people you love.",
  "Your weird, brilliant 2 a.m. ideas.",
  "The way you light up around lilies.",
  "How you can rewatch a movie a hundred times and still cry at the same part.",
  "Your laugh. Especially the loud one.",
  "The way you take your coffee — and how serious you are about it.",
  "How you make me want to be a kinder, softer person.",
  "Just… you. Exactly as you are.",
];

const TONES = ["", "paint-card-rose", "paint-card-sage", "paint-card-gold"] as const;

export function ReasonsSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="font-hand text-2xl sm:text-3xl text-[color:var(--sage)]">a little list</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-2">Things I love about you</h2>
      </div>

      <ol className="max-w-3xl mx-auto space-y-6">
        {REASONS.map((r, i) => (
          <li
            key={i}
            className={`reveal-on-scroll paint-card ${TONES[i % TONES.length]} p-4 sm:p-5 md:p-6 flex items-start gap-3 sm:gap-4 ${
              i % 2 === 0 ? "md:ml-0 md:mr-16" : "md:ml-16 md:mr-0"
            }`}
            style={{ animationDelay: `${(i % 5) * 60}ms` }}
          >
            <span className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[color:var(--lily-pink)] leading-none shrink-0 w-8 sm:w-10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-body text-base sm:text-lg md:text-xl text-[color:var(--deep-text)]/85 pt-1 min-w-0">
              {r}
            </p>
            <LilySprig size={28} className="shrink-0 ml-auto opacity-80 hidden sm:block" />
          </li>
        ))}
      </ol>

      <VineDivider className="mt-16" />
    </section>
  );
}