import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { loadAntwoorden, saveAntwoorden } from "../lib/session";

const TestContext = createContext(null);

export function TestProvider({ children }) {
  const [antwoorden, setAntwoordenState] = useState(() => loadAntwoorden());

  const setAntwoord = useCallback((stellingId, waarde) => {
    setAntwoordenState((prev) => {
      const next = { ...prev, [stellingId]: waarde };
      saveAntwoorden(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setAntwoordenState({});
    saveAntwoorden({});
  }, []);

  const value = useMemo(
    () => ({ antwoorden, setAntwoord, reset }),
    [antwoorden, setAntwoord, reset],
  );

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

export function useTest() {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error("useTest must be used within TestProvider");
  return ctx;
}
