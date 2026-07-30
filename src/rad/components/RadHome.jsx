import { motion } from "framer-motion";
import { ArrowRight, Eye, Heart, Users } from "lucide-react";
import { WHEEL_SEGMENTS } from "../radConstants.js";

/**
 * Home/intro-scherm: warm, professioneel, met lichte spanning.
 */
export default function RadHome({ ui, lang, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto w-full max-w-2xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#534ab7]">
        {ui.kicker}
      </p>

      <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-primair sm:text-6xl">
        {ui.titel}
      </h1>

      {/* Decoratieve waardenkrans */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {WHEEL_SEGMENTS.map((seg) => (
          <span
            key={seg.id}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: seg.color }}
          >
            {seg[lang]}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-secundair">
        {ui.intro}
      </p>

      <div className="mt-8 flex items-center justify-center gap-6 text-secundair">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Eye size={18} strokeWidth={2} className="text-[#185fa5]" /> Zien
        </span>
        <span className="flex items-center gap-2 text-sm font-medium">
          <Heart size={18} strokeWidth={2} className="text-[#993556]" /> Voelen
        </span>
        <span className="flex items-center gap-2 text-sm font-medium">
          <Users size={18} strokeWidth={2} className="text-[#0f6e56]" /> Gesprek
        </span>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#1a2744] px-10 py-4 text-lg font-semibold text-white shadow-warm transition hover:bg-[#26365c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#534ab7] focus-visible:ring-offset-2"
      >
        {ui.start}
        <ArrowRight
          size={20}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <p className="mt-4 text-sm text-secundair">{ui.onderregel}</p>
    </motion.div>
  );
}
