import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import "./index.css";

// Infrastructure
import Background from "./components/Background";
import FloatingNav from "./components/FloatingNav";
import CommandPalette from "./components/CommandPalette";

// Always-loaded (hero and above-fold)
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy sections
const WelcomeScreen  = lazy(() => import("./Pages/WelcomeScreen"));
const About          = lazy(() => import("./Pages/About"));
const Projects       = lazy(() => import("./Pages/Projects"));
const Research       = lazy(() => import("./Pages/Research"));
const Skills         = lazy(() => import("./Pages/Skills"));
const Experience     = lazy(() => import("./Pages/Experience"));
const SocialMedia    = lazy(() => import("./Pages/SocialMedia"));
const Contact        = lazy(() => import("./Pages/Contact"));
const Footer         = lazy(() => import("./components/Footer"));
const ProjectDetail  = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage   = lazy(() => import("./Pages/404"));

const SectionFallback = () => (
  <div className="min-h-[50vh] bg-charcoal flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

/* ── Single-page landing layout ─────────────────────────────── */
const LandingPage = ({ showWelcome, setShowWelcome }) => {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <>
      {/* Welcome / loading screen */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Main content */}
      {!showWelcome && (
        <>
          <FloatingNav onCommandPalette={() => setCmdOpen(true)} />
          <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

          <main>
            {/* Hero */}
            <Home />

            {/* Subsequent sections — lazy loaded */}
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Research />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <SocialMedia />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </>
      )}
    </>
  );
};

/* ── Project detail page ─────────────────────────────────────── */
const ProjectPage = () => (
  <>
    <Suspense fallback={<SectionFallback />}>
      <ProjectDetail />
    </Suspense>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

/* ── App root ────────────────────────────────────────────────── */
function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HelmetProvider>
      <Background />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />

          {/* Project case study */}
          <Route path="/project/:slug" element={<ProjectPage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Admin (protected) */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
