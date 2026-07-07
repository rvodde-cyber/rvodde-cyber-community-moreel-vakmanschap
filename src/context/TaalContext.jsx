import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  SITE_TAAL_CODES,
  getVertalingenForLocale,
} from "../data/vertalingen";

const TaalContext = createContext();
const TAAL_STORAGE_KEY = "cmv-taal";

function leesOpgeslagenTaal() {
  try {
    const opgeslagen = localStorage.getItem(TAAL_STORAGE_KEY);
    if (SITE_TAAL_CODES.includes(opgeslagen)) return opgeslagen;
  } catch {
    // localStorage niet beschikbaar (privacy-modus, etc.)
  }
  return "nl";
}

export function TaalProvider({ children }) {
  const [taal, setTaalState] = useState(leesOpgeslagenTaal);
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

  return (
    <TaalContext.Provider value={{ taal, t, setTaal, wisselTaal }}>
      {children}
    </TaalContext.Provider>
  );
}

export function useTaal() {
  return useContext(TaalContext);
}
