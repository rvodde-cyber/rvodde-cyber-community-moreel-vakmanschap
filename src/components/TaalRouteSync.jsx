import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTaal } from "../context/TaalContext";

const routePairs = [
  ["/welkom", "/welcome"],
  ["/over", "/about"],
  ["/aanbod", "/what-we-offer"],
  ["/gesprekskaarten", "/conversation-cards"],
  ["/bibliotheek", "/library"],
  ["/aanmelden", "/join"],
];

const stapSlugPairs = [
  ["zien", "seeing"],
  ["voelen", "feeling"],
  ["wegen", "weighing"],
  ["handelen", "acting"],
  ["volhouden", "persisting"],
  ["verhaal", "story-reflection"],
];

export default function TaalRouteSync() {
  const { taal } = useTaal();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && taal === "en") {
      navigate("/welcome", { replace: true });
      return;
    }

    if (location.pathname === "/" && taal === "nl") {
      navigate("/welkom", { replace: true });
      return;
    }

    for (const [nlSlug, enSlug] of stapSlugPairs) {
      if (location.pathname === `/bibliotheek/${nlSlug}` && taal === "en") {
        navigate(`/library/${enSlug}`, { replace: true });
        return;
      }
      if (location.pathname === `/library/${enSlug}` && taal === "nl") {
        navigate(`/bibliotheek/${nlSlug}`, { replace: true });
        return;
      }
    }

    const bibliotheekStap = location.pathname.match(/^\/bibliotheek\/([^/]+)$/);
    if (bibliotheekStap && taal === "en") {
      const nlSlug = bibliotheekStap[1];
      const pair = stapSlugPairs.find(([slug]) => slug === nlSlug);
      navigate(`/library/${pair ? pair[1] : nlSlug}`, { replace: true });
      return;
    }

    const libraryStap = location.pathname.match(/^\/library\/([^/]+)$/);
    if (libraryStap && taal === "nl") {
      const enSlug = libraryStap[1];
      const pair = stapSlugPairs.find(([, slug]) => slug === enSlug);
      navigate(`/bibliotheek/${pair ? pair[0] : enSlug}`, { replace: true });
      return;
    }

    for (const [nlPath, enPath] of routePairs) {
      if (location.pathname === nlPath && taal === "en") {
        navigate(enPath, { replace: true });
        return;
      }
      if (location.pathname === enPath && taal === "nl") {
        navigate(nlPath, { replace: true });
        return;
      }
    }
  }, [taal, location.pathname, navigate]);

  return null;
}
