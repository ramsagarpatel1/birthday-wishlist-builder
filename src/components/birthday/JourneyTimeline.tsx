import { LilySprig } from "./LilyIllustration";
import { useReveal } from "./useReveal";

const MILESTONES = [
  { date: "Spring 2022", title: "The day we met", note: "I had no idea what was about to happen." },
  { date: "A few weeks later", title: "First time we really talked", note: "Three hours felt like ten minutes." },
  { date: "That summer", title: "The trip we took", note: "You sang the whole drive. I was a goner." },
  { date: "One quiet evening", title: "The moment I knew you were special", note: "Nothing dramatic. Just you, being you." },
  { date: "Today", title: "Your birthday 🎂", note: "Best day of my year." },
];

export function JourneyTimeline() {
  const ref = useReveal();

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="font-hand text-3xl text-[color:var(--sage)]">our story so far</p>
        <h2 className="font-display text-4xl md:text-6xl mt-2">Us, over time 🌿</h2>
      </div>

      <div className="relative max-w-3xl mx-auto pl-4 sm:pl-6 md:pl-12">
        {/* Vine line */}
        <svg
          className="absolute left-0 top-0 h-full w-12 md:w-16"
          viewBox="0 0 60 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M30 0 Q 10 120 30 240 Q 50 360 30 480 Q 10 600 30 720 L 30 800"
            stroke="var(--sage)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <ul className="space-y-10 sm:space-y-12">
          {MILESTONES.map((m, i) => (
            <li key={i} className="reveal-on-scroll relative flex gap-3 sm:gap-5 md:gap-8 items-start">
              <div
                className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center -ml-4 sm:-ml-6 md:-ml-12"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--lily-pink) 35%, var(--accent-white)), var(--accent-white))",
                  boxShadow:
                    "0 14px 30px -14px color-mix(in oklab, var(--deep-text) 35%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--lily-pink) 30%, transparent)",
                }}
              >
                <LilySprig size={i === MILESTONES.length - 1 ? 38 : 28} className="sm:hidden" />
                <LilySprig size={i === MILESTONES.length - 1 ? 50 : 38} className="hidden sm:block" />
              </div>

              <div className="paint-card p-4 sm:p-5 md:p-6 flex-1 min-w-0">
                <p className="font-hand text-lg sm:text-xl text-[color:var(--sage)]">{m.date}</p>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mt-1">{m.title}</h3>
                <p className="font-body text-sm sm:text-base md:text-lg text-[color:var(--deep-text)]/75 mt-2">
                  {m.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}