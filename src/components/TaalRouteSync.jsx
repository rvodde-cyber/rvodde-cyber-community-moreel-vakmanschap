import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTaal } from "../context/TaalContext";

export default function TaalRouteSync() {
  const { taal } = useTaal();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/over" && taal === "en") {
      navigate("/about", { replace: true });
    } else if (location.pathname === "/about" && taal === "nl") {
      navigate("/over", { replace: true });
    } else if (location.pathname === "/gesprekskaarten" && taal === "en") {
      navigate("/conversation-cards", { replace: true });
    } else if (location.pathname === "/conversation-cards" && taal === "nl") {
      navigate("/gesprekskaarten", { replace: true });
    } else if (location.pathname === "/bibliotheek" && taal === "en") {
      navigate("/library", { replace: true });
    } else if (location.pathname === "/library" && taal === "nl") {
      navigate("/bibliotheek", { replace: true });
    }
  }, [taal, location.pathname, navigate]);

  return null;
}
