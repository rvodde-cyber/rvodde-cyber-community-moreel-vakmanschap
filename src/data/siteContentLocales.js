/** Volledige site-inhoud voor Model, Over ons en Aanmelden (SV, CS, DA) */

const sharedStappenSv = [
  { nummer: 1, naam: "Se", kernvraag: "Vad händer här egentligen?", beschrijving: "Du känner igen att något moraliskt är i spel. Att se är det första steget — och det mest underskattade.", flowLabel: "Medvetenhet", tools: ["Samtalskort", "Moralisk ordlista", "Arbetsblad"] },
  { nummer: 2, naam: "Känna", kernvraag: "Vad ger mig moralisk obehagskänsla?", beschrijving: "Innan du börjar resonera känner du redan något. Obekväma känslor är inte brus — de är moralisk information.", flowLabel: "Inre kompass", tools: ["Hjulet av moralisk förmögenhet"] },
  { nummer: 3, naam: "Väga", kernvraag: "Vad kolliderar här?", beschrijving: "Värderingar, intressen, ansvar, sammanhang. Moralisk avvägning är ingen beräkning — det är en omsorgsfull bedömning av vad som står på spel.", flowLabel: "Moralisk avvägning", tools: ["Moralisk överläggning", "Förtroendespegel", "Moraliskt lackmustest"] },
  { nummer: 4, naam: "Handla", kernvraag: "Vad kräver detta av mig?", beschrijving: "Du agerar utifrån ditt moraliska omdöme. Det kräver mod — viljan att stå upp för det som är rätt, även när det är obekvämt.", flowLabel: "Moraliskt mod", tools: ["Moraliskt mod", "MAPS-trilogin"] },
  { nummer: 5, naam: "Hålla ut", kernvraag: "Vilken kurs vill jag hålla?", beschrijving: "Moral craftsmanship är ingen engångsprestation. Det kräver uthållighet — att hålla kursen i tid och motgång.", flowLabel: "Integritet & uthållighet", tools: ["Moralisk spegel", "Hålla kursen", "Ledarskap i moralisk kvalitet (kommer snart)"] },
];

const sharedStappenCs = [
  { nummer: 1, naam: "Vidět", kernvraag: "Co se zde skutečně děje?", beschrijving: "Rozpoznáte, že jde o morální situaci. Vidět je první krok — a nejvíce podceňovaný.", flowLabel: "Uvědomění", tools: ["Konverzační karty", "Slovník morálky", "Pracovní listy"] },
  { nummer: 2, naam: "Cítit", kernvraag: "Co ve mně vyvolává morální nepohodlí?", beschrijving: "Než začnete uvažovat, už něco cítíte. Ten pocit není šum — je to morální informace.", flowLabel: "Vnitřní kompas", tools: ["Kolo morálního bohatství"] },
  { nummer: 3, naam: "Vážit", kernvraag: "Co se zde střetává?", beschrijving: "Hodnoty, zájmy, odpovědnosti, kontext. Morální vážení není výpočet — je to pečlivé zvažování toho, co je v sázce.", flowLabel: "Morální uvážení", tools: ["Morální porada", "Zrcadlo důvěry", "Morální lakmusový test"] },
  { nummer: 4, naam: "Jednat", kernvraag: "Co to po mně vyžaduje?", beschrijving: "Jednáte podle svého morálního úsudku. To vyžaduje odvahu — ochotu stát si za tím, co je správné.", flowLabel: "Morální odvaha", tools: ["Morální odvaha", "Trilogie MAPS"] },
  { nummer: 5, naam: "Vytrvat", kernvraag: "Jaký směr chci držet?", beschrijving: "Moral craftsmanship není jednorázový výkon. Vyžaduje vytrvalost — držet kurz v čase a v protivenství.", flowLabel: "Integrita a vytrvalost", tools: ["Morální zrcadlo", "Držet kurz", "Vedení v morální kvalitě (brzy)"] },
];

