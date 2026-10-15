import {
  buildAllKiezerItems,
  countKiezerTotal,
} from "../lib/werkvormenKiezer.js";

/** Lazy-load werkvormen + werkbladen JSON (werkbladenpagina-chunk only). */
export async function loadKiezerBundle(dataLang) {
  const [{ default: werkvormenData }, { default: werkbladenRaw }] = await Promise.all([
    import("./werkvormen.json"),
    import("./werkbladen.json"),
  ]);

  const items = buildAllKiezerItems(werkvormenData, werkbladenRaw, dataLang);
  const totalCount = countKiezerTotal(werkvormenData, werkbladenRaw);

  return {
    items,
    totalCount,
    regioLijst: werkvormenData.regio_lijst ?? [],
  };
}
