import { useState, type CSSProperties } from 'react';
import type { EpisodeIntroLook, IntroBeeldFocus } from '@data/episodes/content';

const base = import.meta.env.BASE_URL;

type Props = {
  checkCode: string;
  fileCode: string;
  alt: string;
  look: EpisodeIntroLook;
  /** Object-position voor `object-fit: cover` (procenten); alleen intro split. */
  focus?: IntroBeeldFocus;
};

/** Intro rechts: staand beeld in periode-kader; bij ontbrekend bestand plaatsaanduiding. */
export function IntroSceneImage({ checkCode, fileCode, alt, look, focus }: Props) {
  const [failed, setFailed] = useState(false);
  const { kader, tint, onderschrift } = look;

  const focusStyle: CSSProperties | undefined =
    focus != null
      ? ({
          ['--intro-focus-x']: `${focus.x}%`,
          ['--intro-focus-y']: `${focus.y}%`,
        } as CSSProperties)
      : undefined;

  const media = failed ? (
    <div className="intro-beeld__placeholder" role="img" aria-label={alt}>
      BEELD {checkCode} VOLGT
    </div>
  ) : (
    <img
      src={`${base}beelden/${fileCode}.jpg`}
      alt={alt}
      loading="eager"
      decoding="async"
      width={1344}
      height={1728}
      onError={() => setFailed(true)}
    />
  );

  const showShadeSoft = kader !== 'polaroid';

  return (
    <figure className={`intro-beeld intro-kader-${kader}`} style={focusStyle}>
      <div className={`intro-kader-shell intro-kader-shell--${kader}`}>
        {kader === 'venster' ? (
          <div className="intro-kader-venster-bar" aria-hidden="true">
            <span role="presentation" />
            <span role="presentation" />
            <span role="presentation" />
          </div>
        ) : null}
        <div className="intro-beeld__frame">
          {media}
          {tint !== 'transparent' ? (
            <div
              className="intro-beeld__tint"
              style={{ background: tint }}
              aria-hidden="true"
            />
          ) : null}
          {kader === 'polaroid' ? (
            <div className="intro-beeld__grain" aria-hidden="true" />
          ) : null}
          {showShadeSoft ? (
            <div className="intro-beeld__shade intro-beeld__shade--soft" aria-hidden="true" />
          ) : null}
        </div>
        <figcaption className={`intro-beeld__cap intro-beeld__cap--${kader}`}>{onderschrift}</figcaption>
      </div>
    </figure>
  );
}
