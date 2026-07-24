import { Link } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import { usesEnglishRoutes } from "../data/vertalingen";

const copy = {
  nl: {
    label: "404",
    titel: "Pagina niet gevonden",
    tekst: "Deze pagina bestaat niet (meer), of de link is verouderd. Ga terug naar het platform om verder te kijken.",
    home: "Terug naar welkom",
    bibliotheek: "Naar de bibliotheek",
  },
  en: {
    label: "404",
    titel: "Page not found",
    tekst: "This page does not exist (anymore), or the link is outdated. Return to the platform to continue exploring.",
    home: "Back to welcome",
    bibliotheek: "Go to the library",
  },
};

export default function NietGevondenPagina() {
  const { taal } = useTaal();
  const t = copy[usesEnglishRoutes(taal) ? "en" : "nl"];
  const homeHref = usesEnglishRoutes(taal) ? "/welcome" : "/welkom";
  const bibliotheekHref = usesEnglishRoutes(taal) ? "/library" : "/bibliotheek";

  return (
    <main className="section-shell flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secundair">{t.label}</p>
      <h1 className="mt-3 font-display text-5xl font-semibold text-primair md:text-6xl">{t.titel}</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-secundair">{t.tekst}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to={homeHref}
          className="rounded-full bg-[#534ab7] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#433aa0]"
        >
          {t.home}
        </Link>
        <Link
          to={bibliotheekHref}
          className="rounded-full border border-[#534ab7] px-6 py-3 text-sm font-semibold text-[#534ab7] transition hover:bg-[#534ab7] hover:text-white"
        >
          {t.bibliotheek}
        </Link>
      </div>
    </main>
  );
}
