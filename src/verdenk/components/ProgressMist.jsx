import { motion } from "framer-motion";

export default function ProgressMist({ step, total = 6 }) {
  const progress = (step - 1) / (total - 1);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-1">
      <div className="relative h-full w-full bg-mistgrijs/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-mistgrijs to-amber"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <p className="sr-only">
        Voortgang: stap {step} van {total}
      </p>
    </div>
  );
}
