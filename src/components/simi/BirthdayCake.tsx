import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

/**
 * 🎂 Birthday Cake celebration
 * - Animated candles
 * - Blow via mic OR button
 * - When all out: confetti + side party poppers + floating petals + celebration sound
 * - "Celebrate Again" replay
 */

const CANDLE_COUNT = 5;

function playCelebrationSound() {
  try {
    const Ctx =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = freq;
      o.connect(g);
      g.connect(ctx.destination);
      const t0 = ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.18, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
      o.start(t0);
      o.stop(t0 + 0.55);
    });
  } catch {
    /* no-op */
  }
}

function fireCelebration() {
  // center confetti burst
  confetti({
    particleCount: 160,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.55 },
    colors: ["#9CC0DE", "#F4B6C2", "#FDFBF5", "#62A0D8", "#FFD6E0"],
  });
  // left party popper
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors: ["#9CC0DE", "#F4B6C2", "#FFD6E0"],
  });
  // right party popper
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors: ["#62A0D8", "#F4B6C2", "#FDFBF5"],
  });
  // second wave
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 140,
      origin: { y: 0.4 },
      colors: ["#9CC0DE", "#F4B6C2", "#FFD6E0"],
    });
  }, 450);
  playCelebrationSound();
}

function Candle({ lit, index }: { lit: boolean; index: number }) {
  return (
    <div className="relative flex flex-col items-center" style={{ marginInline: 4 }}>
      <div className="relative h-8 sm:h-10 w-3 sm:w-4 flex items-end justify-center">
        <AnimatePresence>
          {lit && (
            <motion.div
              key="flame"
              initial={{ opacity: 0, scale: 0.4, y: 6 }}
              animate={{
                opacity: 1,
                scale: [1, 1.15, 0.95, 1.1, 1],
                y: [-2, -4, -2, -5, -2],
              }}
              exit={{ opacity: 0, scale: 0.2, y: 10 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 1.2 + (index % 3) * 0.2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 1.4 + (index % 3) * 0.2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2"
              style={{
                width: 12,
                height: 18,
                background:
                  "radial-gradient(ellipse at 50% 70%, #fff7c2 0%, #ffd166 40%, #ff8a3d 75%, transparent 100%)",
                borderRadius: "50% 50% 45% 45% / 70% 70% 30% 30%",
                filter: "blur(0.3px) drop-shadow(0 0 8px rgba(255, 196, 80, 0.85))",
              }}
            />
          )}
        </AnimatePresence>
        {/* wisp of smoke when blown out */}
        <AnimatePresence>
          {!lit && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0.6, y: -2, scale: 0.6 }}
              animate={{ opacity: 0, y: -28, scale: 1.4 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/70 blur-[3px]"
            />
          )}
        </AnimatePresence>
      </div>
      {/* candle stick */}
      <div
        className="w-2.5 sm:w-3 rounded-sm shadow-inner"
        style={{
          height: 44,
          background:
            index % 2 === 0
              ? "linear-gradient(to bottom, #ffffff, #F4B6C2)"
              : "linear-gradient(to bottom, #ffffff, #9CC0DE)",
          boxShadow: "inset -1px 0 0 rgba(0,0,0,0.05), inset 1px 0 0 rgba(255,255,255,0.5)",
        }}
      />
    </div>
  );
}

export function BirthdayCake() {
  const [candles, setCandles] = useState<boolean[]>(() => Array(CANDLE_COUNT).fill(true));
  const [celebrated, setCelebrated] = useState(false);
  const [listening, setListening] = useState(false);
  const audioRef = useRef<{ ctx: AudioContext; stream: MediaStream; raf: number } | null>(null);

  const litCount = candles.filter(Boolean).length;
  const allOut = litCount === 0;

  // Blow out one candle (used by both mic + button)
  const blowOne = () => {
    setCandles((prev) => {
      const idx = prev.findIndex((c) => c);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  // Trigger celebration when all candles out
  useEffect(() => {
    if (allOut && !celebrated) {
      setCelebrated(true);
      fireCelebration();
      stopMic();
    }
  }, [allOut, celebrated]);

  const stopMic = () => {
    const a = audioRef.current;
    if (a) {
      cancelAnimationFrame(a.raf);
      a.stream.getTracks().forEach((t) => t.stop());
      a.ctx.close().catch(() => {});
      audioRef.current = null;
    }
    setListening(false);
  };

  const startMic = async () => {
    if (listening) {
      stopMic();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const Ctx =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!;
      const ctx = new Ctx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let lastBlow = 0;
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        // RMS volume
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        const now = Date.now();
        if (rms > 0.22 && now - lastBlow > 350) {
          lastBlow = now;
          blowOne();
        }
        const raf = requestAnimationFrame(tick);
        if (audioRef.current) audioRef.current.raf = raf;
      };
      audioRef.current = { ctx, stream, raf: requestAnimationFrame(tick) };
      setListening(true);
    } catch {
      // permission denied; user can use the button
      setListening(false);
    }
  };

  useEffect(() => () => stopMic(), []);

  const replay = () => {
    setCelebrated(false);
    setCandles(Array(CANDLE_COUNT).fill(true));
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* Floating petals on celebration */}
      <AnimatePresence>
        {celebrated && (
          <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -40, x: `${(i * 53) % 100}%`, opacity: 0, rotate: 0 }}
                animate={{
                  y: ["−10vh", "110vh"],
                  x: [`${(i * 53) % 100}%`, `${((i * 53) % 100) + (i % 2 ? 8 : -8)}%`],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 6 + (i % 4), delay: i * 0.15, ease: "linear" }}
                className="absolute top-0 text-2xl"
              >
                {i % 2 === 0 ? "🌸" : "🤍"}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Candles */}
      <div className="flex items-end justify-center" aria-hidden>
        {candles.map((lit, i) => (
          <Candle key={i} lit={lit} index={i} />
        ))}
      </div>

      {/* Cake SVG */}
      <svg viewBox="0 0 320 200" className="w-full drop-shadow-xl" role="img" aria-label="Birthday cake">
        <defs>
          <linearGradient id="topTier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFE6EC" />
          </linearGradient>
          <linearGradient id="midTier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#EAF3FB" />
            <stop offset="1" stopColor="#9CC0DE" />
          </linearGradient>
          <linearGradient id="botTier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F4B6C2" />
          </linearGradient>
          <linearGradient id="plate" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FDFBF5" />
            <stop offset="1" stopColor="#E7DDC9" />
          </linearGradient>
        </defs>

        {/* top tier (where candles sit) */}
        <rect x="105" y="10" width="110" height="40" rx="8" fill="url(#topTier)" stroke="#F4B6C2" strokeOpacity="0.5" />
        {/* drips */}
        <path d="M105 38 Q120 55 135 38 Q150 55 165 38 Q180 55 195 38 Q210 55 215 38 L215 50 L105 50 Z" fill="#F4B6C2" opacity="0.7" />

        {/* mid tier */}
        <rect x="80" y="55" width="160" height="55" rx="10" fill="url(#midTier)" stroke="#62A0D8" strokeOpacity="0.35" />
        <path d="M80 95 Q100 115 120 95 Q140 115 160 95 Q180 115 200 95 Q220 115 240 95 L240 110 L80 110 Z" fill="#62A0D8" opacity="0.35" />
        {/* sprinkles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={92 + i * 19} cy={70 + (i % 2) * 6} r="2" fill={i % 2 ? "#F4B6C2" : "#FFFFFF"} />
        ))}

        {/* bottom tier */}
        <rect x="55" y="115" width="210" height="60" rx="12" fill="url(#botTier)" stroke="#F4B6C2" strokeOpacity="0.6" />
        <path d="M55 155 Q80 175 105 155 Q130 175 155 155 Q180 175 205 155 Q230 175 255 155 Q265 165 265 170 L265 175 L55 175 Z" fill="#F4B6C2" opacity="0.55" />
        {/* lily motif */}
        <text x="160" y="150" textAnchor="middle" fontSize="18">🌸</text>

        {/* plate */}
        <ellipse cx="160" cy="182" rx="130" ry="10" fill="url(#plate)" />
      </svg>

      {/* Controls */}
      <div className="mt-5 flex flex-col items-center gap-3">
        {!celebrated ? (
          <>
            <p className="text-sm text-[var(--ink)]/70 font-body text-center">
              {litCount} candle{litCount === 1 ? "" : "s"} left — make a wish, Simi 💙
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={blowOne}
                className="rounded-full px-5 py-2.5 bg-[var(--sky-deep)] text-white font-fredoka text-sm shadow-lg shadow-[var(--sky-deep)]/30"
              >
                Blow a candle 🌬️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startMic}
                className={`rounded-full px-5 py-2.5 font-fredoka text-sm border-2 transition-colors ${
                  listening
                    ? "bg-[var(--blush)] text-white border-[var(--blush)]"
                    : "bg-white/70 text-[var(--sky-deep)] border-[var(--sky-deep)]/40"
                }`}
              >
                {listening ? "Listening… blow! 🎤" : "Use microphone 🎤"}
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h3
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl sm:text-4xl text-romance"
            >
              Happy Birthday Simi ❤️
            </motion.h3>
            <p className="font-hand text-xl text-[var(--sky-deep)] mt-2">
              every wish you made — may they all find you.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={replay}
              className="mt-5 rounded-full px-5 py-2.5 bg-gradient-to-r from-[var(--sky-deep)] to-[var(--blush)] text-white font-fredoka text-sm shadow-lg"
            >
              Celebrate Again 🎉
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}