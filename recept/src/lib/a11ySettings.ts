export type A11ySettings = {
  fontScale: 'normaal' | 'groot' | 'extra';
  contrast: 'standaard' | 'hoog' | 'licht';
  reduceMotion: boolean;
};

const KEY = 'recept-a11y';

export const DEFAULT_A11Y: A11ySettings = {
  fontScale: 'normaal',
  contrast: 'standaard',
  reduceMotion: false,
};

export function loadA11ySettings(): A11ySettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_A11Y, reduceMotion: prefersReducedMotionOs() };
    const p = JSON.parse(raw) as Partial<A11ySettings>;
    return {
      fontScale: p.fontScale ?? DEFAULT_A11Y.fontScale,
      contrast: p.contrast ?? DEFAULT_A11Y.contrast,
      reduceMotion: p.reduceMotion ?? prefersReducedMotionOs(),
    };
  } catch {
    return DEFAULT_A11Y;
  }
}

export function saveA11ySettings(s: A11ySettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function prefersReducedMotionOs(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function applyA11ySettings(s: A11ySettings) {
  const root = document.documentElement;
  root.dataset.fontScale = s.fontScale;
  root.dataset.contrast = s.contrast;
  root.dataset.reduceMotion = s.reduceMotion ? '1' : '0';
  if (s.reduceMotion) root.classList.add('reduce-motion');
  else root.classList.remove('reduce-motion');
}

/** Focus-trap: houd Tab binnen container. */
export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== 'Tab') return;
  const focusable = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;
  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
