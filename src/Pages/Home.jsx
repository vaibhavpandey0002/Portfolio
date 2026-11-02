import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, FileText, Github, Linkedin, Instagram, Facebook, Twitter, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

/* ── Typing animation ───────────────────────────────────────── */
const TypewriterRole = ({ words }) => {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const TYPING_SPEED = 90;
  const ERASE_SPEED = 45;
  const PAUSE = 2000;

  const tick = useCallback(() => {
    const word = words[wordIdx];
    if (isTyping) {
      if (charIdx < word.length) {
        setText((p) => p + word[charIdx]);
        setCharIdx((c) => c + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE);
      }
    } else if (charIdx > 0) {
      setText((p) => p.slice(0, -1));
      setCharIdx((c) => c - 1);
    } else {
      setWordIdx((w) => (w + 1) % words.length);
      setIsTyping(true);
    }
  }, [charIdx, isTyping, wordIdx, words]);

  useEffect(() => {
    const t = setTimeout(tick, isTyping ? TYPING_SPEED : ERASE_SPEED);
    return () => clearTimeout(t);
  }, [tick, isTyping]);

  return (
    <span className="font-mono text-sm text-ink-muted">
      {text}
      <span className="typewriter-cursor" />
    </span>
  );
};

/* ── Neural-net SVG visualization ───────────────────────────── */
const NeuralViz = memo(() => {
  const inputNodes = [
    { x: 48, y: 60 }, { x: 48, y: 110 }, { x: 48, y: 160 }, { x: 48, y: 210 },
  ];
  const hiddenNodes = [
    { x: 152, y: 45 }, { x: 152, y: 90 }, { x: 152, y: 135 },
    { x: 152, y: 180 }, { x: 152, y: 225 },
  ];
  const outputNodes = [
    { x: 255, y: 95 }, { x: 255, y: 155 }, { x: 255, y: 215 },
  ];

  const edges = [];
  inputNodes.forEach((n) =>
    hiddenNodes.forEach((h) => edges.push({ x1: n.x, y1: n.y, x2: h.x, y2: h.y, type: "ih" }))
  );
  hiddenNodes.forEach((h) =>
    outputNodes.forEach((o) => edges.push({ x1: h.x, y1: h.y, x2: o.x, y2: o.y, type: "ho" }))
  );

  return (
    <svg viewBox="0 0 300 270" className="w-full max-w-[300px] mx-auto opacity-80" aria-hidden>
      <defs>
        <radialGradient id="blueNode" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0057FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0057FF" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="orangeNode" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5500" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF5500" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="hiddenNode" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3374FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3374FF" stopOpacity="0.2" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke={e.type === "ih" ? "rgba(0,87,255,0.12)" : "rgba(255,85,0,0.12)"}
          strokeWidth="0.8"
        />
      ))}

      {/* Animated "signal" pulses on random edges */}
      {[edges[2], edges[7], edges[12], edges[17]].map((e, i) => (
        e && (
          <circle key={`pulse-${i}`} r="2.5" fill="#0057FF" opacity="0.8" filter="url(#glow)">
            <animateMotion
              dur={`${1.4 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.35}s`}
            >
              <mpath>
                <animate
                  attributeName="d"
                  from={`M${e.x1},${e.y1} L${e.x2},${e.y2}`}
                  to={`M${e.x1},${e.y1} L${e.x2},${e.y2}`}
                />
              </mpath>
            </animateMotion>
            <animateMotion
              dur={`${1.4 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.35}s`}
              path={`M${e.x1},${e.y1} L${e.x2},${e.y2}`}
            />
          </circle>
        )
      ))}

      {/* Input nodes */}
      {inputNodes.map((n, i) => (
        <g key={`in-${i}`}>
          <circle cx={n.x} cy={n.y} r="7" fill="url(#blueNode)" filter="url(#glow)">
            <animate attributeName="r" values="6;8;6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="3" fill="#0057FF" opacity="0.9" />
        </g>
      ))}

      {/* Hidden nodes */}
      {hiddenNodes.map((n, i) => (
        <g key={`h-${i}`}>
          <circle cx={n.x} cy={n.y} r="8" fill="url(#hiddenNode)" filter="url(#glow)">
            <animate attributeName="r" values="7;9;7" dur={`${2.5 + i * 0.25}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="3.5" fill="#3374FF" opacity="0.9" />
        </g>
      ))}

      {/* Output nodes */}
      {outputNodes.map((n, i) => (
        <g key={`out-${i}`}>
          <circle cx={n.x} cy={n.y} r="9" fill="url(#orangeNode)" filter="url(#glow)">
            <animate attributeName="r" values="8;11;8" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="4" fill="#FF5500" opacity="0.9" />
        </g>
      ))}

      {/* Layer labels */}
      {[
        { x: 48, label: "INPUT" },
        { x: 152, label: "HIDDEN" },
        { x: 255, label: "OUTPUT" },
      ].map(({ x, label }) => (
        <text key={label} x={x} y="258" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          {label}
        </text>
      ))}
    </svg>
  );
});

/* ── Currently Exploring panel ──────────────────────────────── */
const ExploringPanel = memo(({ items }) => (
  <div className="border border-white/8 rounded-xl overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/3 border-b border-white/5">
      <span className="w-1.5 h-1.5 rounded-full bg-vivid-orange animate-pulse" />
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
        Currently Exploring
      </span>
    </div>
    <div className="divide-y divide-white/5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-2.5 group">
          <span className="text-[10px] font-mono text-gray-700 w-4 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-xs font-body text-gray-400 group-hover:text-gray-200 transition-colors leading-snug">
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>
));

/* ── Stats terminal ──────────────────────────────────────────── */
const TerminalStats = memo(() => (
  <div className="border border-white/8 rounded-xl overflow-hidden font-mono">
    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/3 border-b border-white/5">
      <span className="w-2 h-2 rounded-full bg-red-500/60" />
      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
      <span className="w-2 h-2 rounded-full bg-green-500/60" />
      <span className="ml-2 text-[9px] text-gray-700 tracking-wider">workspace.sh</span>
    </div>
    <div className="px-4 py-3 space-y-1.5 bg-black/20 text-[11px]">
      <p><span className="text-gray-700">$ </span><span className="text-electric-blue">status</span></p>
      <p><span className="text-gray-600">role</span> <span className="text-white ml-3">AI Engineer</span></p>
      <p><span className="text-gray-600">focus</span> <span className="text-vivid-orange ml-2">Agentic AI</span></p>
      <p><span className="text-gray-600">status</span> <span className="text-green-400 ml-1 animate-pulse-slow">● Available</span></p>
      <p><span className="text-gray-600">loc</span> <span className="text-white ml-5">India</span></p>
      <p className="pt-1"><span className="text-gray-700">$ </span><span className="typewriter-cursor" /></p>
    </div>
  </div>
));

/* ── Social link ─────────────────────────────────────────────── */
const SocialBtn = ({ href, icon: Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="p-2.5 rounded-lg border border-white/10 text-gray-400 hover:border-electric-blue hover:text-electric-blue transition-all duration-200 hover:bg-electric-blue/10">
    <Icon className="w-4 h-4" />
  </a>
);

/* ── Main Home component ─────────────────────────────────────── */
const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Helmet>
        <title>{profile.name} — {profile.role}</title>
        <meta name="description" content={`${profile.name} — ${profile.headline}`} />
        <meta property="og:title" content={`${profile.name} — ${profile.role}`} />
        <meta property="og:description" content={profile.headline} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div id="Home" className="min-h-screen flex flex-col lg:flex-row bg-[#0B0D13]">

        {/* ── LEFT SIDE: sleek high-tech workspace ───────────────────────── */}
        <div className="lg:w-[55%] bg-[#0B0D13] border-b lg:border-b-0 lg:border-r border-white/5 dot-grid flex items-center order-2 lg:order-1 px-6 sm:px-12 lg:px-16 xl:px-20 py-24 lg:py-0 min-h-[60vh] lg:min-h-screen">
          <div className={`max-w-lg w-full transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Label row */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-electric-blue" />
              <TypewriterRole words={profile.typingWords} />
            </div>

            {/* Name — editorial hero typography */}
            <h1 className="font-display font-bold leading-none tracking-tight text-white mb-6">
              <span className="block text-[clamp(3.5rem,9vw,6.5rem)] leading-none text-white">
                {profile.firstName.toUpperCase()}
              </span>
              <span className="block text-[clamp(3.5rem,9vw,6.5rem)] leading-none text-electric-blue">
                {profile.lastName.toUpperCase()}
              </span>
            </h1>

            {/* Philosophy tagline */}
            <div className="border-l-2 border-vivid-orange pl-4 mb-6">
              <p className="text-gray-300 font-body italic text-base lg:text-lg leading-relaxed">
                &ldquo;{profile.philosophy}&rdquo;
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 font-body text-sm lg:text-base leading-relaxed mb-8">
              {profile.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#Projects">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-electric-blue text-white text-sm font-medium font-body rounded-lg hover:bg-electric-blue-light transition-all shadow-md shadow-electric-blue/20 hover:shadow-electric-blue/40">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-sm font-medium font-body rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                  <FileText className="w-4 h-4" />
                  Resume
                </button>
              </a>
              <a href="#Contact">
                <button className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-300 text-sm font-medium font-body rounded-lg hover:border-vivid-orange hover:text-vivid-orange transition-all duration-200">
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <SocialBtn href={profile.socials.github} icon={Github} label="GitHub" />
              <SocialBtn href={profile.socials.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialBtn href={profile.socials.instagram} icon={Instagram} label="Instagram" />
              <SocialBtn href={profile.socials.facebook} icon={Facebook} label="Facebook" />
              <SocialBtn href={`mailto:${profile.email}`} icon={Mail} label="Email" />
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: deep charcoal ───────────────────────── */}
        <div className="lg:w-[45%] bg-charcoal dot-grid flex items-center order-1 lg:order-2 px-6 sm:px-10 lg:px-12 xl:px-16 py-16 lg:py-0 min-h-[55vh] lg:min-h-screen">
          <div className={`w-full max-w-sm lg:max-w-none mx-auto space-y-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>

            {/* Neural visualization */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl"
                style={{ background: "radial-gradient(ellipse at center, rgba(0,87,255,0.06) 0%, transparent 70%)" }}
              />
              <NeuralViz />

              {/* Floating stat badge */}
              <div className="absolute top-2 right-0 flex items-center gap-1.5 px-2.5 py-1 bg-charcoal-2 border border-white/10 rounded-lg">
                <span className="text-[9px] font-mono text-electric-blue">∑</span>
                <span className="text-[9px] font-mono text-gray-500">neural layers</span>
              </div>
            </div>

            {/* Currently Exploring */}
            <ExploringPanel items={profile.currentlyExploring} />

            {/* Terminal stats */}
            <TerminalStats />

            {/* Available badge */}
            {profile.available && (
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-green-500/5 border border-green-500/15 rounded-xl w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-green-400">
                  Open to opportunities
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
