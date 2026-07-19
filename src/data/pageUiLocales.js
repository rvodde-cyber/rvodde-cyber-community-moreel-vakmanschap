/** Pagina-UI voor SV, CS, DA — bibliotheekmateriaal blijft NL/EN */

const navItemsSv = [
  { label: "Välkommen", href: "/welcome" },
  { label: "Modellen", href: "/model" },
  { label: "Om oss", href: "/about" },
  { label: "Vad vi erbjuder", href: "/what-we-offer" },
  { label: "Samtalskort", href: "/conversation-cards" },
  { label: "Ordbok", href: "/dictionary" },
  { label: "Bibliotek", href: "/library" },
  { label: "Gå med", href: "/join", knop: true },
];

const navItemsCs = [
  { label: "Vítejte", href: "/welcome" },
  { label: "Model", href: "/model" },
  { label: "O nás", href: "/about" },
  { label: "Co nabízíme", href: "/what-we-offer" },
  { label: "Konverzační karty", href: "/conversation-cards" },
  { label: "Slovník", href: "/dictionary" },
  { label: "Knihovna", href: "/library" },
  { label: "Připojit se", href: "/join", knop: true },
];

const navItemsDa = [
  { label: "Velkommen", href: "/welcome" },
  { label: "Modellen", href: "/model" },
  { label: "Om os", href: "/about" },
  { label: "Hvad vi tilbyder", href: "/what-we-offer" },
  { label: "Samtalekort", href: "/conversation-cards" },
  { label: "Ordbog", href: "/dictionary" },
  { label: "Bibliotek", href: "/library" },
  { label: "Bliv medlem", href: "/join", knop: true },
];

const welkomSv = {
  label: "Om plattformen",
  titel: "Välkommen till Community Moral Craftsmanship",
  subtitel:
    "En plats där lärare och forskare tillsammans arbetar med etikundervisning som verkligen formar människor.",
  blokken: [
    {
      titel: "Vad är denna plattform?",
      tekst: "Plattformen är en Community of Practice för alla som arbetar med etikundervisning inom yrkeshögskola och universitet — i Nederländerna och internationellt. Det är varken en kunskapsbank, en kurs eller ett resultattavla. Det är en mötesplats för människor som tror att moralisk formning kräver mer än kunskapsöverföring.",
    },
    {
      titel: "Vad handlar det om?",
      tekst: "Etik försvinner från högre utbildning under press från examination och innehållsleverans. Studenter lär sig vad som är rätt — men förbereds sällan för den komplexa verklighet där något verkligen står på spel. Plattformen är ett svar på den spänningen: en plats där lärare delar material, utbyter erfarenheter och tillsammans bygger undervisning som verkligen formar.",
    },
    {
      titel: "För vem är det?",
      tekst: "För lärare och forskare vid yrkeshögskolor och universitet som arbetar med etikundervisning, moralisk formning eller yrkesetik. Oavsett om du precis börjat eller har många års erfarenhet — du är välkommen. Communityn är öppen, materialet är fritt att använda och det kostar inget att delta.",
    },
    {
      titel: "Hur fungerar det?",
      tekst: "Plattformen bygger på modellen Moral Craftsmanship — en cyklisk modell i fem steg: Se, Känna, Väga, Handla och Hålla ut. För varje steg hittar du verktyg, arbetsblad och samtalskort som du kan använda direkt i din undervisning. Medlemmar delar det som fungerar, svarar på varandras material och möts i online-sessioner var sjätte vecka.",
    },
  ],
  cta: "Gå med i communityn",
  ctaSecundair: "Se modellen",
};

