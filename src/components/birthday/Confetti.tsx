import confetti from "canvas-confetti";

const LILY_COLORS = ["#F4A7B9", "#E8A0A0", "#F2C45A", "#FFFDF9", "#87A878"];

export function burstConfetti(opts?: { origin?: { x: number; y: number } }) {
  const origin = opts?.origin ?? { x: 0.5, y: 0.55 };
  confetti({
    particleCount: 120,
    spread: 90,
    startVelocity: 45,
    colors: LILY_COLORS,
    scalar: 1.1,
    origin,
  });
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 120,
      startVelocity: 30,
      colors: LILY_COLORS,
      scalar: 0.9,
      origin,
    });
  }, 180);
}

export function bigCelebration() {
  const duration = 2000;
  const end = Date.now() + duration;
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.7 },
      colors: LILY_COLORS,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.7 },
      colors: LILY_COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}