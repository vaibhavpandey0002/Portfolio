import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile";

/* ── Typewriter sub-component ────────────────────────────────── */
const Typewriter = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className="typewriter-cursor" />
    </span>
  );
};

/* ── Neural grid loading animation ──────────────────────────── */
const NeuralGrid = () => {
  const dots = Array.from({ length: 64 }, (_, i) => i);
  return (
    <div className="grid grid-cols-8 gap-2 w-40 mx-auto opacity-20">
      {dots.map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-electric-blue"
          style={{
            animation: `pulse 2s ease-in-out infinite`,
            animationDelay: `${(i % 8) * 0.1 + Math.floor(i / 8) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Progress bar ────────────────────────────────────────────── */
const ProgressBar = ({ duration }) => (
  <div className="w-48 h-px bg-white/5 rounded-full overflow-hidden mx-auto">
    <motion.div
      className="h-full bg-electric-blue"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration, ease: "linear" }}
    />
  </div>
);

/* ── Welcome Screen ──────────────────────────────────────────── */
const WelcomeScreen = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState("loading"); // loading | done
  const LOAD_DURATION = 3200;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase("done");
    }, LOAD_DURATION);
    const t2 = setTimeout(() => {
      onLoadingComplete?.();
    }, LOAD_DURATION + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(12px)",
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== "exited" && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,87,255,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative text-center px-6 select-none">
            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-electric-blue/30 bg-electric-blue/10 mb-8 mx-auto"
            >
              <span className="text-3xl font-bold font-display text-white tracking-tight">
                VK
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-2"
            >
              {profile.firstName}{" "}
              <span className="text-electric-blue">{profile.lastName}</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-base font-mono text-gray-500 mb-10 tracking-widest uppercase"
            >
              <Typewriter text={profile.role} />
            </motion.p>

            {/* Neural grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mb-8"
            >
              <NeuralGrid />
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ProgressBar duration={LOAD_DURATION / 1000} />
              <p className="mt-3 text-[11px] font-mono text-gray-700 tracking-widest uppercase">
                {phase === "loading" ? "Initialising workspace…" : "Ready"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
