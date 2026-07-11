import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WorkshopLayout from "../../components/workshop/WorkshopLayout";

const ERROR_MESSAGES = {
  invalid: "Wachtwoord onjuist. Probeer het opnieuw.",
  expired: "Deze workshoptoegang is verlopen. Vraag de facilitator om een nieuw wachtwoord.",
  network: "Er ging iets mis. Controleer je verbinding en probeer opnieuw.",
};

export default function WorkshopLogin() {
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/workshop/apps";

  useEffect(() => {
    fetch("/api/workshop/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          navigate(redirect, { replace: true });
        }
      })
      .finally(() => setChecking(false));
  }, [navigate, redirect]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorKey("");

    try {
      const res = await fetch("/api/workshop/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorKey(data.error === "expired" ? "expired" : "invalid");
        return;
      }

      navigate(redirect, {
        replace: true,
        state: { workshop_naam: data.workshop_naam },
      });
    } catch {
      setErrorKey("network");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <WorkshopLayout>
        <p className="workshop-muted">Even geduld…</p>
      </WorkshopLayout>
    );
  }

  return (
    <WorkshopLayout>
      <div className="workshop-card">
        <p className="workshop-eyebrow">Moral Craftsmanship</p>
        <h1 className="workshop-title">Workshop Hub</h1>
        <p className="workshop-intro">
          Dit gedeelte is alleen toegankelijk met een workshopwachtwoord. Geen account nodig —
          de toegang geldt voor de duur van de sessie.
        </p>

        <form onSubmit={handleSubmit} className="workshop-form">
          <label htmlFor="workshop-password" className="workshop-label">
            Wachtwoord
          </label>
          <input
            id="workshop-password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="workshop-input"
            disabled={loading}
          />

          {errorKey && (
            <p className="workshop-error" role="alert">
              {ERROR_MESSAGES[errorKey]}
            </p>
          )}

          <button type="submit" className="workshop-button" disabled={loading || !password}>
            {loading ? "Bezig…" : "Toegang tot workshop"}
          </button>
        </form>
      </div>
    </WorkshopLayout>
  );
}
