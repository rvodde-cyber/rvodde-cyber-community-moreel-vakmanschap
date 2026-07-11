import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DimensionIllustration from "../components/DimensionIllustration";
import LikertScale from "../components/LikertScale";
import MistBackground from "../components/MistBackground";
import { useTest } from "../context/TestContext";
import { DIMENSIONS } from "../data/dimensions";

export default function DimensionPage() {
  const { stap } = useParams();
  const navigate = useNavigate();
  const { antwoorden, setAntwoord } = useTest();

  const stapNum = Number(stap);
  const dimensie = DIMENSIONS[stapNum - 1];

  const alleBeantwoord = useMemo(
    () => dimensie?.stellingen.every((s) => antwoorden[s.id] >= 1 && antwoorden[s.id] <= 5),
    [dimensie, antwoorden],
  );

  if (!dimensie || stapNum < 1 || stapNum > 6) {
    return <Navigate to="/verdenk" replace />;
  }

  const isLast = stapNum === 6;

  function handleVolgende() {
    if (!alleBeantwoord) return;
    if (isLast) {
      navigate("/verdenk/resultaat");
    } else {
      navigate(`/verdenk/test/${stapNum + 1}`);
    }
  }

  return (
    <div className="relative min-h-dvh">
      <MistBackground progress={stapNum} variant="test" />

      <main className="relative mx-auto max-w-2xl px-5 pb-28 pt-10 sm:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber">
          Stap {stapNum} van 6
        </p>

        <h1 className="font-display text-3xl font-semibold text-nachtblauw sm:text-4xl">
          {dimensie.naam}
        </h1>
        {dimensie.subtitel && (
          <p className="mt-1 text-lg text-nachtblauw/60">{dimensie.subtitel}</p>
        )}

        <DimensionIllustration type={dimensie.beeld} />

        <div className="mt-6 space-y-10">
          {dimensie.stellingen.map((stelling, i) => (
            <section key={stelling.id} className="space-y-4">
              <p className="text-lg leading-relaxed text-nachtblauw sm:text-xl">
                <span className="mr-2 font-semibold text-amber">{i + 1}.</span>
                {stelling.tekst}
              </p>
              <LikertScale
                stellingId={stelling.id}
                value={antwoorden[stelling.id]}
                onChange={setAntwoord}
              />
            </section>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          {stapNum > 1 && (
            <Link
              to={`/verdenk/test/${stapNum - 1}`}
              className="rounded-xl px-4 py-3 text-nachtblauw/60 transition hover:text-nachtblauw"
            >
              ← Terug
            </Link>
          )}
          <button
            type="button"
            onClick={handleVolgende}
            disabled={!alleBeantwoord}
            className="ml-auto flex min-h-[3rem] items-center justify-center rounded-2xl bg-koraal px-8 py-3 font-semibold text-white shadow-md transition enabled:hover:bg-koraal/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "Bekijk je resultaat" : "Volgende →"}
          </button>
        </div>
      </main>
    </div>
  );
}