const welkomCs = {
  label: "O platformě",
  titel: "Vítejte v Community Moral Craftsmanship",
  subtitel:
    "Místo, kde učitelé a výzkumníci společně pracují na etické výchově, která skutečně formuje lidi.",
  blokken: [
    {
      titel: "Co je tato platforma?",
      tekst: "Platforma je Community of Practice pro všechny, kdo se věnují etické výchově ve vyšším odborném a akademickém vzdělávání — v Nizozemsku i mezinárodně. Není to databáze znalostí, kurz ani žebříček. Je to místo setkání pro lidi, kteří věří, že morální formace vyžaduje víc než předávání znalostí.",
    },
    {
      titel: "O co jde?",
      tekst: "Etika mizí z vysokoškolského vzdělávání pod tlakem hodnocení a předávání obsahu. Studenti se učí, co je správné — ale jen zřídka jsou připraveni na složitou realitu situací, kde skutečně něco stojí v sázce. Platforma je odpovědí na toto napětí: místo, kde učitelé sdílejí materiály, vyměňují zkušenosti a společně budují vzdělávání, které skutečně formuje.",
    },
    {
      titel: "Pro koho je určena?",
      tekst: "Pro učitele a výzkumníky na vysokých školách a univerzitách, kteří pracují na etické výchově, morální formaci nebo profesní etice. Ať právě začínáte, nebo máte dlouholeté zkušenosti — jste vítáni. Komunita je otevřená, materiály jsou volně k použití a účast nic nestojí.",
    },
    {
      titel: "Jak to funguje?",
      tekst: "Platforma je postavena kolem modelu Moral Craftsmanship — cyklického modelu pěti kroků: Vidět, Cítit, Vážit, Jednat a Vytrvat. U každého kroku najdete nástroje, pracovní listy a konverzační karty, které můžete rovnou použít ve výuce. Členové sdílejí, co funguje, reagují na materiály kolegů a setkávají se v online sezeních každých šest týdnů.",
    },
  ],
  cta: "Připojte se ke komunitě",
  ctaSecundair: "Zobrazit model",
};

const welkomDa = {
  label: "Om platformen",
  titel: "Velkommen til Community Moral Craftsmanship",
  subtitel:
    "Et sted, hvor undervisere og forskere sammen arbejder med etikundervisning, der virkelig former mennesker.",
  blokken: [
    {
      titel: "Hvad er denne platform?",
      tekst: "Platformen er et Community of Practice for alle, der arbejder med etikundervisning i erhvervsakademier og universiteter — i Nederlandene og internationalt. Det er hverken en vidensbank, et kursus eller en rangliste. Det er et mødested for mennesker, der tror, at moralsk dannelse kræver mere end vidensformidling.",
    },
    {
      titel: "Hvad handler det om?",
      tekst: "Etik forsvinder fra videregående uddannelse under pres fra test og pensumlevering. Studerende lærer, hvad der er rigtigt — men forberedes sjældent på den komplekse virkelighed, hvor noget virkelig står på spil. Platformen er et svar på den spænding: et sted, hvor undervisere deler materialer, udveksler erfaringer og sammen bygger undervisning, der virkelig former.",
    },
    {
      titel: "Hvem er det for?",
      tekst: "For undervisere og forskere ved professionshøjskoler og universiteter, der arbejder med etikundervisning, moralsk dannelse eller professionsetik. Uanset om du lige er startet eller har mange års erfaring — du er velkommen. Fællesskabet er åbent, materialerne er frie at bruge, og det koster intet at deltage.",
    },
    {
      titel: "Hvordan fungerer det?",
      tekst: "Platformen er bygget omkring modellen Moral Craftsmanship — en cyklisk model med fem trin: Se, Føle, Vægte, Handle og Holde ud. For hvert trin finder du værktøjer, arbejdsark og samtalekort, som du kan bruge direkte i din undervisning. Medlemmer deler, hvad der virker, reagerer på hinandens materialer og mødes i online-sessioner hver sjette uge.",
    },
  ],
  cta: "Bliv en del af fællesskabet",
  ctaSecundair: "Se modellen",
};

const bibliotheekSv = {
  label: "Material",
  titel: "Bibliotek",
  subtitel:
    "Alla verktyg, arbetsblad och samtalskort — ordnade efter modellsteg. Välj ett steg för att börja.",
  bekijk: "Visa material →",
  stapLabel: "Steg",
  categorieLabel: "Kategori",
  materialenEn: "material",
  materialenMeervoud: "material",
  disclaimerTitel: "Användning & källhänvisning",
  disclaimerTekst:
    "Arbetsbladen på plattformen har utvecklats av Richard Voddé (Lectoraat Ethisch Werken, Fontys Hogescholen) som en del av Comenius Senior Fellowship. De underliggande teoretiska modellerna används med källhänvisning och är avsedda för icke-kommersiellt pedagogiskt bruk. Fritt att använda med källangivelse.",
};

