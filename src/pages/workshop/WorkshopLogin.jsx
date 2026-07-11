import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import WorkshopLayout from "../../components/workshop/WorkshopLayout";

const ERROR_MESSAGES = {
  invalid: "Code onjuist. Probeer het opnieuw.",
  expired: "Deze workshoptoegang is verlopen. Vraag de facilitator om een nieuwe code.",
  preview_expired: "De voorvertoning is verlopen. Vraag om een nieuwe voorproefcode.",
  preview_disabled: "Voorvertoning is momenteel uitgeschakeld.",
  network: "Er ging iets mis. Controleer je verbinding en probeer opnieuw.",
};

export default function WorkshopLogin({ mode = "workshop" }) {
  const isVoorproef = mode === "voorproef";
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [voorproefBeschikbaar, setVoorproefBeschikbaar] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/workshop/apps";

  useEffect(() => {
    fetch("/api/workshop/session")
      .then((r) => r.json())
      .then((data) => {
        setVoorproefBeschikbaar(Boolean(data.voorproef_beschikbaar));
        if (data.authenticated) {
          navigate(redirect, {
            replace: true,
            state: { workshop_naam: data.workshop_naam, voorproef: data.voorproef },
          });
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
        body: JSON.stringify({
          password,
          mode: isVoorproef ? "voorproef" : "workshop",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorKey(data.error || "invalid");
        return;
      }

      navigate(redirect, {
        replace: true,
        state: { workshop_naam: data.workshop_naam, voorproef: data.voorproef },
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
        <h1 className="workshop-title">
          {isVoorproef ? "Voorvertoning" : "Workshop Hub"}
        </h1>
        <p className="workshop-intro">
          {isVoorproef
            ? "Tijdelijk rondkijken in het besloten gedeelte — zonder de officiële workshopcode. Ideaal om apps te verkennen vóór een sessie."
            : "Dit gedeelte is alleen toegankelijk met een workshopwachtwoord. Geen account nodig — de toegang geldt voor de duur van de sessie."}
        </p>

        <form onSubmit={handleSubmit} className="workshop-form">
          <label htmlFor="workshop-password" className="workshop-label">
            {isVoorproef ? "Voorproefcode" : "Wachtwoord"}
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
              {ERROR_MESSAGES[errorKey] || ERROR_MESSAGES.invalid}
            </p>
          )}

          <button type="submit" className="workshop-button" disabled={loading || !password}>
            {loading ? "Bezig…" : isVoorproef ? "Start voorvertoning" : "Toegang tot workshop"}
          </button>
        </form>

        {!isVoorproef && voorproefBeschikbaar && (
          <p className="workshop-preview-hint">
            Alleen even rondkijken?{" "}
            <Link to="/workshop/voorproef" className="workshop-link">
              Gebruik de voorvertoning →
            </Link>
          </p>
        )}

        {isVoorproef && (
          <p className="workshop-preview-hint">
            Officiële workshop?{" "}
            <Link to="/workshop" className="workshop-link">
              Ga naar workshoplogin →
            </Link>
          </p>
        )}
      </div>
    </WorkshopLayout>
  );
}
