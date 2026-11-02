import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const NAV_ITEMS = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Projects", label: "Projects" },
  { href: "#Research", label: "Research" },
  { href: "#Skills", label: "Skills" },
  { href: "#Experience", label: "Experience" },
  { href: "#Social", label: "Social" },
  { href: "#Contact", label: "Contact" },
];

const FloatingNav = ({ onCommandPalette }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Section tracking
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 60);

      const sectionEls = NAV_ITEMS.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return null;
        return { id: item.href.slice(1), top: el.getBoundingClientRect().top };
      }).filter(Boolean);

      const current = sectionEls.reduce((best, s) => {
        if (s.top <= 120 && (best === null || s.top > best.top)) return s;
        return best;
      }, null);

      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onCommandPalette?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCommandPalette]);

  // Close mobile on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Desktop Floating Pill */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-1.5 bg-charcoal/95 backdrop-blur-md rounded-full border border-white/10 shadow-2xl"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" }}
          >
            {/* VK Monogram */}
            <div className="w-7 h-7 rounded-full bg-electric-blue flex items-center justify-center text-white text-[10px] font-bold font-mono shrink-0 mr-1">
              VK
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium font-body transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-electric-blue text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-electric-blue rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Cmd+K */}
            <button
              onClick={onCommandPalette}
              className="ml-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] text-gray-600 hover:text-gray-300 border border-white/10 font-mono transition-colors hover:border-white/20"
              title="Command palette (⌘K)"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile: always visible top-left pill */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-2.5 bg-charcoal/95 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
        {/* VK */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-electric-blue flex items-center justify-center text-white text-[10px] font-bold font-mono shrink-0">
            VK
          </div>
          <span className="text-white text-xs font-display font-semibold">
            Vaibhav Kumar
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[60px] left-4 right-4 z-40 bg-charcoal-2 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="py-2">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  style={{ transitionDelay: `${i * 30}ms` }}
                  className={`flex items-center gap-3 px-5 py-3 text-sm font-body transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-electric-blue font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {activeSection === item.href.slice(1) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue shrink-0" />
                  )}
                  <span className={activeSection === item.href.slice(1) ? "" : "ml-[14px]"}>
                    {item.label}
                  </span>
                </a>
              ))}
              <div className="mx-4 mt-2 mb-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => { onCommandPalette?.(); setMobileOpen(false); }}
                  className="flex items-center gap-2 text-xs text-gray-600 font-mono px-1 py-1 hover:text-gray-400 transition-colors"
                >
                  <Terminal className="w-3 h-3" />
                  Command palette (⌘K)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;

