export function HeroArt() {
  return (
    <svg
      className="hero-svg"
      viewBox="0 0 760 650"
      fill="none"
      role="img"
      aria-labelledby="hero-art-title hero-art-desc"
    >
      <title id="hero-art-title">Программа на PascalABC.NET</title>
      <desc id="hero-art-desc">Строки кода считывают два числа и выводят их сумму.</desc>
      <defs>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(400 320) rotate(90) scale(323 366)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E11D48" stopOpacity=".42" />
          <stop offset="1" stopColor="#E11D48" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shape" x1="84" y1="36" x2="678" y2="588" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A1524" />
          <stop offset=".55" stopColor="#2A1016" />
          <stop offset="1" stopColor="#7A1D2E" />
        </linearGradient>
      </defs>

      <ellipse cx="400" cy="320" rx="366" ry="323" fill="url(#glow)" />
      <path
        d="M202 59C283 4 431 59 538 77c108 18 151 102 135 187-16 85 38 132 8 217-31 88-161 128-269 111-109-17-220 15-285-70C62 437 111 357 89 273 66 186 112 121 202 59Z"
        fill="url(#shape)"
        opacity=".82"
      />
      <path
        d="M218 36C311 11 428 55 539 76c117 22 165 117 139 206-24 81 29 133-15 221-44 88-154 112-260 98"
        stroke="#E35A72"
        strokeOpacity=".45"
        strokeWidth="1.5"
      />
      <path
        className="orbit"
        d="M100 287C84 191 156 93 277 58c147-43 327 22 398 142 73 123 32 298-100 367-107 57-270 64-370-14"
        stroke="#F6D9A6"
        strokeOpacity=".28"
        strokeWidth="1.5"
      />

      <path d="M122 134h495M122 519h495" stroke="#F4C9CE" strokeOpacity=".16" />
      <path d="M158 166v319" stroke="#F4C9CE" strokeOpacity=".18" />

      <g className="line line-1" fontFamily="'IBM Plex Mono', 'Courier New', monospace" fontSize="28" fontWeight="500" letterSpacing="-1.2">
        <text x="107" y="205" fill="#E7C4C8" opacity=".55" fontSize="15" letterSpacing="0">01</text>
        <text x="189" y="205" xmlSpace="preserve">
          <tspan fill="#FF8FA0">var</tspan>
          <tspan fill="#F8F1EA"> a, b: </tspan>
          <tspan fill="#F6D9A6">integer</tspan>
          <tspan fill="#F8F1EA">;</tspan>
        </text>
      </g>
      <g className="line line-2" fontFamily="'IBM Plex Mono', 'Courier New', monospace" fontSize="28" fontWeight="500" letterSpacing="-1.2">
        <text x="107" y="273" fill="#E7C4C8" opacity=".55" fontSize="15" letterSpacing="0">02</text>
        <text x="189" y="273" fill="#FF8FA0">begin</text>
      </g>
      <g className="line line-3" fontFamily="'IBM Plex Mono', 'Courier New', monospace" fontSize="28" fontWeight="500" letterSpacing="-1.2">
        <text x="107" y="341" fill="#E7C4C8" opacity=".55" fontSize="15" letterSpacing="0">03</text>
        <text x="219" y="341" xmlSpace="preserve">
          <tspan fill="#F6D9A6">Readln</tspan>
          <tspan fill="#F8F1EA">(a, b);</tspan>
        </text>
      </g>
      <g className="line line-4" fontFamily="'IBM Plex Mono', 'Courier New', monospace" fontSize="28" fontWeight="500" letterSpacing="-1.2">
        <text x="107" y="409" fill="#E7C4C8" opacity=".55" fontSize="15" letterSpacing="0">04</text>
        <text x="219" y="409" xmlSpace="preserve">
          <tspan fill="#F6D9A6">Writeln</tspan>
          <tspan fill="#F8F1EA">(a + b);</tspan>
        </text>
        <rect className="cursor" x="548" y="383" width="3" height="32" rx="1.5" fill="#F6D9A6" />
      </g>
      <g className="line line-5" fontFamily="'IBM Plex Mono', 'Courier New', monospace" fontSize="28" fontWeight="500" letterSpacing="-1.2">
        <text x="107" y="477" fill="#E7C4C8" opacity=".55" fontSize="15" letterSpacing="0">05</text>
        <text x="189" y="477" xmlSpace="preserve">
          <tspan fill="#FF8FA0">end</tspan>
          <tspan fill="#F8F1EA">.</tspan>
        </text>
      </g>

      <g className="spark" stroke="#F6D9A6" strokeWidth="2" strokeLinecap="round">
        <path d="M658 83v40M638 103h40M644 89l28 28M672 89l-28 28" />
        <circle cx="658" cy="103" r="4" fill="#F6D9A6" stroke="none" />
      </g>
      <circle cx="123" cy="535" r="5" fill="#E11D48" opacity=".85" />
      <circle cx="659" cy="542" r="3" fill="#F6D9A6" opacity=".8" />
    </svg>
  );
}

export function SparkMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2v28M2 16h28M6 6l20 20M26 6 6 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label="pascal.просто – на главную">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none">
          <path d="m18 12-9 10 9 10M26 12l9 10-9 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-text">
        <span className="brand-name">
          pascal<span className="brand-dot">.</span>просто
        </span>
        <span className="brand-by">by чсв</span>
      </span>
    </button>
  );
}
