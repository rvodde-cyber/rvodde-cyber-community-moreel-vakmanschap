export default function MissingKey() {
  return (
    <section className="glass p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-ink">Sleutel ontbreekt</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Deze pagina verwacht een Setup-link met sleutel in het URL-fragment (het deel ná #).
        Zonder dat fragment kan er niets worden ontsleuteld — open de link die de adviseur heeft
        bewaard.
      </p>
    </section>
  );
}
