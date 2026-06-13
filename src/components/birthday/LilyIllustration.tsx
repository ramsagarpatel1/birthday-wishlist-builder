import lilyImg from "@/assets/lily-single.png";

interface Props {
  className?: string;
  size?: number;
  rotate?: number;
  style?: React.CSSProperties;
}

export function LilyIllustration({ className = "", size = 120, rotate = 0, style }: Props) {
  return (
    <img
      src={lilyImg}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      className={`pointer-events-none select-none drop-shadow-[0_8px_22px_rgba(244,167,185,0.35)] ${className}`}
    />
  );
}

/** Tiny inline SVG lily for inline decorations (dividers, signatures). */
export function LilySprig({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M32 56 C 34 40, 28 30, 32 14"
        stroke="var(--sage)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 38 C 22 36, 18 30, 18 26 C 24 28, 30 32, 32 38 Z"
        fill="var(--sage)"
        opacity="0.85"
      />
      <path
        d="M32 44 C 42 42, 46 36, 46 32 C 40 34, 34 38, 32 44 Z"
        fill="var(--sage)"
        opacity="0.7"
      />
      <g>
        <ellipse cx="32" cy="16" rx="8" ry="12" fill="var(--accent-white)" stroke="var(--lily-pink)" strokeWidth="1.2" />
        <ellipse cx="24" cy="18" rx="6" ry="10" fill="var(--accent-white)" stroke="var(--lily-pink)" strokeWidth="1.2" opacity="0.85" transform="rotate(-25 24 18)" />
        <ellipse cx="40" cy="18" rx="6" ry="10" fill="var(--accent-white)" stroke="var(--lily-pink)" strokeWidth="1.2" opacity="0.85" transform="rotate(25 40 18)" />
        <circle cx="32" cy="18" r="1.8" fill="var(--soft-gold)" />
      </g>
    </svg>
  );
}

/** Botanical vine section divider with a centered lily. */
export function VineDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center my-12 ${className}`}>
      <svg viewBox="0 0 800 60" className="w-full max-w-3xl h-12" fill="none" aria-hidden="true">
        <path
          d="M20 30 Q 200 10, 380 30 T 780 30"
          stroke="var(--sage)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="140" cy="20" rx="14" ry="6" fill="var(--sage)" opacity="0.7" transform="rotate(-20 140 20)" />
        <ellipse cx="260" cy="38" rx="12" ry="5" fill="var(--sage)" opacity="0.6" transform="rotate(15 260 38)" />
        <ellipse cx="520" cy="22" rx="14" ry="6" fill="var(--sage)" opacity="0.7" transform="rotate(20 520 22)" />
        <ellipse cx="640" cy="38" rx="12" ry="5" fill="var(--sage)" opacity="0.6" transform="rotate(-15 640 38)" />
      </svg>
      <div className="absolute">
        <LilySprig size={44} />
      </div>
    </div>
  );
}