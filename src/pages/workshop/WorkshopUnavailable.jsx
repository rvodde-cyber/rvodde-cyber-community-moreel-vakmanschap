import { Link } from "react-router-dom";
import WorkshopLayout from "../../components/workshop/WorkshopLayout";

export default function WorkshopUnavailable() {
  return (
    <WorkshopLayout>
      <div className="workshop-card">
        <p className="workshop-eyebrow">Moral Craftsmanship</p>
        <h1 className="workshop-title">Binnenkort beschikbaar</h1>
        <p className="workshop-intro">
          Het besloten workshopgedeelte is tijdelijk niet beschikbaar. Het publieke
          platform kun je gewoon blijven gebruiken.
        </p>
        <p className="workshop-footer-note">
          <Link to="/welkom" className="workshop-link">
            ← Terug naar het publieke platform
          </Link>
        </p>
      </div>
    </WorkshopLayout>
  );
}
