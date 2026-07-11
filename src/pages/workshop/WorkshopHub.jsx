import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WorkshopLayout from "../../components/workshop/WorkshopLayout";

const BADGE_LABELS = {
  workshop: "Beschikbaar tijdens deze workshop",
  altijd: "Altijd beschikbaar in besloten deel",
};

export default function WorkshopHub() {
  const [apps, setApps] = useState([]);
  const [workshopNaam, setWorkshopNaam] = useState("");
  const [isVoorproef, setIsVoorproef] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.workshop_naam) {
      setWorkshopNaam(location.state.workshop_naam);
    }
    if (location.state?.voorproef) {
      setIsVoorproef(true);
    }

    Promise.all([
      fetch("/api/workshop/session").then((r) => r.json()),
      fetch("/data/workshop/hub-apps.json").then((r) => r.json()),
    ])
      .then(([session, hubData]) => {
        if (!session.authenticated) {
          navigate("/workshop", { replace: true });
          return;
        }
        setWorkshopNaam((prev) => session.workshop_naam || prev);
        setIsVoorproef(Boolean(session.voorproef));
        setApps(hubData.apps || []);
      })
      .catch(() => navigate("/workshop", { replace: true }))
      .finally(() => setLoading(false));
  }, [location.state, navigate]);

  async function handleLogout() {
    await fetch("/api/workshop/logout", { method: "POST" });
    navigate("/workshop", { replace: true });
  }

  if (loading) {
    return (
      <WorkshopLayout>
        <p className="workshop-muted">Workshop-apps laden…</p>
      </WorkshopLayout>
    );
  }

  return (
    <WorkshopLayout>
      {isVoorproef && (
        <div className="workshop-preview-banner" role="status">
          Voorvertoning — je kijkt rond zonder officiële workshoptoegang. Apps openen in een
          nieuw tabblad.
        </div>
      )}
      <header className="workshop-hub-header">
        <div>
          <p className="workshop-eyebrow">Besloten workshopdeel</p>
          <h1 className="workshop-title">Workshop Hub</h1>
          {workshopNaam && (
            <p className="workshop-welcome">Welkom bij: {workshopNaam}</p>
          )}
          <p className="workshop-intro">
            Kies een app om te openen in een nieuw tabblad. Elke tool blijft een eigen
            project — de hub verbindt ze alleen voor deze sessie.
          </p>
        </div>
        <button type="button" onClick={handleLogout} className="workshop-button-ghost">
          Afsluiten
        </button>
      </header>

      <div className="workshop-grid">
        {apps.map((app) => (
          <article key={app.id} className="workshop-app-card">
            <div className="workshop-app-card-top">
              <h2 className="workshop-app-title">{app.naam}</h2>
              {app.hubBadge && (
                <span className={`workshop-badge workshop-badge-${app.hubBadge}`}>
                  {BADGE_LABELS[app.hubBadge]}
                </span>
              )}
            </div>
            <p className="workshop-app-desc">{app.omschrijving}</p>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="workshop-app-link"
            >
              Open app →
            </a>
            {app.url_extra?.length > 0 && (
              <div className="workshop-app-extra-links">
                {app.url_extra.map((extraUrl) => (
                  <a
                    key={extraUrl}
                    href={extraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="workshop-app-link"
                  >
                    {extraUrl.replace("https://", "").split(".")[0]} →
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <p className="workshop-footer-note">
        <Link to="/welkom" className="workshop-link">
          ← Terug naar het publieke platform
        </Link>
      </p>
    </WorkshopLayout>
  );
}
