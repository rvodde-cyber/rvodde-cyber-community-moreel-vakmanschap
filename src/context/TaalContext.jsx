import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  SITE_TAAL_CODES,
  getVertalingenForLocale,
} from "../data/vertalingen";

const TaalContext = createContext();
const TAAL_STORAGE_KEY = "cmv-taal";

function leesStartTaal() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("lang")?.toLowerCase();
    if (SITE_TAAL_CODES.includes(fromQuery)) return fromQuery;

    const opgeslagen = localStorage.getItem(TAAL_STORAGE_KEY);
    if (SITE_TAAL_CODES.includes(opgeslagen)) return opgeslagen;
  } catch {
    // localStorage / location niet beschikbaar (privacy-modus, etc.)
  }
  return "nl";
}

export function TaalProvider({ children }) {
  const [taal, setTaalState] = useState(leesStartTaal);
  const t = useMemo(() => getVertalingenForLocale(taal), [taal]);

  const setTaal = (code) => {
    if (SITE_TAAL_CODES.includes(code)) setTaalState(code);
  };

  /** @deprecated gebruik setTaal — behouden voor backwards compatibility */
  const wisselTaal = () => setTaalState((prev) => (prev === "nl" ? "en" : "nl"));

  useEffect(() => {
    try {
      localStorage.setItem(TAAL_STORAGE_KEY, taal);
    } catch {
      // negeren als opslaan niet lukt
    }
  }, [taal]);

  // ?lang=en (o.a. via moralcraftsmanship.eu-redirect) toepassen en uit de URL strippen
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const fromQuery = url.searchParams.get("lang")?.toLowerCase();
      if (SITE_TAAL_CODES.includes(fromQuery)) {
        setTaalState(fromQuery);
        url.searchParams.delete("lang");
        const next = `${url.pathname}${url.search}${url.hash}`;
        window.history.replaceState({}, "", next);
      }
    } catch {
      // negeren
    }
  }, []);

  return (
    <TaalContext.Provider value={{ taal, t, setTaal, wisselTaal }}>
      {children}
    </TaalContext.Provider>
  );
}

export function useTaal() {
  return useContext(TaalContext);
}
