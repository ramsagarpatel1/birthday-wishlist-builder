import { useEffect, useState } from "react";
import heroBg from "@/assets/lily-hero-bg.jpg";
import { LilyIllustration } from "./LilyIllustration";
import { bigCelebration } from "./Confetti";

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function HeroCountdown({ birthday }: { birthday: Date }) {
  const [t, setT] = useState(() => diff(birthday));
  const arrived = t === null;

  useEffect(() => {
    const id = setInterval(() => setT(diff(birthday)), 1000);
    return () => clearInterval(id);
  }, [birthday]);

  useEffect(() => {
    if (arrived) bigCelebration();
  }, [arrived]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-[color:var(--background)]/40" />

      <LilyIllustration size={180} className="absolute top-10 left-4 md:left-12 opacity-70 animate-float" style={{ ["--r" as any]: "-8deg" } as any} />
      <LilyIllustration size={140} rotate={25} className="absolute top-32 right-6 md:right-20 opacity-60 animate-float" style={{ animationDelay: "1s", ["--r" as any]: "25deg" } as any} />
      <LilyIllustration size={120} rotate={-15} className="absolute bottom-10 left-1/4 opacity-50 animate-float" style={{ animationDelay: "2.2s", ["--r" as any]: "-15deg" } as any} />

      <div className="relative z-10 text-center max-w-4xl">
        <p className="font-hand text-2xl sm:text-3xl md:text-4xl text-[color:var(--sage)] mb-4">to my favourite person —</p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-8xl leading-[1.05] text-shadow-soft">
          Happy Birthday,
          <br />
          <span className="italic text-[color:var(--lily-pink)]">Simi</span> 🎂
        </h2>
        <p className="font-fredoka text-lg sm:text-xl md:text-2xl mt-6 text-[color:var(--deep-text)]/80">
          Today is entirely yours.
        </p>

        <div className="mt-12">
          {arrived ? (
            <p className="font-display text-3xl md:text-5xl text-[color:var(--lily-pink)] animate-pulse">
              🎉 It's your day, Simi!
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { v: t!.days, l: "days" },
                { v: t!.hours, l: "hours" },
                { v: t!.minutes, l: "minutes" },
                { v: t!.seconds, l: "seconds" },
              ].map((u, i) => (
                <div
                  key={u.l}
                  className={`paint-card p-2 sm:p-4 md:p-6 ${
                    [
                      "",
                      "paint-card-rose",
                      "paint-card-sage",
                      "paint-card-gold",
                    ][i]
                  }`}
                >
                  <div className="font-display text-2xl sm:text-3xl md:text-5xl text-[color:var(--deep-text)] tabular-nums">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="font-fredoka text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-[color:var(--deep-text)]/60 mt-1">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}