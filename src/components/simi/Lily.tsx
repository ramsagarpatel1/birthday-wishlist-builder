export function Lily({ size = 48, className = "", onClick }: { size?: number; className?: string; onClick?: () => void }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      onClick={onClick}
      role="img"
      aria-label="lily"
    >
      <defs>
        <radialGradient id="lilyG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F8DCE3" />
          <stop offset="100%" stopColor="#B8D8F0" />
        </radialGradient>
      </defs>
      <g transform="translate(32 32)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-16"
            rx="9"
            ry="18"
            fill="url(#lilyG)"
            stroke="#9CC0DE"
            strokeWidth="0.6"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="4" fill="#F4B6C2" />
        {[0, 60, 120, 180, 240, 300].map((d) => (
          <line key={d} x1="0" y1="0" x2="0" y2="-7" stroke="#E89BAB" strokeWidth="1.2" transform={`rotate(${d})`} />
        ))}
      </g>
    </svg>
  );
}