const sharedStappenDa = [
  { nummer: 1, naam: "Se", kernvraag: "Hvad sker der egentlig her?", beschrijving: "Du genkender, at noget moralsk er i spil. At se er det første trin — og det mest undervurderede.", flowLabel: "Bevidsthed", tools: ["Samtalekort", "Moralordbog", "Arbejdsark"] },
  { nummer: 2, naam: "Føle", kernvraag: "Hvad giver mig moralsk uro?", beschrijving: "Før du begynder at ræsonnere, mærker du allerede noget. Den følelse er ikke støj — den er moralsk information.", flowLabel: "Indre kompas", tools: ["Hjulet af moralsk formue"] },
  { nummer: 3, naam: "Vægte", kernvraag: "Hvad støder sammen her?", beschrijving: "Værdier, interesser, ansvar, kontekst. Moralsk afvejning er ikke en beregning — det er en omhyggelig vurdering af, hvad der står på spil.", flowLabel: "Moralsk afvejning", tools: ["Moralsk overvejelse", "Tillidsspejl", "Moralsk lakmusprøve"] },
  { nummer: 4, naam: "Handle", kernvraag: "Hvad kræver dette af mig?", beschrijving: "Du handler ud fra din moralske dømmekraft. Det kræver mod — viljen til at stå ved det, der er rigtigt.", flowLabel: "Moralsk mod", tools: ["Moralsk mod", "MAPS-trilogien"] },
  { nummer: 5, naam: "Holde ud", kernvraag: "Hvilken kurs vil jeg holde?", beschrijving: "Moral craftsmanship er ikke en engangspræstation. Det kræver udholdenhed — at holde kursen i tid og modgang.", flowLabel: "Integritet & udholdenhed", tools: ["Moralsk spejl", "Holde kursen", "Lederskab i moralsk kvalitet (kommer snart)"] },
];

const overPaginaStappenSv = [
  { naam: "Se", vraag: "Vad händer här egentligen?", beschrijving: "Du känner igen att något moraliskt är i spel. Att se är det första steget — och det mest underskattade.", label: "Medvetenhet" },
  { naam: "Känna", vraag: "Vad ger mig moralisk obehagskänsla?", beschrijving: "Innan du börjar resonera känner du redan något. Den känslan är inte brus — den är moralisk information.", label: "Inre kompass" },
  { naam: "Väga", vraag: "Vad kolliderar här?", beschrijving: "Värderingar, intressen, ansvar, sammanhang. Moralisk avvägning är ingen beräkning — det är en omsorgsfull bedömning.", label: "Moralisk avvägning" },
  { naam: "Handla", vraag: "Vad kräver detta av mig?", beschrijving: "Du agerar utifrån ditt moraliska omdöme. Det kräver mod — viljan att stå upp för det som är rätt.", label: "Moraliskt mod" },
  { naam: "Hålla ut", vraag: "Vilken kurs vill jag hålla?", beschrijving: "Moral craftsmanship är ingen engångsprestation. Det kräver uthållighet — att hålla kursen i motgång.", label: "Integritet & uthållighet" },
];

const overPaginaStappenCs = [
  { naam: "Vidět", vraag: "Co se zde skutečně děje?", beschrijving: "Rozpoznáte, že jde o morální situaci. Vidět je první krok — a nejvíce podceňovaný.", label: "Uvědomění" },
  { naam: "Cítit", vraag: "Co ve mně vyvolává morální nepohodlí?", beschrijving: "Než začnete uvažovat, už něco cítíte. Ten pocit není šum — je to morální informace.", label: "Vnitřní kompas" },
  { naam: "Vážit", vraag: "Co se zde střetává?", beschrijving: "Hodnoty, zájmy, odpovědnosti, kontext. Morální vážení není výpočet — je to pečlivé zvažování.", label: "Morální uvážení" },
  { naam: "Jednat", vraag: "Co to po mně vyžaduje?", beschrijving: "Jednáte podle svého morálního úsudku. To vyžaduje odvahu — ochotu stát si za tím, co je správné.", label: "Morální odvaha" },
  { naam: "Vytrvat", vraag: "Jaký směr chci držet?", beschrijving: "Moral craftsmanship není jednorázový výkon. Vyžaduje vytrvalost — držet kurz v protivenství.", label: "Integrita a vytrvalost" },
];

