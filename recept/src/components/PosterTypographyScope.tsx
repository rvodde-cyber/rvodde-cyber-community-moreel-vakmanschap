import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { READABLE_SANS_STACK } from '../../themes/periodTypography';
import { loadPosterFonts } from '../fonts/loadPosterFonts';

const POSTER_SERIF = '"Instrument Serif", "Iowan Old Style", Georgia, serif';
const POSTER_DATA = '"Chakra Petch", "DIN Alternate", "Avenir Next Condensed", "Arial Narrow", sans-serif';

function useReadableFontSetting(): boolean {
  const [on, setOn] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.readableFont === '1',
  );
  useEffect(() => {
    const sync = () => setOn(document.documentElement.dataset.readableFont === '1');
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-readable-font'] });
    return () => obs.disconnect();
  }, []);
  return on;
}

type Props = {
  children: ReactNode;
  className?: string;
};

/** Landingspagina en intro met poster-lettertypen; respecteert Leesbaar lettertype. */
export function PosterTypographyScope({ children, className = '' }: Props) {
  const readableFont = useReadableFontSetting();

  useEffect(() => {
    void loadPosterFonts();
  }, []);

  const style: CSSProperties = {
    ['--serif' as string]: readableFont ? READABLE_SANS_STACK : POSTER_SERIF,
    ['--data' as string]: readableFont ? READABLE_SANS_STACK : POSTER_DATA,
  };

  return (
    <div
      className={`poster-typography${readableFont ? ' poster-typography--readable' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