const bibliotheekCs = {
  label: "Materiály",
  titel: "Knihovna",
  subtitel:
    "Všechny nástroje, pracovní listy a konverzační karty — uspořádané podle kroků modelu. Vyberte krok a začněte.",
  bekijk: "Zobrazit materiály →",
  stapLabel: "Krok",
  categorieLabel: "Kategorie",
  materialenEn: "materiál",
  materialenMeervoud: "materiály",
  disclaimerTitel: "Použití a uvedení zdroje",
  disclaimerTekst:
    "Pracovní listy na této platformě vyvinul Richard Voddé (Lectoraat Ethisch Werken, Fontys Hogescholen) v rámci Comenius Senior Fellowship. Podkladové teoretické modely jsou používány s uvedením zdroje a jsou určeny pro nekomerční vzdělávací účely. Volně k použití s uvedením zdroje.",
};

const bibliotheekDa = {
  label: "Materialer",
  titel: "Bibliotek",
  subtitel:
    "Alle værktøjer, arbejdsark og samtalekort — organiseret efter modeltrin. Vælg et trin for at komme i gang.",
  bekijk: "Se materialer →",
  stapLabel: "Trin",
  categorieLabel: "Kategori",
  materialenEn: "materiale",
  materialenMeervoud: "materialer",
  disclaimerTitel: "Brug & kildeangivelse",
  disclaimerTekst:
    "Arbejdsarkene på platformen er udviklet af Richard Voddé (Lectoraat Ethisch Werken, Fontys Hogescholen) som en del af Comenius Senior Fellowship. De underliggende teoretiske modeller anvendes med kildeangivelse og er beregnet til ikke-kommerciel uddannelsesbrug. Fri at bruge med kildeangivelse.",
};

const stapPaginaSv = {
  terug: "← Tillbaka till biblioteket",
  stap: "Steg",
  categorie: "Kategori",
  downloadNL: "Ladda ner NL",
  downloadEN: "Ladda ner EN",
  binnenkort: "Kommer snart",
  nietGevonden: "Sidan hittades inte.",
  bronLabel: "Källa:",
  ctaTitel: "Använder du detta i din undervisning?",
  ctaTekst:
    "Dela dina erfarenheter, lär av kollegor och bidra till en community som stärker etikundervisning.",
  ctaKnop: "Gå med →",
  bibliotheekLink: "Visa material i biblioteket →",
};

const stapPaginaCs = {
  terug: "← Zpět do knihovny",
  stap: "Krok",
  categorie: "Kategorie",
  downloadNL: "Stáhnout NL",
  downloadEN: "Stáhnout EN",
  binnenkort: "Brzy k dispozici",
  nietGevonden: "Stránka nenalezena.",
  bronLabel: "Zdroj:",
  ctaTitel: "Používáte to ve výuce?",
  ctaTekst:
    "Sdílejte své zkušenosti, učte se od kolegů a přispějte ke komunitě, která posiluje etickou výchovu.",
  ctaKnop: "Připojit se →",
  bibliotheekLink: "Zobrazit materiály v knihovně →",
};

const stapPaginaDa = {
  terug: "← Tilbage til biblioteket",
  stap: "Trin",
  categorie: "Kategori",
  downloadNL: "Download NL",
  downloadEN: "Download EN",
  binnenkort: "Kommer snart",
  nietGevonden: "Siden blev ikke fundet.",
  bronLabel: "Kilde:",
  ctaTitel: "Bruger du dette i din undervisning?",
  ctaTekst:
    "Del dine erfaringer, lær af kolleger og bidrag til et fællesskab, der styrker etikundervisning.",
  ctaKnop: "Bliv medlem →",
  bibliotheekLink: "Se materialer i biblioteket →",
};

