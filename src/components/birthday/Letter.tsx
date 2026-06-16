import { LilySprig } from "./LilyIllustration";
import { useReveal } from "./useReveal";

export function Letter() {
  const ref = useReveal();
  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="font-hand text-3xl text-[color:var(--sage)]">a note, just for you</p>
        <h2 className="font-display text-4xl md:text-6xl mt-2">A note for you 💌</h2>
      </div>

      <div
        className="reveal-on-scroll parchment max-w-2xl mx-auto p-6 sm:p-10 md:p-14"
        style={{ transform: "rotate(-1.2deg)" }}
      >
        <p className="font-hand text-2xl sm:text-3xl md:text-4xl text-[color:var(--deep-text)] mb-6">
          Dear Simi,
        </p>
        <div className="font-hand text-xl sm:text-2xl md:text-3xl text-[color:var(--deep-text)]/90 leading-[1.5] space-y-5">
          <p>
            Where do I even begin. You walked into my life like a lily quietly
            opening — soft, certain, impossible to look away from.
          </p>
          <p>
            I love how you paint with your whole heart. How a song can stop you
            mid-sentence. How you turn ordinary afternoons into something I want
            to remember forever.
          </p>
          <p>
            Today I just want to say thank you — for being you, for letting me
            be near you, for every silly, soft, brilliant little moment.
          </p>
          <p>
            Happy birthday, my favourite person. The world is luckier with you in
            it. I hope today feels like one long warm hug.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-10">
          <p className="font-hand text-3xl md:text-4xl text-[color:var(--lily-pink)]">
            always yours,
          </p>
          <LilySprig size={42} />
        </div>
      </div>
    </section>
  );
}