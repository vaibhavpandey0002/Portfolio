import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  ArrowUpRight,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Share2,
} from "lucide-react";
import { profile } from "../data/profile";

const SOCIAL_PLATFORMS = [
  {
    id: "github",
    name: "GitHub",
    category: "Code & Open Source",
    handle: "@vaibhavpandey0002",
    url: profile.socials?.github || "https://github.com/vaibhavpandey0002",
    icon: Github,
    color: "#0057FF",
    glowColor: "rgba(0, 87, 255, 0.25)",
    tag: "Source Code",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description:
      "Explore my repositories, deep learning model prototypes, NLP implementations, and agentic AI projects.",
    stats: "Repositories & AI Projects",
    cta: "View GitHub Repos",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Professional & Research",
    handle: "Vaibhav Kumar",
    url: profile.socials?.linkedin || "https://www.linkedin.com/in/vaibhav-kumar-314001331",
    icon: Linkedin,
    color: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.25)",
    tag: "Network & Papers",
    tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    description:
      "Connect for professional opportunities, research discussions on mathematics in ML, and academic milestones.",
    stats: "B.Tech AIML • SIRT Bhopal",
    cta: "Connect on LinkedIn",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Life, Tech & Campus",
    handle: "@vaibhavpandey000_2",
    url: profile.socials?.instagram || "https://www.instagram.com/vaibhavpandey000_2/",
    icon: Instagram,
    color: "#E1306C",
    glowColor: "rgba(225, 48, 108, 0.25)",
    tag: "Personal & Stories",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    description:
      "Follow my day-to-day journey, engineering events, college hackathons, and creative pursuits outside the terminal.",
    stats: "Campus Life & Highlights",
    cta: "Follow on Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "Social & Community",
    handle: "Vaibhav Kumar",
    url: profile.socials?.facebook || "https://www.facebook.com/profile.php?id=100057732473231",
    icon: Facebook,
    color: "#1877F2",
    glowColor: "rgba(24, 119, 242, 0.25)",
    tag: "Community",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    description:
      "Stay in touch through community circles, collegiate networks, and peer collaborations across social circles.",
    stats: "Community Network",
    cta: "View Profile",
  },
];

export default function SocialMedia() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="Social"
      className="bg-[#0B0D13] dot-grid text-white py-24 px-6 sm:px-10 lg:px-20 border-t border-white/5 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 right-1/4 w-80 h-80 bg-vivid-orange/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-[0.25em] text-vivid-orange uppercase">
              06 /
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-gray-500 uppercase">
              DIGITAL FOOTPRINT
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
                SOCIAL MEDIA &amp; CHANNELS
              </h2>
              <p className="font-body text-gray-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Connect across platforms — whether you want to inspect open-source code, collaborate on AI research, or follow campus tech initiatives.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#121622] border border-white/10 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-gray-300">
                Active &amp; Responsive
              </span>
            </div>
          </div>

          <div className="mt-6 h-px w-20 bg-electric-blue" />
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_PLATFORMS.map((platform, idx) => {
            const Icon = platform.icon;
            const isCopied = copiedId === platform.id;

            return (
              <div
                key={platform.id}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="group relative flex flex-col justify-between bg-[#121622] border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Glow bar top */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />

                {/* Card Top */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${platform.color}18`,
                        border: `1px solid ${platform.color}40`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color: platform.color }}
                      />
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${platform.tagColor}`}
                    >
                      {platform.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-electric-blue-light transition-colors">
                    {platform.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-3">
                    <span className="font-mono text-xs text-gray-400 truncate">
                      {platform.handle}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(platform.id, platform.url, e)}
                      title="Copy link"
                      className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`Copy ${platform.name} link`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="font-body text-gray-400 text-xs leading-relaxed line-clamp-3">
                    {platform.description}
                  </p>
                </div>

                {/* Card Bottom / Action */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-gray-500">
                    {platform.stats}
                  </span>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-electric-blue transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-electric-blue transition-colors" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Connect Banner */}
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#121622] via-[#161B28] to-[#121622] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-electric-blue" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">
                Direct Inquiries &amp; Collaborations
              </p>
              <p className="font-body text-xs text-gray-400">
                Prefer email or instant messaging? Reach out at{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-electric-blue hover:underline font-mono"
                >
                  {profile.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#Contact"
              className="px-4 py-2 rounded-lg bg-electric-blue hover:bg-electric-blue-light text-white text-xs font-medium font-body transition-colors shadow-md shadow-electric-blue/20"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

