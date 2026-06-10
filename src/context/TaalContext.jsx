import { createContext, useContext, useEffect, useState } from 'react';
import { vertalingen } from '../data/vertalingen';

const TaalContext = createContext();
const TAAL_STORAGE_KEY = 'cmv-taal';

function leesOpgeslagenTaal() {
  try {
    const opgeslagen = localStorage.getItem(TAAL_STORAGE_KEY);
    if (opgeslagen === 'nl' || opgeslagen === 'en') return opgeslagen;
  } catch {
    // localStorage niet beschikbaar (privacy-modus, etc.)
  }
  return 'nl';
}

export function TaalProvider({ children }) {
  const [taal, setTaal] = useState(leesOpgeslagenTaal);
  const t = vertalingen[taal];
  const wisselTaal = () => setTaal(taal === 'nl' ? 'en' : 'nl');

  useEffect(() => {
    try {
      localStorage.setItem(TAAL_STORAGE_KEY, taal);
    } catch {
      // negeren als opslaan niet lukt
    }
  }, [taal]);

  return (
    <TaalContext.Provider value={{ taal, t, wisselTaal }}>
      {children}
    </TaalContext.Provider>
  );
}

export function useTaal() {
  return useContext(TaalContext);
}
