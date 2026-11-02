import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronRight,
  Code2,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { projects } from "../data/profile";
import { generateSlug } from "../utils/slug";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => generateSlug(p.Title) === slug);

  useEffect(() => {
    if (!project) navigate("/", { replace: true });
    window.scrollTo(0, 0);
  }, [project, navigate]);

  if (!project) return null;

  /* ── helpers ── */
  const statusConfig = {
    Active: {
      dot: "bg-green-400",
      text: "text-green-400",
      border: "border-green-400/20",
      bg: "bg-green-400/10",
      label: "Active",
    },
    Complete: {
      dot: "bg-electric-blue",
      text: "text-electric-blue",
      border: "border-electric-blue/20",
      bg: "bg-electric-blue/10",
      label: "Complete",
    },
    "In Progress": {
      dot: "bg-vivid-orange",
      text: "text-vivid-orange",
      border: "border-vivid-orange/20",
      bg: "bg-vivid-orange/10",
      label: "In Progress",
    },
  };

  const status = statusConfig[project.Status] ?? statusConfig["Complete"];

  const projectId = projects.findIndex((p) => generateSlug(p.Title) === slug) + 1;
  const paddedId = String(projectId).padStart(2, "0");

  const otherProjects = projects
    .filter((p) => generateSlug(p.Title) !== slug)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{project.Title} — Vaibhav Kumar</title>
      </Helmet>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO — DARK
      ───────────────────────────────────────────────────────────── */}
      <header className="bg-charcoal min-h-[56vh] flex flex-col">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 pt-10 pb-14 flex flex-col flex-1">

          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-body text-sm mb-10 w-fit group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Projects
          </Link>

          {/* Project number */}
          <span className="font-mono text-electric-blue text-sm tracking-widest mb-3 uppercase">
            Project {paddedId}
          </span>

          {/* Title */}
          <h1 className="font-display text-5xl lg:text-6xl text-white font-bold leading-tight max-w-4xl">
            {project.Title}
          </h1>

          {/* Subtitle */}
          {project.Subtitle && (
            <p className="font-body text-gray-400 text-lg lg:text-xl mt-3 max-w-2xl">
              {project.Subtitle}
            </p>
          )}

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            {/* Year */}
            {project.Year && (
              <span className="font-mono text-xs text-gray-500 bg-charcoal-2 border border-white/10 px-3 py-1.5 rounded-full">
                {project.Year}
              </span>
            )}

            {/* Status */}
            <span
              className={`font-mono text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${status.bg} ${status.border} ${status.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>

            {/* External link */}
            {project.Link && (
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live project"
                className="bg-charcoal-2 border border-white/10 hover:border-white/20 rounded-lg p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}

            {/* GitHub link */}
            {project.Github && (
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                className="bg-charcoal-2 border border-white/10 hover:border-white/20 rounded-lg p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/5" />
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0C12] border-t border-white/5 px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — description */}
            <div>
              <h2 className="font-display text-white text-2xl font-bold mb-5">
                Project Overview
              </h2>
              <p className="font-body text-gray-300 text-base lg:text-lg leading-relaxed">
                {project.Description}
              </p>
            </div>

            {/* Right — tech stack */}
            <div>
              <h2 className="font-display text-white text-2xl font-bold mb-5 flex items-center gap-2">
                <Code2 size={20} className="text-electric-blue" />
                Tech Stack
              </h2>
              {project.TechStack && project.TechStack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.TechStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs bg-[#121622] border border-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:border-electric-blue/40 hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-body text-gray-500 text-sm">
                  No tech stack listed.
                </p>
              )}
            </div>
          </div>

          {/* Project image */}
          {project.Img && (
            <div className="mt-12">
              <img
                src={project.Img}
                alt={`${project.Title} preview`}
                className="w-full rounded-2xl object-cover border border-white/10 shadow-sm"
              />
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURES — DARK
      ───────────────────────────────────────────────────────────── */}
      {project.Features && project.Features.length > 0 && (
        <section className="bg-[#121622] border-t border-white/5 px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Zap size={20} className="text-electric-blue" />
              <h2 className="font-display text-white text-2xl font-bold">
                Key Features &amp; Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {project.Features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors group"
                >
                  {/* Number */}
                  <span className="font-mono text-electric-blue text-[11px] font-bold w-8 shrink-0 pt-0.5 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Feature text */}
                  <p className="font-body text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0C12] border-t border-white/5 px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">

          {/* Centered CTA */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-electric-blue tracking-widest uppercase mb-4">
              <CheckCircle2 size={13} />
              What's next?
            </div>
            <h2 className="font-display text-white text-2xl lg:text-3xl font-bold mb-3">
              Interested in this project?
            </h2>
            <p className="font-body text-gray-400 text-base max-w-md mx-auto mb-8">
              Explore more of my work or reach out — I'm always happy to discuss
              ideas and collaborate.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate("/#Projects")}
                className="font-body text-sm font-medium bg-[#161B28] text-white border border-white/10 px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                View Other Projects
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => navigate("/#Contact")}
                className="font-body text-sm font-medium bg-electric-blue text-white px-5 py-2.5 rounded-lg hover:bg-electric-blue-light transition-all cursor-pointer shadow-lg shadow-electric-blue/20"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Other projects mini-cards */}
          {otherProjects.length > 0 && (
            <div>
              <h3 className="font-display text-white text-lg font-bold mb-5">
                Other Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherProjects.map((p) => {
                  const pSlug = generateSlug(p.Title);
                  const firstThreeTech = (p.TechStack ?? []).slice(0, 3);

                  return (
                    <article
                      key={pSlug}
                      onClick={() => navigate(`/project/${pSlug}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`/project/${pSlug}`);
                        }
                      }}
                      className="bg-[#121622] border border-white/10 rounded-xl p-5 hover:border-electric-blue/40 transition-all cursor-pointer group"
                    >
                      <h4 className="font-display text-white text-base font-semibold group-hover:text-electric-blue transition-colors line-clamp-1">
                        {p.Title}
                      </h4>
                      {p.Subtitle && (
                        <p className="font-body text-gray-400 text-xs mt-1 line-clamp-2">
                          {p.Subtitle}
                        </p>
                      )}
                      {firstThreeTech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {firstThreeTech.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[10px] bg-white/[0.04] border border-white/10 text-gray-400 px-2 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
