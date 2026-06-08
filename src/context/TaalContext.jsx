import { createContext, useContext, useState } from "react";
import { vertalingen } from "../data/vertalingen";

const TaalContext = createContext();

export function TaalProvider({ children }) {
  const [taal, setTaal] = useState("nl");
  const t = vertalingen[taal];
  const wisselTaal = () => setTaal((huidigeTaal) => (huidigeTaal === "nl" ? "en" : "nl"));

  return <TaalContext.Provider value={{ taal, t, wisselTaal }}>{children}</TaalContext.Provider>;
}

export function useTaal() {
  return useContext(TaalContext);
}