const gesprekskaartenSv = {
  hero: {
    label: "Metoden",
    titel: "Samtalskort",
    subtitel: "Inget rätt svar. Bara ett äkta samtal.",
    intro:
      "Ett samtalskort beskriver en igenkännbar situation från yrkespraktiken — med namn, en miljö och spänning — som leder till ett moraliskt dilemma utan enkelt svar. Kortet bjuder in; det styr inte.",
  },
  waarom: {
    titel: "Varför fungerar de?",
    pijlers: [
      {
        titel: "Inget rätt svar",
        tekst: "Studenter och yrkesverksamma är vana vid att söka det förväntade svaret. Samtalskortet tar bort den flyktvägen. Du måste försvara ett val, lyssna på andra som väljer annorlunda och skärpa ditt eget resonemang.",
      },
      {
        titel: "Praktiknära material",
        tekst: "Situationerna kommer från verkligheten — bidragna av alumner och yrkesverksamma. Det är skillnaden mellan en övning och en verklig förberedelse för arbetslivet.",
      },
      {
        titel: "Samtal som metod",
        tekst: "Moraliskt omdöme utvecklas i dialog. Kortet skapar det samtalet — på ett tillgängligt, icke-hotande sätt.",
      },
    ],
  },
  hoe: {
    titel: "Hur används de?",
    intro:
      "Grundformen är enkel: läs kortet, titta på bilden och inled ett samtal utifrån de två frågorna. Ingen modell behövs.",
    vormen: [
      "Inledning till en lektion eller ett möte",
      "Diskussionsform i små grupper",
      "Reflektionsverktyg efter praktik",
      "Grund för strukturerat moraliskt beraad",
    ],
    niveaus:
      "Korten är ordnade efter komplexitet — från tillgängliga vardagsdilemman till systemiska situationer där hierarki, regler och etik samtidigt står på spel.",
    werkbladTitel: "Fyra arbetsformer med samtalskort",
    werkbladTekst:
      "Handledningsblad med fyra arbetsformer — en per fas (Se, Känna, Väga, Handla) — för grupper om 4–8 deltagare.",
    werkbladDownload: "Ladda ner arbetsblad (.docx)",
  },
  preview: {
    titel: "Tillgängliga kort",
    subtitel: "Varje kort avslutas med samma två frågor:",
    vraag1: "Vad skulle du göra och varför?",
    vraag2: "Vilka värderingar är i spel här?",
  },
  introToggle: "Om metoden — varför och hur?",
  cta: {
    titel: "Vad finns tillgängligt?",
    tekst: "Inom Community Moral Craftsmanship finns set för olika domäner och sammanhang. Medlemmar kan ladda ner material, använda det i praktiken och — när det fungerar — dela tillbaka med communityn.",
    knop: "Gå med i communityn",
  },
};

const gesprekskaartenCs = {
  hero: {
    label: "Metoda",
    titel: "Konverzační karty",
    subtitel: "Neexistuje správná odpověď. Jen skutečný rozhovor.",
    intro:
      "Konverzační karta popisuje rozpoznatelnou situaci z profesní praxe — se jmény, prostředím a napětím — která vede k morálnímu dilematu bez jednoduché odpovědi. Karta zve k reflexi; nenutí směr.",
  },
  waarom: {
    titel: "Proč fungují?",
    pijlers: [
      {
        titel: "Neexistuje správná odpověď",
        tekst: "Studenti a profesionálové jsou zvyklí hledat očekávanou odpověď. Konverzační karta tuto únikovou cestu odstraňuje. Musíte obhájit volbu, naslouchat těm, kdo volí jinak, a zpřesnit vlastní uvažování.",
      },
      {
        titel: "Materiál z praxe",
        tekst: "Situace pocházejí ze skutečného života — přispěli absolventi a profesionálové. To je rozdíl mezi cvičením a skutečnou přípravou na pracovní život.",
      },
      {
        titel: "Dialog jako metoda",
        tekst: "Morální úsudek se rozvíjí v rozhovoru. Karta vytváří tento dialog — nenásilným, přístupným způsobem.",
      },
    ],
  },
  hoe: {
    titel: "Jak se používají?",
    intro:
      "Základní forma je jednoduchá: přečtěte kartu, podívejte se na obrázek a začněte rozhovor pomocí dvou otázek. Není potřeba žádný model.",
    vormen: [
      "Úvod do hodiny nebo setkání",
      "Diskusní forma v malých skupinách",
      "Reflexní nástroj po praxi",
      "Základ pro strukturované morální uvážení",
    ],
    niveaus:
      "Karty jsou uspořádány podle složitosti — od přístupných každodenních dilemat po systémové situace, kde se najednou střetávají hierarchie, regulace a etika.",
    werkbladTitel: "Čtyři pracovní formy s konverzačními kartami",
    werkbladTekst:
      "Facilitační pracovní list se čtyřmi pracovními formami — jedna na fázi (Vidět, Cítit, Vážit, Jednat) — pro skupiny 4–8 účastníků.",
    werkbladDownload: "Stáhnout pracovní list (.docx)",
  },
  preview: {
    titel: "Dostupné karty",
    subtitel: "Každá karta končí stejnými dvěma otázkami:",
    vraag1: "Co byste udělali a proč?",
    vraag2: "Jaké hodnoty jsou zde v sázce?",
  },
  introToggle: "O metodě — proč a jak?",
  cta: {
    titel: "Co je k dispozici?",
    tekst: "V rámci Community Moral Craftsmanship jsou k dispozici sady pro různé oblasti a kontexty. Členové mohou materiály stahovat, používat je v praxi a — pokud fungují — sdílet zpět s komunitou.",
    knop: "Připojte se ke komunitě",
  },
};

