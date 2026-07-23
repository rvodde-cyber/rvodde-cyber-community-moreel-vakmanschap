import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import { usesEnglishRoutes } from "../data/vertalingen";

const routePairs = [
  ["/welkom", "/welcome"],
  ["/over", "/about"],
  ["/aanbod", "/what-we-offer"],
  ["/gesprekskaarten", "/conversation-cards"],
  ["/bibliotheek", "/library"],
  ["/aanmelden", "/join"],
  ["/colofon", "/colophon"],
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
  const enRoutes = usesEnglishRoutes(taal);

  useEffect(() => {
    if (location.pathname === "/" && enRoutes) {
      navigate("/welcome", { replace: true });
      return;
    }

    if (location.pathname === "/" && !enRoutes) {
      navigate("/welkom", { replace: true });
      return;
    }

    for (const [nlSlug, enSlug] of stapSlugPairs) {
      if (location.pathname === `/bibliotheek/${nlSlug}` && enRoutes) {
        navigate(`/library/${enSlug}`, { replace: true });
        return;
      }
      if (location.pathname === `/library/${enSlug}` && !enRoutes) {
        navigate(`/bibliotheek/${nlSlug}`, { replace: true });
        return;
      }
    }

    const bibliotheekStap = location.pathname.match(/^\/bibliotheek\/([^/]+)$/);
    if (bibliotheekStap && enRoutes) {
      const nlSlug = bibliotheekStap[1];
      const pair = stapSlugPairs.find(([slug]) => slug === nlSlug);
      navigate(`/library/${pair ? pair[1] : nlSlug}`, { replace: true });
      return;
    }

    const libraryStap = location.pathname.match(/^\/library\/([^/]+)$/);
    if (libraryStap && !enRoutes) {
      const enSlug = libraryStap[1];
      const pair = stapSlugPairs.find(([, slug]) => slug === enSlug);
      navigate(`/bibliotheek/${pair ? pair[0] : enSlug}`, { replace: true });
      return;
    }

    for (const [nlPath, enPath] of routePairs) {
      if (location.pathname === nlPath && enRoutes) {
        navigate(enPath, { replace: true });
        return;
      }
      if (location.pathname === enPath && !enRoutes) {
        navigate(nlPath, { replace: true });
        return;
      }
    }
  }, [taal, enRoutes, location.pathname, navigate]);

  return null;
}
