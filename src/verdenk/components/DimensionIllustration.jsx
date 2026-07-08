const ILLUSTRATIONS = {
  raster: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1B2A4A" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="fadeGrid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="gridMask">
          <rect width="200" height="120" fill="url(#fadeGrid)" />
        </mask>
      </defs>
      <rect width="200" height="120" fill="url(#grid)" mask="url(#gridMask)" />
      <ellipse cx="100" cy="110" rx="90" ry="20" fill="#B8BCC2" fillOpacity="0.4" />
    </svg>
  ),
  weegschaal: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <line x1="100" y1="30" x2="100" y2="90" stroke="#1B2A4A" strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="50" x2="150" y2="50" stroke="#1B2A4A" strokeWidth="2" opacity="0.5" />
      <path d="M50 50 L35 70 L65 70 Z" fill="none" stroke="#3D5A80" strokeWidth="1.5" />
      <path d="M150 50 L135 70 L165 70 Z" fill="none" stroke="#3D5A80" strokeWidth="1.5" />
      <ellipse cx="100" cy="95" rx="40" ry="8" fill="#B8BCC2" fillOpacity="0.3" />
    </svg>
  ),
  pad: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <path
        d="M100 110 Q90 80 100 60 Q110 40 100 20"
        fill="none"
        stroke="#5C6B8A"
        strokeWidth="3"
        strokeDasharray="6 4"
        opacity="0.6"
      />
      <ellipse cx="100" cy="115" rx="60" ry="12" fill="#B8BCC2" fillOpacity="0.5" />
    </svg>
  ),
  deur: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <rect x="70" y="25" width="50" height="80" rx="2" fill="none" stroke="#1B2A4A" strokeWidth="2" opacity="0.4" />
      <path d="M70 25 L70 105" stroke="#D97757" strokeWidth="3" opacity="0.7" />
      <polygon points="70,25 55,40 70,55" fill="#D9A441" fillOpacity="0.5" />
      <ellipse cx="100" cy="110" rx="50" ry="8" fill="#B8BCC2" fillOpacity="0.3" />
    </svg>
  ),
  golven: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <path d="M20 80 Q50 60 80 80 T140 80 T200 80" fill="none" stroke="#B8BCC2" strokeWidth="2" />
      <path d="M20 95 Q50 75 80 95 T140 95 T200 95" fill="none" stroke="#B8BCC2" strokeWidth="1.5" opacity="0.6" />
      <line x1="100" y1="40" x2="100" y2="75" stroke="#1B2A4A" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="32" r="8" fill="#1B2A4A" fillOpacity="0.3" />
    </svg>
  ),
  spiegel: (
    <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs opacity-80" aria-hidden>
      <ellipse cx="100" cy="55" rx="35" ry="50" fill="none" stroke="#D9A441" strokeWidth="2" opacity="0.6" />
      <path
        d="M75 30 C85 50 115 50 125 30"
        fill="none"
        stroke="#1B2A4A"
        strokeWidth="2"
        opacity="0.4"
      />
      <ellipse cx="100" cy="110" rx="45" ry="8" fill="#B8BCC2" fillOpacity="0.3" />
    </svg>
  ),
};

export default function DimensionIllustration({ type }) {
  return (
    <div className="flex justify-center py-4">
      {ILLUSTRATIONS[type] ?? ILLUSTRATIONS.raster}
    </div>
  );
}
