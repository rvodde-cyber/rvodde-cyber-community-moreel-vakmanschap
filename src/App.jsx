import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aanmelden from "./components/Aanmelden";
import CirkelModel from "./components/CirkelModel";
import Hero from "./components/Hero";
import OverHetFundament from "./components/OverHetFundament";
import WatBieden from "./components/WatBieden";
import About from "./pages/About";
import Over from "./pages/Over";

function Navigatie() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-achtergrond/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <nav className="section-shell flex min-h-20 flex-col items-start justify-center gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="font-display text-3xl font-semibold tracking-tight text-primair">
          Moreel Vakmanschap
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-secundair sm:justify-end">
          <a className="transition hover:text-primair" href="/#model">
            Het Model
          </a>
          <a className="transition hover:text-primair" href="/#wat-bieden">
            Wat bieden we
          </a>
          <a className="transition hover:text-primair" href="/#over-ons">
            Over ons
          </a>
          <a className="transition hover:text-primair" href="/#aanmelden">
            Aanmelden
          </a>
          <a className="transition hover:text-primair" href="/over">
            Over
          </a>
          <a className="transition hover:text-primair" href="/about">
            About
          </a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rand bg-achtergrond py-10">
      <div className="section-shell grid gap-6 text-sm text-secundair md:grid-cols-2 md:items-center">
        <div className="leading-7">
          <p className="font-semibold text-primair">Lectoraat Ethisch Werken — Fontys Hogescholen</p>
          <a className="transition hover:text-primair" href="mailto:ethisch.werken@fontys.nl">
            ethisch.werken@fontys.nl
          </a>
        </div>
        <p className="font-display text-xl italic leading-8 text-primair md:text-right">
          Moreel vakmanschap betekent: blijven kijken, blijven voelen, blijven wegen, blijven handelen
          en koers houden — ook wanneer iets op het spel staat.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <main>
        <Hero />
        <CirkelModel />
        <WatBieden />
        <OverHetFundament />
        <Aanmelden />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigatie />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/over" element={<Over />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
