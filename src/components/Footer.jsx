import { Github, Linkedin, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

const navLinks = [
  { label: "About", href: "#About" },
  { label: "Projects", href: "#Projects" },
  { label: "Research", href: "#Research" },
  { label: "Skills", href: "#Skills" },
  { label: "Social", href: "#Social" },
  { label: "Contact", href: "#Contact" },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: profile.socials?.github || profile.github || "https://github.com/vaibhavpandey0002",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: profile.socials?.linkedin || profile.linkedin || "https://www.linkedin.com/in/vaibhav-kumar-314001331",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: profile.socials?.instagram || profile.instagram || "https://www.instagram.com/vaibhavpandey000_2/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: profile.socials?.facebook || profile.facebook || "https://www.facebook.com/profile.php?id=100057732473231",
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-2 text-white px-6 sm:px-10 lg:px-20 xl:px-28">
      <div className="max-w-7xl mx-auto">

        {/* ── Top rule ── */}
        <div className="border-t border-white/[0.08]" />

        {/* ── Main row ── */}
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-10">

          {/* Left — Monogram + name + tagline */}
          <div className="flex flex-col gap-4">
            {/* VK monogram */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-electric-blue flex items-center justify-center shrink-0">
                <span className="font-mono text-white text-sm font-bold tracking-tighter select-none">
                  VK
                </span>
              </div>
              <span className="font-display text-base font-semibold tracking-tight">
                {profile.name}
              </span>
            </div>
            {/* Tagline */}
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              {profile.role} — building intelligent systems, one commit at a time.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-white/10 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Nav links */}
          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-1">
              Navigate
            </p>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group font-body text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors duration-200"
              >
                {label}
                <ArrowUpRight
                  size={11}
                  strokeWidth={1.5}
                  className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                />
              </a>
            ))}
          </nav>
        </div>

        {/* ── Bottom rule ── */}
        <div className="border-t border-white/[0.08]" />

        {/* ── Copyright row ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-white/25 tracking-wide">
            © 2025 Vaibhav Kumar. Built with React &amp; Vite.
          </p>
          <a
            href={`mailto:${profile.email || "vaibhav@example.com"}`}
            className="font-mono text-[11px] text-white/25 hover:text-electric-blue transition-colors duration-200 tracking-wide"
          >
            {profile.email || "vaibhav@example.com"}
          </a>
        </div>

      </div>
    </footer>
  );
}
