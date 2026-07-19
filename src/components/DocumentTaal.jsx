import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import { colofonMetaByPath } from "../data/colofon";

export default function DocumentTaal() {
  const { taal, t } = useTaal();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = taal;

    const pathMeta = colofonMetaByPath[location.pathname];
    document.title = pathMeta?.title ?? t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", pathMeta?.description ?? t.meta.description);
    }
  }, [taal, t, location.pathname]);

  return null;
}
