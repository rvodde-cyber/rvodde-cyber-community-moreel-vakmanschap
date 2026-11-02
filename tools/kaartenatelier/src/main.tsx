import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/carlito/400.css";
import "@fontsource/carlito/700.css";
import App from "./App";
import "./styles.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root ontbreekt");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
