import { describe, expect, it } from 'vitest';
import { trapFocus } from './a11ySettings';

describe('modal focus trap', () => {
  it('wrapt Tab van laatste naar eerste element', () => {
    const root = document.createElement('div');
    const a = document.createElement('button');
    a.textContent = 'A';
    const b = document.createElement('button');
    b.textContent = 'B';
    root.append(a, b);
    document.body.append(root);
    b.focus();

    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    let prevented = false;
    ev.preventDefault = () => {
      prevented = true;
    };
    trapFocus(root, ev);
    expect(prevented).toBe(true);
    expect(document.activeElement).toBe(a);
    root.remove();
  });
});