const gesprekskaartenDa = {
  hero: {
    label: "Metoden",
    titel: "Samtalekort",
    subtitel: "Intet rigtigt svar. Bare en ægte samtale.",
    intro:
      "Et samtalekort beskriver en genkendelig situation fra praksis — med navne, en setting og spænding — der fører til et moralsk dilemma uden et let svar. Kortet inviterer til refleksion; det styrer ikke.",
  },
  waarom: {
    titel: "Hvorfor virker de?",
    pijlers: [
      {
        titel: "Intet rigtigt svar",
        tekst: "Studerende og fagfolk er vant til at lede efter det forventede svar. Samtalekortet fjerner den flugtvej. Du skal forsvare et valg, lytte til andre, der vælger anderledes, og skærpe din egen begrundelse.",
      },
      {
        titel: "Praksisnært materiale",
        tekst: "Situationerne kommer fra virkeligheden — bidraget af alumner og fagfolk. Det er forskellen mellem en øvelse og en reel forberedelse til arbejdslivet.",
      },
      {
        titel: "Dialog som metode",
        tekst: "Moralsk dømmekraft udvikles i samtale. Kortet skaber den dialog — på en lavterskel, ikke-truende måde.",
      },
    ],
  },
  hoe: {
    titel: "Hvordan bruges de?",
    intro:
      "Grundformen er enkel: læs kortet, se billedet, og start en samtale ud fra de to spørgsmål. Ingen model er nødvendig.",
    vormen: [
      "Indledning til en lektion eller et møde",
      "Diskussionsformat i små grupper",
      "Refleksionsværktøj efter praktik",
      "Grundlag for struktureret moralsk overvejelse",
    ],
    niveaus:
      "Kortene er organiseret efter kompleksitet — fra tilgængelige hverdagsdilemmaer til systemiske situationer, hvor hierarki, regulering og etik er i spænding på én gang.",
    werkbladTitel: "Fire arbejdsformer med samtalekort",
    werkbladTekst:
      "Faciliteringsark med fire arbejdsformer — én pr. fase (Se, Føle, Vægte, Handle) — for grupper på 4–8 deltagere.",
    werkbladDownload: "Download arbejdsark (.docx)",
  },
  preview: {
    titel: "Tilgængelige kort",
    subtitel: "Hvert kort afsluttes med de samme to spørgsmål:",
    vraag1: "Hvad ville du gøre, og hvorfor?",
    vraag2: "Hvilke værdier er på spil her?",
  },
  introToggle: "Om metoden — hvorfor og hvordan?",
  cta: {
    titel: "Hvad er tilgængeligt?",
    tekst: "Inden for Community Moral Craftsmanship findes sæt til forskellige domæner og kontekster. Medlemmer kan downloade materialer, bruge dem i praksis og — når de virker — dele dem tilbage med fællesskabet.",
    knop: "Bliv en del af fællesskabet",
  },
};

export const pageUiLocales = {
  sv: {
    navItems: navItemsSv,
    welkom: welkomSv,
    bibliotheek: bibliotheekSv,
    stapPagina: stapPaginaSv,
    gesprekskaarten: gesprekskaartenSv,
  },
  cs: {
    navItems: navItemsCs,
    welkom: welkomCs,
    bibliotheek: bibliotheekCs,
    stapPagina: stapPaginaCs,
    gesprekskaarten: gesprekskaartenCs,
  },
  da: {
    navItems: navItemsDa,
    welkom: welkomDa,
    bibliotheek: bibliotheekDa,
    stapPagina: stapPaginaDa,
    gesprekskaarten: gesprekskaartenDa,
  },
};
