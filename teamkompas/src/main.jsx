import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelfReflection from "./pages/SelfReflection";
import { colors, fonts } from "./config";

function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        padding: "48px 20px",
        textAlign: "center",
        fontFamily: fonts.ui,
        color: colors.labelAccent,
        background: colors.surface2,
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontFamily: fonts.voice }}>{title}</h1>
      <p style={{ opacity: 0.7 }}>Beschikbaar vanaf een volgende sessie.</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelfReflection />} />
        <Route
          path="/team/:teamCode"
          element={<PlaceholderPage title="Teamscan" />}
        />
        <Route
          path="/vergelijk/:teamCode"
          element={<PlaceholderPage title="Vergelijking" />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
