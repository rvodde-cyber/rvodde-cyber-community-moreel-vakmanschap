import { useEffect, useState } from 'react';
import type { ChatChannel } from '@data/berichten';

type ToastPayload = { k: string; p: string } | null;

let pushToast: ((t: ToastPayload) => void) | null = null;

export function notifyChatToast(channel: ChatChannel, van: string, preview: string, fwd?: boolean) {
  const k = channel === 'g' ? 'MT VAN GORP DRONES' : 'PRIVÉ';
  const p = `${fwd ? '↪ ' : ''}${preview.slice(0, 120)}${preview.length > 120 ? '…' : ''}`;
  pushToast?.({ k: `${k}  /  ${van.toUpperCase()}`, p });
}

export function MessageToastHost() {
  const [toast, setToast] = useState<ToastPayload>(null);

  useEffect(() => {
    pushToast = setToast;
    return () => {
      pushToast = null;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 5200);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <div className={`toast${toast ? ' on' : ''}`} aria-live="polite">
      {toast ? (
        <>
          <p className="k">{toast.k}</p>
          <p>{toast.p}</p>
        </>
      ) : null}
    </div>
  );
}
