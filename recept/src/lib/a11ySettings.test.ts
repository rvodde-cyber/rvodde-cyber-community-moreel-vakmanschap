import { describe, expect, it, beforeEach } from 'vitest';
import { applyA11ySettings, DEFAULT_A11Y, loadA11ySettings, saveA11ySettings } from './a11ySettings';

describe('a11ySettings contrastmodus', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('reduce-motion');
  });

  it('bewaart en laadt hoog contrast', () => {
    saveA11ySettings({ ...DEFAULT_A11Y, contrast: 'hoog' });
    const loaded = loadA11ySettings();
    expect(loaded.contrast).toBe('hoog');
    applyA11ySettings(loaded);
    expect(document.documentElement.dataset.contrast).toBe('hoog');
  });
});

describe('reduce motion flag', () => {
  it('zet reduce-motion class', () => {
    applyA11ySettings({ ...DEFAULT_A11Y, reduceMotion: true });
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true);
  });
});
