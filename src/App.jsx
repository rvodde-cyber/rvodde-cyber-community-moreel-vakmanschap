import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aanmelden from "./components/Aanmelden";
import CirkelModel from "./components/CirkelModel";
import Hero from "./components/Hero";
import OverHetFundament from "./components/OverHetFundament";
import DocumentTaal from "./components/DocumentTaal";
import TaalRouteSync from "./components/TaalRouteSync";
import TaalSchakelaar from "./components/TaalSchakelaar";
import WatBieden from "./components/WatBieden";
import { TaalProvider, useTaal } from "./context/TaalContext";
import About from "./pages/About";
import Over from "./pages/Over";

function Navigatie() {
  const { taal, t } = useTaal();
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
          {t.hero.titel}
        </a>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-secundair sm:justify-end">
          <a className="transition hover:text-primair" href="/#model">
            {t.nav.model}
          </a>
          <a className="transition hover:text-primair" href="/#wat-bieden">
            {t.nav.bieden}
          </a>
          <a className="transition hover:text-primair" href={taal === "nl" ? "/over" : "/about"}>
            {t.nav.over}
          </a>
          <a className="transition hover:text-primair" href="/#aanmelden">
            {t.nav.aanmelden}
          </a>
          <TaalSchakelaar />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  const { t } = useTaal();

  return (
    <footer className="border-t border-rand bg-achtergrond py-10">
      <div className="section-shell grid gap-6 text-sm text-secundair md:grid-cols-2 md:items-center">
        <div className="leading-7">
          <p className="font-semibold text-primair">{t.footer.lectoraat}</p>
          <a className="transition hover:text-primair" href={`mailto:${t.footer.contact}`}>
            {t.footer.contact}
          </a>
        </div>
        <p className="font-display text-xl italic leading-8 text-primair md:text-right">
          {t.footer.kernzin}
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

function OverPagina() {
  return (
    <>
      <Over />
      <Footer />
    </>
  );
}

function AboutPagina() {
  return (
    <>
      <About />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <TaalProvider>
      <BrowserRouter>
        <DocumentTaal />
        <TaalRouteSync />
        <Navigatie />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/over" element={<OverPagina />} />
          <Route path="/about" element={<AboutPagina />} />
        </Routes>
      </BrowserRouter>
    </TaalProvider>
  );
}
