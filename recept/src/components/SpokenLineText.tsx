/** Visuele aanhalingstekens; brontekst in data blijft zonder tekens. */
export function lineHasInlineQuotes(text: string): boolean {
  return /["'‘’“”„«»]/.test(text);
}

type Props = { text: string; quoted: boolean };

export function SpokenLineText({ text, quoted }: Props) {
  if (!quoted) return <>{text}</>;
  const single = lineHasInlineQuotes(text);
  const open = single ? '‘' : '“';
  const close = single ? '’' : '”';
  return (
    <>
      <span className="spoken-q" aria-hidden="true">
        {open}
      </span>
      {text}
      <span className="spoken-q" aria-hidden="true">
        {close}
      </span>
    </>
  );
}
