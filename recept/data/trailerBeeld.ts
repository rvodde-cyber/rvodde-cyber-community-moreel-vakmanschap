/**
 * Canonieke bestandsnaam (zonder ext.) per beeldbankcode voor afleveringstrailers.
 * Bestand: `public/beelden/<code>.jpg` (of `.webp`).
 */
export function trailerBeeldBasename(code: string): string {
  return code;
}

export function trailerBeeldUrls(code: string, baseUrl = '/'): readonly [string, string] {
  const file = trailerBeeldBasename(code);
  const root = `${baseUrl}beelden/`;
  return [`${root}${file}.webp`, `${root}${file}.jpg`] as const;
}
