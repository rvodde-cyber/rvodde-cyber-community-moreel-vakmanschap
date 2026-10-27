/** Abstraction for local play now; multiplayer/regiekamer later without UI rewrite. */
export type SessionListener = () => void;

export interface SessionAdapter<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: SessionListener): () => void;
}
