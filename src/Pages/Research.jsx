import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FileText, ExternalLink, BookOpen, Award, CheckCircle2, Sparkles } from "lucide-react";
import { profile } from "../data/profile";

const readingList = [
  {
    label: "Large Language Models",
    sub: "Anthropic, OpenAI research",
  },
  {
    label: "Agentic AI papers",
    sub: "AutoGen, CrewAI, LangGraph",
  },
  {
    label: "PEFT methods",
    sub: "LoRA, QLoRA, Adapters",
  },
  {
    label: "Remote sensing VLMs",
    sub: "GeoChat, RS-GPT4V",
  },
  {
    label: "RAG architectures",
    sub: "HyDE, FLARE, Self-RAG",
  },
];

const researchTools = [
  "Python",
  "Jupyter Lab",
  "PyTorch",
  "Hugging Face",
  "Papers With Code",
  "arXiv",
  "LaTeX",
];

export default function Research() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic" });
  }, []);

  const pub = profile.publications?.[0];

  return (
    <section
      id="Research"
      className="bg-[#0A0C12] dot-grid py-24 px-6 md:px-12 lg:px-20 min-h-screen border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <div className="mb-14" data-aos="fade-up">
          <p className="font-mono text-xs text-vivid-orange tracking-widest uppercase mb-3">
            03 /
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            RESEARCH &amp; PUBLICATIONS
          </h2>
          <p className="font-body text-gray-400 text-lg max-w-2xl">
            Applied machine learning research, theoretical mathematical foundations, and peer-reviewed publications.
          </p>
        </div>

        {/* ── FEATURED PUBLISHED RESEARCH PAPER ── */}
        {pub && (
          <div
            data-aos="fade-up"
            data-aos-delay="80"
            className="mb-16 bg-[#121622] border border-electric-blue/30 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl shadow-electric-blue/5 hover:border-electric-blue/50 transition-all duration-300"
          >
            {/* Ambient subtle glow accent */}
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-72 h-72 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"
            />

            {/* Top metadata row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                PEER-REVIEWED PUBLICATION • {pub.date.toUpperCase()}
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-400">
                <span className="bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded">
                  ISSN: {pub.issn}
                </span>
                <span className="bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded">
                  ID: {pub.paperId}
                </span>
                <span className="bg-electric-blue/10 text-electric-blue border border-electric-blue/20 px-2.5 py-1 rounded">
                  {pub.pages}
                </span>
              </div>
            </div>

            {/* Paper Title */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              {pub.title}
            </h3>

            {/* Authors & Affiliation */}
            <div className="space-y-1 mb-6 text-sm">
              <p className="font-body text-gray-200">
                <span className="text-electric-blue font-semibold">Vaibhav Kumar¹ (Lead Author)</span>
                <span className="text-gray-400">, Sarla Raigar², Harsha Tavse³, Gurusharan Kaur⁴, K. K. Jain⁵</span>
              </p>
              <p className="font-body text-xs text-gray-500">
                ¹ Department of AIML, Sagar Institute of Research &amp; Technology, Bhopal • ²⁻⁵ Faculty of Mathematics
              </p>
              <p className="font-mono text-xs text-gray-400 pt-1">
                Published in: <span className="text-white font-medium">{pub.journal}</span>
              </p>
            </div>

            {/* Abstract */}
            <div className="bg-[#0B0D14] border border-white/5 rounded-xl p-5 mb-6">
              <p className="font-mono text-xs tracking-wider uppercase text-gray-400 mb-2 flex items-center gap-2">
                <BookOpen size={14} className="text-electric-blue" />
                Paper Abstract &amp; Scope
              </p>
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                {pub.abstract}
              </p>
            </div>

            {/* Keywords / Mathematical Pillars */}
            <div className="mb-8">
              <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-2.5">
                Core Mathematical Foundations Covered:
              </p>
              <div className="flex flex-wrap gap-2">
                {pub.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/8">
              <a
                href={pub.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-electric-blue hover:bg-electric-blue-light text-white font-body font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-electric-blue/20 hover:shadow-electric-blue/40"
              >
                <FileText size={16} />
                Read Full Paper (16-Page PDF)
                <ExternalLink size={14} />
              </a>
              <span className="font-mono text-xs text-gray-500">
                Published in Journal of Novel Research and Innovative Development (JNRID)
              </span>
            </div>
          </div>
        )}

        {/* ── ACTIVE RESEARCH DOMAINS & READING LIST ── */}
        <div className="mb-10">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
            Active Research Focus &amp; Interests
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left column (60%) — research cards ── */}
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {profile.research && profile.research.map((item, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                  className="
                    group
                    bg-[#121622]
                    border border-white/10
                    rounded-2xl
                    p-6
                    transition-all duration-300
                    hover:border-electric-blue/40
                    hover:shadow-xl hover:shadow-electric-blue/5
                    hover:-translate-y-0.5
                    cursor-default
                  "
                >
                  {/* Status badge */}
                  {item.status === "Active" ? (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-green-400 bg-green-500/5 border border-green-500/10 px-2.5 py-1 rounded-full mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-vivid-orange bg-vivid-orange/5 border border-vivid-orange/10 px-2.5 py-1 rounded-full mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-vivid-orange" />
                      EXPLORING
                    </span>
                  )}

                  {/* Title */}
                  <h4 className="font-display text-white text-lg font-semibold leading-snug">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="font-body text-gray-400 text-sm leading-relaxed mt-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-xs text-gray-400 border border-white/10 bg-white/[0.03] px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column (40%) — supplementary panels ── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-5">
            {/* Panel 1 — Currently Reading / Following */}
            <div
              className="bg-[#121622] border border-white/10 rounded-2xl p-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-5">
                Currently Reading / Following
              </p>
              <ul className="flex flex-col gap-3">
                {readingList.map((item, idx) => (
                  <li
                    key={idx}
                    className="group flex items-start gap-3 cursor-default"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-electric-blue flex-shrink-0 transition-colors duration-200" />
                    <span className="font-body text-sm text-gray-400 group-hover:text-white transition-colors duration-200 leading-snug">
                      {item.label}
                      <span className="text-gray-500 ml-1 text-xs">
                        ({item.sub})
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel 2 — Research Tools */}
            <div
              className="bg-[#121622] border border-white/10 rounded-2xl p-6"
              data-aos="fade-up"
              data-aos-delay="180"
            >
              <p className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-5">
                Research &amp; Compute Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {researchTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-gray-300 border border-white/10 bg-white/[0.04] px-3 py-1 rounded-full hover:border-electric-blue/40 hover:text-white transition-colors duration-200 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Full-width research philosophy quote ── */}
        <div
          className="max-w-4xl mx-auto mt-20 text-center px-4"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          <p className="font-display text-2xl md:text-3xl italic text-gray-500 leading-relaxed">
            <span className="text-electric-blue not-italic font-bold mr-2 text-4xl leading-none align-bottom">
              &ldquo;
            </span>
            Mathematics is not just the language of AI — it provides the principles through which models learn, generalize, and earn our trust.
            <span className="text-electric-blue not-italic font-bold ml-2 text-4xl leading-none align-bottom">
              &rdquo;
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
