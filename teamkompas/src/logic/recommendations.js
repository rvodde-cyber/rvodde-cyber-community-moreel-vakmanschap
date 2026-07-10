export const recommendations = {
  doelen: {
    kwetsbaar:
      "Laat het team het doel herformuleren tot iets specifieks en meetbaars, met een kort feedbackmoment ingebouwd. (geïnspireerd door onderzoek naar doelhelderheid, Locke & Latham)",
    groeiend:
      "Laat het team zelf meebeslissen over de doelen in plaats van ze alleen te ontvangen, en splits complexe doelen op in subdoelen.",
    sterk:
      "Bouw een periodiek 'kloppen onze doelen nog?'-moment in, zodat scherpte niet stilzwijgend verslapt.",
  },
  initiatief: {
    kwetsbaar:
      "Geef elk teamlid een autonoom, herkenbaar onderdeel waar hij/zij volledig verantwoordelijk voor is. (geïnspireerd door onderzoek naar psychologisch eigenaarschap)",
    groeiend:
      "Geef teamleden ruimte om zelf de aanpak te kiezen, niet alleen de taak.",
    sterk:
      "Bouw een licht, kort afstemmingsmoment in zodat initiatieven zichtbaar blijven, zonder ze af te remmen.",
  },
  flexibiliteit: {
    kwetsbaar:
      "Bouw een vast 'wat leren we, wat passen we aan'-moment in ná elke fase. (geïnspireerd door onderzoek naar adaptief teamgedrag)",
    groeiend:
      "Voeg naast het terugkijk-moment ook een vast 'wat zien we aankomen?'-moment toe.",
    sterk:
      "Leg grotere aanpassingen kort terug tegen het teamdoel voordat ze definitief worden.",
  },
  respect: {
    kwetsbaar:
      "Maak afwijkende inzichten een vast agendapunt. (geïnspireerd door onderzoek naar psychologische veiligheid, Edmondson)",
    groeiend:
      "Vraag bij besluiten expliciet naar minderheidsstandpunten vóórdat de knoop wordt doorgehakt.",
    sterk:
      "Wijs bij belangrijke besluiten bewust een 'advocaat van de duivel' aan, of laat mensen eerst onafhankelijk hun twijfels opschrijven vóór de groepsdiscussie. (geïnspireerd door onderzoek naar groupthink, Janis)",
  },
  communicatie: {
    kwetsbaar:
      "Begin bij vertrouwen: kleine, terugkerende momenten waarin twijfels of fouten gedeeld mogen worden zonder gevolgen. (geïnspireerd door Lencioni's model van teamdisfuncties)",
    groeiend:
      "Introduceer een vaste vorm voor kritische feedback (bv. 'wat werkt, wat kan beter') in plaats van dit aan toeval over te laten.",
    sterk:
      "Koppel elk open gesprek aan een concreet vervolg (wie doet wat), zodat openheid niet in vrijblijvendheid verzandt.",
  },
  verantwoordelijkheid: {
    kwetsbaar:
      "Maak na elk besluit expliciet wie welk deel oppakt en tegen wanneer. (geïnspireerd door Lencioni en onderzoek naar eigenaarschap)",
    groeiend:
      "Maak het normaal dat teamleden elkáár aanspreken op afspraken, niet alleen de leider.",
    sterk:
      "Blijf, ook als het goed gaat, besluiten en eigenaarschap kort vastleggen — impliciete afspraken sneuvelen het eerst bij drukte of teamwissels.",
  },
};

export function getRecommendation(factorKey, niveau) {
  return recommendations[factorKey]?.[niveau] ?? "";
}
