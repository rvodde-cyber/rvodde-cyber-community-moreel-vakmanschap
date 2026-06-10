import { useEffect } from "react";
import { useTaal } from "../context/TaalContext";

export default function DocumentTaal() {
  const { taal, t } = useTaal();

  useEffect(() => {
    document.documentElement.lang = taal;
    document.title = t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t.meta.description);
    }
  }, [taal, t]);

  return null;
}
