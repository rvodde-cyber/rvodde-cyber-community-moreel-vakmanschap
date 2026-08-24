import { ArrowRight, BookOpen } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { bronvermelding, metafoor, framing, activeFraming } from "../config";

const { appTitle, introText } = framing[activeFraming];

const theoreticalBasis =
  "Geïnspireerd op het Teamwiel van Vroemen (Vroemen & Vroemen, 2009, Team op vleugels, Amsterdam University Press) — 6 succesfactoren die in balans leiden tot geïnspireerd samenwerken — gecombineerd met het fasemodel van teamontwikkeling van Bruce Tuckman (1965, forming–storming–norming–performing) voor de tijdsdimensie. Het onderscheid tussen een groep en een team volgt Katzenbach & Smith (1993, The Wisdom of Teams): een werkgroep telt op wat individuen los presteren, een team deelt één gezamenlijk resultaat waarvoor de leden zich onderling verantwoordelijk houden.";

export default function IntroScreen({ onStart }) {
  return (
    <div className="space-y-6">
      <ImagePlaceholder
        label="Hero: het stokje doorgeven"
        description="Twee lopers naast elkaar, stokje wordt overgedragen"
        aspectRatio="21 / 9"
      />

      <section className="glass droplet-accent relative overflow-hidden p-7 sm:p-10">
        <p className="eyebrow">Groep of team</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {appTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{introText}</p>

        <div className="mt-8 border-t border-hairline pt-6">
          <h2 className="text-base font-semibold text-ink">{metafoor.titel}</h2>
          <p className="mt-1.5 text-base leading-relaxed text-ink-soft">{metafoor.tekst}</p>
        </div>

        <p className="mt-6 text-base leading-relaxed text-ink-muted">{theoreticalBasis}</p>

        <button type="button" onClick={onStart} className="btn-primary mt-8 w-full sm:w-auto">
          Start reflectie
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      <section className="glass-subtle p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <h2 className="text-base font-semibold text-ink">Bronnen</h2>
            <p className="mt-1.5 text-base leading-relaxed text-ink-muted">{bronvermelding}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
