import type { ReactNode } from 'react';
import { clamp } from '@engine/helpers';

type Props = {
  value: number;
  label: string;
  warn?: boolean;
  extra?: ReactNode;
};

export function GaugeRing({ value, label, warn, extra }: Props) {
  const v = clamp(value, 0, 100);
  const C = 2 * Math.PI * 38;
  const off = C * (1 - v / 100);
  return (
    <div className={`g${warn ? ' warn' : ''}`}>
      <svg viewBox="0 0 92 92" role="img" aria-label={`${label} ${v}`}>
        <circle className="trk" cx="46" cy="46" r="38" fill="none" strokeWidth="6" />
        <circle
          className="arc"
          cx="46"
          cy="46"
          r="38"
          fill="none"
          strokeWidth="6"
          transform="rotate(-90 46 46)"
          strokeDasharray={C}
          strokeDashoffset={off}
        />
        <text className="num" x="46" y="55" textAnchor="middle">{v}</text>
      </svg>
      <div className="lbl">{label}</div>
      {extra}
    </div>
  );
}
