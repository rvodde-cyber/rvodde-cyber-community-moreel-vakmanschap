import { useEffect, useState } from "react";
import {
  type Locale,
  readStoredLocale,
  storeLocale,
  strings,
} from "./strings";

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => readStoredLocale());
  const copy = strings[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.pageTitle;
  }, [locale, copy.pageTitle]);

  function chooseLocale(next: Locale) {
    setLocale(next);
    storeLocale(next);
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Moreel Vakmanschap</p>
          <h1>{copy.pageTitle}</h1>
        </div>
        <div
          className="lang-toggle"
          role="group"
          aria-label={copy.langSwitchAria}
        >
          <button
            type="button"
            aria-pressed={locale === "nl"}
            onClick={() => chooseLocale("nl")}
          >
            {copy.langSwitchNl}
          </button>
          <button
            type="button"
            aria-pressed={locale === "en"}
            onClick={() => chooseLocale("en")}
          >
            {copy.langSwitchEn}
          </button>
        </div>
      </header>

      <p className="lead">{copy.intro}</p>
      <p className="notice">{copy.comingSoon}</p>

      <section className="sources" aria-labelledby="sources-heading">
        <h2 id="sources-heading">{copy.sourcesHeading}</h2>
        <p>{copy.sourceMeijer}</p>
        <p>{copy.sourceLectoraat}</p>
      </section>
    </div>
  );
}
