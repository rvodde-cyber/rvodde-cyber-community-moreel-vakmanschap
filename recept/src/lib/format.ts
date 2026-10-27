export function eur(x: number): string {
  const n = Math.round(Math.abs(x));
  const t = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${x < 0 ? '−' : ''}€ ${t}`;
}

export function mln(x: number): string {
  return `€ ${(x / 1e6).toFixed(2).replace('.', ',')} mln`;
}

export function kostEur(kosten: number): number {
  return kosten * 50000;
}

export function pad2(n: number): string {
  return (n < 10 ? '0' : '') + n;
}
