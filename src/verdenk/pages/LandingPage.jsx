import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MistBackground from "../components/MistBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh">
      <MistBackground variant="landing" />

      <main className="relative mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-16 sm:px-8">
        <motion.div initial="hidden" animate="visible" className="space-y-8">
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-tight text-nachtblauw sm:text-5xl md:text-6xl"
          >
            Durf jij te twijfelen?
          </motion.h1>

          <motion.div custom={1} variants={fadeUp} className="space-y-5 text-lg leading-relaxed text-nachtblauw/80 sm:text-xl">
            <p>
              Kijk eens goed. Niet één keer — twee keer. Verdenken is geen wantrouwen, het is een
              vaardigheid: de moed om door te vragen, verder te kijken dan het eerste beeld, en
              soms ook naar jezelf.
            </p>
            <p>
              In zes korte stappen ontdek je hoe jij omgaat met twijfel — van de systemen om je heen
              tot de vragen die je jezelf (niet) stelt. Geen goed of fout. Wel een spiegel.
            </p>
            <p className="text-base text-nachtblauw/60 sm:text-lg">
              Duurt 3 minuten. Je antwoorden zijn anoniem en worden vanavond, samen met die van de
              hele zaal, zichtbaar op het grote scherm.
            </p>
          </motion.div>

          <motion.div custom={2} variants={fadeUp}>
            <Link
              to="/verdenk/test/1"
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-2xl bg-koraal px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-koraal/25 transition hover:bg-koraal/90 active:scale-[0.98] sm:w-auto"
            >
              Start de Verdenk-test
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center text-sm text-nachtblauw/40"
        >
          Congres 2027 · Maand van de Filosofie
        </motion.p>
      </main>
    </div>
  );
}
