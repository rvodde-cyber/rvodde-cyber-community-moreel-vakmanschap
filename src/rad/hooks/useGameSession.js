import { useCallback, useEffect, useMemo, useState } from "react";
import { PHASES, WHEEL_SEGMENTS, PERSPECTIVES } from "../radConstants.js";
import {
  fetchDilemmas,
  filterDilemmas,
  pickRandom,
} from "../services/dilemmaService.js";

const DEFAULT_CONFIG = {
  categorie: "",
  moeilijkheid: null,
  spelers: 4,
  timer: 120,
};

function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Centrale state-machine voor de spelflow.
 * Beheert fasen, sessieconfig, geladen dilemma's en de actieve ronde.
 */
export function useGameSession() {
  const [phase, setPhase] = useState(PHASES.HOME);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [dilemmas, setDilemmas] = useState([]);
  const [source, setSource] = useState("local");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [dilemma, setDilemma] = useState(null);
  const [segment, setSegment] = useState(null);
  const [perspective, setPerspective] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchDilemmas()
      .then((res) => {
        if (!active) return;
        setDilemmas(res.dilemmas);
        setSource(res.source);
        setLoadError(res.error ?? null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () => filterDilemmas(dilemmas, config),
    [dilemmas, config]
  );

  /** Beschikbare categorieën uit de dataset (voor de setup-dropdown). */
  const categories = useMemo(
    () => [...new Set(dilemmas.map((d) => d.categorie).filter(Boolean))].sort(),
    [dilemmas]
  );

  const goHome = useCallback(() => setPhase(PHASES.HOME), []);
  const goSetup = useCallback(() => setPhase(PHASES.SETUP), []);

  const startSession = useCallback(
    (nextConfig) => {
      const merged = { ...DEFAULT_CONFIG, ...nextConfig };
      setConfig(merged);
      const pool = filterDilemmas(dilemmas, merged);
      const next = pickRandom(pool.length ? pool : dilemmas);
      setDilemma(next);
      setSegment(null);
      setPerspective(null);
      setPhase(PHASES.WHEEL);
    },
    [dilemmas]
  );

  const spinTo = useCallback((seg) => {
    setSegment(seg);
  }, []);

  const revealDilemma = useCallback(() => setPhase(PHASES.DILEMMA), []);

  const injectPerspective = useCallback(() => {
    setPerspective(randomOf(PERSPECTIVES));
    setPhase(PHASES.PERSPECTIVE);
  }, []);

  const shufflePerspective = useCallback(() => {
    setPerspective((prev) => {
      if (PERSPECTIVES.length < 2) return randomOf(PERSPECTIVES);
      let next = randomOf(PERSPECTIVES);
      while (prev && next.id === prev.id) next = randomOf(PERSPECTIVES);
      return next;
    });
  }, []);

  const startTimer = useCallback(() => setPhase(PHASES.TIMER), []);
  const goReflection = useCallback(() => setPhase(PHASES.REFLECTION), []);

  const newRound = useCallback(() => {
    const pool = filtered.length ? filtered : dilemmas;
    setDilemma(pickRandom(pool));
    setSegment(null);
    setPerspective(null);
    setPhase(PHASES.WHEEL);
  }, [filtered, dilemmas]);

  return {
    phase,
    config,
    dilemmas,
    filtered,
    categories,
    source,
    loading,
    loadError,
    dilemma,
    segment,
    perspective,
    wheelSegments: WHEEL_SEGMENTS,
    // acties
    goHome,
    goSetup,
    startSession,
    spinTo,
    revealDilemma,
    injectPerspective,
    shufflePerspective,
    startTimer,
    goReflection,
    newRound,
  };
}
