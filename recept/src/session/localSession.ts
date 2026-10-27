import type { SessionAdapter, SessionListener } from './SessionAdapter';

const STORAGE_PREFIX = 'recept-session-v1';

function loadJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* offline / private mode */
  }
}

export function createLocalSession<S, A>(
  storageKey: string,
  initialState: S,
  reducer: (state: S, action: A) => S,
): SessionAdapter<S, A> {
  const key = `${STORAGE_PREFIX}:${storageKey}`;
  let state = loadJson<S>(key) ?? initialState;
  const listeners = new Set<SessionListener>();

  const notify = () => listeners.forEach((l) => l());

  return {
    getState: () => state,
    dispatch(action: A) {
      state = reducer(state, action);
      saveJson(key, state);
      notify();
    },
    subscribe(listener: SessionListener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
