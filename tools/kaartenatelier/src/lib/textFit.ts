/** Canvas text measurement for preview overflow (Carlito ≈ Calibri metrics). */

const TITLE_SIZE = 16;
const BODY_SIZE = 10.5;
const WHITE_WIDTH_PX = 500;
const WHITE_HEIGHT_PX = 280;

export type TextFitResult = {
  overflow: boolean;
  usedHeight: number;
  maxHeight: number;
  linesOver: number;
};

export function measureCardTextFit(
  title: string,
  paragraphs: string[],
  canvas?: HTMLCanvasElement
): TextFitResult {
  const charTotal = title.length + paragraphs.reduce((s, p) => s + p.length, 0);
  const charOverflow = charTotal > 2200;

  const c =
    canvas ??
    (typeof document !== "undefined" ? document.createElement("canvas") : null);
  if (!c) {
    return {
      overflow: charOverflow,
      usedHeight: 0,
      maxHeight: WHITE_HEIGHT_PX,
      linesOver: charOverflow ? 1 : 0,
    };
  }
  const ctx = c.getContext("2d");
  if (!ctx) {
    return {
      overflow: charOverflow,
      usedHeight: 0,
      maxHeight: WHITE_HEIGHT_PX,
      linesOver: charOverflow ? 1 : 0,
    };
  }

  let y = 0;
  const lineHeight = (size: number) => size * 1.35;

  const wrap = (text: string, size: number, maxW: number): string[] => {
    ctx.font = `${size}px Carlito, Calibri, sans-serif`;
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      const wpx = ctx.measureText(test).width;
      const charLimit = Math.floor(maxW / (size * 0.55));
      const tooWide =
        (wpx > maxW && line.length > 0) ||
        (wpx === 0 && test.length > charLimit && line.length > 0) ||
        (wpx === 0 && w.length > charLimit);
      if (tooWide && line) {
        lines.push(line);
        line = w.length > charLimit ? w.slice(0, charLimit) : w;
        while (line.length > charLimit) {
          lines.push(line.slice(0, charLimit));
          line = line.slice(charLimit);
        }
      } else if (tooWide && !line && w.length > charLimit) {
        let rest = w;
        while (rest.length > charLimit) {
          lines.push(rest.slice(0, charLimit));
          rest = rest.slice(charLimit);
        }
        line = rest;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  y += lineHeight(12) * 2;
  y += lineHeight(TITLE_SIZE) * wrap(title, TITLE_SIZE, WHITE_WIDTH_PX - 40).length;
  for (const p of paragraphs) {
    y += lineHeight(BODY_SIZE) * wrap(p, BODY_SIZE, WHITE_WIDTH_PX - 40).length;
    y += 4;
  }

  const overflow = y > WHITE_HEIGHT_PX;
  return {
    overflow: overflow || charOverflow,
    usedHeight: y,
    maxHeight: WHITE_HEIGHT_PX,
    linesOver: overflow
      ? Math.ceil((y - WHITE_HEIGHT_PX) / lineHeight(BODY_SIZE))
      : charOverflow
        ? 1
        : 0,
  };
}
