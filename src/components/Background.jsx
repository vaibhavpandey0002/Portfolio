import React from "react";

/**
 * Subtle dot-grid background — appears behind all sections.
 * Each section sets its own solid bg-color, so this only shows
 * through transparent gaps (e.g., nav dropdowns, modals).
 */
const Background = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 pointer-events-none bg-charcoal dot-grid"
  />
);

export default Background;
