import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ExternalLink, FileText, Mail, Code, BookOpen, Cpu, User, Home, ChevronRight, Share2 } from "lucide-react";
import { profile, projects } from "../data/profile";
import { generateSlug } from "../utils/slug";

const buildCommands = () => {
  const nav = [
    { id: "nav-home", icon: Home, label: "Go to Home", desc: "Hero section", action: () => scrollToSection("#Home") },
    { id: "nav-about", icon: User, label: "Go to About", desc: "About me & philosophy", action: () => scrollToSection("#About") },
    { id: "nav-projects", icon: Code, label: "Go to Projects", desc: "View all projects", action: () => scrollToSection("#Projects") },
    { id: "nav-research", icon: BookOpen, label: "Go to Research", desc: "Research interests & published paper", action: () => scrollToSection("#Research") },
    { id: "nav-skills", icon: Cpu, label: "Go to Skills", desc: "Technologies & tools", action: () => scrollToSection("#Skills") },
    { id: "nav-social", icon: Share2, label: "Go to Social Media", desc: "GitHub, LinkedIn, Instagram, Facebook", action: () => scrollToSection("#Social") },
    { id: "nav-contact", icon: Mail, label: "Go to Contact", desc: "Get in touch", action: () => scrollToSection("#Contact") },
  ];

  const actions = [
    { id: "act-paper", icon: BookOpen, label: "Read Research Paper (PDF)", desc: "Role of Mathematics in AI & ML (JNRID)", action: () => window.open("/research-paper-mathematics-in-ai.pdf", "_blank") },
    { id: "act-resume", icon: FileText, label: "Download Resume", desc: "Vaibhav Kumar Resume PDF", action: () => window.open(profile.resumeUrl) },
    { id: "act-email", icon: Mail, label: "Send Email", desc: profile.email, action: () => window.open(`mailto:${profile.email}`) },
    { id: "act-github", icon: ExternalLink, label: "Open GitHub", desc: profile.socials.github, action: () => window.open(profile.socials.github, "_blank") },
    { id: "act-linkedin", icon: ExternalLink, label: "Open LinkedIn", desc: profile.socials.linkedin, action: () => window.open(profile.socials.linkedin, "_blank") },
    { id: "act-instagram", icon: ExternalLink, label: "Open Instagram", desc: profile.socials.instagram, action: () => window.open(profile.socials.instagram, "_blank") },
    { id: "act-facebook", icon: ExternalLink, label: "Open Facebook", desc: profile.socials.facebook, action: () => window.open(profile.socials.facebook, "_blank") },
  ];

  const projectCmds = projects.map((p) => ({
    id: `proj-${p.id}`,
    icon: Code,
    label: p.Title,
    desc: p.Subtitle || p.TechStack.slice(0, 3).join(", "),
    action: () => { window.location.href = `/project/${generateSlug(p.Title)}`; },
  }));

  return [
    { group: "Navigation", items: nav },
    { group: "Quick Actions", items: actions },
    { group: "Projects", items: projectCmds },
  ];
};

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allCommands = buildCommands();
  const flatAll = allCommands.flatMap((g) => g.items);

  const filtered = query.trim()
    ? flatAll.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.desc?.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const displayGroups = filtered
    ? [{ group: "Results", items: filtered }]
    : allCommands;

  const flatDisplay = displayGroups.flatMap((g) => g.items);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, flatDisplay.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      }
      if (e.key === "Enter" && flatDisplay[highlighted]) {
        flatDisplay[highlighted].action();
        onClose();
      }
    },
    [isOpen, highlighted, flatDisplay, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Scroll highlighted into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${highlighted}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-charcoal-2 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                <Search className="w-4 h-4 text-gray-600 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands, projects, sections…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none font-body"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 text-[10px] bg-white/5 rounded text-gray-600 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="py-2 max-h-[340px] overflow-y-auto">
                {flatDisplay.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-gray-600 font-body">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}

                {displayGroups.map((group) => (
                  <div key={group.group}>
                    <p className="px-4 pt-3 pb-1.5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                      {group.group}
                    </p>
                    {group.items.map((cmd) => {
                      flatIdx++;
                      const idx = flatIdx;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          data-idx={idx}
                          onClick={() => { cmd.action(); onClose(); }}
                          onMouseEnter={() => setHighlighted(idx)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            highlighted === idx
                              ? "bg-electric-blue/10 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${highlighted === idx ? "text-electric-blue" : "text-gray-600"}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-body truncate">{cmd.label}</p>
                            {cmd.desc && (
                              <p className="text-xs text-gray-600 font-mono truncate">{cmd.desc}</p>
                            )}
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${highlighted === idx ? "opacity-100 text-electric-blue" : "opacity-0"}`} />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3 text-[10px] text-gray-700 font-mono">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>esc close</span>
                </div>
                <span className="text-[10px] text-gray-700 font-mono">⌘K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

