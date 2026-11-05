import { useState } from 'react';

const base = import.meta.env.BASE_URL;

type Props = {
  checkCode: string;
  fileCode: string;
  alt: string;
  caption: string;
};

/** Intro rechts: JPG met vaste verhouding; bij ontbrekend bestand plaatsaanduiding. */
export function IntroSceneImage({ checkCode, fileCode, alt, caption }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="intro-beeld">
      <div className="intro-beeld__frame">
        {failed ? (
          <div className="intro-beeld__placeholder" role="img" aria-label={alt}>
            BEELD {checkCode} VOLGT
          </div>
        ) : (
          <img
            src={`${base}beelden/${fileCode}.jpg`}
            alt={alt}
            loading="eager"
            decoding="async"
            width={1200}
            height={800}
            onError={() => setFailed(true)}
          />
        )}
        <div className="intro-beeld__shade" aria-hidden="true" />
      </div>
      <figcaption className="intro-beeld__cap">{caption}</figcaption>
    </figure>
  );
}
