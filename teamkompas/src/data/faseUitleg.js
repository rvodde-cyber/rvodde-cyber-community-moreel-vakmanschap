export const faseUitleg = {
  storming: {
    betekenis:
      "In deze fase verkennen teamleden de samenwerking. Verschillen in verwachtingen, rollen en werkwijzen komen naar boven. Spanning hoort bij deze fase — het betekent niet dat het team 'fout' zit, maar dat jullie nog zoeken naar een gedeelde manier van werken.",
    volgendeFase: "norming",
    naarVolgende:
      "Om richting norming te bewegen helpt het om verwachtingen expliciet te maken, rollen te bespreken en spanning bespreekbaar te houden in plaats van te vermijden. Bouw aan gedeelde afspraken waar het hele team zich in herkent — niet alleen op papier, maar in dagelijks gedrag.",
  },
  norming: {
    betekenis:
      "In deze fase ontwikkelt het team gedeelde normen, afspraken en een werkroutine. Teamleden weten beter wat ze van elkaar mogen verwachten. Vertrouwen groeit en de samenwerking wordt voorspelbaarder.",
    volgendeFase: "performing",
    naarVolgende:
      "Om richting performing te bewegen helpt het om energie te verschuiven naar het gezamenlijke resultaat. Verfijn rollen, geef ruimte voor initiatief en maak wederzijdse verantwoording bespreekbaar — niet alleen via de teamleider, maar onderling.",
  },
  performing: {
    betekenis:
      "In deze fase werkt het team soepel samen richting een gezamenlijk resultaat. Conflicten worden doorgaans constructief opgelost en het team past zich relatief makkelijk aan wanneer de situatie verandert.",
    volgendeFase: null,
    naarVolgende:
      "Performing onderhouden vraagt om blijven reflecteren: kloppen afspraken nog, is de balans in het teamwiel nog in evenwicht, en is er ruimte om spanning opnieuw te bespreken voordat het onuitgesproken blijft? Blijf periodiek terugkijken, ook als het goed gaat.",
  },
  "gemengd beeld": {
    betekenis:
      "Jullie antwoorden laten geen eenduidig beeld zien. Sommige succesfactoren zijn sterk, andere kwetsbaar. Het team bevindt zich mogelijk in verschillende fasen tegelijk, afhankelijk van het onderwerp of de situatie.",
    volgendeFase: null,
    naarVolgende:
      "Begin bij het patroon in jullie antwoorden: welke succesfactoren wijken af? Bespreek eerst de zwakste factor als gespreksopening — niet als oordeel, maar als vraag: 'Herkennen we dit, en wat zou helpen?' Pas daarna kun je samen bepalen of een fase-typering zinvol voelt.",
  },
};

export const faseLabels = {
  forming: "Forming — oriëntatie en voorzichtigheid",
  storming: "Storming — spanning en positionering",
  norming: "Norming — afspraken en ritme",
  performing: "Performing — soepel samenwerken",
  "gemengd beeld": "Gemengd beeld — geen eenduidige fase",
};

export const volgendeFaseLabels = {
  storming: "storming",
  norming: "norming",
  performing: "performing",
};
