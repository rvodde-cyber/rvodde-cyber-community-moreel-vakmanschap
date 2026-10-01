import CirkelModel from "../components/CirkelModel";
import DriedelingBronvermelding from "../components/DriedelingBronvermelding";
import OverHetFundament from "../components/OverHetFundament";
import { useTaal } from "../context/TaalContext";

export default function ModelPagina() {
  const { t } = useTaal();

  return (
    <main className="bg-achtergrond pt-20">
      <CirkelModel />
      <section className="bg-achtergrond pb-16 md:pb-20">
        <div className="section-shell max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-primair md:text-4xl">
            {t.gesprekskaart?.filters?.moeilijkheid ?? "Complexiteit"}
          </h2>
          <p className="mt-4 leading-8 text-secundair">{t.model.driedelingIntro}</p>
          <DriedelingBronvermelding />
        </div>
      </section>
      <OverHetFundament />
    </main>
  );
}
