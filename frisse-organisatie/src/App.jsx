import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./screens/Landing";
import Scan from "./screens/Scan";
import Result from "./screens/Result";
import Collector from "./screens/Collector";
import AppShell from "./components/AppShell";
import { statements } from "./config/statements";
import { buildResult, buildResultFromScores, computeTeamScores } from "./lib/scoring";
import { encodeShareCode } from "./lib/shareCode";

const VIEWS = {
  landing: "landing",
  scan: "scan",
  result: "result",
  collect: "collect",
  team: "team",
};

/**
 * De hele scan draait op deze state en verder nergens op: geen server, geen
 * database, geen localStorage. Wie het tabblad sluit, houdt niets over behalve
 * de PDF en de deel-code die hij zelf heeft bewaard (briefing §7).
 */
export default function App() {
  const [view, setView] = useState(VIEWS.landing);
  const [companyName, setCompanyName] = useState("");
  const [answers, setAnswers] = useState({});
  const [teamAnswerSets, setTeamAnswerSets] = useState([]);

  const complete = statements.every((statement) => typeof answers[statement.id] === "number");
  const result = useMemo(() => (complete ? buildResult(answers) : null), [answers, complete]);
  const shareCode = useMemo(
    () => (complete ? encodeShareCode(answers, companyName) : ""),
    [answers, companyName, complete]
  );
  const teamResult = useMemo(
    () => (teamAnswerSets.length ? buildResultFromScores(computeTeamScores(teamAnswerSets)) : null),
    [teamAnswerSets]
  );

  const restart = () => {
    setAnswers({});
    setTeamAnswerSets([]);
    setView(VIEWS.landing);
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {view === VIEWS.landing ? (
            <Landing
              companyName={companyName}
              onCompanyNameChange={setCompanyName}
              onStart={() => setView(VIEWS.scan)}
              onCollect={() => setView(VIEWS.collect)}
            />
          ) : null}

          {view === VIEWS.scan ? (
            <Scan
              answers={answers}
              onAnswer={(id, value) => setAnswers((current) => ({ ...current, [id]: value }))}
              onBackToStart={() => setView(VIEWS.landing)}
              onFinish={() => setView(VIEWS.result)}
            />
          ) : null}

          {view === VIEWS.result && result ? (
            <Result
              result={result}
              variant="individual"
              companyName={companyName}
              shareCode={shareCode}
              onRestart={restart}
              onToCollector={() => setView(VIEWS.collect)}
            />
          ) : null}

          {view === VIEWS.collect ? (
            <Collector
              onBack={() => setView(complete ? VIEWS.result : VIEWS.landing)}
              onSubmit={(answerSets) => {
                setTeamAnswerSets(answerSets);
                setView(VIEWS.team);
              }}
            />
          ) : null}

          {view === VIEWS.team && teamResult ? (
            <Result
              result={teamResult}
              variant="team"
              companyName={companyName}
              participantCount={teamAnswerSets.length}
              onRestart={restart}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
