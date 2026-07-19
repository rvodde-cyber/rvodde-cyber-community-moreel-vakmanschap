import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTaal } from "../context/TaalContext";
import { juridischePageMetaByPath } from "../data/juridischePaginas";
import { getBibliotheekDataLang } from "../data/vertalingen";

export default function DocumentTaal() {
  const { taal, t } = useTaal();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = taal;

    const dataLang = getBibliotheekDataLang(taal);
    const pageMeta = juridischePageMetaByPath[location.pathname]?.[dataLang];

    document.title = pageMeta?.title ?? t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", pageMeta?.description ?? t.meta.description);
    }
  }, [taal, t, location.pathname]);

  return null;
}
