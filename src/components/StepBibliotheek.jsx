import WorksheetLibrary from "./WorksheetLibrary";
import WorksheetWegen from "./WorksheetWegen";
import ConversationCardSection from "./ConversationCardSection";
import BibliotheekComingSoon from "./BibliotheekComingSoon";
import { stappen as basisStappen } from "../data/stappen";

export default function StepBibliotheek({ stapNummer }) {
  const meta = basisStappen[stapNummer - 1];

  switch (stapNummer) {
    case 1:
      return (
        <>
          <WorksheetLibrary />
          <ConversationCardSection
            stapNummer={1}
            kleur={meta.kleur}
            kleurLicht={meta.kleurLicht}
            titelKey="gesprekskaarten_titel"
          />
        </>
      );
    case 2:
      return <BibliotheekComingSoon stapNummer={2} kleur={meta.kleur} kleurLicht={meta.kleurLicht} />;
    case 3:
      return (
        <>
          <WorksheetWegen />
          <ConversationCardSection
            stapNummer={3}
            kleur={meta.kleur}
            kleurLicht={meta.kleurLicht}
            titelKey="gesprekskaarten_titel"
          />
        </>
      );
    case 4:
      return <BibliotheekComingSoon stapNummer={4} kleur={meta.kleur} kleurLicht={meta.kleurLicht} />;
    case 5:
      return <BibliotheekComingSoon stapNummer={5} kleur={meta.kleur} kleurLicht={meta.kleurLicht} />;
    default:
      return null;
  }
}
