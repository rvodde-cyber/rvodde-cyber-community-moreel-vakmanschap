import { useEffect, useRef } from 'react';
import type { TijdgeestGeluid } from '@data/episodes/tijdgeest';

type Props = {
  geluid: TijdgeestGeluid | null;
  aan: boolean;
  onToggle: () => void;
};

/** Optioneel sfeergeluid — standaard uit, geen autoplay; zonder bestand geen fout. */
export function TijdgeestGeluidPanel({ geluid, aan, onToggle }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!aan) {
      audioRef.current?.pause();
      return;
    }
    if (geluid?.audioPath && audioRef.current) {
      audioRef.current.play().catch(() => {
        /* stille fallback */
      });
    }
  }, [aan, geluid?.audioPath]);

  if (!geluid || geluid.bron === 'geen') return null;

  const label = aan ? 'Geluid uitzetten' : 'Geluid aanzetten';

  return (
    <section className="panel tijdgeest-geluid" aria-labelledby="tijdgeest-geluid-heading">
      <div className="ph">
        <h2 id="tijdgeest-geluid-heading">TIJDGEEST</h2>
      </div>
      <button
        type="button"
        className="btn ghost tijdgeest-geluid-toggle"
        aria-pressed={aan}
        aria-label={label}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {aan ? 'Geluid uit' : 'Geluid aan'} ({geluid.label})
      </button>
      {aan ? (
        <p className="note tijdgeest-geluid-alt" role="status">
          {geluid.tekstalternatief}
        </p>
      ) : null}
      {geluid.audioPath ? (
        <audio ref={audioRef} src={geluid.audioPath} preload="none" aria-hidden="true" />
      ) : null}
    </section>
  );
}
