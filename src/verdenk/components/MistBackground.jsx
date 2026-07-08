import { motion, useScroll, useTransform } from "framer-motion";

export default function MistBackground({ progress = 0, variant = "landing" }) {
  const { scrollY } = useScroll();
  const mistOpacity = useTransform(scrollY, [0, 400], [0.85, 0.25]);
  const parallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  const baseMist = Math.max(0.15, 0.85 - progress * 0.12);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #E8E6E1 0%, #F7F5F0 40%, #F7F5F0 100%)",
        }}
      />

      {variant === "landing" && (
        <>
          <svg
            className="absolute bottom-0 left-0 right-0 h-[55vh] w-full"
            viewBox="0 0 1440 400"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden
          >
            <defs>
              <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B2A4A" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1B2A4A" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C200,280 400,300 600,260 C800,220 1000,280 1200,240 C1320,210 1380,250 1440,230 L1440,400 L0,400 Z"
              fill="url(#hillGrad)"
            />
            <path
              d="M0,350 C300,310 500,340 700,300 C900,260 1100,320 1440,280 L1440,400 L0,400 Z"
              fill="#1B2A4A"
              fillOpacity="0.08"
            />
          </svg>

          <motion.div style={{ y: parallaxY }} className="absolute bottom-[28vh] left-1/2 -translate-x-1/2">
            <svg width="120" height="160" viewBox="0 0 120 160" aria-hidden>
              <ellipse cx="60" cy="145" rx="35" ry="8" fill="#1B2A4A" fillOpacity="0.1" />
              <path
                d="M45 140 C45 100 50 70 60 55 C70 70 75 100 75 140 Z"
                fill="#1B2A4A"
                fillOpacity="0.7"
              />
              <circle cx="60" cy="42" r="14" fill="#1B2A4A" fillOpacity="0.75" />
              <rect x="72" y="38" width="28" height="6" rx="3" fill="#1B2A4A" fillOpacity="0.6" />
              <circle cx="98" cy="41" r="8" fill="none" stroke="#1B2A4A" strokeWidth="2" opacity="0.6" />
            </svg>
          </motion.div>
        </>
      )}

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: variant === "landing" ? mistOpacity : baseMist,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(184,188,194,0.9) 0%, rgba(247,245,240,0) 70%)",
        }}
        animate={{ opacity: variant === "landing" ? undefined : baseMist }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 60%, rgba(247,245,240,0.4) 100%)",
        }}
      />
    </div>
  );
}
