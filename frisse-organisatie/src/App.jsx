import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./screens/Landing";
import Scan from "./screens/Scan";
import Result from "./screens/Result";
import AppShell from "./components/AppShell";
import { statements } from "./config/statements";
import { buildResult } from "./lib/scoring";

const STEPS = { landing: "landing", scan: "scan", result: "result" };

export default function App() {
  const [step, setStep] = useState(STEPS.landing);
  const [sessionCode, setSessionCode] = useState("");
  const [answers, setAnswers] = useState({});

  const complete = statements.every((statement) => typeof answers[statement.id] === "number");
  const result = useMemo(() => (complete ? buildResult(answers) : null), [answers, complete]);

  const restart = () => {
    setAnswers({});
    setStep(STEPS.landing);
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === STEPS.landing ? (
            <Landing
              sessionCode={sessionCode}
              onSessionCodeChange={setSessionCode}
              onStart={() => setStep(STEPS.scan)}
            />
          ) : null}

          {step === STEPS.scan ? (
            <Scan
              answers={answers}
              onAnswer={(id, value) => setAnswers((current) => ({ ...current, [id]: value }))}
              onBackToStart={() => setStep(STEPS.landing)}
              onFinish={() => setStep(STEPS.result)}
            />
          ) : null}

          {step === STEPS.result && result ? (
            <Result result={result} sessionCode={sessionCode} onRestart={restart} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
