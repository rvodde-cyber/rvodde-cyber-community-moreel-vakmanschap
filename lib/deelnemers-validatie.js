/** Validatie van een aanmelding. Draait server-side; de UI valideert alleen aanvullend. */

const LIMIETEN = {
  naam: 120,
  functie: 120,
  organisatie: 160,
  email: 254,
  aantekening: 1000,
};

const EMAIL_PATROON = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const TALEN = ["nl", "en", "sv", "cs", "da"];

function tekst(waarde) {
  return typeof waarde === "string" ? waarde.trim().replace(/\s+/g, " ") : "";
}

/**
 * @returns {{ok: true, deelnemer: object} | {ok: false, velden: Record<string, string>}}
 */
export function valideerAanmelding(body = {}) {
  const velden = {};

  const naam = tekst(body.naam);
  if (naam.length < 2) velden.naam = "verplicht";
  else if (naam.length > LIMIETEN.naam) velden.naam = "te_lang";

  const functie = tekst(body.functie);
  if (functie.length < 2) velden.functie = "verplicht";
  else if (functie.length > LIMIETEN.functie) velden.functie = "te_lang";

  const email = tekst(body.email).toLowerCase();
  if (!email) velden.email = "verplicht";
  else if (email.length > LIMIETEN.email || !EMAIL_PATROON.test(email)) velden.email = "ongeldig";

  const organisatie = tekst(body.organisatie);
  if (organisatie.length > LIMIETEN.organisatie) velden.organisatie = "te_lang";

  const aantekening = typeof body.aantekening === "string" ? body.aantekening.trim() : "";
  if (aantekening.length > LIMIETEN.aantekening) velden.aantekening = "te_lang";

  if (body.consent !== true) velden.consent = "verplicht";

  if (Object.keys(velden).length > 0) return { ok: false, velden };

  return {
    ok: true,
    deelnemer: {
      naam,
      functie,
      organisatie: organisatie || null,
      email,
      aantekening: aantekening || null,
      taal: TALEN.includes(body.taal) ? body.taal : "nl",
      consent: true,
      consent_op: new Date().toISOString(),
    },
  };
}

/** Spamval: bots vullen verborgen velden wel in, mensen niet. */
export function isHoneypotGevuld(body = {}) {
  return tekst(body.website).length > 0;
}