const overPaginaStappenDa = [
  { naam: "Se", vraag: "Hvad sker der egentlig her?", beschrijving: "Du genkender, at noget moralsk er i spil. At se er det første trin — og det mest undervurderede.", label: "Bevidsthed" },
  { naam: "Føle", vraag: "Hvad giver mig moralsk uro?", beschrijving: "Før du ræsonnerer, mærker du allerede noget. Den følelse er ikke støj — den er moralsk information.", label: "Indre kompas" },
  { naam: "Vægte", vraag: "Hvad støder sammen her?", beschrijving: "Værdier, interesser, ansvar, kontekst. Moralsk afvejning er ikke en beregning — det er en omhyggelig vurdering.", label: "Moralsk afvejning" },
  { naam: "Handle", vraag: "Hvad kræver dette af mig?", beschrijving: "Du handler ud fra din moralske dømmekraft. Det kræver mod — viljen til at stå ved det rigtige.", label: "Moralsk mod" },
  { naam: "Holde ud", vraag: "Hvilken kurs vil jeg holde?", beschrijving: "Moral craftsmanship er ikke en engangspræstation. Det kræver udholdenhed — at holde kursen i modgang.", label: "Integritet & udholdenhed" },
];

export const siteContentLocales = {
  sv: {
    meta: {
      title: "Community Moral Craftsmanship",
      description: "Community Moral Craftsmanship: en gemenskap av utövare inom etikundervisning.",
    },
    hero: {
      label: "Community",
      titel: "Moral Craftsmanship",
      subtitel: "En gemenskap av utövare inom etikundervisning",
    },
    kernLines: { line1: "Moraliska situationer", line2: "från praktiken" },
    model: {
      titel: "Modellen Moral Craftsmanship",
      subtitel: "Klicka på ett steg för att läsa mer",
      kern: "KÄRNA",
      kernSub: "Samtalskort",
      kernTekst: "Moraliska situationer från praktiken",
    },
    stappen: sharedStappenSv,
    fundament: {
      titel: "Om grunden",
      kernzin:
        "Moral craftsmanship innebär: fortsätta se, känna, väga, handla och hålla kurs — även när något står på spel. Men det innebär också: våga gå tillbaka. Den som handlar väl tvivlar längs vägen. Såg jag verkligen rätt? Stämmer min känsla, eller är det något annat? Vägde jag för snabbt? Den återkomsten är inte ett misslyckande — där bor praktiken.",
      linksTitel: "Modellen",
      linksTekst:
        "Modellen Moral Craftsmanship utvecklades av Lectoraat Ethisch Werken vid Fontys Hogescholen. Den bygger på arbetet av Karssing, Rest, Biesta och Aristoteles begrepp phronesis — praktisk visdom som utvecklas genom handling, reflektion och uthållighet.",
      rechtsTitel: "Biestas tänkande",
      rechtsTekst:
        "Gert Biesta varnar för learnification — att reducera utbildning till mätbara lärresultat. Denna community tror att moralisk formning inte kommer från en lärobok. Den erbjuder inga färdiga svar. Den erbjuder utrymme — för frågorna som stannar kvar, för mötet som formar.",
    },
    aanmelden: {
      titel: "Gå med",
      subtitel: "Bli en del av communityn",
      hint: "Berätta vem du är och vad du arbetar med. Ditt e-postprogram öppnas med ett ifyllt anmälningsmeddelande till Lectoraat Ethisch Werken.",
      naamLabel: "Namn",
      instellingLabel: "Institution",
      emailLabel: "E-postadress",
      vraagLabel: "Vad arbetar du med inom etikundervisning? (valfritt)",
      knop: "Skicka min anmälan",
      emailSubject: "Anmälan Community Moral Craftsmanship",
      emailVraag: "Vad arbetar du med inom etikundervisning?",
      emailTo: "lectoraatethischwerken@fontys.nl",
      nietIngevuld: "Ej angivet",
    },
    footer: {
      kernzin:
        "Moral craftsmanship innebär: fortsätta se, känna, väga, handla och hålla kurs — även när något står på spel. Men det innebär också: våga gå tillbaka. Den som handlar väl tvivlar längs vägen. Den återkomsten är inte ett misslyckande — där bor praktiken.",
      lectoraat: "Lectoraat Ethisch Werken — Fontys Hogescholen",
      contact: "r.vodde@fontys.nl",
    },
    stapKaart: { tools: "Verktyg" },
    overPagina: {
      label: "Om projektet",
      titel: "Community Moral Craftsmanship",
      subtitel: "En plattform för samskapande inom etikundervisning i högre utbildning",
      secties: [
        {
          titel: "Varför det behövs",
          alineaas: [
            "Etik försvinner i högre utbildning under press från examination och innehållsleverans. Gert Biesta kallar det learnification: utbildning reducerad till mätbara lärresultat. Resultatet är att yrkesverksamma går ut med kunskap om etik — men utan förmågan att handla moraliskt när något verkligen står på spel.",
            "Lärare som vill arbeta med detta gör det i dag i stort sett ensamma. Det finns inget gemensamt språk, ingen gemensam verktygslåda, ingen community.",
            "Det vill vi förändra.",
          ],
        },
        {
          titel: "Modellen Moral Craftsmanship",
          alineaas: [
            "Lectoraat Ethisch Werken vid Fontys Hogescholen utvecklade modellen Moral Craftsmanship: en cyklisk modell i fem steg som beskriver hur yrkesverksamma handlar moraliskt i praktiken.",
          ],
          stappen: overPaginaStappenSv,
          naStappen:
            "I centrum står samtalskortet: en moralisk situation från praktiken som aktiverar alla fem steg samtidigt. Modellen bygger på James Rest, Edgar Karssing och Aristoteles begrepp phronesis — praktisk visdom som utvecklas genom att göra, reflektera och hålla ut.",
        },
        {
          titel: "Communityn som plattform för samskapande",
          alineaas: [
            "Community Moral Craftsmanship samlar lärare och forskare från yrkeshögskolor och universitet — nationellt och internationellt. Inte en konferens, inte kunskapsöverföring från expert till mottagare, utan samskapande: tillsammans utveckla verktyg och undervisningsformer, taggade per modellsteg, delade via en öppen plattform.",
            "Bidrag har tre nivåer: 🌱 Koncept — nyligen testat, till inspiration · ✅ Testat — använt minst en gång i undervisning · ⭐ Rekommenderat — positivt bedömt av flera medlemmar.",
            "Var sjätte vecka möts vi online — 90 minuter, alltid öppnat med ett samtalskort, alltid avslutat med en öppen fråga att ta med sig.",
          ],
        },
        {
          titel: "Grund: Biestas svaga pedagogik",
          alineaas: [
            "Denna community är designad mot learnification. Inga topplistor, ingen gamification, inga färdiga svar.",
            "Gert Biesta förespråkar svag pedagogik: utrymme för det oväntade, det svåra, det verkliga. Varje session slutar inte med slutsatser utan med en fråga. Samtalskortet har inget rätt svar — bara ett äkta möte.",
            "Biesta kallar utbildning en vacker risk: du vet inte vad som växer när du för samman människor kring moralisk formning. Det är inte en svaghet — det är precis poängen.",
          ],
        },
      ],
    },
    maker: {
      label: "Skaparen",
      titel: "Richard Voddé",
      alineas: [
        "Richard Voddé är lektor och forskare i etiskt arbete vid Fontys Hogescholen i Tilburg. Som Comenius Senior Fellow arbetar han med frågan hur etikundervisning i högre yrkesutbildning verkligen formar — inte bara informerar.",
        "Han utvecklade modellen Moral Craftsmanship och samtalskortsmethodiken, och bygger en Community of Practice för lärare och forskare vid högskolor och universitet i Nederländerna och internationellt. Hans referensgrupp omfattar kollegor vid HAN, Avans och Hogeschool Utrecht. Internationellt samarbetar han via HEROES-projektet.",
      ],
      contact: "lectoraatethischwerken@fontys.nl",
      contactLabel: "Kontakta oss",
    },
    visie: {
      label: "Drivkraften",
      titel: "Varför detta projekt finns",
      alineas: [
        "Etik försvinner i högre utbildning under press från examination och innehållsleverans. Studenter lär sig vad som är rätt — men förbereds sällan för den komplexa verklighet där något verkligen står på spel.",
        "Min övertygelse är att människor engageras djupare av en berättelse från praktiken än av teoretiska principer. Moralisk omdömesbildning sker inte i ett klassrum — den sker i mötet med verkliga situationer, i samtal med andra som väljer annorlunda.",
        "Detta projekt är det konkreta uttrycket för den övertygelsen. Det handlar inte om kunskap om etik, utan om moralisk motståndskraft: förmågan att fortsätta se, känna, väga och handla — även när det är svårt.",
      ],
      citaat:
        "Moraliska ärr — den långvariga påverkan av otillräckligt grundade val — går att förebygga. Det är det som driver detta arbete.",
    },
  },

  cs: {
    meta: {
      title: "Community Moral Craftsmanship",
      description: "Community Moral Craftsmanship: komunita praktiků etické výchovy.",
    },
    hero: {
      label: "Komunita",
      titel: "Moral Craftsmanship",
      subtitel: "Komunita praktiků etické výchovy",
    },
    kernLines: { line1: "Morální situace", line2: "z praxe" },
    model: {
      titel: "Model Moral Craftsmanship",
      subtitel: "Klikněte na krok a přečtěte si více",
      kern: "JÁDRO",
      kernSub: "Konverzační karty",
      kernTekst: "Morální situace z praxe",
    },
    stappen: sharedStappenCs,
    fundament: {
      titel: "O základech",
      kernzin:
        "Moral craftsmanship znamená: pokračovat v vidění, cítění, vážení, jednání a držení kurzu — i když je něco v sázce. Ale také: odvážit se vrátit. Kdo jedná dobře, po cestě pochybuje. Viděl jsem to správně? Je můj pocit přesný, nebo jde o něco jiného? Nevážil jsem příliš rychle? Tento návrat není selhání — v něm žije praxe.",
      linksTitel: "Model",
      linksTekst:
        "Model Moral Craftsmanship vyvinula skupina Lectoraat Ethisch Werken na Fontys Hogescholen. Vychází z díla Karssinga, Resta, Biesty a Aristotelova pojmu phronesis — praktické moudrosti rozvíjené skrze jednání, reflexi a vytrvalost.",
      rechtsTitel: "Biestovo uvažování",
      rechtsTekst:
        "Gert Biesta varuje před learnification — redukcí vzdělávání na měřitelné výsledky učení. Tato komunita věří, že morální formace nepochází z učebnice. Nenabízí hotové odpovědi. Nabízí prostor — pro otázky, které zůstávají, pro setkání, které formuje.",
    },
    aanmelden: {
      titel: "Připojit se",
      subtitel: "Staňte se součástí komunity",
      hint: "Napište nám, kdo jste a na čem pracujete. Otevře se vám e-mail s předvyplněnou registrací pro Lectoraat Ethisch Werken.",
      naamLabel: "Jméno",
      instellingLabel: "Instituce",
      emailLabel: "E-mailová adresa",
      vraagLabel: "Na čem pracujete v etické výchově? (volitelné)",
      knop: "Odeslat registraci",
      emailSubject: "Registrace Community Moral Craftsmanship",
      emailVraag: "Na čem pracujete v etické výchově?",
      emailTo: "lectoraatethischwerken@fontys.nl",
      nietIngevuld: "Neuvedeno",
    },
    footer: {
      kernzin:
        "Moral craftsmanship znamená: pokračovat v vidění, cítění, vážení, jednání a držení kurzu — i když je něco v sázce. Ale také: odvážit se vrátit. Tento návrat není selhání — v něm žije praxe.",
      lectoraat: "Lectoraat Ethisch Werken — Fontys Hogescholen",
      contact: "r.vodde@fontys.nl",
    },
    stapKaart: { tools: "Nástroje" },
    overPagina: {
      label: "O projektu",
      titel: "Community Moral Craftsmanship",
      subtitel: "Platforma pro spolutvorbu etické výchovy ve vyšším vzdělávání",
      secties: [
        {
          titel: "Proč je to potřeba",
          alineaas: [
            "Etika mizí z vyššího vzdělávání pod tlakem hodnocení a předávání obsahu. Gert Biesta tomu říká learnification: vzdělávání redukované na měřitelné výsledky. Profesionálové tak vstupují na trh práce se znalostmi o etice — ale bez schopnosti morálně jednat, když je něco skutečně v sázce.",
            "Učitelé, kteří na tom chtějí pracovat, to dnes dělají z velké části sami. Chybí společný jazyk, společná sada nástrojů, komunita.",
            "To chceme změnit.",
          ],
        },
        {
          titel: "Model Moral Craftsmanship",
          alineaas: [
            "Skupina Lectoraat Ethisch Werken na Fontys Hogescholen vyvinula model Moral Craftsmanship: cyklický model pěti kroků, který popisuje, jak profesionálové morálně jednají v praxi.",
          ],
          stappen: overPaginaStappenCs,
          naStappen:
            "V centru stojí konverzační karta: morální situace z praxe, která aktivuje všech pět kroků najednou. Model vychází z díla Jamese Resta, Edgara Karssinga a Aristotelova pojmu phronesis — praktické moudrosti rozvíjené skrze jednání, reflexi a vytrvalost.",
        },
        {
          titel: "Komunita jako platforma spolutvorby",
          alineaas: [
            "Community Moral Craftsmanship spojuje učitele a výzkumníky z vysokých škol a univerzit — národně i mezinárodně. Ne konference, ne přenos znalostí od expertů k příjemcům, ale spolutvorba: společný vývoj nástrojů a pracovních forem, označených podle kroků modelu, sdílených na otevřené platformě.",
            "Příspěvky mají tři úrovně: 🌱 Koncept — právě vyzkoušeno, k inspiraci · ✅ Otestováno — použito alespoň jednou ve výuce · ⭐ Doporučeno — pozitivně hodnoceno více členy.",
            "Každých šest týdnů se setkáváme online — 90 minut, vždy zahájeno konverzační kartou, vždy ukončeno otevřenou otázkou k přenesení.",
          ],
        },
        {
          titel: "Základ: Biestova slabá pedagogika",
          alineaas: [
            "Tato komunita je navržena proti learnification. Žádné žebříčky, žádná gamifikace, žádné hotové odpovědi.",
            "Gert Biesta prosazuje slabou pedagogiku: prostor pro neočekávané, obtížné, skutečné. Každé setkání nekončí závěry, ale otázkou. Konverzační karta nemá správnou odpověď — jen skutečné setkání.",
            "Biesta nazývá vzdělávání krásným rizikem: nevíte, co vyroste, když lidi spojíte kolem morální formace. To není slabost — to je přesně záměr.",
          ],
        },
      ],
    },
    maker: {
      label: "Autor",
      titel: "Richard Voddé",
      alineas: [
        "Richard Voddé je lektor a výzkumník etické praxe na Fontys Hogescholen v Tilburgu. Jako Comenius Senior Fellow pracuje na otázce, jak etická výchova ve vyšším odborném vzdělávání skutečně formuje — nejen informuje.",
        "Vyvinul model Moral Craftsmanship a metodiku konverzačních karet a buduje Community of Practice pro učitele a výzkumníky na vysokých školách a univerzitách v Nizozemsku i mezinárodně. Jeho poradní skupina zahrnuje kolegy z HAN, Avans a Hogeschool Utrecht. Mezinárodně spolupracuje v rámci projektu HEROES.",
      ],
      contact: "lectoraatethischwerken@fontys.nl",
      contactLabel: "Kontaktujte nás",
    },
    visie: {
      label: "Přesvědčení",
      titel: "Proč tento projekt existuje",
      alineas: [
        "Etika mizí z vyššího vzdělávání pod tlakem hodnocení a předávání obsahu. Studenti se učí, co je správné — ale jen zřídka jsou připraveni na složitou realitu situací, kde skutečně něco stojí v sázce.",
        "Jsem přesvědčen, že lidé reagují hlouběji na příběh z praxe než na teoretické principy. Morální úsudek nevzniká na přednášce — vzniká v konfrontaci se skutečnými situacemi, v rozhovoru s těmi, kdo volí jinak.",
        "Tento projekt je konkrétním vyjádřením toho přesvědčení. Nejde o znalost etiky, ale o morální odolnost: schopnost dál vidět, cítit, vážit a jednat — i když je to těžké.",
      ],
      citaat:
        "Morální jizvy — dlouhodobý dopad nedostatečně odůvodněných rozhodnutí — lze předcházet. To je to, co mě pohání.",
    },
  },

  da: {
    meta: {
      title: "Community Moral Craftsmanship",
      description: "Community Moral Craftsmanship: et fællesskab af praktikere i etikundervisning.",
    },
    hero: {
      label: "Fællesskab",
      titel: "Moral Craftsmanship",
      subtitel: "Et fællesskab af praktikere i etikundervisning",
    },
    kernLines: { line1: "Moralske situationer", line2: "fra praksis" },
    model: {
      titel: "Modellen Moral Craftsmanship",
      subtitel: "Klik på et trin for at læse mere",
      kern: "KERNE",
      kernSub: "Samtalekort",
      kernTekst: "Moralske situationer fra praksis",
    },
    stappen: sharedStappenDa,
    fundament: {
      titel: "Om fundamentet",
      kernzin:
        "Moral craftsmanship betyder: blive ved med at se, føle, vægte, handle og holde kurs — også når noget står på spil. Men det betyder også: turde vende tilbage. Den, der handler godt, tvivler undervejs. Så jeg virkelig rigtigt? Er min følelse præcis, eller er det noget andet? Vægtede jeg for hurtigt? Den tilbagevenden er ikke en fiasko — i den bor praksisen.",
      linksTitel: "Modellen",
      linksTekst:
        "Modellen Moral Craftsmanship er udviklet af Lectoraat Ethisch Werken ved Fontys Hogescholen. Den bygger på arbejdet af Karssing, Rest, Biesta og Aristoteles' begreb phronesis — praktisk visdom, der udvikles gennem handling, refleksion og udholdenhed.",
      rechtsTitel: "Biestas tænkning",
      rechtsTekst:
        "Gert Biesta advarer mod learnification — reduktion af uddannelse til målbare læringsresultater. Dette fællesskab tror, at moralsk dannelse ikke kommer fra en lærebog. Det tilbyder ingen færdige svar. Det tilbyder rum — for spørgsmålene, der bliver, for mødet, der former.",
    },
    aanmelden: {
      titel: "Bliv medlem",
      subtitel: "Bliv en del af fællesskabet",
      hint: "Fortæl os, hvem du er, og hvad du arbejder med. Din e-mail åbnes med en udfyldt tilmelding til Lectoraat Ethisch Werken.",
      naamLabel: "Navn",
      instellingLabel: "Institution",
      emailLabel: "E-mailadresse",
      vraagLabel: "Hvad arbejder du med inden for etikundervisning? (valgfrit)",
      knop: "Send min tilmelding",
      emailSubject: "Tilmelding Community Moral Craftsmanship",
      emailVraag: "Hvad arbejder du med inden for etikundervisning?",
      emailTo: "lectoraatethischwerken@fontys.nl",
      nietIngevuld: "Ikke angivet",
    },
    footer: {
      kernzin:
        "Moral craftsmanship betyder: blive ved med at se, føle, vægte, handle og holde kurs — også når noget står på spil. Men det betyder også: turde vende tilbage. Den tilbagevenden er ikke en fiasko — i den bor praksisen.",
      lectoraat: "Lectoraat Ethisch Werken — Fontys Hogescholen",
      contact: "r.vodde@fontys.nl",
    },
    stapKaart: { tools: "Værktøjer" },
    overPagina: {
      label: "Om projektet",
      titel: "Community Moral Craftsmanship",
      subtitel: "En platform for samskabelse af etikundervisning i videregående uddannelse",
      secties: [
        {
          titel: "Hvorfor det er nødvendigt",
          alineaas: [
            "Etik forsvinder fra videregående uddannelse under pres fra test og pensumlevering. Gert Biesta kalder det learnification: uddannelse reduceret til målbare læringsresultater. Resultatet er, at fagfolk går ud med viden om etik — men uden evnen til at handle moralsk, når noget virkelig står på spil.",
            "Lærere, der vil arbejde med dette, gør det i dag stort set alene. Der er intet fælles sprog, ingen fælles værktøjskasse, intet fællesskab.",
            "Det vil vi ændre.",
          ],
        },
        {
          titel: "Modellen Moral Craftsmanship",
          alineaas: [
            "Lectoraat Ethisch Werken ved Fontys Hogescholen udviklede modellen Moral Craftsmanship: en cyklisk model med fem trin, der beskriver, hvordan fagfolk handler moralsk i praksis.",
          ],
          stappen: overPaginaStappenDa,
          naStappen:
            "I centrum står samtalekortet: en moralsk situation fra praksis, der aktiverer alle fem trin på én gang. Modellen bygger på James Rest, Edgar Karssing og Aristoteles' begreb phronesis — praktisk visdom, der udvikles gennem at gøre, reflektere og holde ud.",
        },
        {
          titel: "Fællesskabet som platform for samskabelse",
          alineaas: [
            "Community Moral Craftsmanship samler lærere og forskere fra professionshøjskoler og universiteter — nationalt og internationalt. Ikke en konference, ikke vidensoverførsel fra ekspert til modtager, men samskabelse: sammen udvikle værktøjer og undervisningsformer, tagget efter modeltrin, delt via en åben platform.",
            "Bidrag har tre niveauer: 🌱 Koncept — lige prøvet, til inspiration · ✅ Testet — brugt mindst én gang i undervisning · ⭐ Anbefalet — positivt vurderet af flere medlemmer.",
            "Hver sjette uge mødes vi online — 90 minutter, altid åbnet med et samtalekort, altid afsluttet med et åbent spørgsmål at tage med.",
          ],
        },
        {
          titel: "Fundament: Biestas svage pædagogik",
          alineaas: [
            "Dette fællesskab er designet mod learnification. Ingen ranglister, ingen gamification, ingen færdige svar.",
            "Gert Biesta argumenterer for svag pædagogik: plads til det uventede, det vanskelige, det ægte. Hver session slutter ikke med konklusioner, men med et spørgsmål. Samtalekortet har ikke ét rigtigt svar — kun et ægte møde.",
            "Biesta kalder uddannelse en smuk risiko: du ved ikke, hvad der vokser, når du bringer mennesker sammen om moralsk dannelse. Det er ikke en svaghed — det er netop pointen.",
          ],
        },
      ],
    },
    maker: {
      label: "Skaberen",
      titel: "Richard Voddé",
      alineas: [
        "Richard Voddé er lektor og forsker i etisk praksis ved Fontys Hogescholen i Tilburg. Som Comenius Senior Fellow arbejder han med spørgsmålet om, hvordan etikundervisning i erhvervsakademier virkelig former — ikke blot informerer.",
        "Han udviklede modellen Moral Craftsmanship og samtalekortmetodikken og bygger et Community of Practice for lærere og forskere ved højskoler og universiteter i Nederlandene og internationalt. Hans referencegruppe omfatter kolleger ved HAN, Avans og Hogeschool Utrecht. Internationalt samarbejder han via HEROES-projektet.",
      ],
      contact: "lectoraatethischwerken@fontys.nl",
      contactLabel: "Kontakt os",
    },
    visie: {
      label: "Drivkraften",
      titel: "Hvorfor dette projekt findes",
      alineas: [
        "Etik forsvinder fra videregående uddannelse under pres fra test og pensumlevering. Studerende lærer, hvad der er rigtigt — men forberedes sjældent på den komplekse virkelighed, hvor noget virkelig står på spil.",
        "Min overbevisning er, at mennesker engageres dybere af en historie fra praksis end af teoretiske principper. Moralsk dømmekraft opstår ikke i et klasseværelse — den opstår i mødet med virkelige situationer, i samtale med andre, der vælger anderledes.",
        "Dette projekt er det konkrete udtryk for den overbevisning. Det handler ikke om viden om etik, men om moralsk modstandskraft: evnen til at blive ved med at se, føle, vægte og handle — også når det er svært.",
      ],
      citaat:
        "Moralske ar — den langvarige påvirkning af utilstrækkeligt begrundede valg — kan forebygges. Det er det, der driver dette arbejde.",
    },
  },
};
