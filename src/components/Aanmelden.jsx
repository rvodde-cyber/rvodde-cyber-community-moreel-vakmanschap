import { motion } from "framer-motion";

export default function Aanmelden() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const naam = formData.get("naam") || "";
    const instelling = formData.get("instelling") || "";
    const email = formData.get("email") || "";
    const ethiekonderwijs = formData.get("ethiekonderwijs") || "";

    const body = [
      `Naam: ${naam}`,
      `Instelling: ${instelling}`,
      `E-mailadres: ${email}`,
      "",
      "Waar werk jij aan in ethiekonderwijs?",
      ethiekonderwijs || "Niet ingevuld"
    ].join("\n");

    const subject = "Aanmelding Community Moreel Vakmanschap";
    window.location.href = `mailto:ethisch.werken@fontys.nl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="aanmelden" className="bg-white py-20 md:py-28">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid gap-10 rounded-[2.5rem] border border-rand bg-achtergrond p-7 shadow-warm md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secundair">
              Aanmelden
            </p>
            <h2 className="font-display text-5xl font-semibold leading-tight text-primair md:text-6xl">
              Doe mee met de community.
            </h2>
            <p className="mt-6 leading-8 text-secundair">
              Laat weten wie je bent en waar je aan werkt. Je mailprogramma opent automatisch met een
              ingevulde aanmelding aan het Lectoraat Ethisch Werken.
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-semibold text-primair">
              Naam
              <input
                required
                name="naam"
                type="text"
                className="rounded-2xl border border-rand bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-primair">
              Instelling
              <input
                required
                name="instelling"
                type="text"
                className="rounded-2xl border border-rand bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-primair">
              E-mailadres
              <input
                required
                name="email"
                type="email"
                className="rounded-2xl border border-rand bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-primair">
              Waar werk jij aan in ethiekonderwijs?
              <textarea
                name="ethiekonderwijs"
                rows="5"
                className="resize-none rounded-2xl border border-rand bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#534ab7] focus:ring-4 focus:ring-[#534ab7]/10"
              />
            </label>

            <button
              type="submit"
              className="mt-2 rounded-full bg-primair px-8 py-4 text-base font-semibold text-white shadow-warm transition hover:-translate-y-0.5 hover:bg-[#233657] focus:outline-none focus:ring-4 focus:ring-[#534ab7]/20"
            >
              Stuur mijn aanmelding
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
