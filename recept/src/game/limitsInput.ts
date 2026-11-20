/** maxLength: bestaande lange import mag blijven staan; nieuwe invoer tot max. */
export function fieldMaxLength(max: number, value: string): number {
  return Math.max(max, value.length);
}