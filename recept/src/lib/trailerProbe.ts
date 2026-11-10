import { trailerBeeldUrls } from '@data/trailerBeeld';

/** Probeert webp en jpg; retourneert werkende URL of null (browser only). */
export function probeBeeldUrl(code: string, baseUrl: string): Promise<string | null> {
  const [webp, jpg] = trailerBeeldUrls(code, baseUrl);
  return new Promise((resolve) => {
    const tryNext = (urls: string[]) => {
      if (urls.length === 0) {
        resolve(null);
        return;
      }
      const url = urls[0];
      const rest = urls.slice(1);
      if (!url) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => tryNext(rest);
      img.src = url;
    };
    tryNext([webp, jpg]);
  });
}

export async function filterLoadableShotCodes(codes: string[], baseUrl: string): Promise<string[]> {
  const ok: string[] = [];
  for (const code of codes) {
    const url = await probeBeeldUrl(code, baseUrl);
    if (url) ok.push(code);
  }
  return ok;
}
