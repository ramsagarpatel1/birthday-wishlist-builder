import { useReveal } from "./useReveal";

const SONGS = [
  { title: "Lover", artist: "Taylor Swift", note: "This was playing when we drove home that night.", href: "#" },
  { title: "Vienna", artist: "Billy Joel", note: "I think of you every time the piano starts.", href: "#" },
  { title: "Sunflower", artist: "Rex Orange County", note: "Your whole personality in 3 minutes.", href: "#" },
  { title: "From the Start", artist: "Laufey", note: "This one's just… ours.", href: "#" },
  { title: "Cherry Wine", artist: "Hozier", note: "The one you hum without realising.", href: "#" },
  { title: "About You", artist: "The 1975", note: "Saved for slow evenings with you.", href: "#" },
];

function Vinyl() {
  return (
    <svg viewBox="0 0 80 80" className="w-14 h-14" aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="var(--deep-text)" />
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--accent-white)" strokeOpacity="0.15" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="var(--accent-white)" strokeOpacity="0.15" />
      <circle cx="40" cy="40" r="14" fill="var(--lily-pink)" />
      <circle cx="40" cy="40" r="3" fill="var(--accent-white)" />
    </svg>
  );
}

export function MusicSection() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="relative py-24 px-4"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--dusty-rose) 30%, var(--background)), color-mix(in oklab, var(--sage) 20%, var(--background)))",
      }}
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="font-hand text-2xl sm:text-3xl text-[color:var(--sage)]">our soundtrack</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-2">Songs that remind me of you 🎵</h2>
      </div>

      <div className="max-w-6xl mx-auto overflow-x-auto -mx-4 px-4 pb-4">
        <div className="flex gap-6 snap-x snap-mandatory">
          {SONGS.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="reveal-on-scroll paint-card paint-card-rose snap-start shrink-0 w-[280px] md:w-[320px] p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <Vinyl />
                <div>
                  <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="font-fredoka text-sm text-[color:var(--deep-text)]/70">
                    {s.artist}
                  </p>
                </div>
              </div>
              <p className="font-hand text-xl text-[color:var(--deep-text)] mt-5 leading-snug">
                "{s.note}"
              </p>
              <p className="mt-4 font-fredoka text-xs uppercase tracking-widest text-[color:var(--lily-pink)]">
                listen →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}