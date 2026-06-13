import { useEffect, useState } from "react";
import { burstConfetti } from "./Confetti";
import { PetalShower } from "./PetalShower";
import { LilyIllustration } from "./LilyIllustration";

export function GiftBoxGate({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const [shower, setShower] = useState(false);

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    burstConfetti({ origin: { x: 0.5, y: 0.45 } });
    setShower(true);
    setTimeout(() => burstConfetti({ origin: { x: 0.3, y: 0.5 } }), 350);
    setTimeout(() => burstConfetti({ origin: { x: 0.7, y: 0.5 } }), 700);
    setTimeout(() => setClosing(true), 2600);
    setTimeout(() => {
      onOpen();
      document.body.style.overflow = "";
    }, 3400);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        closing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(at 30% 30%, color-mix(in oklab, var(--lily-pink) 25%, transparent), transparent 55%), radial-gradient(at 70% 70%, color-mix(in oklab, var(--soft-gold) 22%, transparent), transparent 55%)",
      }}
    >
      {shower && <PetalShower count={28} />}

      <LilyIllustration size={180} className="absolute top-10 left-6 opacity-60 animate-float" style={{ ["--r" as any]: "-12deg" }} />
      <LilyIllustration size={150} rotate={20} className="absolute bottom-12 right-8 opacity-60 animate-float" style={{ animationDelay: "1.5s", ["--r" as any]: "20deg" } as any} />

      <div className="flex flex-col items-center gap-8 px-4 text-center">
        <button
          onClick={handleOpen}
          aria-label="Open your gift"
          className="group relative outline-none"
          style={{ cursor: "pointer" }}
        >
          {/* Gift box */}
          <div className="relative w-[240px] h-[220px] md:w-[300px] md:h-[280px]">
            {/* Box body */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[70%] rounded-[18px] transition-transform duration-500 group-hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(160deg, var(--lily-pink) 0%, var(--dusty-rose) 100%)",
                boxShadow:
                  "0 30px 60px -20px rgba(0,0,0,0.25), inset 0 -8px 0 rgba(0,0,0,0.08)",
              }}
            >
              {/* Vertical ribbon */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[18%]"
                style={{
                  background: "linear-gradient(180deg, var(--soft-gold), color-mix(in oklab, var(--soft-gold) 70%, #fff))",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
                }}
              />
            </div>

            {/* Lid */}
            <div
              className="absolute left-[-4%] right-[-4%] h-[26%] rounded-[16px] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{
                top: opened ? "-60%" : "27%",
                transform: opened ? "rotate(-14deg)" : "rotate(0deg)",
                background:
                  "linear-gradient(160deg, var(--lily-pink), color-mix(in oklab, var(--lily-pink) 70%, #fff))",
                boxShadow:
                  "0 18px 30px -10px rgba(0,0,0,0.25), inset 0 -6px 0 rgba(0,0,0,0.08)",
              }}
            >
              {/* Bow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-8 w-24 h-12"
                style={{
                  background:
                    "radial-gradient(ellipse at 25% 50%, var(--soft-gold) 0 38%, transparent 40%), radial-gradient(ellipse at 75% 50%, var(--soft-gold) 0 38%, transparent 40%)",
                  filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))",
                }}
              />
            </div>

            {/* Sparkle on hover */}
            <div className="absolute -top-3 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">✨</div>
          </div>
        </button>

        <p
          className={`font-fredoka text-xl md:text-2xl transition-all duration-500 ${
            opened ? "opacity-0 translate-y-2" : "opacity-100"
          }`}
          style={{ color: "var(--deep-text)" }}
        >
          A little something for you, Simi.{" "}
          <span className="text-[color:var(--lily-pink)]">Tap to unwrap →</span>
        </p>

        <h1
          className={`font-display text-5xl md:text-7xl text-shadow-soft transition-all duration-700 ${
            opened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none absolute"
          }`}
          style={{ color: "var(--deep-text)" }}
        >
          Happy Birthday, Simi 🌸
        </h1>

        <p
          className={`font-hand text-3xl md:text-4xl text-[color:var(--lily-pink)] transition-all duration-700 delay-300 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
        >
          scroll to celebrate ↓
        </p>
      </div>
    </div>
  );
}