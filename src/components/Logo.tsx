interface LogoProps {
  size?: number;
  className?: string;
}

export function HyperstruckMark({ size = 32, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hyperstruck"
    >
      <defs>
        <linearGradient
          id="hs-stone"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#36BDB0" />
          <stop offset="45%" stopColor="#2BA89E" />
          <stop offset="100%" stopColor="#239088" />
        </linearGradient>
        <radialGradient id="hs-sheen" cx="28%" cy="22%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="32" height="32" rx="7.5" fill="url(#hs-stone)" />
      <rect width="32" height="32" rx="7.5" fill="url(#hs-sheen)" />

      <text
        x="16"
        y="23"
        textAnchor="middle"
        fontFamily='"Space Grotesk", sans-serif'
        fontSize="20"
        fontWeight="700"
        fill="#FFFFFF"
      >
        H
      </text>
    </svg>
  );
}
