export const faseUitleg = {
  storming: {
    betekenis:
      "In deze fase verkennen teamleden de samenwerking. Verschillen in verwachtingen, rollen en werkwijzen komen naar boven. Spanning hoort bij deze fase — het betekent niet dat het team 'fout' zit, maar dat jullie nog zoeken naar een gedeelde manier van werken.",
    typering:
      "De voorgestelde fase is een typering: een eerste indruk op basis van het patroon in jullie antwoorden. Het is geen diagnose en geen vast label. Teams doorlopen fasen niet altijd lineair, en dezelfde fase kan er bij het ene team anders uitzien dan bij het andere.",
    volgendeFase: "norming",
    naarVolgende:
      "Om richting norming te bewegen helpt het om verwachtingen expliciet te maken, rollen te bespreken en spanning bespreekbaar te houden in plaats van te vermijden. Bouw aan gedeelde afspraken waar het hele team zich in herkent — niet alleen op papier, maar in dagelijks gedrag.",
  },
  norming: {
    betekenis:
      "In deze fase ontwikkelt het team gedeelde normen, afspraken en een werkroutine. Teamleden weten beter wat ze van elkaar mogen verwachten. Vertrouwen groeit en de samenwerking wordt voorspelbaarder.",
    typering:
      "De voorgestelde fase is een typering: een eerste indruk op basis van het patroon in jullie antwoorden. Het is geen diagnose en geen vast label. Een team kan in norming zitten en toch op onderdelen nog zoeken of twijfelen — dat is normaal.",
    volgendeFase: "performing",
    naarVolgende:
      "Om richting performing te bewegen helpt het om energie te verschuiven naar het gezamenlijke resultaat. Verfijn rollen, geef ruimte voor initiatief en maak wederzijdse verantwoording bespreekbaar — niet alleen via de teamleider, maar onderling.",
  },
  performing: {
    betekenis:
      "In deze fase werkt het team soepel samen richting een gezamenlijk resultaat. Conflicten worden doorgaans constructief opgelost en het team past zich relatief makkelijk aan wanneer de situatie verandert.",
    typering:
      "De voorgestelde fase is een typering: een eerste indruk op basis van het patroon in jullie antwoorden. Performing is geen eindstation — bij nieuwe opdrachten, teamleden of druk kan een team tijdelijk terugvallen in eerdere patronen.",
    volgendeFase: null,
    naarVolgende:
      "Performing onderhouden vraagt om blijven reflecteren: kloppen afspraken nog, is de balans in het teamwiel nog in evenwicht, en is er ruimte om spanning opnieuw te bespreken voordat het onuitgesproken blijft? Blijf periodiek terugkijken, ook als het goed gaat.",
  },
  "gemengd beeld": {
    betekenis:
      "Jullie antwoorden laten geen eenduidig beeld zien. Sommige succesfactoren zijn sterk, andere kwetsbaar. Het team bevindt zich mogelijk in verschillende fasen tegelijk, afhankelijk van het onderwerp of de situatie.",
    typering:
      "In dit geval past geen enkele fase als vaste typering. Dat is op zichzelf al een nuttige observatie: jullie team is niet eendimensionaal. Gebruik dit als uitnodiging om te verkennen waar het verschil zit, in plaats van één label te zoeken.",
    volgendeFase: null,
    naarVolgende:
      "Begin bij het patroon in jullie antwoorden: welke succesfactoren wijken af? Bespreek eerst de zwakste factor als gespreksopening — niet als oordeel, maar als vraag: 'Herkennen we dit, en wat zou helpen?' Pas daarna kun je samen bepalen of een fase-typering zinvol voelt.",
  },
};

export const faseLabels = {
  storming: "Storming — oriëntatie en spanning",
  norming: "Norming — afspraken en ritme",
  performing: "Performing — soepel samenwerken",
  "gemengd beeld": "Gemengd beeld — geen eenduidige fase",
};

export const volgendeFaseLabels = {
  norming: "norming",
  performing: "performing",
};
