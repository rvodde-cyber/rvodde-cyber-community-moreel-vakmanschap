import { beeldAkkoord, beeldAlt } from '@data/beeldenCheck';

const base = import.meta.env.BASE_URL;

type Props = {
  /** Beeldbankcode voor akkoord-check (I1–I5) */
  checkCode: string;
  /** Bestand in public/beelden/ zonder extensie */
  fileCode: string;
  className?: string;
};

/** Toont beeld alleen na akkoord Richard; anders neutrale placeholder. */
export function SceneBackground({ checkCode, fileCode, className = 'cine-img' }: Props) {
  if (!beeldAkkoord(checkCode)) {
    return (
      <div
        className={`${className} scene-placeholder`}
        role="img"
        aria-label={beeldAlt(checkCode)}
      />
    );
  }
  return (
    <div
      className={className}
      role="img"
      aria-label={beeldAlt(checkCode)}
      style={{ backgroundImage: `url(${base}beelden/${fileCode}.jpg)` }}
    />
  );
}
