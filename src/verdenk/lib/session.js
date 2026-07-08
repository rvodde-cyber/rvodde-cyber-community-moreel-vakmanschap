const SESSION_KEY = "verdenk_session_id";
const ANSWERS_KEY = "verdenk_antwoorden";

export function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function loadAntwoorden() {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveAntwoorden(antwoorden) {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(antwoorden));
}

export function clearAntwoorden() {
  localStorage.removeItem(ANSWERS_KEY);
}
