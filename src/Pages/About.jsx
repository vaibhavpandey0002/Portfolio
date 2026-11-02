import { memo, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { profile, projects } from "../data/profile";

const statCards = (projectCount) => [
  {
    value: `${projectCount}+`,
    label: "Projects Built",
    accent: "text-electric-blue",
    border: "border-electric-blue/30",
  },
  {
    value: "B.Tech AIML",
    label: "SIRT Bhopal (2024–28)",
    accent: "text-vivid-orange",
    border: "border-vivid-orange/30",
  },
  {
    value: "1 Paper",
    label: "Published Author (JNRID)",
    accent: "text-electric-blue",
    border: "border-electric-blue/30",
  },
];

function AboutPage() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
  }, []);

  const stats = statCards(projects.length);

  return (
    <section
      id="About"
      className="bg-charcoal text-white py-20 lg:py-28 px-6 sm:px-10 lg:px-20 xl:px-28"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex items-center gap-4 mb-14" data-aos="fade-up">
          <span className="font-mono text-xs tracking-[0.25em] text-vivid-orange uppercase select-none">
            01
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            About Me
          </h2>
        </div>

        {/* ── Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Text */}
          <div className="flex flex-col gap-8">

            {/* Hello intro */}
            <div data-aos="fade-up" data-aos-delay="100">
              <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                Hello, I'm
              </p>
              <h3 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
                {profile.name}
              </h3>
              <p className="font-body text-white/50 text-sm mt-1">{profile.role}</p>
            </div>

            {/* Bio paragraphs */}
            <div
              className="font-body text-white/70 leading-relaxed space-y-4 text-base"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p>
                I'm a B.Tech student specialising in Artificial Intelligence &amp; Machine
                Learning at Sagar Institute of Research and Technology, Bhopal (2024–2028).
                My work spans agentic AI systems, computer vision, and applied NLP — from
                architecting deterministic agentic orchestration for satellite imagery in
                national hackathons to engineering deployment-ready software products.
              </p>
              <p>
                As a Google Student Ambassador and active open-source contributor, I love
                bringing AI from research into hands-on implementations. Whether it's ATS
                resume analyzers, autonomous assistants, or remote-sensing VLMs, I focus on
                building systems that are deterministic, transparent, and built to solve
                real challenges.
              </p>
            </div>

            {/* Quote block */}
            <blockquote
              className="border-l-4 border-vivid-orange pl-5 py-1"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <p className="font-body italic text-white/60 text-sm leading-relaxed">
                "{profile.philosophy}"
              </p>
            </blockquote>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 pt-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-electric-blue hover:bg-electric-blue/90 text-white font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-200"
              >
                Download CV
              </a>
              <a
                href="#Projects"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-200"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Right — Profile Image */}
          <div
            className="flex justify-center lg:justify-end"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative group">
              {/* Offset frame */}
              <div className="absolute -inset-0.5 rounded-xl bg-white/5 group-hover:bg-electric-blue/20 transition-colors duration-400 blur-sm" />
              <div className="relative border border-white/10 group-hover:border-electric-blue/50 transition-colors duration-400 rounded-xl overflow-hidden w-72 sm:w-80 lg:w-96 aspect-square">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Corner accent */}
              <span className="absolute -bottom-3 -right-3 w-6 h-6 bg-vivid-orange block" />
            </div>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-charcoal-3 border ${stat.border} rounded-lg px-6 py-5 flex flex-col gap-1`}
              data-aos="fade-up"
              data-aos-delay={String(100 + i * 100)}
            >
              <span className={`font-mono text-2xl font-bold ${stat.accent}`}>
                {stat.value}
              </span>
              <span className="font-body text-white/50 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(AboutPage);
