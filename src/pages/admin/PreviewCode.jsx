import { useEffect, useState } from "react";
import WorkshopLayout from "../../components/workshop/WorkshopLayout";

const PREVIEW_ROUTE_OPTIES = [
  { value: "/wisselwerking", label: "Wisselwerking" },
  { value: "/frisse-organisatie", label: "De Frisse Organisatie" },
];

function formatVerloop(verlooptOp) {
  if (!verlooptOp) return "—";
  return new Date(Number(verlooptOp)).toLocaleString("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PreviewCode() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [huidige, setHuidige] = useState(null);
  const [routes, setRoutes] = useState(["/wisselwerking"]);
  const [geldigheidDagen, setGeldigheidDagen] = useState(14);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function callApi(method, body) {
    const res = await fetch("/api/admin/generate-preview-code", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": secret,
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401) throw new Error("Ongeldig admin-secret");
      if (res.status === 503) throw new Error("Edge Config is nog niet gekoppeld in Vercel.");
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    return data;
  }

  async function unlock(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await callApi("GET");
      setHuidige(data);
      if (data.routes?.length) setRoutes(data.routes);
      setUnlocked(true);
    } catch (err) {
      setError(
        err.message === "Ongeldig admin-secret" || err.message.includes("Edge Config")
          ? err.message
          : "Toegang geweigerd."
      );
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setError("");
    setLoading(true);
    setCopied(false);
    try {
      const data = await callApi("POST", { routes, geldigheidDagen });
      setHuidige(data);
    } catch (err) {
      setError(err.message || "Genereren mislukt.");
    } finally {
      setLoading(false);
    }
  }

  function toggleRoute(value) {
    setRoutes((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  }

  async function copyCode() {
    if (!huidige?.code) return;
    await navigator.clipboard.writeText(huidige.code);
    setCopied(true);
  }

  useEffect(() => {
    document.title = "Previewcode — admin";
  }, []);

  const nogGeldig = huidige?.code && Number(huidige.verlooptOp) > Date.now();

  return (
    <WorkshopLayout>
      <div className="workshop-card" style={{ maxWidth: 520 }}>
        <p className="workshop-eyebrow">Intern</p>
        <h1 className="workshop-title">Previewcode</h1>
        <p className="workshop-intro">
          Los van het workshopwachtwoord. Een nieuwe code is meteen actief — zonder redeploy.
        </p>

        {!unlocked ? (
          <form onSubmit={unlock} className="workshop-form">
            <label htmlFor="admin-secret" className="workshop-label">
              Admin-secret
            </label>
            <input
              id="admin-secret"
              type="password"
              autoComplete="off"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="workshop-input"
              disabled={loading}
            />
            {error && (
              <p className="workshop-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="workshop-button" disabled={loading || !secret}>
              {loading ? "Bezig…" : "Open"}
            </button>
          </form>
        ) : (
          <>
            <div
              style={{
                padding: 16,
                marginBottom: 20,
                background: "#f4fbf8",
                borderRadius: 12,
                border: "1px solid rgba(4, 52, 44, 0.12)",
              }}
            >
              <p className="workshop-label" style={{ marginBottom: 8 }}>
                Actieve code
              </p>
              {nogGeldig ? (
                <>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: "2rem",
                      letterSpacing: "0.18em",
                      fontFamily: "ui-monospace, monospace",
                      fontWeight: 700,
                    }}
                  >
                    {huidige.code}
                  </p>
                  <p className="workshop-muted" style={{ margin: 0 }}>
                    Geldig tot {formatVerloop(huidige.verlooptOp)}
                    {huidige.routes?.length ? ` · ${huidige.routes.join(", ")}` : ""}
                  </p>
                  <button
                    type="button"
                    className="workshop-button-ghost"
                    onClick={copyCode}
                    style={{ marginTop: 12 }}
                  >
                    {copied ? "Gekopieerd" : "Kopieer code"}
                  </button>
                </>
              ) : (
                <p className="workshop-muted" style={{ margin: 0 }}>
                  Geen geldige code. Genereer er hieronder een.
                </p>
              )}
            </div>

            <p className="workshop-label">Deze code ontgrendelt</p>
            <div style={{ display: "grid", gap: 8, margin: "8px 0 16px" }}>
              {PREVIEW_ROUTE_OPTIES.map((optie) => (
                <label key={optie.value} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={routes.includes(optie.value)}
                    onChange={() => toggleRoute(optie.value)}
                  />
                  {optie.label}{" "}
                  <span className="workshop-muted">({optie.value})</span>
                </label>
              ))}
            </div>

            <label htmlFor="geldigheid" className="workshop-label">
              Geldigheid (dagen)
            </label>
            <input
              id="geldigheid"
              type="number"
              min={1}
              max={90}
              value={geldigheidDagen}
              onChange={(e) => setGeldigheidDagen(Number(e.target.value) || 14)}
              className="workshop-input"
              style={{ maxWidth: 120, marginBottom: 12 }}
            />

            {error && (
              <p className="workshop-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="workshop-button"
              onClick={generate}
              disabled={loading || routes.length === 0}
            >
              {loading ? "Bezig…" : "Genereer nieuwe code"}
            </button>
          </>
        )}
      </div>
    </WorkshopLayout>
  );
}
