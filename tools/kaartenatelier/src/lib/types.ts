export type Complexiteit = "micro" | "meso" | "macro";
export type FotoStatus = "wacht" | "ok" | "aanpassen";

export type KaartPakketCategorie = {
  naam_nl: string;
  naam_en?: string;
  sector_kleur: string;
};

export type KaartPakketBatch = {
  id?: string;
  aangemaakt?: string;
  beeldmaker?: string;
};

export type KaartPakketKaart = {
  nummer: string;
  bestandsnaam: string;
  titel_nl: string;
  titel_en?: string;
  verhaal_nl: string[];
  verhaal_en?: string[];
  complexiteit: Complexiteit;
  rechtvaardiging_nl?: string;
  rechtvaardiging_en?: string;
  firefly_prompt_en: string;
  foto_bestand?: string;
  foto_status?: FotoStatus;
  opmerkingen?: string;
};

export type KaartPakketUitzondering = {
  nummer: string;
  reden: string;
};

export type KaartPakket = {
  schema: "kaartenatelier/1";
  categorie: KaartPakketCategorie;
  batch?: KaartPakketBatch;
  kaarten: KaartPakketKaart[];
  uitzonderingen?: KaartPakketUitzondering[];
};

export type FieldIssue = {
  path: string;
  message: string;
  blocking: boolean;
};

export type CardWarnings = {
  nummer: string;
  warnings: string[];
  blocking: string[];
};
