import { Navigate, Route, Routes } from "react-router-dom";
import { TestProvider } from "./context/TestContext";
import DimensionPage from "./pages/DimensionPage";
import LandingPage from "./pages/LandingPage";
import LiveResultsPage from "./pages/LiveResultsPage";
import ResultsPage from "./pages/ResultsPage";
import "./verdenk.css";

export default function VerdenkApp() {
  return (
    <div className="verdenk-app">
      <TestProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test/:stap" element={<DimensionPage />} />
          <Route path="/resultaat" element={<ResultsPage />} />
          <Route path="/live" element={<LiveResultsPage />} />
          <Route path="*" element={<Navigate to="/verdenk" replace />} />
        </Routes>
      </TestProvider>
    </div>
  );
}
