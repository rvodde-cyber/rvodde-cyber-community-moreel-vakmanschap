let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (c?.state === 'suspended') void c.resume();
}

function beep(freq: number, dur: number, gain = 0.08) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const SFX = {
  click: () => beep(440, 0.05, 0.04),
  tick: (g = 0.06) => beep(880, 0.04, g),
  boom: (soft?: boolean) => {
    beep(soft ? 55 : 42, soft ? 0.35 : 0.5, soft ? 0.12 : 0.18);
    if (!soft) setTimeout(() => beep(80, 0.2, 0.08), 40);
  },
  low: () => beep(65, 0.8, 0.06),
  ping: () => beep(620, 0.12, 0.05),
};

export function hum(seconds: number) {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 1.5);
  g.gain.setValueAtTime(0.06, t + seconds - 1);
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  [55, 82.4].forEach((fr) => {
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = fr;
    o.connect(g);
    o.start(t);
    o.stop(t + seconds + 0.1);
  });
  g.connect(c.destination);
}
