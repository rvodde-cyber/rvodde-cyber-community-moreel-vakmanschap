import type { EpisodeId } from './episodes/meta';
import type { Persoon } from './schemas/personen.schema';

/** Volgorde A4-kern: CURSOR-PROMPT.md §8.2; overige uit docs/serieconcept.md */
export const PERSONEN: Persoon[] = [
  {
    slug: 'harrie-van-gorp',
    naam: 'Harrie van Gorp',
    leeftijd: 71,
    rol: 'President-commissaris',
    tekst: 'Jullie broer, 71 jaar en president-commissaris van Van Gorp Drones.',
    portretAlt: 'Portret van Harrie van Gorp, president-commissaris',
    afleveringen: {
      1: {
        leeftijd: 29,
        rol: 'Oprichter in de schuur',
        tekst: 'Jullie broer, 29 jaar. Hij bakt en verkoopt worstenbroodjes en wil graag ja zeggen op elke bestelling.',
        portret: 'P-HARRIE-1984',
      },
      2: {
        leeftijd: 41,
        rol: 'Directeur-eigenaar',
        tekst: 'Jullie broer, 41 jaar. Hij loopt zeven dagen per week over de vloer en denkt nog iedereen bij naam te groeten.',
        portret: 'P-HARRIE-1996',
      },
      3: {
        leeftijd: 54,
        rol: 'Directeur-eigenaar',
        tekst: 'Jullie broer, 54 jaar. Drie vestigingen, en hij voelt dat hij niet overal tegelijk kan zijn.',
        portret: 'P-HARRIE-2009',
      },
      4: {
        leeftijd: 71,
        rol: 'President-commissaris',
        tekst: 'Jullie broer, 71 jaar en president-commissaris van Van Gorp Drones.',
        portret: 'P-HARRIE-2026',
      },
    },
  },
  {
    slug: 'lies-van-gorp',
    naam: 'Lies van Gorp',
    leeftijd: 69,
    rol: 'Medeoprichter',
    tekst: 'Harries partner; in 2026 een stille getuige van wat het bedrijf met de familie doet.',
    portretAlt: 'Portret van Lies van Gorp, medeoprichter',
    afleveringen: {
      1: {
        leeftijd: 27,
        rol: 'Kasboek en klanten',
        tekst: 'Harries vriendin, 27 jaar. Zij houdt het kasboek op de keukentafel bij en stelt de vragen die Harrie overslaat.',
        portret: 'P-LIES-1984',
      },
      2: {
        leeftijd: 39,
        rol: 'Medeoprichter',
        tekst: 'Zij ziet hoe het tempo op de band mensen uitput en wil dat Harrie naar Joost luistert.',
        portret: 'P-LIES-1996',
      },
    },
  },
  {
    slug: 'gerrit-smulders',
    naam: 'Gerrit Smulders',
    leeftijd: 56,
    rol: 'Ploegbaas',
    tekst: 'Eerste werknemer van Harrie; in 1996 ploegbaas aan de lopende band.',
    portretAlt: 'Portret van Gerrit Smulders, ploegbaas',
    afleveringen: {
      1: {
        leeftijd: 44,
        rol: 'Slager',
        tekst: 'De slager, 44 jaar. Hij levert het vlees en kent het recept beter dan Harrie.',
        portret: 'P-GERRIT-1984',
      },
      2: {
        leeftijd: 56,
        rol: 'Ploegbaas',
        tekst: 'Ploegbaas, 56 jaar. Hij roept “sneller”, maar de ploeg hoort hem steeds minder.',
        portret: 'P-GERRIT-1996',
      },
    },
  },
  {
    slug: 'sanne-van-gorp',
    naam: 'Sanne van Gorp',
    leeftijd: 49,
    rol: 'Dochter Van Gorp',
    tekst: 'Harries dochter en jullie nicht; zij kent de vloer en stelt scherpe vragen over opvolging.',
    portretAlt: 'Portret van Sanne van Gorp',
    afleveringen: {
      3: {
        leeftijd: 32,
        rol: 'Kandidaat-opvolger',
        tekst: 'Harries dochter, 32 jaar. Zij kent elk proces omdat ze in de fabriek is opgegroeid.',
        portret: 'P-SANNE-2009',
      },
      5: {
        leeftijd: 59,
        rol: 'Erfgename',
        tekst: 'In 2036 teken ze pas als zij weten wat er in het schrift staat.',
        portret: 'P-SANNE-2036',
      },
    },
  },
  {
    slug: 'marco-van-gorp',
    naam: 'Marco van Gorp',
    leeftijd: 46,
    rol: 'Directeur',
    tekst: 'Harries zoon en jullie neef. Hij stelde de begroting op en wil vrijdag een plan zien.',
    portretAlt: 'Portret van Marco van Gorp, directeur',
    afleveringen: {
      3: {
        leeftijd: 29,
        rol: 'Zoon, kandidaat-opvolger',
        tekst: 'Harries zoon, net dertig. Hij komt met een gloednieuw pak en een stem die nooit twijfelt.',
        portret: 'P-MARCO-2009',
      },
      4: {
        leeftijd: 46,
        rol: 'Directeur',
        tekst: 'Harries zoon en jullie neef. Hij stelde de begroting op en wil vrijdag een plan zien.',
        portret: 'P-MARCO-2026',
      },
      5: {
        leeftijd: 56,
        rol: 'Directeur onder druk',
        tekst: 'Onder druk van erfgenamen en investeerders; het bod van Optivora ligt op tafel.',
        portret: 'P-MARCO-2036',
      },
    },
  },
  {
    slug: 'ans-willems',
    naam: 'Ans Willems',
    leeftijd: 57,
    rol: 'Ploegleider',
    tekst: 'Ploegleider op de vloer. Zij voert de normen uit die TEMPO bepaalt.',
    portretAlt: 'Portret van Ans Willems, ploegleider',
    afleveringen: {
      4: {
        leeftijd: 57,
        rol: 'Ploegleider',
        tekst: 'Ploegleider op de vloer. Zij voert de normen uit die TEMPO bepaalt.',
        portret: 'P-ANS-2026',
      },
    },
  },
  {
    slug: 'erik-verhoeven',
    naam: 'Erik Verhoeven',
    leeftijd: 49,
    rol: 'Adviseur Optivora',
    tekst: 'Adviseur van Optivora, de leverancier van TEMPO en PILOT. Hij heeft ook iets te verkopen.',
    portretAlt: 'Portret van Erik Verhoeven, adviseur Optivora',
    afleveringen: {
      4: {
        leeftijd: 49,
        rol: 'Adviseur Optivora',
        tekst: 'Adviseur van Optivora, de leverancier van TEMPO en PILOT. Hij heeft ook iets te verkopen.',
        portret: 'P-ERIK-2026',
      },
    },
  },
  {
    slug: 'joost-hendriks',
    naam: 'Joost Hendriks',
    leeftijd: 52,
    rol: 'Medewerkersvertegenwoordiging',
    tekst: 'Denkt mee vanuit de medewerkers en vraagt of de OR wordt betrokken.',
    portretAlt: 'Portret van Joost Hendriks, medewerkersvertegenwoordiging',
    afleveringen: {
      2: {
        leeftijd: 22,
        rol: 'Werknemer',
        tekst: 'Hij verzamelt handtekeningen voor het rooster en wil een plek aan tafel, niet alleen een praatje bij de koffie.',
        portret: 'P-JOOST-1996',
      },
      4: {
        leeftijd: 52,
        rol: 'Medewerkersvertegenwoordiging',
        tekst: 'Denkt mee vanuit de medewerkers en vraagt of de OR wordt betrokken.',
        portret: 'P-JOOST-2026',
      },
    },
  },
  {
    slug: 'dennis-kuijpers',
    naam: 'Dennis Kuijpers',
    leeftijd: 39,
    rol: 'Financieel directeur',
    tekst: 'Financieel directeur in het MT; zijn beloning hangt af van het halfjaarresultaat.',
    portretAlt: 'Portret van Dennis Kuijpers, financieel directeur',
    afleveringen: {
      4: {
        leeftijd: 39,
        rol: 'Financieel directeur',
        tekst: 'Financieel directeur in het MT; zijn beloning hangt af van het halfjaarresultaat.',
        portret: 'P-DENNIS-2026',
      },
    },
  },
  {
    slug: 'yasmin-el-amrani',
    naam: 'Yasmin El Amrani',
    leeftijd: 29,
    rol: 'HR-manager',
    tekst: 'HR-manager; PILOT en personeelsbeleid vallen onder haar verantwoordelijkheid.',
    portretAlt: 'Portret van Yasmin El Amrani, HR-manager',
    afleveringen: {
      4: {
        leeftijd: 29,
        rol: 'HR-manager',
        tekst: 'HR-manager; PILOT en personeelsbeleid vallen onder haar verantwoordelijkheid.',
        portret: 'P-YASMIN-2026',
      },
    },
  },
  {
    slug: 'piotr-nowak',
    naam: 'Piotr Nowak',
    leeftijd: 34,
    rol: 'Flexkracht assemblage',
    tekst:
      'Flexkracht op de assemblagelijn via Brabantse Personeelsdiensten. In ronde 2 kan het MT hem in vaste dienst nemen; zijn verhaal raakt de defensie-screening.',
    portretAlt: 'Portret van Piotr Nowak, flexkracht assemblage',
    afleveringen: {
      4: {
        leeftijd: 34,
        rol: 'Flexkracht assemblage',
        tekst:
          'Flexkracht op de assemblagelijn via Brabantse Personeelsdiensten. In ronde 2 kan het MT hem in vaste dienst nemen; zijn verhaal raakt de defensie-screening.',
        portret: 'P-PIOTR-2026',
      },
      5: {
        leeftijd: 44,
        rol: 'Ploegleider',
        tekst: 'Kent de schuur en het schrift; in 2036 praat hij met Anne-Fleur buiten de vergadering.',
        portret: 'P-PIOTR-2036',
      },
    },
  },
  {
    slug: 'anne-fleur-van-gorp',
    naam: 'Anne-Fleur van Gorp',
    leeftijd: 26,
    rol: 'Nieuwe generatie Van Gorp',
    tekst:
      'Kleindochter en nazaat van een van de founders; in 2036 vraagt zij waar het bedrijf nog voor staat en wie het receptschrift nog kent.',
    portretAlt: 'Portret van Anne-Fleur van Gorp, nieuwe generatie Van Gorp',
    afleveringen: {
      5: {
        leeftijd: 26,
        rol: 'Nieuwe generatie Van Gorp',
        tekst:
          'Kleindochter en nazaat van een van de founders; in 2036 vraagt zij waar het bedrijf nog voor staat en wie het receptschrift nog kent.',
        portret: 'P-ANNE-FLEUR-2036',
      },
    },
  },
  {
    slug: 'caroline-de-wit',
    naam: 'Caroline de Wit',
    leeftijd: 56,
    rol: 'Investeerder',
    tekst: 'Partner bij een investeringsfonds; Optivora en de herstructurering hebben haar belang.',
    portretAlt: 'Portret van Caroline de Wit, investeerder',
    afleveringen: {
      5: {
        leeftijd: 56,
        rol: 'Investeerder',
        tekst: 'Partner bij een investeringsfonds dat meebeslist over het bod op Van Gorp Groep.',
        portret: 'P-CAROLINE-2036',
      },
    },
  },
];

/** Slug van de spelersrol (zus): nooit een portretfoto. */
export const ZUS_SLAG = 'jongere-zus-van-gorp';

export function persoonVoorAflevering(persoon: Persoon, episode: EpisodeId): Persoon {
  const variant = persoon.afleveringen?.[episode];
  if (!variant) return persoon;
  return {
    ...persoon,
    leeftijd: variant.leeftijd,
    rol: variant.rol,
    tekst: variant.tekst,
    portretAlt: variant.portretAlt ?? persoon.portretAlt,
    afleveringen: persoon.afleveringen,
  };
}

export function portretCode(persoon: Persoon, episode: EpisodeId): string | undefined {
  const variant = persoon.afleveringen?.[episode];
  return variant?.portret;
}

export function magPortretTonen(slug: string): boolean {
  return slug !== ZUS_SLAG;
}
