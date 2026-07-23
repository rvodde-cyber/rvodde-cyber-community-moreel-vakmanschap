import { useEffect, useState } from "react";

import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import DocumentTaal from "./components/DocumentTaal";

import TaalRouteSync from "./components/TaalRouteSync";

import TaalSchakelaar from "./components/TaalSchakelaar";

import { TaalProvider, useTaal } from "./context/TaalContext";
import { getNavItems, usesEnglishRoutes } from "./data/vertalingen";

import AanbodPagina from "./pages/AanbodPagina";

import AanmeldenPagina from "./pages/AanmeldenPagina";

import About from "./pages/About";

import BiblioteekOverzicht from "./pages/BiblioteekOverzicht";
import StapPagina from "./pages/StapPagina";

import GespreksKaartenPagina from "./pages/GespreksKaartenPagina";

import ModelPagina from "./pages/ModelPagina";

import Over from "./pages/Over";

import WelkomPagina from "./pages/WelkomPagina";
import PrivacyPagina from "./pages/PrivacyPagina";
import CommunityRichtlijnenPagina from "./pages/CommunityRichtlijnenPagina";
import WorkshopLogin from "./pages/workshop/WorkshopLogin";
import WorkshopHub from "./pages/workshop/WorkshopHub";
import WorkshopUnavailable from "./pages/workshop/WorkshopUnavailable";
import { isWorkshopHubEnabledClient } from "./config/workshopHub";



function Navigatie() {

  const { taal, t } = useTaal();

  const [scrolled, setScrolled] = useState(false);

  const items = getNavItems(taal);

  const homeHref = usesEnglishRoutes(taal) ? "/welcome" : "/welkom";



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

        <a href={homeHref} className="font-display text-3xl font-semibold tracking-tight text-primair">

          {t.hero.titel}

        </a>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-secundair sm:justify-end">

          {items.map((item) =>

            item.knop ? (

              <a

                key={item.href}

                className="rounded-lg border px-4 py-1.5 transition hover:text-white"

                style={{ borderColor: "#534ab7", color: "#534ab7" }}

                href={item.href}

                onMouseEnter={(e) => {

                  e.currentTarget.style.backgroundColor = "#534ab7";

                  e.currentTarget.style.color = "#ffffff";

                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.backgroundColor = "transparent";

                  e.currentTarget.style.color = "#534ab7";

                }}

              >

                {item.label}

              </a>

            ) : (

              <a key={item.href} className="transition hover:text-primair" href={item.href}>

                {item.label}

              </a>

            ),

          )}

          <TaalSchakelaar />

        </div>

      </nav>

    </header>

  );

}



function Footer() {

  const { taal, t } = useTaal();

  const privacyHref = "/privacy";

  const richtlijnenHref = usesEnglishRoutes(taal) ? "/community-guidelines" : "/communityrichtlijnen";



  return (

    <footer className="border-t border-rand bg-achtergrond py-10">

      <div className="section-shell grid gap-6 text-sm text-secundair md:grid-cols-2 md:items-center">

        <div className="leading-7">

          <p className="font-semibold text-primair">{t.footer.lectoraat}</p>

          <a className="transition hover:text-primair" href={`mailto:${t.footer.contact}`}>

            {t.footer.contact}

          </a>

          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label={usesEnglishRoutes(taal) ? "Legal" : "Juridisch"}>

            <Link className="transition hover:text-primair" to={privacyHref}>

              {t.footer.privacy}

            </Link>

            <Link className="transition hover:text-primair" to={richtlijnenHref}>

              {t.footer.communityrichtlijnen}

            </Link>

          </nav>

        </div>

        <p className="font-display text-xl italic leading-8 text-primair md:text-right">

          {t.footer.kernzin}

        </p>

      </div>

    </footer>

  );

}



function PageRoute({ children }) {

  return (

    <>

      {children}

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

        <AppRoutes />

      </BrowserRouter>

    </TaalProvider>

  );

}



function AppRoutes() {

  const location = useLocation();

  const isWorkshop =

    location.pathname.startsWith("/workshop") || location.pathname.startsWith("/besloten");



  return (

    <>

      {!isWorkshop && <Navigatie />}

      <Routes>

        <Route path="/workshop/unavailable" element={<WorkshopUnavailable />} />

        <Route
          path="/workshop"
          element={
            isWorkshopHubEnabledClient() ? (
              <WorkshopLogin mode="workshop" />
            ) : (
              <WorkshopUnavailable />
            )
          }
        />
        <Route
          path="/workshop/voorproef"
          element={
            isWorkshopHubEnabledClient() ? (
              <WorkshopLogin mode="voorproef" />
            ) : (
              <WorkshopUnavailable />
            )
          }
        />

        <Route
          path="/workshop/apps"
          element={
            isWorkshopHubEnabledClient() ? <WorkshopHub /> : <WorkshopUnavailable />
          }
        />

        <Route
          path="/besloten"
          element={
            isWorkshopHubEnabledClient() ? (
              <Navigate to="/workshop/apps" replace />
            ) : (
              <WorkshopUnavailable />
            )
          }
        />

        <Route
          path="/besloten/*"
          element={
            isWorkshopHubEnabledClient() ? (
              <Navigate to="/workshop/apps" replace />
            ) : (
              <WorkshopUnavailable />
            )
          }
        />

        <Route path="/" element={<PageRoute><WelkomPagina /></PageRoute>} />

          <Route path="/welkom" element={<PageRoute><WelkomPagina /></PageRoute>} />

          <Route path="/welcome" element={<PageRoute><WelkomPagina /></PageRoute>} />

          <Route path="/model" element={<PageRoute><ModelPagina /></PageRoute>} />

          <Route path="/over" element={<PageRoute><Over /></PageRoute>} />

          <Route path="/about" element={<PageRoute><About /></PageRoute>} />

          <Route path="/aanbod" element={<PageRoute><AanbodPagina /></PageRoute>} />

          <Route path="/what-we-offer" element={<PageRoute><AanbodPagina /></PageRoute>} />

          <Route path="/gesprekskaarten" element={<PageRoute><GespreksKaartenPagina /></PageRoute>} />

          <Route path="/conversation-cards" element={<PageRoute><GespreksKaartenPagina /></PageRoute>} />

          <Route path="/bibliotheek" element={<PageRoute><BiblioteekOverzicht /></PageRoute>} />

          <Route path="/library" element={<PageRoute><BiblioteekOverzicht /></PageRoute>} />

          <Route path="/bibliotheek/:stap" element={<PageRoute><StapPagina /></PageRoute>} />

          <Route path="/library/:stap" element={<PageRoute><StapPagina /></PageRoute>} />

          <Route path="/aanmelden" element={<PageRoute><AanmeldenPagina /></PageRoute>} />

          <Route path="/join" element={<PageRoute><AanmeldenPagina /></PageRoute>} />

          <Route path="/privacy" element={<PageRoute><PrivacyPagina /></PageRoute>} />

          <Route path="/communityrichtlijnen" element={<PageRoute><CommunityRichtlijnenPagina /></PageRoute>} />

          <Route path="/community-guidelines" element={<PageRoute><CommunityRichtlijnenPagina /></PageRoute>} />

        </Routes>

    </>

  );

}


