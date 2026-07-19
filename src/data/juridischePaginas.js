/**
 * Privacyverklaring & Communityrichtlijnen — definitieve NL-tekst.
 * EN: nog geen vertaling; toon "coming soon"-melding (geen machinevertaling).
 */

export const privacyContent = {
  accent: "#185fa5",
  pathNl: "/privacy",
  pathEn: "/privacy",
  meta: {
    nl: {
      title: "Privacyverklaring — Community Moreel Vakmanschap",
      description:
        "Privacyverklaring (AVG) van de Community Moreel Vakmanschap: welke gegevens we verzamelen, waarom, en jouw rechten.",
    },
    en: {
      title: "Privacy Statement — Community Moral Craftsmanship",
      description:
        "Privacy statement for the Community of Moral Craftsmanship. English translation coming soon.",
    },
  },
  nl: {
    titel: "Privacyverklaring (AVG)",
    secties: [
      {
        titel: "Wie zijn wij",
        alineaas: [
          "Dit platform wordt beheerd door het Lectoraat Ethisch Werken van Fontys Hogescholen, als onderdeel van de Community Moreel Vakmanschap. Voor vragen over deze privacyverklaring of over hoe we met jouw gegevens omgaan, kun je contact opnemen via lectoraatethischwerken@fontys.nl.",
        ],
      },
      {
        titel: "Welke gegevens verzamelen we",
        alineaas: [
          "Wanneer je je aanmeldt voor de community via ons aanmeldformulier, vragen we om:",
        ],
        bullets: [
          "Je naam",
          "Je e-mailadres",
          "De hogeschool of universiteit waar je aan verbonden bent",
          "Optioneel: je interesse of focus binnen het Model Moreel Vakmanschap",
        ],
        alineaasNa: [
          "We verzamelen geen gegevens over jouw studenten. Deel bij het gebruik van gesprekskaarten, materialen of het delen van ervaringen dan ook nooit herleidbare informatie over individuele studenten.",
        ],
      },
      {
        titel: "Waarom we deze gegevens verzamelen",
        alineaas: ["We gebruiken je gegevens uitsluitend om:"],
        bullets: [
          "Je uit te nodigen voor community-sessies en bijeenkomsten",
          "Je op de hoogte te houden van nieuwe materialen en ontwikkelingen binnen de community",
          "Een beeld te krijgen van wie er betrokken is bij de community, ten behoeve van de Comenius Senior Fellowship-verantwoording",
        ],
        alineaasNa: [
          "We gebruiken je gegevens niet voor commerciële doeleinden en delen ze niet met derden buiten Fontys Hogescholen.",
        ],
      },
      {
        titel: "Waar en hoe we je gegevens bewaren",
        alineaas: [
          "Aanmeldingen komen binnen via een Google Form en worden opgeslagen in een Google Spreadsheet die alleen toegankelijk is voor het lectoraatsteam. We bewaren je gegevens zolang je actief betrokken bent bij de community, en maximaal twee jaar na je laatste contact met ons, tenzij je eerder aangeeft verwijderd te willen worden.",
        ],
      },
      {
        titel: "Jouw rechten",
        alineaas: ["Je hebt het recht om:"],
        bullets: [
          "Inzage te vragen in de gegevens die we van je hebben",
          "Onjuiste gegevens te laten corrigeren",
          "Je gegevens te laten verwijderen",
          "Je aanmelding voor de community-mailing op elk moment stop te zetten",
        ],
        alineaasNa: [
          "Stuur hiervoor een e-mail naar lectoraatethischwerken@fontys.nl. We reageren binnen vier weken.",
        ],
      },
    ],
  },
  en: {
    titel: "Privacy Statement",
    comingSoon:
      "The English translation of this privacy statement is coming soon. The Dutch version is available via the language switcher (NL).",
  },
};

export const communityRichtlijnenContent = {
  accent: "#993c1d",
  pathNl: "/communityrichtlijnen",
  pathEn: "/community-guidelines",
  meta: {
    nl: {
      title: "Communityrichtlijnen — Community Moreel Vakmanschap",
      description:
        "Richtlijnen voor een veilige en waardevolle Community Moreel Vakmanschap: geen studentdata, bronvermelding, respect en ruimte voor twijfel.",
    },
    en: {
      title: "Community Guidelines — Community Moral Craftsmanship",
      description:
        "Community guidelines for the Community of Moral Craftsmanship. English translation coming soon.",
    },
  },
  nl: {
    titel: "Communityrichtlijnen",
    intro:
      "De Community Moreel Vakmanschap is een plek voor docenten en onderzoekers om samen na te denken over ethiekonderwijs — met ruimte voor twijfel, onenigheid en het nog niet weten. Deze richtlijnen helpen die ruimte veilig en waardevol te houden.",
    secties: [
      {
        titel: "1. Geen studentdata",
        alineaas: [
          "Deel nooit namen, casussen of details waarmee individuele studenten herleidbaar zijn — ook niet in geanonimiseerde vorm als de context het alsnog duidelijk maakt. Bespreek dilemma's op het niveau van het onderwijsproces, niet van de persoon.",
        ],
      },
      {
        titel: "2. Bronvermelding",
        alineaas: [
          "Materialen, gesprekskaarten en werkbladen die je deelt of aanpast: vermeld altijd wie het oorspronkelijk heeft gemaakt. Bouw je voort op het werk van iemand anders binnen de community, geef dat dan expliciet aan.",
        ],
      },
      {
        titel: "3. Respect voor verschil",
        alineaas: [
          "Ethiekonderwijs raakt aan overtuigingen die uiteenlopen. Een goed gesprek hoeft niet te eindigen in consensus. Reageer op ideeën, niet op personen; wees kritisch op inhoud, nooit kleinerend naar wie het inbrengt.",
        ],
      },
      {
        titel: "4. Geen kant-en-klare antwoorden",
        alineaas: [
          "In lijn met Biesta's zwakke pedagogiek is deze community geen plek om het \"juiste\" antwoord te verkondigen. Vragen en twijfel zijn net zo waardevol als uitgewerkte materialen.",
        ],
      },
      {
        titel: "5. Wat we hier niet doen",
        bullets: [
          "Geen scoreborden, badges of punten — bijdragen worden niet tegen elkaar afgezet",
          "Geen ongemodereerde open reacties zonder toezicht",
          "Geen materiaal achter een betaalmuur",
        ],
      },
      {
        titel: "Vragen of zorgen",
        alineaas: [
          "Loopt een gesprek of bijdrage niet zoals het zou moeten? Neem contact op met lectoraatethischwerken@fontys.nl — we nemen elke melding serieus en reageren persoonlijk.",
        ],
      },
    ],
  },
  en: {
    titel: "Community Guidelines",
    comingSoon:
      "The English translation of these community guidelines is coming soon. The Dutch version is available via the language switcher (NL).",
  },
};

/** Path → meta voor DocumentTaal */
export const juridischePageMetaByPath = {
  "/privacy": privacyContent.meta,
  "/communityrichtlijnen": communityRichtlijnenContent.meta,
  "/community-guidelines": communityRichtlijnenContent.meta,
};
