import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelfReflection from "./pages/SelfReflection";
import AppShell from "./components/AppShell";
import "./index.css";

function PlaceholderPage({ title }) {
  return (
    <AppShell>
      <section className="glass p-7 text-center sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-3 text-sm text-ink-muted">Beschikbaar vanaf een volgende sessie.</p>
      </section>
    </AppShell>
  );
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename || undefined}>
      <Routes>
        <Route path="/" element={<SelfReflection />} />
        <Route path="/team/:teamCode" element={<PlaceholderPage title="Teamscan" />} />
        <Route path="/vergelijk/:teamCode" element={<PlaceholderPage title="Vergelijking" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
